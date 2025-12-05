import { handleRoute, ApiError } from "@/lib/utils/apiHandler";
import Renewal from "@/lib/models/Renewal";
import RenewalDetail from "@/lib/models/RenewalDetail"; // 👈 Import this
import { Model } from "mongoose";

export const GET = handleRoute(async ({ req, session }) => {
  // 1. Authentication Check
  if (!session || !session.user?.email) {
    throw new ApiError("Unauthorized", 401);
  }

  const userId = (session.user as any).id || (session.user as any)._id;

  // 2. Parse Query Params
  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get("status");

  // 3. Build Query
  const query: any = { brokerId: userId };
  if (statusFilter) {
    query["aiAnalysis.status"] = statusFilter;
  }

  // 4. Fetch Renewals (The Parent Records)
  const renewals = await (Renewal as Model<any>).find(query)
    .sort({ "aiAnalysis.rank": 1, "aiAnalysis.score": -1 })
    .lean();

  // --- NEW LOGIC STARTS HERE ---

  // 4a. Get all IDs from the fetched renewals
  const renewalIds = renewals.map((r: any) => r._id);

  // 4b. Check RenewalDetail collection to see which of these IDs have a generated brief
  // We only select '_id' and 'renewalId' to keep it lightweight
  const existingDetails = await RenewalDetail.find({
    renewalId: { $in: renewalIds }
  }).select("renewalId").lean();

  // 4c. Create a Set of IDs that "Have Details" for O(1) lookup
  const setOfIdsWithDetails = new Set(
    existingDetails.map((d: any) => d.renewalId.toString())
  );

  // 4d. Add the 'hasDetail' flag to the response data
  const dataWithFlags = renewals.map((r: any) => ({
    ...r,
    hasDetail: setOfIdsWithDetails.has(r._id.toString()) // ✅ true if brief exists, false if not
  }));

  // --- NEW LOGIC ENDS HERE ---

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
    data: dataWithFlags // 👈 Return the modified data
  };
});