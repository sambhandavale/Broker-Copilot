import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClientRef extends Document {
  brokerId: Types.ObjectId;
  externalId: string; // e.g., "C-101" or "ROW-12"
  
  // METADATA
  name: string;
  email: string;
  carrier: string;
  policyNumber: string;
  premiumAmount: number;
  expiryDate: Date;
  
  // TRACKING SOURCE
  sourceSystem: "CSV" | "Salesforce" | "HubSpot";
  lastSyncedAt: Date;

  // NEW: Specific tracking for CSV uploads
  csvMetadata?: {
    originalFileName: string; // "Q4_Renewals.csv"
    rowIndex: number; // 12
    importedAt: Date;
  };
}

const ClientRefSchema = new Schema<IClientRef>({
  brokerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  externalId: { type: String, required: true },
  
  name: { type: String, required: true },
  email: { type: String, required: true },
  carrier: { type: String },
  policyNumber: { type: String },
  premiumAmount: { type: Number },
  expiryDate: { type: Date, required: true, index: true },
  
  sourceSystem: { type: String, default: "CSV" },
  lastSyncedAt: { type: Date, default: Date.now },

  // NEW: Field to satisfy "Source Traceability" for files
  csvMetadata: {
    originalFileName: String,
    rowIndex: Number,
    importedAt: Date
  }
}, { timestamps: true });

// Compound Index: Unique per broker + external ID
ClientRefSchema.index({ brokerId: 1, externalId: 1 }, { unique: true });

export default mongoose.models.ClientRef || mongoose.model<IClientRef>("ClientRef", ClientRefSchema);