import { handleRoute, ApiError } from "@/lib/utils/apiHandler";
import RenewalDetail from "@/lib/models/RenewalDetail";

export const GET = handleRoute(async ({ req, session, params }) => {
  if (!session || !session.user?.email) {
    console.error("❌ Unauthorized access attempt");
    throw new ApiError("Unauthorized", 401);
  }

  const userId = (session.user as any).id || (session.user as any)._id;
  const resolvedParams = await params;
  const { id } = resolvedParams;

  console.log("id---",id);

  if (!id) {
    console.error("❌ Missing renewalId in params");
    throw new ApiError("Renewal ID is required", 400);
  }

  // 2️⃣ Fetch Renewal Detail
  console.log(`🔍 Fetching RenewalDetail for renewalId: ${id}`);

  const renewalDetail = await RenewalDetail.findOne({
    renewalId: id,
    brokerId: userId,
  }).lean();

  if (!renewalDetail) {
    console.warn("⚠️ No RenewalDetail found for this renewalId");
    throw new ApiError("No brief found for this renewal record", 404);
  }

  console.log("✅ RenewalDetail found:", renewalDetail._id);

  // 3️⃣ Prepare Response
  const response = {
    success: true,
    data: {
      _id: renewalDetail._id,
      renewalId: renewalDetail.renewalId,
      brief: renewalDetail.brief || null,
      outreachDraft: renewalDetail.outreachDraft || null,
      createdAt: renewalDetail.createdAt,
      updatedAt: renewalDetail.updatedAt,
    },
  };

  return response;
});
