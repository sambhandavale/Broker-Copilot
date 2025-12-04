import User from "@/lib/models/User";
import { decryptToken, encryptToken } from "@/lib/utils/encryption";

const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID!;
const CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET!;
const TOKEN_ENDPOINT = "https://login.microsoftonline.com/common/oauth2/v2.0/token";

/**
 * Retrieves a valid Access Token for the user.
 * Automatically rotates the Refresh Token if the Access Token is expired.
 */
export async function getMicrosoftToken(userId: string): Promise<string> {
  // 1. Get User from DB
  const user = await User.findById(userId).select("microsoft");

  if (!user || !user.microsoft?.refreshToken) {
    throw new Error("User is not connected to Microsoft Outlook.");
  }

  // 2. Check Expiration (Add a 5-minute safety buffer)
  const now = new Date();
  const expiryDate = new Date(user.microsoft.tokenExpiresAt);
  const fiveMinutes = 5 * 60 * 1000;

  if (expiryDate.getTime() - now.getTime() > fiveMinutes) {
    // Token is still valid
    return decryptToken(user.microsoft.accessToken);
  }

  // 3. Token is Expired -> REFRESH IT
  console.log("Access Token expired. Refreshing via Microsoft API...");
  
  const decryptedRefreshToken = decryptToken(user.microsoft.refreshToken);

  const bodyParams = new URLSearchParams();
  bodyParams.append("client_id", CLIENT_ID);
  bodyParams.append("client_secret", CLIENT_SECRET);
  bodyParams.append("grant_type", "refresh_token");
  bodyParams.append("refresh_token", decryptedRefreshToken);
  bodyParams.append("scope", "User.Read Mail.Read Mail.Send Calendars.ReadWrite offline_access");

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: bodyParams.toString(),
    });

    const data = await response.json();

    if (!response.ok || !data.access_token) {
      console.error("Refresh Error Response:", data);
      throw new Error("Failed to refresh token. Session may be invalid.");
    }

    // 4. Encrypt New Tokens
    // Microsoft usually rotates the Refresh Token too, so save the new one if provided
    const newAccessToken = encryptToken(data.access_token);
    const newRefreshToken = data.refresh_token 
        ? encryptToken(data.refresh_token) 
        : user.microsoft.refreshToken; // Fallback to old one if not rotated

    // 5. Update Database
    await User.findByIdAndUpdate(userId, {
      $set: {
        "microsoft.accessToken": newAccessToken,
        "microsoft.refreshToken": newRefreshToken,
        "microsoft.tokenExpiresAt": new Date(Date.now() + data.expires_in * 1000),
      },
    });

    console.log("Token refreshed successfully.");
    return data.access_token;

  } catch (error) {
    console.error("Critical Error in getMicrosoftToken:", error);
    throw error;
  }
}