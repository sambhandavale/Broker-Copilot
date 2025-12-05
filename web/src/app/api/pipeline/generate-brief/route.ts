import { NextResponse } from "next/server";
import { handleRoute, ApiError } from "@/lib/utils/apiHandler";
import Renewal from "@/lib/models/Renewal";
import RenewalDetail from "@/lib/models/RenewalDetail";

// ✅ ADDED: Allow this route to run for up to 5 minutes (300 seconds)
export const maxDuration = 300; 

export const POST = handleRoute(async ({ req, session }) => {
  console.log("🚀 [ActionPlan API] Request received");

  // 1. AUTH CHECK
  if (!session || !session.user?.email) {
    console.error("❌ [Auth] Missing session or email");
    throw new ApiError("Unauthorized", 401);
  }

  const userId = (session.user as any).id || (session.user as any)._id;
  console.log(`👤 [User] User ID: ${userId}`);

  // 2. PARSE BODY
  const body = await req.json();
  const { renewalId } = body;

  console.log("📩 [Input] Body received:", body);

  if (!renewalId) {
    console.error("❌ [Input Error] renewalId missing");
    throw new ApiError("Renewal ID is required", 400);
  }

  // 3. FETCH SOURCE RENEWAL
  console.log(`🔍 [DB] Fetching Renewal for ID: ${renewalId}`);

  const renewalRecord = await Renewal.findOne({
    _id: renewalId,
    brokerId: userId,
  });

  if (!renewalRecord) {
    console.error("❌ [DB] Renewal record not found");
    throw new ApiError("Renewal record not found", 404);
  }

  console.log("✅ [DB] Renewal record found.");

  // 4. PREPARE PAYLOAD FOR PYTHON
  console.log("🛠️ [Payload] Constructing agent payload...");

  const agentPayload = { 
    id: renewalRecord._id.toString(),
    client: {
      id: renewalRecord.clientId,
      name: renewalRecord.clientName,
      company: renewalRecord.company,
      email: renewalRecord.email,
    },
    policies: (renewalRecord.policies || []).map((policy: any, index: number) => ({
      ...policy,
      csvLocation: `Excel Row ${index + 2} (ID: ${policy.policyNumber})`
    })),
    aiAnalysis: renewalRecord.aiAnalysis || {} 
  };

  console.log("📦 [Payload] Payload ready:", agentPayload);

  // 5. CALL PYTHON AGENT
  const pythonApiUrl =
    process.env.PYTHON_AGENT_URL || "http://127.0.0.1:8000/generate_detail";

  console.log(`🌐 [AI] Sending request to Python Agent at: ${pythonApiUrl}`);

  let generatedContent;

  try {
    const aiResponse = await fetch(pythonApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raw_data: JSON.stringify(agentPayload) }),
    });

    console.log(`🔁 [AI] Agent responded with status: ${aiResponse.status}`);

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("❌ [AI Error Body]", errText);
      throw new Error(`Python API Error ${aiResponse.status}: ${errText}`);
    }

    const aiJson = await aiResponse.json();
    console.log("🤖 [AI] Parsed response:", aiJson);

    if (
      !aiJson.data ||
      !aiJson.data.client_packages ||
      aiJson.data.client_packages.length === 0
    ) {
      console.error("❌ [AI] Invalid AI response format");
      throw new Error("Invalid response format from AI Agent");
    }

    generatedContent = aiJson.data.client_packages[0];

    console.log("✨ [AI] Extracted generated content:", generatedContent);

  } catch (error: any) {
    console.error("💥 [AI Failure] Detail generation failed:", error);
    throw new ApiError(error.message || "Failed to generate brief", 503);
  }

  // 6. UPSERT INTO RENEWALDETAIL
  console.log("💾 [DB] Saving action plan to RenewalDetail...");

  const detailRecord = await RenewalDetail.findOneAndUpdate(
    { renewalId: renewalId },
    {
      renewalId: renewalId,
      brokerId: userId,
      brief: generatedContent.brief,
      outreachDraft: generatedContent.outreach_draft,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(
    `✅ [DB] Action plan saved. Detail ID: ${detailRecord._id.toString()}`
  );

  // 7. FINAL RESPONSE
  console.log("🎉 [Response] Action plan generation completed successfully.");

  return {
    success: true,
    message: "Action plan generated successfully",
    detailId: detailRecord._id,
    redirectUrl: `/dashboard/renewals/${renewalId}`,
  };
});