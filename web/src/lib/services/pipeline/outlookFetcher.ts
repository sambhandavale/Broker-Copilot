import { getMicrosoftToken } from "@/lib/utils/outlookHelper"; // Keeps original loc if not moved
import { getDaysAgoISO } from "@/lib/utils/date";
import pLimit from "p-limit"; 
import { UnifiedClientContext } from "@/types/pipeline/pipeline";
import { MOCK_EMAILS } from "@/lib/utils/data/mock_emails";

export async function enrichWithOutlook(
  userId: string, 
  clients: UnifiedClientContext[]
): Promise<UnifiedClientContext[]> {
  
  let accessToken = "";
  try {
    accessToken = await getMicrosoftToken(userId);
  } catch (e) {
    console.warn("[Outlook] Failed to get token. Running in pure Mock Mode.");
  }

  const limit = pLimit(3); 
  const emailLookbackDate = getDaysAgoISO(90); 

  const tasks = clients.map((client) => {
    return limit(async () => {
      try {
        let rawEmails: any[] = [];
        const clientEmail = client.client.email.trim();

        // 1. Try Fetching from Real API if Token Exists
        if (accessToken) {
            try {
                const url = new URL("https://graph.microsoft.com/v1.0/me/messages");
                
                // --- STRATEGY: Pure KQL Search (Combined) ---
                // Microsoft Graph does not allow combining $filter and $search for messages.
                // We must put the date logic INSIDE the $search KQL query.
                
                // KQL Query: from:email AND received>=date
                // Note: We use the ISO date string directly, KQL parses it correctly.
                const kqlQuery = `from:${clientEmail} AND received>=${emailLookbackDate}`;
                
                // Set ONLY $search (No $filter)
                url.searchParams.set("$search", `"${kqlQuery}"`);
                
                // 3. Select & Top
                url.searchParams.set("$top", "10");
                url.searchParams.set("$select", "id,subject,bodyPreview,receivedDateTime,webLink,importance,from,body,hasAttachments");

                console.log(`[Outlook] Fetching emails for: ${clientEmail}`);
                
                const res = await fetch(url.toString(), {
                  headers: { 
                    Authorization: `Bearer ${accessToken}`,
                    "Prefer": 'outlook.body-content-type="text"' // Ensure body comes back as Text, not HTML
                  }
                });

                if (res.ok) {
                    const data = await res.json();
                    rawEmails = data.value || [];
                    console.log(`[Outlook] Found ${rawEmails.length} emails for ${clientEmail}`);
                } else {
                    const errText = await res.text();
                    console.error(`[Outlook] API Error ${res.status} for ${clientEmail}:`, errText);
                }
            } catch (err) {
                console.error(`[Outlook] Network Error for ${clientEmail}`, err);
            }
        }

        // 2. FALLBACK: Inject Mocks if no real emails found
        // This ensures the Demo always looks populated
        if (rawEmails.length === 0) {
            if (MOCK_EMAILS[clientEmail]) {
                console.log(`[Outlook] Using MOCK emails for ${clientEmail}`);
                rawEmails = MOCK_EMAILS[clientEmail];
            } else {
                // Optional: Inject generic mock for others if you want everything populated
                // console.log(`[Outlook] Injecting GENERIC mock for ${clientEmail}`);
                // rawEmails = MOCK_EMAILS["generic"];
            }
        }

        // 3. Map to Unified Format
        client.emails = rawEmails.map((msg: any) => ({
          id: msg.id,
          subject: msg.subject,
          body:msg.body.content,
          bodyPreview: msg.bodyPreview,
          receivedDateTime: msg.receivedDateTime,
          webLink: msg.webLink || "#",
          isUrgent: msg.importance === "high"
        }));

        return client;

      } catch (err) {
        console.error("Outlook Error:", err);
        return client;
      }
    });
  });

  return Promise.all(tasks);
}
