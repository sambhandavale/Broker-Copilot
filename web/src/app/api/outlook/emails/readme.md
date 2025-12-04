GET /api/outlook/emails

1. Get unread emails
/api/outlook/emails?unread=true

2. Get emails with a specific subject
/api/outlook/emails?subject=meeting&limit=20

3. Get emails from a specific sender (KQL mode)
/api/outlook/emails?from=client@gmail.com

4. Search inside email body (KQL mode)
/api/outlook/emails?body=urgent

5. Unread + body text search
/api/outlook/emails?unread=true&body=budget

6. Complex search (from + subject + body)
/api/outlook/emails?from=manager@corp.com&subject=Project&body=deadline