import User from "@/lib/models/User";
import { encryptToken } from "@/lib/utils/encryption";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/dbConfig";

// Ensure these are correct!
const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID!;
const CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET!;
const REDIRECT_URI = process.env.MICROSOFT_REDIRECT_URI!;
const TOKEN_ENDPOINT = "https://login.microsoftonline.com/common/oauth2/v2.0/token";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const userId = searchParams.get("state");
  const error = searchParams.get("error");

  const baseUrl = new URL(req.url).origin;
  const redirectUrl = new URL('/connectorwiz', baseUrl);

  if (error || !code || !userId) {
    redirectUrl.searchParams.set('error', error || 'invalid_request');
    return NextResponse.redirect(redirectUrl);
  }

  try {
    await dbConnect();

    // --- MANUAL TOKEN EXCHANGE (BYPASSING MSAL) ---
    console.log("-------------------------------------");
    console.log("Attempting Manual Token Exchange...");

    const bodyParams = new URLSearchParams();
    bodyParams.append("client_id", CLIENT_ID);
    bodyParams.append("scope", "User.Read Mail.Read Mail.Send Calendars.ReadWrite offline_access");
    bodyParams.append("code", code);
    bodyParams.append("redirect_uri", REDIRECT_URI);
    bodyParams.append("grant_type", "authorization_code");
    bodyParams.append("client_secret", CLIENT_SECRET);

    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams.toString(),
    });

    const data = await response.json();

    // console.log("--- RAW MICROSOFT RESPONSE ---");
    // // We log the keys to check for 'refresh_token' without leaking the whole secret if not needed
    // console.log("Keys returned:", Object.keys(data));
    // console.log("Refresh Token Exists:", !!data.refresh_token);
    // console.log("Error (if any):", data.error, data.error_description);
    // console.log("-------------------------------------");

    if (!response.ok || !data.refresh_token) {
        throw new Error(data.error_description || "Failed to get tokens manually");
    }

    // --- IF WE GET HERE, IT WORKED ---
    
    // 3. Encrypt Tokens (Note: Microsoft returns snake_case 'refresh_token')
    const encryptedAccess = encryptToken(data.access_token);
    const encryptedRefresh = encryptToken(data.refresh_token); 

    // 4. Update User in Database
    await User.findByIdAndUpdate(userId, {
      $set: {
        "microsoft.accessToken": encryptedAccess,
        "microsoft.refreshToken": encryptedRefresh,
        // Calculate expiry (expires_in is seconds)
        "microsoft.tokenExpiresAt": new Date(Date.now() + data.expires_in * 1000),
      },
    });

    // 5. SUCCESS
    redirectUrl.searchParams.set('connection', 'outlook');
    redirectUrl.searchParams.set('status', 'success');
    
    return NextResponse.redirect(redirectUrl);

  } catch (err: any) {
    console.error("Callback Error", err.message);
    redirectUrl.searchParams.set('error', 'token_exchange_failed');
    return NextResponse.redirect(redirectUrl);
  }
}