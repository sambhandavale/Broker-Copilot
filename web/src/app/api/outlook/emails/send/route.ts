import { handleRoute, ApiError } from "@/lib/utils/apiHandler";
import { getMicrosoftToken } from "@/lib/utils/outlookHelper";
import User from "@/lib/models/User";

interface SendEmailBody {
  to: string; 
  subject: string;
  body: string;
}

export const POST = handleRoute(async ({ req, session }) => {
  // 1. Auth Check
  if (!session || !session.user?.email) {
    throw new ApiError("Not authenticated", 401);
  }

  // 2. Validate Input
  const { to, subject, body } = (await req.json()) as SendEmailBody;

  if (!to || !subject || !body) {
    throw new ApiError("Missing required fields: to, subject, body", 400);
  }

  // 3. Get User ID
  const user = await User.findOne({ email: session.user.email }).select("_id");
  if (!user) throw new ApiError("User not found", 404);

  // 4. Get Valid Access Token (Auto-Refreshes if needed)
  const accessToken = await getMicrosoftToken(user._id.toString());

  // 5. Construct Microsoft Graph Payload
  // The API expects a specific nested structure
  const emailPayload = {
    message: {
      subject: subject,
      body: {
        contentType: "HTML", // or "Text"
        content: body,
      },
      toRecipients: [
        {
          emailAddress: {
            address: to,
          },
        },
      ],
    },
    saveToSentItems: "true", // Save copy in Sent folder
  };

  // 6. Call Graph API
  const response = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Handle empty error body
    console.error("Graph API Send Error:", errorData);
    throw new ApiError(
      errorData.error?.message || "Failed to send email via Microsoft",
      response.status
    );
  }

  // Microsoft returns 202 Accepted with NO body on success
  return { success: true, message: "Email sent successfully" };
});