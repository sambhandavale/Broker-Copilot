import { ConfidentialClientApplication, Configuration } from "@azure/msal-node";
import { LogLevel } from "@azure/msal-node";

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID!,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    // "common" = Personal + Work accounts
    authority: "https://login.microsoftonline.com/common",
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(`[MSAL] ${message}`);
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Verbose, // This will show us everything
    },
  },
};

export const msalClient = new ConfidentialClientApplication(msalConfig);

export const SCOPES = [
  "User.Read",
  "Mail.Read",
  "Mail.Send",           // Send emails
  "Calendars.ReadWrite", // Schedule meetings
  "offline_access"       // Get Refresh Token (CRITICAL)
];

// Ensure this matches your Azure Portal Redirect URI exactly
export const REDIRECT_URI = process.env.MICROSOFT_REDIRECT_URI!;