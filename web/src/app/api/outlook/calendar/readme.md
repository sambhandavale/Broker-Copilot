1. Check Availability

GET /api/outlook/calendar/available

Check if user is free in a time window
/api/outlook/calendar/available?start=2023-12-25T14:00:00Z&end=2023-12-25T15:00:00Z

Example Response
{
  "success": true,
  "isAvailable": false,
  "conflicts": [
    {
      "subject": "Lunch with Client",
      "start": "2023-12-25T14:30:00.0000000",
      "end": "2023-12-25T15:30:00.0000000"
    }
  ]
}

2. Schedule a Meeting

POST /api/outlook/calendar/create-event

Create a new meeting with attendees
Body:

{
  "subject": "Project Kickoff",
  "start": "2023-12-26T10:00:00Z",
  "end": "2023-12-26T11:00:00Z",
  "attendees": ["client@example.com"],
  "description": "Discussing Q1 roadmap.",
  "location": "Conference Room A"
}


Create a simple event (no attendees)
Body:

{
  "subject": "Focus Work",
  "start": "2023-12-27T09:00:00Z",
  "end": "2023-12-27T11:00:00Z",
  "description": "Deep work session."
}


Create an online meeting
Body:

{
  "subject": "Design Review",
  "start": "2023-12-28T15:00:00Z",
  "end": "2023-12-28T16:00:00Z",
  "attendees": ["designer@company.com"],
  "location": "Online",
  "description": "Review of UI/UX changes."
}