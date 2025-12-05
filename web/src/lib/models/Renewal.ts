import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Interfaces for Type Safety
export interface IReference {
  source_id: string;
  snippet: string;
  url: string;
}

export interface IRenewalAnalysis {
  score: number;
  rank: number;
  status: 'Critical' | 'High' | 'Medium' | 'Low';
  
  // The Executive Summary
  reasoning: string; 
  
  // The Structured Lists
  risk_factors: string[];
  positive_factors: string[];
  talking_points: string[];
  upsell_opportunity?: string;
  
  recommendedAction: string;
  keyReferences: IReference[];
  analyzedAt: Date;
}

export interface IRenewal extends Document {
  brokerId: string;
  clientId: string;
  clientName: string;
  email: string;
  company: string;
  policies: any[]; 
  totalPremium: number;
  renewalDate: string;
  aiAnalysis: IRenewalAnalysis;
  createdAt: Date;
}

// 2. Schema Definitions
const KeyReferenceSchema = new Schema({
  source_id: String,
  snippet: String,
  url: String
}, { _id: false });

const RenewalSchema = new Schema<IRenewal>({
  brokerId: { type: String, required: true, index: true },
  clientId: String,
  clientName: String,
  email: String,
  company: String,
  
  policies: [Schema.Types.Mixed], 

  aiAnalysis: {
    score: Number,
    rank: Number,
    status: { type: String, enum: ['Critical', 'High', 'Medium', 'Low'] },
    
    // Narrative Field
    reasoning: String, 
    
    // Rich List Fields
    risk_factors: [String],
    positive_factors: [String],
    talking_points: [String],
    upsell_opportunity: String,
    
    recommendedAction: String,
    keyReferences: [KeyReferenceSchema],
    analyzedAt: Date
  },

  totalPremium: Number,
  renewalDate: String,
  createdAt: { type: Date, default: Date.now }
});

// 3. Export
export default (mongoose.models.Renewal as Model<IRenewal>) || mongoose.model<IRenewal>("Renewal", RenewalSchema);