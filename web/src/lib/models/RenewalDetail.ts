import mongoose, { Schema, Document, Model } from "mongoose";

// --- Sub-Schemas for Brief Sections ---

const FinancialSnapshotSchema = new Schema({
  total_annual_premium: Number,
  primary_carrier: String,
  days_to_expiry: Number,
  renewal_urgency: String,
}, { _id: false });

const SignalSchema = new Schema({
  signal_type: String,
  description: String,
  source_system: String,
  source_reference: String,
  source_link: String,
  impact: String,
}, { _id: false });

const ActionItemSchema = new Schema({
  step: Number,
  action: String,
  detail: String,
  tool_link: String,
}, { _id: false });

const CoverageGapSchema = new Schema({
  current_coverage: [String],
  identified_gaps: [String],
  upsell_talking_point: String,
}, { _id: false });

// --- Main Brief Schema ---

const BriefSchema = new Schema({
  client_id: String,
  client_name: String,
  brief_generated_at: String,
  executive_summary: String,
  financial_snapshot: FinancialSnapshotSchema,
  key_signals: [SignalSchema],
  coverage_gap_analysis: CoverageGapSchema,
  action_plan: {
    suggested_actions: [ActionItemSchema]
  }
}, { _id: false });

// --- Email Draft Schema ---

const EmailDraftSchema = new Schema({
  template_used: String,
  subject_line: String,
  email_body: String,
  is_editable: { type: Boolean, default: true }
}, { _id: false });

// --- Main Document Schema ---

export interface IRenewalDetail extends Document {
  renewalId: mongoose.Types.ObjectId; // Link to the parent Renewal record
  brokerId: string;
  brief: any; // Using 'any' for TS convenience, but validated by Schema above
  outreachDraft: any; 
  createdAt: Date;
  updatedAt: Date;
}

const RenewalDetailSchema = new Schema<IRenewalDetail>(
  {
    renewalId: { type: Schema.Types.ObjectId, ref: "Renewal", required: true, unique: true },
    brokerId: { type: String, required: true },
    brief: BriefSchema,
    outreachDraft: EmailDraftSchema,
  },
  { timestamps: true }
);

// Prevent model overwrite in hot-reload
const RenewalDetail: Model<IRenewalDetail> = mongoose.models.RenewalDetail || mongoose.model<IRenewalDetail>("RenewalDetail", RenewalDetailSchema);

export default RenewalDetail;