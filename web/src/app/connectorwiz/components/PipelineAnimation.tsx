import React, { useEffect, useState, useRef } from 'react';
import { 
  FileSpreadsheet, 
  FileJson, 
  Mail, 
  Search, 
  Brain, 
  CheckCircle2, 
  Loader2, 
  Server, 
  Terminal,
  Database,
  Globe
} from 'lucide-react';

interface PipelineLoaderProps {
  currentStep: number;
  steps: string[];
}

export const PipelineLoader = ({ currentStep, steps }: PipelineLoaderProps) => {
  const [logs, setLogs] = useState<string[]>([]);

  // Derive visual phase. 
  // 'complete' only triggers on the absolute last step index.
  const getPhase = () => {
    if (currentStep === steps.length - 1) return 'complete'; 
    if (currentStep === 0) return 'ingest';      // CSV -> JSON
    if (currentStep <= 2) return 'enrich';       // Fetching/Attaching Emails
    return 'analyze';                            // AI Scoring (Intermediate steps)
  };

  const phase = getPhase();

  // Simulated System Logs
  useEffect(() => {
    const newLog = `[${new Date().toLocaleTimeString()}] ${steps[currentStep]}...`;
    setLogs(prev => {
      const updated = [...prev, newLog];
      return updated.slice(-5); // Keep last 5 logs
    });
  }, [currentStep, steps]);

  return (
    <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-2xl flex flex-col items-center justify-center text-slate-900 font-sans transition-all duration-500">
      
      {/* Subtle Technical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 pointer-events-none" />
      
      {/* Vignette for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] pointer-events-none" />

      <div className="relative w-full max-w-4xl flex flex-col items-center z-10">
        
        {/* --- MAIN 3D VISUALIZATION STAGE --- */}
        <div className="w-full h-96 relative flex items-center justify-center mb-6 perspective-1000">
          
          {/* PHASE 1: INGESTION (CSV -> JSON) */}
          {phase === 'ingest' && (
            <div className="relative flex items-center gap-16 animate-in fade-in zoom-in duration-700">
              
              {/* 3D CSV Card */}
              <div className="relative w-36 h-48 bg-white border border-slate-200 rounded-lg flex flex-col p-3 gap-2 transform rotate-y-12 rotate-x-6 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.1)] transition-transform hover:rotate-y-0">
                <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">SOURCE.CSV</div>
                {/* Simulated Rows */}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="h-1.5 w-1/3 bg-slate-100 rounded" />
                    <div className="h-1.5 w-2/3 bg-emerald-50/80 rounded animate-pulse" style={{ animationDelay: `${i * 100}ms`}} />
                  </div>
                ))}
                <FileSpreadsheet className="absolute bottom-3 right-3 text-emerald-500/20" size={40} />
              </div>

              {/* Transformation Beam */}
              <div className="relative w-32 flex flex-col items-center justify-center gap-3">
                 <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" />
                 <div className="bg-white p-2 rounded-full shadow-md border border-blue-100 animate-spin">
                    <Loader2 className="w-5 h-5 text-blue-600" />
                 </div>
                 <span className="text-[10px] text-blue-600 font-mono font-bold tracking-widest uppercase bg-blue-50 px-2 py-0.5 rounded">
                    Serializing
                 </span>
              </div>

              {/* 3D JSON Card */}
              <div className="relative w-36 h-48 bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-[9px] text-slate-300 leading-tight shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.2)] transform -rotate-y-12 overflow-hidden">
                <div className="absolute -top-3 -left-3 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-20">DATA.JSON</div>
                <div className="opacity-90 z-10 relative">
                  <span className="text-purple-400">{`{`}</span> <br/>
                  &nbsp;&nbsp;<span className="text-blue-400">"id"</span>: <span className="text-orange-400">"C-101"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-blue-400">"rev"</span>: <span className="text-orange-400">2.5M</span>,<br/>
                  &nbsp;&nbsp;<span className="text-blue-400">"emp"</span>: <span className="text-orange-400">450</span>,<br/>
                  &nbsp;&nbsp;<span className="text-blue-400">"status"</span>: <span className="text-green-400">"Active"</span><br/>
                  <span className="text-purple-400">{`}`}</span>
                </div>
                {/* Code Scan Line */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-[scan_2s_linear_infinite]" />
                <FileJson className="absolute bottom-3 right-3 text-white/10" size={40} />
              </div>
            </div>
          )}

          {/* PHASE 2: ENRICHMENT (Outlook/Graph API) */}
          {phase === 'enrich' && (
            <div className="relative w-full max-w-lg h-full flex items-center justify-center animate-in fade-in duration-500">
              
              {/* Central Server Node */}
              <div className="z-10 w-32 h-32 bg-white rounded-full border border-slate-100 shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-blue-50/50 rounded-full animate-pulse" />
                <Database className="text-blue-600 w-12 h-12 relative z-10" />
                
                {/* Orbital Rings */}
                <div className="absolute inset-[-15px] border border-blue-100 rounded-full animate-[spin_8s_linear_infinite]" />
                <div className="absolute inset-[-30px] border border-slate-100 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
                
                {/* Satellite Nodes */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white p-2 rounded-xl shadow-lg border border-slate-100 animate-bounce">
                    <Globe size={16} className="text-slate-400" />
                </div>
              </div>

              {/* Data Packets (Emails) */}
              <div className="absolute inset-0 pointer-events-none">
                 {/* Left Packet */}
                 <div className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center gap-3 animate-[slideRight_2s_ease-in-out_infinite]">
                    <div className="bg-white p-2.5 rounded-lg shadow-lg border border-indigo-50 flex items-center gap-2">
                        <Mail size={16} className="text-indigo-500" />
                        <div className="w-16 h-2 bg-indigo-50 rounded-full" />
                    </div>
                 </div>

                 {/* Right Packet */}
                 <div className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center gap-3 animate-[slideLeft_2s_ease-in-out_infinite] animation-delay-500">
                    <div className="bg-white p-2.5 rounded-lg shadow-lg border border-sky-50 flex items-center gap-2">
                        <Mail size={16} className="text-sky-500" />
                        <div className="w-12 h-2 bg-sky-50 rounded-full" />
                    </div>
                 </div>
              </div>

              <div className="absolute bottom-4 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full border border-slate-200 text-xs font-mono text-slate-500 flex items-center gap-2 shadow-sm">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 GRAPH API CONNECTION ESTABLISHED
              </div>
            </div>
          )}

          {/* PHASE 3: AI SCORING (Reasoning) */}
          {phase === 'analyze' && (
            <div className="flex flex-col items-center justify-center animate-in zoom-in duration-500 gap-8">
               <div className="relative group">
                  {/* The Brain Chip */}
                  <div className="w-40 h-40 bg-white border border-slate-100 rounded-2xl flex items-center justify-center relative shadow-[0_20px_50px_-12px_rgba(124,58,237,0.15)] transition-all duration-500">
                    <Brain className="w-20 h-20 text-slate-800 relative z-10" strokeWidth={1.5} />
                    
                    {/* Neural Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-50 to-blue-50 rounded-2xl opacity-50" />
                    
                    {/* Scanning Laser */}
                    <div className="absolute inset-0 border-b-2 border-purple-500/30 w-full h-full animate-[scan_1.5s_linear_infinite]" />
                  </div>
                  
                  {/* Floating Score Cards */}
                  <div className="absolute -right-20 top-4 bg-white border border-green-100 px-4 py-2 rounded-lg shadow-xl animate-[slideIn_0.5s_ease-out_forwards] flex flex-col gap-0.5">
                     <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Health Score</span>
                     <span className="text-lg font-bold text-emerald-600 font-mono">92/100</span>
                  </div>
                  
                  <div className="absolute -left-16 bottom-4 bg-white border border-orange-100 px-4 py-2 rounded-lg shadow-xl animate-[slideIn_0.7s_ease-out_forwards] flex flex-col gap-0.5">
                     <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Risk Level</span>
                     <span className="text-sm font-bold text-orange-500">Critical</span>
                  </div>
               </div>

               <div className="flex flex-col items-center gap-2">
                  <div className="text-slate-500 text-xs font-semibold tracking-widest uppercase">Generating Contextual Reasoning</div>
                  {/* Soundwave Animation */}
                  <div className="flex items-center gap-1 h-6">
                     {[...Array(5)].map((_, i) => (
                        <div 
                           key={i} 
                           className="w-1 bg-purple-500 rounded-full animate-[soundwave_1s_ease-in-out_infinite]" 
                           style={{ animationDelay: `${i * 0.1}s` }}
                        />
                     ))}
                  </div>
               </div>
            </div>
          )}

          {/* PHASE 4: COMPLETE */}
          {phase === 'complete' && (
            <div className="flex flex-col items-center animate-in zoom-in duration-500 scale-110">
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)] border border-emerald-50">
                <CheckCircle2 className="w-14 h-14 text-emerald-500" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Processing Complete</h2>
              <p className="text-slate-500 mt-2 font-medium">Redirecting to Dashboard...</p>
            </div>
          )}

        </div>

        {/* --- SYSTEM LOG CONSOLE --- */}
        <div className="w-full max-w-2xl bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Console Header */}
          <div className="bg-white border-b border-slate-100 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Terminal size={14} className="text-slate-400" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pipeline Activity</span>
            </div>
            <div className="flex gap-1.5">
               <div className="w-2 h-2 rounded-full bg-slate-200" />
               <div className="w-2 h-2 rounded-full bg-slate-200" />
               <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>
          
          {/* Logs */}
          <div className="p-4 font-mono text-xs space-y-2 h-32 overflow-hidden flex flex-col justify-end">
            {logs.map((log, idx) => (
               <div key={idx} className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-300">
                  <span className="text-slate-300 select-none">›</span>
                  <span className="text-slate-400">{log.split(']')[0]}]</span>
                  <span className={`font-medium ${idx === logs.length - 1 ? "text-blue-600" : "text-slate-600"}`}>
                    {log.split(']')[1]}
                  </span>
               </div>
            ))}
          </div>
        </div>

        {/* --- PROGRESS BAR --- */}
        <div className="mt-6 w-full max-w-2xl">
           <div className="flex justify-between text-xs text-slate-400 mb-2 font-bold uppercase tracking-widest">
              <span>Overall Status</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
           </div>
           <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
              <div 
                 className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-700 ease-out relative"
                 style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              >
                 <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] animate-[stripes_1s_linear_infinite]" />
              </div>
           </div>
        </div>

      </div>
      
      {/* Styles for Keyframes */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes soundwave {
          0%, 100% { height: 8px; }
          50% { height: 24px; }
        }
        @keyframes stripes {
          from { background-position: 1rem 0; }
          to { background-position: 0 0; }
        }
        @keyframes slideRight {
          0% { transform: translateX(-50px) translateY(-50%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(50px) translateY(-50%); opacity: 0; }
        }
        @keyframes slideLeft {
          0% { transform: translateX(50px) translateY(-50%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(-50px) translateY(-50%); opacity: 0; }
        }
        .perspective-1000 {
           perspective: 1000px;
        }
      `}</style>
    </div>
  );
};