import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  BrainCircuit, 
  Sparkles,
  Terminal,
  Clock,
  UserCheck,
  Send,
  PenTool
} from 'lucide-react';

interface ActionPlanLoaderProps {
  currentStep: number;
  steps: string[];
}

export const ActionPlanLoader = ({ currentStep, steps }: ActionPlanLoaderProps) => {
  const [logs, setLogs] = useState<string[]>([]);

  // Determine visual phase based on typical step progression
  // 0: Analysis -> 1: Brief -> 2: Email -> 3: Calendar -> Last: Complete
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