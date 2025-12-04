import axios from "axios";
import User from "@/lib/models/User";
import { msalClient, SCOPES } from "@/lib/config/msal";
import { decryptToken, encryptToken } from "@/lib/utils/encryption";

const GRAPH_ENDPOINT = "https://graph.microsoft.com/v1.0";

// Internal Helper: Get Valid Token
async function getValidToken(userId: string): Promise<string | null> {
  // Use .select() to explicitly include hidden fields if your schema hides them
  const user = await User.findById(userId).select("+microsoft.accessToken +microsoft.refreshToken");
  
  if (!user?.microsoft?.refreshToken) return null;

  const now = new Date();
  const expiry = new Date(user.microsoft.tokenExpiresAt || 0);

  // 1. If token is valid (plus 5 min buffer), decrypt and use
  if (expiry > new Date(now.getTime() + 5 * 60000)) {
    return decryptToken(user.microsoft.accessToken!);
  }

  // 2. Token expired? Refresh it.
  try {
    const refreshToken = decryptToken(user.microsoft.refreshToken);
    const response = await msalClient.acquireTokenByRefreshToken({
      refreshToken,
      scopes: SCOPES,
    });

    if (!response) return null;

    // 3. Update DB with new encrypted tokens
    user.microsoft.accessToken = encryptToken(response.accessToken);
    user.microsoft.tokenExpiresAt = response.expiresOn || new Date(Date.now() + 3600 * 1000);
    
    // Refresh tokens rotate occasionally
    if ((response as any).refreshToken) {
        user.microsoft.refreshToken = encryptToken((response as any).refreshToken);
    }
    
    await user.save();

    return response.accessToken;
  } catch (error) {
    console.error("Token Refresh Failed:", error);
    return null;
  }
}

// Exported Function: Send Email
export const sendOutlookMail = async (userId: string, to: string, subject: string, htmlBody: string) => {
  const token = await getValidToken(userId);
  if (!token) throw new Error("User disconnected from Outlook");

  await axios.post(
    `${GRAPH_ENDPOINT}/me/sendMail`,
    {
      message: {
        subject: subject,
        body: { contentType: "HTML", content: htmlBody },
        toRecipients: [{ emailAddress: { address: to } }],
      },
      saveToSentItems: "true",
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};