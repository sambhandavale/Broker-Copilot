import { NextResponse } from "next/server";
import { generateRenewalPipeline } from "@/lib/services/pipeline";
import { handleRoute, ApiError } from "@/lib/utils/apiHandler";
import Renewal from "@/lib/models/Renewal";

export const POST = handleRoute(async ({ req, session }) => {
  if (!session || !session.user?.email) {
    throw new ApiError("Unauthorized", 401);
  }
  
  const userId = (session.user as any).id || (session.user as any)._id;
  const body = await req.json();
  const { csvData, windowDays } = body;

  if (!csvData || !Array.isArray(csvData) || csvData.length === 0) {
    throw new ApiError("No CSV data provided", 400);
  }

  // 1. Generate Pipeline (Raw Data)
  const pipelineResult = await generateRenewalPipeline(
    userId, 
    csvData, 
    parseInt(windowDays) || 90
  );
  
  if (pipelineResult.data.length === 0) {
    return { success: true, message: "No renewals found in this window.", count: 0 };
  }

  // 2. Call Python AI Agent
  const pythonApiUrl = process.env.PYTHON_AGENT_URL || "http://127.0.0.1:8000/analyze";
  let scoredData;

  try {
    const aiResponse = await fetch(pythonApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raw_data: JSON.stringify(pipelineResult.data) }),
    });

    if (!aiResponse.ok) {
      throw new Error(`Python API Error: ${aiResponse.status}`);
    }

    const aiJson = await aiResponse.json();
    scoredData = aiJson.data.renewals || aiJson.data;

    console.log("AI Response - ", aiJson);

  } catch (error) {
    console.error("AI Generation Failed:", error);
    throw new ApiError("Failed to generate AI scores. Please try again.", 503);
  }

  // 3. Match AI Results back to Source Data via ID
  let matchFailures = 0;

  const dbRecords = scoredData.map((score: any) => {
    // ROBUST MATCHING
    const originalCtx = pipelineResult.data.find((c: any) => c.id === score.record_id);

    if (!originalCtx) {
      console.warn(`AI returned ID ${score.record_id} but it wasn't found in source.`);
      matchFailures++;
      return null;
    }

    return {
      brokerId: userId,
      clientId: originalCtx.client.id,
      clientName: originalCtx.client.name,
      email: originalCtx.client.email,
      company: originalCtx.client.company,
      policies: originalCtx.policies || [],
      renewalDate: originalCtx.policies[0]?.expiryDate,
      totalPremium: score.total_premium,

      // Rich Analysis Object
      aiAnalysis: {
        score: score.score,
        rank: score.rank,
        status: score.status,
        
        // Narrative
        reasoning: score.reasoning, 
        
        // Lists
        risk_factors: score.risk_factors || [],
        positive_factors: score.positive_factors || [],
        talking_points: score.talking_points || [],
        upsell_opportunity: score.upsell_opportunity,
        
        recommendedAction: score.recommended_action,
        keyReferences: score.key_references,
        analyzedAt: new Date()
      }
    };
  }).filter((record: any) => record !== null);

  // 4. Save to MongoDB
  if (dbRecords.length > 0) {
    await Renewal.insertMany(dbRecords);
  }

  return {
    success: true,
    message: "Pipeline generated successfully",
    count: dbRecords.length,
    failures: matchFailures,
    redirectUrl: "/dashboard/pipeline"
  };
});