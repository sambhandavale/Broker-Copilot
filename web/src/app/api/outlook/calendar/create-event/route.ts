import { handleRoute, ApiError } from "@/lib/utils/apiHandler";
import { getMicrosoftToken } from "@/lib/utils/outlookHelper";
import User from "@/lib/models/User";

interface CreateEventBody {
  subject: string;
  start: string; // ISO String
  end: string;   // ISO String
  description?: string;
  location?: string;
  attendees?: string[]; // Array of emails ["bob@test.com", "alice@test.com"]
}

export const POST = handleRoute(async ({ req, session }) => {
  if (!session || !session.user?.email) throw new ApiError("Not authenticated", 401);

  const body = (await req.json()) as CreateEventBody;
  const { subject, start, end, description, location, attendees } = body;

  if (!subject || !start || !end) {
    throw new ApiError("Missing required fields: subject, start, end", 400);
  }

  const user = await User.findOne({ email: session.user.email }).select("_id");
  if (!user) throw new ApiError("User not found", 404);

  const accessToken = await getMicrosoftToken(user._id.toString());

  // Construct Attendee List if provided
  const attendeeList = attendees?.map(email => ({
    emailAddress: { address: email },
    type: "required"
  })) || [];

  const eventPayload = {
    subject: subject,
    body: {
      contentType: "HTML",
      content: description || ""
    },
    start: {
        dateTime: start,
        timeZone: "UTC"
    },
    end: {
        dateTime: end,
        timeZone: "UTC"
    },
    location: {
        displayName: location || "Microsoft Teams Meeting"
    },
    attendees: attendeeList,
    // Optional: Make it an online meeting
    // isOnlineMeeting: true,
    // onlineMeetingProvider: "teamsForBusiness" 
  };

  const response = await fetch("https://graph.microsoft.com/v1.0/me/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventPayload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Calendar Create Error:", data);
    throw new ApiError(data.error?.message || "Failed to create event", response.status);
  }

  return { 
    success: true, 
    message: "Meeting scheduled successfully",
    eventLink: data.webLink,
    id: data.id 
  };
});