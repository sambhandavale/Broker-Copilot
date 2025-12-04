import { CsvPolicyRow } from "@/types/pipeline/pipeline";
import { transformAndGroupClients } from "./csvProcessor";
import { enrichWithOutlook } from "./outlookFetcher";

export async function generateRenewalPipeline(
  userId: string,
  rawCsvData: CsvPolicyRow[],
  windowDays: number = 30
) {
  console.log(`[Pipeline] Starting... Window: ${windowDays} days`);

  // 1. CPU Bound Task
  const groupedClients = transformAndGroupClients(rawCsvData, windowDays);
  
  if (groupedClients.length === 0) {
    return { success: true, count: 0, data: [] };
  }

  // 2. I/O Bound Task
  const unifiedData = await enrichWithOutlook(userId, groupedClients);

  return {
    success: true,
    count: unifiedData.length,
    data: unifiedData
  };
}