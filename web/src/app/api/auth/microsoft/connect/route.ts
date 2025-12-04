import { handleRoute } from "@/lib/utils/apiHandler";
import User from "@/lib/models/User";
import { ApiError } from "@/lib/utils/apiHandler";
import { msalClient, REDIRECT_URI } from "@/lib/config/msal";

export const GET = handleRoute(async ({ req, session }) => {
  // 1. Ensure User is Authenticated
  if (!session || !session.user?.email) {
    throw new ApiError("Not authenticated", 401);
  }

  // 2. Fetch the User ID from DB
  const user = await User.findOne({ email: session.user.email }).select("_id");
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  // 3. Generate Auth URL
  const authUrl = await msalClient.getAuthCodeUrl({
    // We define scopes explicitly here to ensure offline_access is included
    scopes: ["User.Read", "Mail.Read", "Mail.Send", "Calendars.ReadWrite", "offline_access"],
    redirectUri: REDIRECT_URI,
    state: user._id.toString(),
    prompt: "consent", 
  });

  // 4. Return URL to Frontend
  return { url: authUrl };
});