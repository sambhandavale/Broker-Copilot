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
  const startParam = searchParams.get("start"); // ISO format: 2023-12-05T10:00:00Z
  const endParam = searchParams.get("end");     // ISO format: 2023-12-05T11:00:00Z
  
  if (!startParam || !endParam) {
    throw new ApiError("Missing required params: start, end (ISO dates)", 400);
  }

  // 3. Get User ID & Token
  const user = await User.findOne({ email: session.user.email }).select("_id");
  if (!user) throw new ApiError("User not found", 404);

  const accessToken = await getMicrosoftToken(user._id.toString());

  // 4. Call Microsoft Graph API (Calendar View)
  // We explicitly look for events strictly within this window
  const graphUrl = `https://graph.microsoft.com/v1.0/me/calendarView?startDateTime=${startParam}&endDateTime=${endParam}&$select=subject,start,end,location`;

  const response = await fetch(graphUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Prefer": 'outlook.timezone="UTC"' // Standardize on UTC
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.error?.message || "Failed to check availability", response.status);
  }

  // 5. Determine Availability
  // If data.value has any items, there is a conflict.
  const conflicts = data.value;
  const isAvailable = conflicts.length === 0;

  return {
    success: true,
    isAvailable,
    checkedWindow: { start: startParam, end: endParam },
    conflicts: conflicts.map((event: any) => ({
      subject: event.subject,
      start: event.start.dateTime,
      end: event.end.dateTime
    }))
  };
});