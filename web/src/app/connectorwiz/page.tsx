"use client"

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Upload, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  FileSpreadsheet, 
  AlertCircle,
  ShieldCheck,
  Laptop,
  Loader2,
  Calendar,
  Settings,
  Play,
  BrainCircuit
} from 'lucide-react';
import { NavButton } from './components/NavButton'; // Assuming these exist in your project
import { Logo } from '@/components/shared/logo';    // Assuming these exist in your project
import { getAction, patchAction } from '@/lib/utils/apiRequests'; // Importing your util functions
import { useRouter, useSearchParams } from 'next/navigation';
import Papa from 'papaparse';
import { PipelineLoader } from './components/PipelineAnimation';

const ConnectPage = () => {
  const [activeTab, setActiveTab] = useState('broker');
  const [loading, setLoading] = useState<string | null>(null);
  
  // Pipeline State
  const [csvData, setCsvData] = useState<any[]>([]); // Store parsed CSV
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [renewalDays, setRenewalDays] = useState<number>(90);
  
  const [connections, setConnections] = useState({
    ams: false,
    gmail: false,
    outlook: false,
    csv: false
  });

  // --- ANALYSIS STEPS MESSAGES ---
  const processingSteps = [
    "Reading Client Data...",
    "Identifying Upcoming Renewals...",
    "Connecting to Outlook...",
    "Fetching Client Emails...",
    "AI Agent: Analyzing Sentiment...",
    "Finalizing Pipeline...",
  ];

  useEffect(() => {
    const connectionParam = searchParams.get('connection');
    const statusParam = searchParams.get('status');

    if (connectionParam === 'outlook' && statusParam === 'success') {
      setConnections(prev => ({ ...prev, outlook: true, gmail: false }));
      setActiveTab('email');
      router.replace('/connectorwiz'); // Clear params
    }
  }, [searchParams, router]);

  useEffect(() => {
    const checkStatus = async () => {
      try {

        const res = await getAction('/api/users/me');
        if (res.user.microsoft?.tokenExpiresAt) setConnections(prev => ({ ...prev, outlook: true }));
        if (res.user.settings?.renewalWindowDays) setRenewalDays(res.user.settings.renewalWindowDays);
      } catch (error) {
        console.error("Failed to fetch connection status");
      }
    };
    checkStatus();
  }, []);

  // --- HANDLERS ---

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading('csv');
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
        setConnections(prev => ({ ...prev, csv: true }));
        setLoading(null);
        console.log("Parsed CSV:", results.data.length, "rows");
      },
      error: (error) => {
        console.error("CSV Error:", error);
        setLoading(null);
        alert("Failed to parse CSV file");
      }
    });
  };

  const handleStartAnalysis = async () => {
    if (!connections.csv || (!connections.outlook && !connections.gmail)) return;

    setIsAnalyzing(true);
    setAnalysisStep(0);

    // 1. Start the fake progress
    const interval = setInterval(() => {
      setAnalysisStep(prev => {
        // STOP at the second-to-last step (Wait for API)
        if (prev >= processingSteps.length - 2) {
          return prev; 
        }
        return prev + 1;
      });
    }, 2000); // Slower, more realistic pace

    try {
      const response = await fetch('/api/pipeline/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          csvData: csvData,
          windowDays: renewalDays
        })
      });

      if (!response.ok) throw new Error("Analysis failed");

      // 2. API Success! Now finish the progress bar
      clearInterval(interval);
      
      // Quickly animate through any remaining steps to the end
      setAnalysisStep(processingSteps.length - 1); 
      
      // 3. Redirect after showing the "Success" state for a moment
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (error) {
      console.error(error);
      clearInterval(interval);
      setIsAnalyzing(false);
      alert("Pipeline generation failed. Please try again.");
    }
  };

  const handleSaveSettings = async (days: number) => {
    setLoading('settings');
    try {
      setRenewalDays(days);
      await patchAction('/api/users/settings', { renewalWindowDays: days });
    } catch (error) {
      console.error("Failed to update settings");
    } finally {
      setLoading(null);
    }
  };

  const handleConnect = async (service: string) => {
    if (service === 'outlook') {
      if (connections.outlook) return;
      setLoading('outlook');
      try {
        const response = await getAction<{ url: string }>('/api/auth/microsoft/connect');
        if (response.url) window.location.href = response.url;
      } catch (error: any) {
        console.error("Outlook connection failed:", error);
        setLoading(null);
      }
      return;
    }

    setLoading(service);
    setTimeout(() => {
      setConnections(prev => {
        setLoading(null);
        if (service === 'gmail') return { ...prev, gmail: !prev.gmail, outlook: false };
        if (service === 'ams') return { ...prev, [service]: !prev[service] };
        return prev;
      });
    }, 800);
  };

  // --- RENDER CONTENT ---

  const renderContent = () => {
    switch (activeTab) {
      case 'broker':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Building2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Connect AMS Broker</h3>
            <p className="text-gray-500 mb-8 max-w-xs">
              Securely link your Asset Management System account to sync portfolio data.
            </p>
            
            {connections.ams ? (
               <div className="w-full max-w-xs bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                 <div className="bg-green-100 p-2 rounded-full">
                   <CheckCircle2 className="text-green-600" size={20} />
                 </div>
                 <div className="text-left">
                   <p className="font-semibold text-green-900 text-sm">Connected</p>
                   <p className="text-green-700 text-xs">AMS ID: 883-291-00</p>
                 </div>
                 <button 
                   onClick={() => handleConnect('ams')}
                   disabled={loading === 'ams'}
                   className="ml-auto text-xs text-green-700 hover:text-green-900 font-medium disabled:opacity-50"
                 >
                   {loading === 'ams' ? '...' : 'Disconnect'}
                 </button>
               </div>
            ) : (
              <div className="w-full max-w-xs space-y-4">
                <div className="space-y-2 text-left">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account ID</label>
                  <input type="text" placeholder="Ex: AMS-88291" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
                <button 
                  onClick={() => handleConnect('ams')}
                  disabled={loading === 'ams'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading === 'ams' ? <Loader2 className="animate-spin" size={20} /> : <>Connect Account <ArrowRight size={16} /></>}
                </button>
              </div>
            )}
          </div>
        );
      case 'email':
        return (
          <div className="h-full flex flex-col p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8 mt-4">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Email Integration</h3>
              <p className="text-gray-500 text-sm">Select your primary email provider.</p>
            </div>

            <div className="space-y-3 max-w-xs mx-auto w-full">
              {/* GMAIL BUTTON */}
              <button 
                onClick={() => handleConnect('gmail')}
                disabled={loading === 'gmail' || loading === 'outlook'}
                className={`w-full group relative flex items-center justify-between p-4 rounded-xl border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  connections.gmail 
                    ? 'bg-red-50 border-red-200 shadow-md ring-1 ring-red-200' 
                    : connections.outlook 
                      ? 'bg-gray-50 border-gray-100 opacity-60 hover:opacity-100 hover:bg-white' 
                      : 'bg-white border-gray-200 hover:border-red-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${connections.gmail ? 'bg-white text-red-500' : 'bg-red-100 text-red-600'}`}>
                    <Mail size={16} />
                  </div>
                  <div className="text-left">
                    <span className={`block font-semibold ${connections.gmail ? 'text-red-900' : 'text-gray-700'}`}>Gmail</span>
                    <span className="text-xs text-gray-500">{connections.gmail ? 'Active Provider' : 'Connect'}</span>
                  </div>
                </div>
                {loading === 'gmail' ? <Loader2 size={20} className="text-red-600 animate-spin" /> : connections.gmail ? <CheckCircle2 size={20} className="text-red-600" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-red-400" />}
              </button>

              {/* OUTLOOK BUTTON */}
              <button 
                onClick={() => handleConnect('outlook')}
                disabled={loading === 'outlook' || loading === 'gmail'}
                className={`w-full group relative flex items-center justify-between p-4 rounded-xl border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  connections.outlook 
                    ? 'bg-blue-50 border-blue-200 shadow-md ring-1 ring-blue-200' 
                    : connections.gmail 
                      ? 'bg-gray-50 border-gray-100 opacity-60 hover:opacity-100 hover:bg-white' 
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${connections.outlook ? 'bg-white text-blue-500' : 'bg-blue-100 text-blue-600'}`}>
                    <Laptop size={16} />
                  </div>
                  <div className="text-left">
                    <span className={`block font-semibold ${connections.outlook ? 'text-blue-900' : 'text-gray-700'}`}>Outlook</span>
                    <span className="text-xs text-gray-500">{connections.outlook ? 'Active Provider' : 'Connect'}</span>
                  </div>
                </div>
                {loading === 'outlook' ? <Loader2 size={20} className="text-blue-600 animate-spin" /> : connections.outlook ? <CheckCircle2 size={20} className="text-blue-600" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-blue-400" />}
              </button>
            </div>
          </div>
        );
      case 'csv':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <FileSpreadsheet size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Import Client Data</h3>
            <p className="text-gray-500 mb-8 max-w-xs">
              Upload your client database via CSV to instantly populate your dashboard.
            </p>

            {/* CSV UPLOAD INPUT */}
            <label 
              className={`w-full max-w-xs border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer relative ${connections.csv ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-emerald-400 hover:bg-gray-50'}`}
            >
              <input 
                type="file" 
                accept=".csv"
                onChange={handleCsvUpload}
                disabled={loading === 'csv'}
                className="hidden" 
              />
              
              {loading === 'csv' ? (
                 <div className="flex flex-col items-center gap-2">
                   <Loader2 size={24} className="text-emerald-500 animate-spin mb-2" />
                   <span className="text-sm font-medium text-emerald-800">Parsing Data...</span>
                 </div>
              ) : connections.csv ? (
                <div className="flex flex-col items-center gap-2">
                   <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
                   <span className="text-sm font-semibold text-emerald-800">Upload Complete</span>
                   <span className="text-xs text-emerald-600">{csvData.length} records found</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-600">Click to upload CSV</span>
                  <span className="text-xs text-gray-400">or drag and drop</span>
                </div>
              )}
            </label>
          </div>
        );
      
      case 'settings':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <CalendarIcon /> 
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Renewal Tracking Window</h3>
            <p className="text-gray-500 mb-8 max-w-xs">Select how far in advance we should flag upcoming policy renewals.</p>

            <div className="w-full max-w-xs grid grid-cols-3 gap-3">
              {[30, 90, 180].map((days) => (
                <button
                  key={days}
                  onClick={() => handleSaveSettings(days)}
                  disabled={loading === 'settings'}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${renewalDays === days ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:bg-gray-50'}`}
                >
                  {loading === 'settings' && renewalDays === days ? (
                    <Loader2 size={24} className="animate-spin text-indigo-600" />
                  ) : (
                    <>
                      <span className="text-2xl font-bold">{days}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">Days</span>
                      {renewalDays === days && (
                        <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full p-1 shadow-sm">
                          <CheckCircle2 size={12} />
                        </div>
                      )}
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      
        default: return null;
    }
  };

  const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans text-gray-900">
      
      {/* --- OVERLAY LOADER --- */}
      {/* {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-indigo-100 animate-pulse"></div>
            <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
              <BrainCircuit size={32} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Building Your Pipeline</h2>
          <p className="text-indigo-600 font-medium animate-pulse">
             {processingSteps[analysisStep]}
          </p>
          
          <div className="mt-8 flex gap-2">
            {processingSteps.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${i <= analysisStep ? 'bg-indigo-600' : 'bg-gray-200'}`} 
              />
            ))}
          </div>
        </div>
      )} */}
      {isAnalyzing && (
        <PipelineLoader 
            currentStep={analysisStep} 
            steps={processingSteps} 
        />
      )}

      {/* --- MAIN MODAL --- */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row min-h-[600px] relative z-10">
        
        {/* Left Sidebar */}
        <div className="w-full md:w-[500px] p-8 flex flex-col border-r border-gray-100 bg-white">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Connect Sources</h1>
            <p className="text-gray-500 mt-2 text-sm">Select a provider to link your accounts or import data.</p>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto pr-2">
            {/* Data Connections */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Data Connections</h4>
              <NavButton active={activeTab === 'csv'} onClick={() => setActiveTab('csv')} icon={<FileSpreadsheet size={20} />} title="Data Import" subtitle="Upload CSV" connected={connections.csv} />
              <NavButton active={activeTab === 'broker'} onClick={() => setActiveTab('broker')} icon={<Building2 size={20} />} title="Broker Account" subtitle="Connect AMS" connected={connections.ams} />
            </div>

            {/* Account Connections */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Account Connections</h4>
              <NavButton active={activeTab === 'email'} onClick={() => setActiveTab('email')} icon={<Mail size={20} />} title="Email Services" subtitle="Gmail or Outlook" connected={connections.gmail || connections.outlook} />
            </div>

            {/* Config */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Configuration</h4>
              <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={20} />} title="General Settings" subtitle={`${renewalDays} Day Window`} connected={true} />
            </div>
          </div>

          {/* --- THE START ACTION BUTTON --- */}
          <div className="mt-6 pt-6 border-t border-gray-100">
             <button
               onClick={handleStartAnalysis}
               disabled={!connections.csv || (!connections.outlook && !connections.gmail)}
               className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-between px-6 group"
             >
               <span className="flex flex-col text-left">
                 <span className="text-sm font-medium opacity-90">Ready to go?</span>
                 <span className="text-lg">Start Analysis</span>
               </span>
               <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                 <Play fill="currentColor" size={20} />
               </div>
             </button>
             
             {!connections.csv && (
               <p className="text-xs text-center text-red-400 mt-2">Please upload client CSV first</p>
             )}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-gray-50/50 relative">
            <div className="absolute inset-0 bg-gray-100/50 z-0"></div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                <div className="mb-8 mt-4 md:mt-0">
                    <Logo/>
                </div>
                <div className="w-full max-w-md bg-white shadow-xl shadow-gray-200/50 rounded-3xl h-[450px] overflow-hidden border border-white">
                  {renderContent()}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ConnectPage;