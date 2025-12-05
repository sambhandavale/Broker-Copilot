"use client";

import React, { useEffect, useState } from "react";
// REMOVED: import { useParams, useRouter } from "next/navigation"; 
import { 
  ArrowLeft, 
  Mail, 
  Copy, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  ExternalLink,
  ShieldAlert,
  Calendar,
  DollarSign,
  Briefcase,
  Loader2,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { getAction } from "@/lib/utils/apiRequests";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import EmailSection from "../../manage/[id]/EmailSection";
// REMOVED: import { toast } from "sonner"; 

// --- Interfaces based on your JSON Document ---

interface FinancialSnapshot {
  total_annual_premium: number;
  primary_carrier: string;
  days_to_expiry: number | string;
  renewal_urgency: string;
}

interface Signal {
  signal_type: string;
  description: string;
  source_system: string;
  source_reference: string;
  source_link: string;
  impact: "Positive" | "Negative" | "Neutral";
}

interface ActionItem {
  step: number;
  action: string;
  detail: string;
  tool_link: string | null;
}

interface CoverageGapAnalysis {
  current_coverage: string[];
  identified_gaps: string[];
  upsell_talking_point: string;
}

interface Brief {
  client_id: string;
  client_name: string;
  brief_generated_at: string;
  executive_summary: string;
  financial_snapshot: FinancialSnapshot;
  key_signals: Signal[];
  coverage_gap_analysis: CoverageGapAnalysis;
  action_plan: {
    suggested_actions: ActionItem[];
  };
}

interface OutreachDraft {
  template_used: string;
  subject_line: string;
  email_body: string;
  is_editable: boolean;
}

interface RenewalDetailData {
  _id: string;
  brief: Brief;
  outreachDraft: OutreachDraft;
}

export default function ActionPlanPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<RenewalDetailData | null>(null);

    // Email Editor State
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const json = await getAction(`/api/pipeline/fetch-brief/${params.id}`);

                const detail = json.data;
                setData(detail);
                
                // Initialize Email State from JSON
                if (detail.outreachDraft) {
                setSubject(detail.outreachDraft.subject_line);
                setBody(detail.outreachDraft.email_body);
                }
            } catch (error) {
                console.error("Failed to fetch renewal data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    if (loading) return <ActionPlanSkeleton />;
    if (!data) return <div className="p-10 text-center text-slate-500">Action Plan not found.</div>;

    const { brief } = data;

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900">
            <Navbar />
            {/* Top Navigation Bar */}
            <div className="px-8 pt-6 max-w-[1600px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                {/* <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-white">
                    <ArrowLeft className="h-5 w-5 text-slate-600" />
                </Button> */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    {brief.client_name}
                    <Badge 
                        variant="outline" 
                        className={`text-sm px-2.5 py-0.5 border-none ${
                        brief.financial_snapshot.renewal_urgency === 'High' 
                            ? 'bg-red-100 text-red-700' 
                            : brief.financial_snapshot.renewal_urgency === 'Medium'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                    >
                        {brief.financial_snapshot.renewal_urgency} Urgency
                    </Badge>
                    </h1>
                    <p className="text-sm text-slate-500">AI-Generated Renewal Brief • {new Date(brief.brief_generated_at).toLocaleDateString()}</p>
                </div>
                </div>
                <div className="flex gap-2">
                {/* Add global actions here if needed */}
                </div>
            </div>

            <div className="p-6 pb-12 max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-0px)]">
                
                {/* --- LEFT SIDE: THE BRIEF (Scrollable) --- */}
                <div className="space-y-6 overflow-y-auto pr-2 pb-10 scrollbar-hide">
                
                {/* 1. Executive Summary */}
                <Card className="border-slate-200 shadow-sm bg-white">
                    <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
                        <CardTitle className="text-lg">Executive Summary</CardTitle>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <p className="text-slate-700 leading-relaxed text-base">
                        {brief.executive_summary}
                    </p>
                    
                    {/* Financial Chips */}
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                            <DollarSign className="h-3.5 w-3.5" /> Premium
                        </div>
                        <div className="font-mono font-semibold text-slate-900 text-lg">
                            ${brief.financial_snapshot.total_annual_premium.toLocaleString()}
                        </div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                            <Calendar className="h-3.5 w-3.5" /> Expires In
                        </div>
                        <div className="font-mono font-semibold text-slate-900 text-lg">
                            {brief.financial_snapshot.days_to_expiry} Days
                        </div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                            <Briefcase className="h-3.5 w-3.5" /> Carrier
                        </div>
                        <div className="font-medium text-slate-900 truncate text-lg">
                            {brief.financial_snapshot.primary_carrier}
                        </div>
                        </div>
                    </div>
                    </CardContent>
                </Card>

                {/* 2. Key Signals */}
                <Card className="border-slate-200 shadow-sm bg-white">
                    <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Key Signals</CardTitle>
                    <CardDescription>Events & data points driving the strategy</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                    {brief.key_signals.map((signal, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-md bg-slate-50 border border-slate-100">
                        <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                            signal.impact === 'Negative' ? 'bg-red-500' : 
                            signal.impact === 'Positive' ? 'bg-green-500' : 'bg-slate-400'
                        }`} />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{signal.signal_type}</span>
                            {signal.source_link && (
                                signal.source_link !== "N/A" ? (
                                    <a
                                    href={signal.source_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                    >
                                    <ExternalLink className="h-3 w-3" />
                                    </a>
                                ) : (
                                    <span className="text-gray-400 blur-[0.5px] inline-flex">
                                    <ExternalLink className="h-3 w-3" />
                                    </span>
                                )
                            )}

                            </div>
                            <p className="text-sm text-slate-900 font-medium leading-snug">{signal.description}</p>
                            <p className="text-xs text-slate-500 mt-1">Source: {signal.source_system} • Ref: {signal.source_reference}</p>
                        </div>
                        </div>
                    ))}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 3. Coverage Gaps */}
                    <Card className="border-red-100 bg-red-50/30 shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-red-700">
                        <ShieldAlert className="h-5 w-5" />
                        <CardTitle className="text-base">Coverage Gaps</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-2">
                        {brief.coverage_gap_analysis.identified_gaps.map((gap, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-red-900 bg-red-100/50 p-2 rounded">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                            <span className="font-medium">{gap}</span>
                            </div>
                        ))}
                        </div>
                        <div className="pt-3 border-t border-red-200 mt-2">
                        <p className="text-xs font-bold text-red-600 uppercase mb-1 flex items-center gap-1">
                            <Zap className="h-3 w-3" /> Upsell Pitch
                        </p>
                        <p className="text-sm text-slate-700 italic leading-relaxed">
                            "{brief.coverage_gap_analysis.upsell_talking_point}"
                        </p>
                        </div>
                    </CardContent>
                    </Card>

                    {/* 4. Action Plan */}
                    <Card className="border-slate-200 shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="h-5 w-5" />
                        <CardTitle className="text-base">Next Steps</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-0 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-3.5 top-2 bottom-4 w-px bg-slate-200" />
                        
                        {brief.action_plan.suggested_actions.map((action, i) => (
                            <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                            <div className="h-7 w-7 rounded-full bg-white border-2 border-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-sm">
                                {action.step}
                            </div>
                            <div className="pt-0.5">
                                <p className="font-semibold text-slate-900 text-sm">{action.action}</p>
                                <p className="text-sm text-slate-500 mt-0.5 leading-snug">{action.detail}</p>
                            </div>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                    </Card>
                </div>
                </div>

                <div className="flex flex-col h-full overflow-hidden">
                    <EmailSection 
                        clientName={brief.client_name}
                        initialSubject={data.outreachDraft.subject_line || "Renewal Discussion"} 
                        initialBody={data.outreachDraft.email_body || ""}
                    />
                </div>


                {/* <div className="flex flex-col h-full overflow-hidden">
                <Card className="border-blue-200 shadow-md flex flex-col h-full overflow-hidden bg-white ring-1 ring-blue-100">
                    <div className="bg-blue-50/50 p-4 border-b border-blue-100 shrink-0">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100 rounded-md">
                            <Mail className="h-4 w-4 text-blue-700" />
                        </div>
                        <h3 className="font-semibold text-blue-900">Draft Outreach</h3>
                        </div>
                        <Badge className="bg-white text-blue-700 border border-blue-200 shadow-sm hover:bg-blue-50">
                        {data.outreachDraft.template_used}
                        </Badge>
                    </div>
                    <p className="text-xs text-blue-600/80 font-medium">
                        AI-generated draft based on the analysis. Review before sending.
                    </p>
                    </div>

                    <CardContent className="flex-1 p-0 flex flex-col min-h-0">
                    <div className="p-4 border-b border-slate-100 space-y-3 bg-white shrink-0">
                        <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject Line</label>
                        <Input 
                            value={subject} 
                            onChange={(e) => setSubject(e.target.value)} 
                            className="font-medium text-slate-900 border-slate-200 focus-visible:ring-blue-500"
                        />
                        </div>
                    </div>
                    
                    <div className="flex-1 p-4 bg-slate-50/30 flex flex-col min-h-0">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Body</label>
                        <Textarea 
                        value={body} 
                        onChange={(e) => setBody(e.target.value)} 
                        className="flex-1 resize-none font-sans text-base leading-relaxed p-4 border-slate-200 focus-visible:ring-blue-500 bg-white"
                        />
                    </div>
                    </CardContent>

                    <div className="p-4 bg-white border-t border-slate-100 flex gap-3 shrink-0 items-center justify-between">
                    <div className="text-xs text-slate-400 italic">
                        {data.outreachDraft.is_editable ? "Editable Draft" : "Read-only"}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopyToClipboard} className="text-slate-600">
                        <Copy className="mr-2 h-3.5 w-3.5" /> Copy Text
                        </Button>
                        <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200" 
                        onClick={handleOpenMailClient}
                        >
                        <Send className="mr-2 h-3.5 w-3.5" /> Open in Outlook
                        </Button>
                    </div>
                    </div>
                </Card>
                </div> */}

            </div>
            <Footer/>
        </div>
    );
}

// --- Loading State ---
function ActionPlanSkeleton() {
  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
           <Skeleton className="h-8 w-64" />
           <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <div className="grid grid-cols-2 gap-6">
             <Skeleton className="h-48 w-full rounded-xl" />
             <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        </div>
        <div className="">
          <Skeleton className="h-[600px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}