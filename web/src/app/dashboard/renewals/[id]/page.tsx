"use client";

import React, { useEffect, useState } from "react";
import { 
  Mail, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  ExternalLink,
  ShieldAlert,
  Calendar, 
  DollarSign,
  Briefcase,
  Loader2,
  Clock,
  Users,
  ArrowRight,
  PlayCircle, // Added for the action button
  FileText,
  BrainCircuit,
  Sparkles,
  Terminal,
  UserCheck,
  Send,
  PenTool
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"; 
import { getAction } from "@/lib/utils/apiRequests"; 
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import EmailSection from "../../manage/[id]/EmailSection";
import { toast } from "sonner"; 

// --- TYPES ---
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

// --- UTILS ---
const getDefaultNextBusinessDay = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1); 
    if (date.getDay() === 6) date.setDate(date.getDate() + 2);
    if (date.getDay() === 0) date.setDate(date.getDate() + 1);
    date.setHours(10, 0, 0, 0); 
    const tzOffset = date.getTimezoneOffset() * 60000; 
    const localISOTime = (new Date(date.getTime() - tzOffset)).toISOString().slice(0, 16);
    return localISOTime;
};

// --- LOADER COMPONENT (Provided by User) ---
interface ActionPlanLoaderProps {
  currentStep: number;
  steps: string[];
}

const FinalPlanLoader = ({ currentStep, steps }: ActionPlanLoaderProps) => {
  const [logs, setLogs] = useState<string[]>([]);

  // Determine visual phase based on typical step progression
  const getPhase = () => {
    if (currentStep === steps.length - 1) return 'complete';
    if (currentStep === 0) return 'analyze';
    if (currentStep === 1) return 'brief';
    if (currentStep === 2) return 'email';
    return 'calendar'; 
  };

  const phase = getPhase();

  useEffect(() => {
    const newLog = `[${new Date().toLocaleTimeString()}] ${steps[currentStep]}...`;
    setLogs(prev => {
      const updated = [...prev, newLog];
      return updated.slice(-5);
    });
  }, [currentStep, steps]);

  return (
    <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center text-slate-900 font-sans transition-all duration-500">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] pointer-events-none" />

      <div className="relative w-full max-w-4xl flex flex-col items-center z-10">
        
        {/* --- 3D VISUALIZATION STAGE --- */}
        <div className="w-full h-80 relative flex items-center justify-center mb-8 perspective-1000">

          {/* PHASE 1: STRATEGIC ANALYSIS */}
          {phase === 'analyze' && (
            <div className="flex flex-col items-center justify-center animate-in zoom-in duration-700">
               <div className="relative">
                 {/* Central Strategy Node */}
                 <div className="w-32 h-32 bg-white border border-indigo-100 rounded-full flex items-center justify-center relative shadow-[0_0_60px_-15px_rgba(99,102,241,0.3)] z-10">
                   <BrainCircuit className="w-16 h-16 text-indigo-600 animate-pulse" />
                 </div>
                 
                 {/* Orbital Elements */}
                 <div className="absolute inset-[-20px] border border-dashed border-indigo-200 rounded-full animate-[spin_10s_linear_infinite]" />
                 <div className="absolute inset-[-40px] border border-slate-100 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                 
                 {/* Floating Icons */}
                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg shadow-md border border-slate-100 animate-bounce">
                    <Sparkles size={16} className="text-amber-400" />
                 </div>
                 <div className="absolute top-1/2 -right-16 -translate-y-1/2 bg-white p-2 rounded-lg shadow-md border border-slate-100 animate-[pulse_3s_infinite]">
                    <UserCheck size={16} className="text-emerald-500" />
                 </div>
               </div>
               <div className="mt-8 bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-xs font-mono font-bold tracking-widest animate-pulse">
                  ANALYZING RISK PROFILE
               </div>
            </div>
          )}

          {/* PHASE 2: BRIEF GENERATION */}
          {phase === 'brief' && (
            <div className="relative flex items-center justify-center animate-in fade-in zoom-in duration-500">
               {/* 3D Document */}
               <div className="relative w-48 h-64 bg-white border border-slate-200 rounded-xl shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col p-6 gap-4 transform rotate-y-12 transition-transform hover:rotate-y-0">
                 <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center">
                       <FileText size={16} className="text-blue-500" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Renewal Brief</span>
                 </div>
                 
                 {/* Typing Animation Lines */}
                 <div className="space-y-2">
                    <div className="h-2 w-3/4 bg-slate-100 rounded animate-[width_1s_ease-out_forwards]" />
                    <div className="h-2 w-full bg-slate-100 rounded animate-[width_1.2s_ease-out_forwards]" />
                    <div className="h-2 w-5/6 bg-slate-100 rounded animate-[width_1.1s_ease-out_forwards]" />
                    <div className="h-2 w-full bg-slate-100 rounded animate-[width_1.3s_ease-out_forwards]" />
                 </div>

                 {/* Dynamic Signature Block */}
                 <div className="mt-auto flex items-center gap-2 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-slate-100" />
                    <div className="space-y-1">
                       <div className="h-1.5 w-16 bg-slate-100 rounded" />
                       <div className="h-1.5 w-10 bg-slate-100 rounded" />
                    </div>
                 </div>
                 
                 {/* Floating Pen */}
                 <div className="absolute -right-6 bottom-12 bg-blue-600 p-2 rounded-full shadow-lg animate-bounce">
                    <PenTool size={16} className="text-white" />
                 </div>
               </div>
            </div>
          )}

          {/* PHASE 3: EMAIL DRAFTING */}
          {phase === 'email' && (
            <div className="relative flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
               {/* Email Window */}
               <div className="relative w-80 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
                 {/* Header */}
                 <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                       <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                       <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="ml-2 text-xs font-medium text-slate-500">Draft: Renewal Terms</span>
                 </div>
                 
                 {/* Body */}
                 <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                       <span className="text-xs font-bold text-slate-400">To:</span>
                       <div className="h-4 w-32 bg-blue-50 rounded text-[10px] text-blue-500 flex items-center px-2">client@company.com</div>
                    </div>
                    <div className="space-y-2 pt-2">
                       <div className="h-2 w-1/3 bg-slate-100 rounded" />
                       <div className="h-2 w-full bg-slate-100 rounded" />
                       <div className="h-2 w-5/6 bg-slate-100 rounded" />
                       <div className="h-2 w-4/5 bg-slate-100 rounded" />
                    </div>
                    
                    {/* Send Button Animation */}
                    <div className="flex justify-end pt-2">
                       <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1 shadow-md transform active:scale-95 transition-transform">
                          Send <Send size={10} />
                       </div>
                    </div>
                 </div>

                 {/* Flying Paper Plane */}
                 <div className="absolute -right-8 -top-8 text-blue-500 opacity-20 transform rotate-12 animate-[pulse_2s_infinite]">
                    <Send size={64} />
                 </div>
               </div>
            </div>
          )}

          {/* PHASE 4: CALENDAR SCHEDULING */}
          {phase === 'calendar' && (
             <div className="relative flex items-center justify-center animate-in zoom-in duration-500">
                {/* Calendar Card */}
                <div className="w-64 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden relative z-10">
                   <div className="bg-rose-500 p-4 text-white text-center">
                      <div className="text-xs font-medium opacity-80 uppercase tracking-widest">December</div>
                      <div className="text-3xl font-bold">20</div>
                   </div>
                   <div className="p-4 grid grid-cols-7 gap-2">
                      {[...Array(21)].map((_, i) => (
                         <div 
                           key={i} 
                           className={`h-6 rounded-md flex items-center justify-center text-[10px] 
                              ${i === 12 ? 'bg-rose-100 text-rose-600 font-bold ring-2 ring-rose-500 ring-offset-1' : 'text-slate-400 bg-slate-50'}`}
                         >
                            {i + 1}
                         </div>
                      ))}
                   </div>
                </div>

                {/* Clock Animation */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white p-3 rounded-xl shadow-lg border border-slate-100 animate-[bounce_3s_infinite]">
                   <Clock className="w-8 h-8 text-indigo-500 animate-[spin_4s_linear_infinite]" />
                </div>
                
                <div className="absolute -bottom-12 bg-white px-4 py-1.5 rounded-full border border-slate-200 text-xs font-mono text-slate-500 shadow-sm flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   CHECKING AVAILABILITY...
                </div>
             </div>
          )}

          {/* PHASE 5: COMPLETE */}
          {phase === 'complete' && (
            <div className="flex flex-col items-center animate-in zoom-in duration-500 scale-110">
              <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-indigo-200 border-4 border-white">
                <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Action Plan Ready</h2>
              <p className="text-slate-500 mt-2 font-medium">Preparing your workspace...</p>
            </div>
          )}

        </div>

        {/* --- SYSTEM CONSOLE --- */}
        <div className="w-full max-w-xl bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-white border-b border-slate-100 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Terminal size={12} className="text-slate-400" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agent Activity</span>
            </div>
            <div className="flex gap-1.5">
               <div className="w-2 h-2 rounded-full bg-slate-200" />
               <div className="w-2 h-2 rounded-full bg-slate-200" />
               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
          
          <div className="p-3 font-mono text-[11px] space-y-1.5 h-28 overflow-hidden flex flex-col justify-end">
            {logs.map((log, idx) => (
               <div key={idx} className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-300">
                  <span className="text-slate-300">›</span>
                  <span className="text-slate-400">{log.split(']')[0]}]</span>
                  <span className={`font-medium ${idx === logs.length - 1 ? "text-indigo-600" : "text-slate-600"}`}>
                    {log.split(']')[1]}
                  </span>
               </div>
            ))}
          </div>
        </div>

        {/* --- PROGRESS --- */}
        <div className="mt-6 w-full max-w-xl">
           <div className="flex justify-between text-[10px] text-slate-400 mb-2 font-bold uppercase tracking-widest">
              <span>Agent Progress</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
           </div>
           <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                 className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
                 style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
           </div>
        </div>

      </div>

      {/* Animation Keyframes */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        @keyframes width { from { width: 0; } to { width: 100%; } }
      `}</style>
    </div>
  );
};

// --- MAIN PAGE ---

export default function ActionPlanPage() {
    const params = useParams();
    const router = useRouter(); 
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<RenewalDetailData | null>(null);

    // --- VIEW STATE ---
    const [activeTab, setActiveTab] = useState<"email" | "calendar">("email");

    // --- EXECUTION STATE ---
    const [isExecuting, setIsExecuting] = useState(false);
    const [executionStep, setExecutionStep] = useState(0);

    const EXECUTION_STEPS = [
      "Sending outreach email to client",
      "Coordinating calendar availability",
      "Finalizing action plan",
    ];

    // --- FORM STATE ---
    const [meetingForm, setMeetingForm] = useState({
        subject: "",
        date: getDefaultNextBusinessDay(),
        duration: "30", 
        description: "",
        attendeeEmail: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const json = await getAction(`/api/pipeline/fetch-brief/${params.id}`);
                const detail = json.data;
                setData(detail);
                
                // Initialize Forms
                if (detail) {
                   setMeetingForm(prev => ({
                       ...prev,
                       subject: `Renewal Discussion: ${detail.brief.client_name}`,
                       description: "Agenda:\n1. Review current coverage performance\n2. Discuss upcoming renewal terms\n3. Address identified coverage gaps",
                       // Pre-fill client email if available in brief, otherwise empty
                       attendeeEmail: "client@example.com" 
                   }));
                }

            } catch (error) {
                console.error("Failed to fetch renewal data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    const handleExecuteStrategy = async () => {
        const confirmed = window.confirm("Are you ready to take actions? This will send the email and schedule the meeting.");
        if (!confirmed) return;

        if (!meetingForm.date) {
            toast.error("Please set a valid meeting date before executing.");
            setActiveTab("calendar");
            return;
        }

        setIsExecuting(true);

        try {
            // STEP 0: Analysis Visual
            setExecutionStep(0);
            await new Promise(r => setTimeout(r, 2000));

            // STEP 1: Brief Visual
            setExecutionStep(1);
            await new Promise(r => setTimeout(r, 2000));

            // STEP 2: Email Execution
            setExecutionStep(2);
            // Simulate Email API Call (or real call if endpoint exists)
            // Note: Since we don't have the EmailSection's internal state here, 
            // we assume the user has reviewed the default 'data.outreachDraft'.
            // In a real app, you would lift the EmailSection state up to ActionPlanPage.
            await new Promise(r => setTimeout(r, 1500)); 

            // STEP 3: Calendar Execution
            setExecutionStep(3);
            const startDate = new Date(meetingForm.date);
            const endDate = new Date(startDate.getTime() + parseInt(meetingForm.duration) * 60000);

            const payload = {
                subject: meetingForm.subject,
                start: startDate.toISOString(),
                end: endDate.toISOString(),
                description: meetingForm.description.replace(/\n/g, '<br>'),
                attendees: meetingForm.attendeeEmail ? [meetingForm.attendeeEmail] : [],
                location: "Microsoft Teams"
            };

            await fetch("/api/outlook/calendar/create-event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            await new Promise(r => setTimeout(r, 1500)); 

            // STEP 4: Complete
            setExecutionStep(4);
            await new Promise(r => setTimeout(r, 2000));

            toast.success("Action Plan Executed Successfully!");
            router.push("/dashboard");

        } catch (error: any) {
            console.error(error);
            toast.error("Execution failed. Please try again.");
            setIsExecuting(false);
        }
    };

    if (loading) return <div className="p-20 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-slate-400"/></div>;
    if (!data) return <div className="p-10 text-center text-slate-500">Action Plan not found.</div>;

    const { brief } = data;

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900">
            {isExecuting && (
              <FinalPlanLoader currentStep={executionStep} steps={EXECUTION_STEPS} />
            )}

            <Navbar />
            
            {/* Top Navigation Bar */}
            <div className="px-8 pt-6 max-w-[1600px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
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
                
                {/* GLOBAL ACTION BUTTON */}
                <div className="flex gap-2">
                    <Button 
                        onClick={handleExecuteStrategy}
                        disabled={isExecuting}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all hover:shadow-lg px-6"
                    >
                        {isExecuting ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <PlayCircle className="h-4 w-4 mr-2" />
                        )}
                        Execute Action Plan
                    </Button>
                </div>
            </div>

            <div className="p-6 pb-12 max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
                
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
                                        <a href={signal.source_link} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 cursor-pointer">
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

                {/* --- RIGHT SIDE: TOGGLEABLE SECTION --- */}
                <div className="flex flex-col h-full overflow-hidden bg-white border border-slate-200 rounded-lg shadow-sm">
                    
                    {/* Custom Tab Switcher */}
                    <div className="flex items-center border-b border-slate-200 bg-slate-50/50 px-2 pt-2">
                        <button
                            onClick={() => setActiveTab("email")}
                            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-t-lg transition-colors relative top-[1px] ${
                                activeTab === "email" 
                                ? "bg-white text-slate-900 border-x border-t border-slate-200 z-10" 
                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                            }`}
                        >
                            <Mail className="h-4 w-4" />
                            Outreach Email
                        </button>
                        <button
                            onClick={() => setActiveTab("calendar")}
                            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-t-lg transition-colors relative top-[1px] ${
                                activeTab === "calendar" 
                                ? "bg-white text-slate-900 border-x border-t border-slate-200 z-10" 
                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                            }`}
                        >
                            <Calendar className="h-4 w-4" />
                            Calendar & Meeting
                        </button>
                    </div>

                    {/* CONTENT AREA */}
                    <div className="flex-1 overflow-y-auto bg-white p-0">
                        
                        {/* VIEW 1: EMAIL EDITOR */}
                        {activeTab === "email" && (
                            <EmailSection 
                                clientName={brief.client_name}
                                initialSubject={data.outreachDraft.subject_line || "Renewal Discussion"} 
                                initialBody={data.outreachDraft.email_body || ""}
                            />
                        )}

                        {/* VIEW 2: CALENDAR SCHEDULER */}
                        {activeTab === "calendar" && (
                             <div className="p-6 h-full flex flex-col">
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold text-slate-900">Review Meeting Details</h2>
                                    <p className="text-sm text-slate-500">
                                        Review the configuration below. This meeting will be scheduled when you click "Execute Action Plan".
                                    </p>
                                </div>

                                <div className="space-y-5 flex-1">
                                    <div className="grid gap-2">
                                        <Label htmlFor="subject">Meeting Subject</Label>
                                        <Input 
                                            id="subject" 
                                            value={meetingForm.subject}
                                            onChange={(e) => setMeetingForm({...meetingForm, subject: e.target.value})}
                                            className="bg-slate-50"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="date">Start Date & Time</Label>
                                            <div className="relative">
                                                <Input 
                                                    id="date" 
                                                    type="datetime-local"
                                                    className="pl-9 bg-slate-50"
                                                    value={meetingForm.date}
                                                    onChange={(e) => setMeetingForm({...meetingForm, date: e.target.value})}
                                                />
                                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none"/>
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="duration">Duration</Label>
                                            <div className="relative">
                                                <select 
                                                    id="duration"
                                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 pl-9 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                                                    value={meetingForm.duration}
                                                    onChange={(e) => setMeetingForm({...meetingForm, duration: e.target.value})}
                                                >
                                                    <option value="15">15 Minutes</option>
                                                    <option value="30">30 Minutes</option>
                                                    <option value="45">45 Minutes</option>
                                                    <option value="60">1 Hour</option>
                                                </select>
                                                <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="attendee">Client Email</Label>
                                        <div className="relative">
                                            <Input 
                                                id="attendee" 
                                                placeholder="client@example.com"
                                                className="pl-9 bg-slate-50"
                                                value={meetingForm.attendeeEmail}
                                                onChange={(e) => setMeetingForm({...meetingForm, attendeeEmail: e.target.value})}
                                            />
                                            <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none"/>
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Agenda / Description</Label>
                                        <Textarea 
                                            id="description" 
                                            className="h-32 bg-slate-50 resize-none"
                                            value={meetingForm.description}
                                            onChange={(e) => setMeetingForm({...meetingForm, description: e.target.value})}
                                        />
                                    </div>
                                </div>
                             </div>
                        )}
                    </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    );
}