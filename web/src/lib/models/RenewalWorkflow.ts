import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRenewalWorkflow extends Document {
  brokerId: Types.ObjectId;
  clientRefId: Types.ObjectId;
  
  // 1. SCORING
  priorityScore: number;
  priorityCategory: "Critical" | "High" | "Medium" | "Low";
  reasonTags: string[];
  
  // Manual Override
  isOverridden: boolean;
  overrideReason?: string;

  // 2. CITATIONS (Updated for CSV Support)
  citations: {
    sourceType: "Outlook" | "Teams" | "CRM" | "CSV"; // Added CSV
    sourceId: string; // "MSG-123" or "ROW-12"
    
    // UI Helper: What text to show the user?
    // e.g. "clients.csv (Row 12)" or "Email from Sarah"
    label: string; 
    
    // URL is optional for CSV (Frontend opens a modal instead)
    link?: string; 
    
    // The specific data used
    snippet: string; 
  }[];

  // 3. ARTIFACTS
  aiBriefHtml?: string;
  status: "New" | "In_Review" | "Action_Taken" | "Renewed";
  lastAiAnalysis: Date;
}

const RenewalWorkflowSchema = new Schema<IRenewalWorkflow>({
  brokerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  clientRefId: { type: Schema.Types.ObjectId, ref: "ClientRef", required: true },
  
  priorityScore: { type: Number, default: 0 },
  priorityCategory: { type: String, default: "Low" },
  reasonTags: [{ type: String }],
  
  isOverridden: { type: Boolean, default: false },
  overrideReason: String,
  
  citations: [{
    sourceType: { type: String, required: true },
    sourceId: { type: String, required: true },
    label: { type: String, required: true }, // NEW: Required for nice UI
    link: String,
    snippet: String
  }],
  
  aiBriefHtml: String,
  status: { type: String, default: "New" },
  lastAiAnalysis: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.RenewalWorkflow || mongoose.model<IRenewalWorkflow>("RenewalWorkflow", RenewalWorkflowSchema);