import { generateRenewalPipeline } from "@/lib/services/pipeline";
import { handleRoute, ApiError } from "@/lib/utils/apiHandler";

export const POST = handleRoute(async ({ req, session }) => {
  // 1. Authentication Check (Session is already fetched by handleRoute)
  if (!session || !session.user?.email) {
    throw new ApiError("Unauthorized", 401);
  }

  // Handle diverse ID types (NextAuth vs Auth.js adapters)
  const userId = (session.user as any).id || (session.user as any)._id;

  if (!userId) {
    throw new ApiError("User ID not found in session", 401);
  }

  // 2. Parse Input
  const body = await req.json();
  const { csvData, windowDays } = body;

  if (!csvData || !Array.isArray(csvData) || csvData.length === 0) {
    throw new ApiError("No CSV data provided", 400);
  }

  // 3. PHASE 1: Data Aggregation (Node.js)
  // Extract CSV -> Group -> Enrich with Outlook
  const pipelineResult = await generateRenewalPipeline(
    userId, 
    csvData, 
    parseInt(windowDays) || 90
  );

  console.log(pipelineResult);

  if (pipelineResult.data.length === 0) {
    // Returning an object here automatically becomes NextResponse.json due to handleRoute
    return { 
      success: true, 
      message: "No renewals found in this window.", 
      count: 0 
    };
  }

  // --- DEBUG MODE: STOP HERE ---
  // Returning the unified data immediately to verify CSV + Outlook merging
  return {
    success: true,
    message: "Debug: Unified Data Generated",
    count: pipelineResult.data.length,
    data: pipelineResult.data 
  };

  /* // --- TEMPORARILY DISABLED FOR DEBUGGING ---

  // 4. PHASE 2: Intelligence (Python/Agent)
  // Send the unified context to the Scorer Agent
  // const scoredResults = await scorePipelineWithAI(pipelineResult.data);

  // 5. PHASE 3: Storage (MongoDB)
  // await connectToDB(); // You might not need this if handleRoute calls dbConnect()

  // Optional: Clear previous pipeline for this user to avoid duplicates?
  // await Renewal.deleteMany({ brokerId: userId });

  // Merge the AI Result with the Original Policy Data to create DB Records
  // const dbRecords = scoredResults.map(score => {
  //   const originalCtx = pipelineResult.data.find(
  //     c => c.client.email === score.client_email
  //   );

  //   return {
  //     brokerId: userId,
  //     clientName: originalCtx?.client.name,
  //     clientId: originalCtx?.client.id,
  //     email: originalCtx?.client.email,
  //     // ... map other fields
  //   };
  // });

  // Bulk Insert
  // await Renewal.insertMany(dbRecords);

  // 6. Return Success
  // return {
  //   success: true,
  //   count: dbRecords.length,
  //   message: "Pipeline generated successfully",
  //   redirectUrl: "/dashboard/pipeline"
  // };
  */
});