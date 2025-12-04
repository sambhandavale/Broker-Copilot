import { isDateWithinWindow } from "@/lib/utils/date"; // Clean Import
import { CsvPolicyRow, UnifiedClientContext } from "@/types/pipeline/pipeline";

export function transformAndGroupClients(
  rows: CsvPolicyRow[], 
  renewalWindowDays: number
): UnifiedClientContext[] {
  
  // 1. Log Input Size
  console.log(`[CSV Processor] Starting. Input Rows: ${rows.length}, Window: ${renewalWindowDays} days`);

  const clientMap = new Map<string, UnifiedClientContext>();

  rows.forEach((row, index) => {
    // 2. Validate Email
    if (!row.email) {
      if (index < 5) console.warn(`[CSV Processor] Row ${index} skipped: Missing Email`);
      return;
    }

    const emailKey = row.email.toLowerCase().trim();
    
    // 3. Debug Date Logic (Log first 5 rows to check parsing)
    const isDue = isDateWithinWindow(row.endDate, renewalWindowDays);
    
    
    console.log(`[Row ${index}] Email: ${emailKey} | EndDate: "${row.endDate}" | IsDue: ${isDue}`);
    

    // Initialize Client if new
    if (!clientMap.has(emailKey)) {
      clientMap.set(emailKey, {
        id: `WF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        client: {
          id: row.client_id,
          name: row.client_name,
          email: emailKey,
          phone: row.phone,
          company: row.company,
          accountManager: row.accountManager
        },
        policies: [],
        emails: [],
        metadata: {
          sourceSystem: row.sourceSystem,
          sourceUrl: row.sourceUrl
        }
      });
    }

    // Add Policy
    clientMap.get(emailKey)!.policies.push({
      policyNumber: row.policyNumber,
      carrier: row.carrier,
      type: row.type,
      expiryDate: row.endDate,
      premium: parseFloat(row.premium) || 0,
      status: row.status,
      claimsCount: parseInt(row.claimsCount) || 0,
      isDueForRenewal: isDue
    });
  });

  const allClients = Array.from(clientMap.values());

  // 4. Log Grouping Results
  console.log(`[CSV Processor] Grouped into ${allClients.length} unique clients.`);

  // Filter: Keep clients with AT LEAST ONE due policy
  const filteredClients = allClients.filter(client => 
    client.policies.some(p => p.isDueForRenewal)
  );

  console.log(`[CSV Processor] Clients remaining after Filter: ${filteredClients.length}`);

  return filteredClients;
}