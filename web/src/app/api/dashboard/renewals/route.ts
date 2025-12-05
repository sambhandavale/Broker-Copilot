import { handleRoute, ApiError } from "@/lib/utils/apiHandler";
import Renewal from "@/lib/models/Renewal";
import { Model } from "mongoose"; // Keep Model, remove FilterQuery

export const GET = handleRoute(async ({ req, session }) => {
  // 1. Authentication Check
  if (!session || !session.user?.email) {
    throw new ApiError("Unauthorized", 401);
  }

  // Handle diverse ID types
  const userId = (session.user as any).id || (session.user as any)._id;

  // 2. Parse Query Params
  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get("status"); 

  // 3. Build Query
  // FIX: Type as 'any' to bypass the FilterQuery export error and compatible signature check
  const query: any = { brokerId: userId };

  if (statusFilter) {
    query["aiAnalysis.status"] = statusFilter;
  }

  // 4. Fetch Data
  // FIX: Cast (Renewal as Model<any>) to ensure the .find() method is callable
  const renewals = await (Renewal as Model<any>).find(query)
    .sort({ "aiAnalysis.rank": 1, "aiAnalysis.score": -1 })
    .lean(); 

  // 5. Calculate Summary Stats
  const stats = {
    total: renewals.length,
    critical: renewals.filter((r: any) => r.aiAnalysis?.status === "Critical").length,
    high: renewals.filter((r: any) => r.aiAnalysis?.status === "High").length,
    premiumAtRisk: renewals.reduce((sum: number, r: any) => sum + (r.totalPremium || 0), 0)
  };

  return {
    success: true,
    stats,
    data: renewals
  };
});