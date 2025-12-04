import { handleRoute, ApiError } from "@/lib/utils/apiHandler";
import { getMicrosoftToken } from "@/lib/utils/outlookHelper";
import User from "@/lib/models/User";

export const GET = handleRoute(async ({ req, session }) => {
  // 1. Auth Check
  if (!session || !session.user?.email) {
    throw new ApiError("Not authenticated", 401);
  }

  // 2. Parse Query Params from the Request URL
  const { searchParams } = new URL(req.url);
  
  const onlyUnread = searchParams.get("unread") === "true"; // ?unread=true
  const subjectKeyword = searchParams.get("subject");       // ?subject=invoice
  const fromEmail = searchParams.get("from");               // ?from=boss@company.com
  const bodyKeyword = searchParams.get("body");             // ?body=urgent
  const limit = searchParams.get("limit") || "10";          // ?limit=20

  // 3. Get User ID & Token
  const user = await User.findOne({ email: session.user.email }).select("_id");
  if (!user) throw new ApiError("User not found", 404);

  const accessToken = await getMicrosoftToken(user._id.toString());

  // 4. Construct the Graph API URL
  const graphEndpoint = new URL("https://graph.microsoft.com/v1.0/me/messages");
  
  // Always set basic parameters
  graphEndpoint.searchParams.set("$top", limit);
  graphEndpoint.searchParams.set("$select", "subject,from,receivedDateTime,isRead,webLink,bodyPreview");

  // --- HYBRID FILTERING STRATEGY ---
  
  // STRATEGY A: Use KQL ($search) if 'from' OR 'body' is present
  // Why? OData filtering on 'body' is not supported by Microsoft Graph. KQL is required.
  // Also, OData filtering on 'from' is often flaky. KQL is robust.
  if (fromEmail || bodyKeyword) {
    const kqlParts: string[] = [];
    
    // Add From clause (e.g., "from:someone@gmail.com")
    if (fromEmail) {
      kqlParts.push(`from:${fromEmail}`);
    }

    // Add Body clause (e.g., "body:keyword")
    if (bodyKeyword) {
      kqlParts.push(`body:${bodyKeyword}`);
    }
    
    // Add Unread clause (KQL syntax: "isread:false")
    if (onlyUnread) {
      kqlParts.push("isread:false");
    }

    // Add Subject clause (KQL syntax: "subject:keyword")
    if (subjectKeyword) {
      kqlParts.push(`subject:${subjectKeyword}`);
    }

    // Join with AND and set to $search
    // Note: $search requires double quotes around the value
    const kqlQuery = kqlParts.join(" AND ");
    graphEndpoint.searchParams.set("$search", `"${kqlQuery}"`);
  
  } else {
    // STRATEGY B: Use OData ($filter) for standard filtering
    // Why? It preserves chronological sorting (Search results are sorted by relevance)
    // and allows substring matching for subjects (contains).
    const filters: string[] = [];

    if (onlyUnread) {
      filters.push("isRead eq false");
    }

    if (subjectKeyword) {
      filters.push(`contains(subject, '${subjectKeyword}')`);
    }

    if (filters.length > 0) {
      graphEndpoint.searchParams.set("$filter", filters.join(" and "));
    }
  }

  console.log("Fetching Graph URL:", graphEndpoint.toString());

  // 5. Fetch from Microsoft
  const response = await fetch(graphEndpoint.toString(), {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
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