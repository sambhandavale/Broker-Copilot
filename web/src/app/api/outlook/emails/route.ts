import { handleRoute, ApiError } from "@/lib/utils/apiHandler";
import { getMicrosoftToken } from "@/lib/utils/outlookHelper";
import User from "@/lib/models/User";

export const GET = handleRoute(async ({ req, session }) => {
  // 1. Auth Check
  if (!session || !session.user?.email) {
    throw new ApiError("Not authenticated", 401);
  }

  // 2. Parse Query Params
  const { searchParams } = new URL(req.url);
  
  const onlyUnread = searchParams.get("unread") === "true";
  const subjectKeyword = searchParams.get("subject");
  const fromEmail = searchParams.get("from");
  const bodyKeyword = searchParams.get("body");
  const limit = searchParams.get("limit") || "10";

  // 3. Get User ID & Token
  const user = await User.findOne({ email: session.user.email }).select("_id");
  if (!user) throw new ApiError("User not found", 404);

  const accessToken = await getMicrosoftToken(user._id.toString());

  // 4. Construct the Graph API URL
  const graphEndpoint = new URL("https://graph.microsoft.com/v1.0/me/messages");
  
  // UPDATED: Added "hasAttachments" to select
  graphEndpoint.searchParams.set("$top", limit);
  graphEndpoint.searchParams.set("$select", "subject,from,receivedDateTime,isRead,webLink,bodyPreview,body,hasAttachments,id");

  // UPDATED: Added expand to get attachment metadata inline
  // We select specific fields to keep the payload light
  graphEndpoint.searchParams.set("$expand", "attachments($select=id,name,contentType,size,isInline)");

  // --- HYBRID FILTERING STRATEGY ---
  if (fromEmail || bodyKeyword) {
    // STRATEGY A: KQL ($search)
    const kqlParts: string[] = [];
    
    if (fromEmail) kqlParts.push(`from:${fromEmail}`);
    if (bodyKeyword) kqlParts.push(`body:${bodyKeyword}`);
    if (onlyUnread) kqlParts.push("isread:false");
    if (subjectKeyword) kqlParts.push(`subject:${subjectKeyword}`);

    const kqlQuery = kqlParts.join(" AND ");
    graphEndpoint.searchParams.set("$search", `"${kqlQuery}"`);
  
  } else {
    // STRATEGY B: OData ($filter)
    const filters: string[] = [];
    if (onlyUnread) filters.push("isRead eq false");
    if (subjectKeyword) filters.push(`contains(subject, '${subjectKeyword}')`);

    if (filters.length > 0) {
      graphEndpoint.searchParams.set("$filter", filters.join(" and "));
    }
  }

  // 5. Fetch from Microsoft
  const response = await fetch(graphEndpoint.toString(), {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Prefer": 'outlook.body-content-type="text"'
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.error?.message || "Failed to fetch emails", response.status);
  }

  return {
    success: true,
    strategy: (fromEmail || bodyKeyword) ? "KQL (Search)" : "OData (Filter)",
    count: data.value.length,
    emails: data.value,
  };
});