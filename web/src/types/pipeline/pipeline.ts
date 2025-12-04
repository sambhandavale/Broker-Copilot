// 1. The Raw Row from your CSV File
export interface CsvPolicyRow {
  client_id: string;
  client_name: string;
  email: string;
  phone: string;
  company: string;
  accountManager: string;
  policyNumber: string;
  carrier: string;
  type: string;
  startDate: string;
  endDate: string;
  premium: string;
  status: string;
  claimsCount: string;
  sourceSystem: string;
  sourceUrl: string;
}

// 2. The Final Unified Structure for the AI Agent
export interface UnifiedClientContext {
  id: string; // Internal Workflow ID
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    accountManager: string;
  };
  // We keep ALL policies for context, but mark the urgent ones
  policies: {
    policyNumber: string;
    carrier: string;
    type: string;
    expiryDate: string;
    premium: number;
    status: string;
    claimsCount: number;
    isDueForRenewal: boolean; // <--- Vital for the AI
  }[];
  emails: {
    id: string;
    subject: string;
    bodyPreview: string;
    receivedDateTime: string;
    webLink: string;
    isUrgent: boolean;
  }[];
  metadata: {
    sourceSystem: string;
    sourceUrl: string;
  };
}