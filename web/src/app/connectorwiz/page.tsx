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
  Settings
} from 'lucide-react';
import { NavButton } from './components/NavButton'; // Assuming these exist in your project
import { Logo } from '@/components/shared/logo';    // Assuming these exist in your project
import { getAction, patchAction } from '@/lib/utils/apiRequests'; // Importing your util functions
import { useRouter, useSearchParams } from 'next/navigation';

const ConnectPage = () => {
  const [activeTab, setActiveTab] = useState('broker');
  const [loading, setLoading] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [renewalDays, setRenewalDays] = useState<number>(90);
  
  // State to track actual connection status
  const [connections, setConnections] = useState({
    ams: false,
    gmail: false,
    outlook: false,
    csv: false
  });

  useEffect(() => {
    const connectionParam = searchParams.get('connection');
    const statusParam = searchParams.get('status');

    if (connectionParam === 'outlook' && statusParam === 'success') {
      setConnections(prev => ({ ...prev, outlook: true, gmail: false }));
      
      setActiveTab('email');

      router.replace('/connectorwiz');
    }
  }, [searchParams, router]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await getAction('/api/users/me');
        if (res.user.microsoft?.tokenExpiresAt) setConnections(prev => ({ ...prev, outlook: true }));
        if (res.user.settings?.renewalWindowDays) {
            setRenewalDays(res.user.settings.renewalWindowDays);
        }
      } catch (error) {
        console.error("Failed to fetch connection status");
      }
    };
    checkStatus();
  }, []);

  const handleSaveSettings = async (days: number) => {
    setLoading('settings');
    try {
        // Optimistic update
        setRenewalDays(days);
        
        // API Call
        await patchAction('/api/users/settings', {
            renewalWindowDays: days
        });

    } catch (error) {
        console.error("Failed to update settings");
        // Revert on error if needed, or show toast
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
        
        if (response.url) {
          window.location.href = response.url;
        } else {
          throw new Error("No redirect URL received"); 
        }
      } catch (error: any) {
        console.error("Outlook connection failed:", error);
        alert(error.message || "Failed to initiate connection");
        setLoading(null);
      }
      return;
    }

    setLoading(service);
    setTimeout(() => {
      setConnections(prev => {
        setLoading(null);
        if (service === 'gmail') {
          return { ...prev, gmail: !prev.gmail, outlook: false };
        }
        if (service === 'ams') {
           return { ...prev, [service]: !prev[service] };
        }
        if (service === 'csv') {
           return { ...prev, [service]: !prev[service] };
        }
        return prev;
      });
    }, 800);
  };

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
              Securely link your Asset Management System account to sync portfolio data in real-time.
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
                  {loading === 'ams' ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>Connect Account <ArrowRight size={16} /></>
                  )}
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
                    <span className="text-xs text-gray-500">
                      {connections.gmail ? 'Active Provider' : connections.outlook ? 'Switch to Gmail' : 'Connect'}
                    </span>
                  </div>
                </div>
                {loading === 'gmail' ? (
                   <Loader2 size={20} className="text-red-600 animate-spin" />
                ) : connections.gmail ? (
                   <CheckCircle2 size={20} className="text-red-600" />
                ) : (
                   <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-red-400" />
                )}
              </button>

              {/* OUTLOOK BUTTON (Connected to API) */}
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
                    <span className="text-xs text-gray-500">
                       {connections.outlook ? 'Active Provider' : connections.gmail ? 'Switch to Outlook' : 'Connect'}
                    </span>
                  </div>
                </div>
                
                {loading === 'outlook' ? (
                  <Loader2 size={20} className="text-blue-600 animate-spin" />
                ) : connections.outlook ? (
                  <CheckCircle2 size={20} className="text-blue-600" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-blue-400" />
                )}
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

            <div 
              className={`w-full max-w-xs border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer ${connections.csv ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-emerald-400 hover:bg-gray-50'}`}
              onClick={() => handleConnect('csv')}
            >
              {loading === 'csv' ? (
                 <div className="flex flex-col items-center gap-2">
                   <Loader2 size={24} className="text-emerald-500 animate-spin mb-2" />
                   <span className="text-sm font-medium text-emerald-800">Uploading...</span>
                 </div>
              ) : connections.csv ? (
                <div className="flex flex-col items-center gap-2">
                   <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
                   <span className="text-sm font-semibold text-emerald-800">clients_v2.csv</span>
                   <span className="text-xs text-emerald-600">Upload Complete</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-600">Click to upload CSV</span>
                  <span className="text-xs text-gray-400">or drag and drop</span>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Calendar size={32} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Renewal Tracking Window
            </h3>

            <p className="text-gray-500 mb-8 max-w-xs">
              Select how far in advance we should flag upcoming policy renewals.
            </p>

            <div className="w-full max-w-xs grid grid-cols-3 gap-3">
              {[30, 90, 180].map((days) => (
                <button
                  key={days}
                  onClick={() => handleSaveSettings(days)}
                  disabled={loading === 'settings'}
                  className={`
                    relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
                    ${renewalDays === days
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:bg-gray-50'
                    }
                  `}
                >
                  {loading === 'settings' && renewalDays === days ? (
                    <Loader2 size={24} className="animate-spin text-indigo-600" />
                  ) : (
                    <>
                      <span className="text-2xl font-bold">{days}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                        Days
                      </span>
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

            <p className="text-xs text-gray-400 mt-6">
              Your preferences are saved automatically.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans text-gray-900">
      
      {/* Main Modal Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row min-h-[600px]">
        
        {/* Left Sidebar (Navigation) */}
        <div className="w-full md:w-[500px] p-8 flex flex-col border-r border-gray-100 bg-white">

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Connect Sources</h1>
            <p className="text-gray-500 mt-2 text-sm">Select a provider to link your accounts or import data.</p>
          </div>

          <div className="flex-1 space-y-8 overflow-y-auto pr-2">
            
            {/* SECTION 1: DATA CONNECTION */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">
                Data Connections
              </h4>
              
              <NavButton 
                active={activeTab === 'csv'} 
                onClick={() => setActiveTab('csv')}
                icon={<Upload size={20} />}
                title="Data Import"
                subtitle="Upload CSV"
                connected={connections.csv}
              />

              <NavButton 
                active={activeTab === 'broker'} 
                onClick={() => setActiveTab('broker')}
                icon={<Building2 size={20} />}
                title="Broker Account"
                subtitle="Connect AMS"
                connected={connections.ams}
              />
            </div>

            {/* SECTION 2: ACCOUNT CONNECTION */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">
                Account Connections
              </h4>
              
              <NavButton 
                active={activeTab === 'email'} 
                onClick={() => setActiveTab('email')}
                icon={<Mail size={20} />}
                title="Email Services"
                subtitle="Gmail or Outlook"
                connected={connections.gmail || connections.outlook}
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">
                Configuration
              </h4>
              
              <NavButton 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')}
                icon={<Settings size={20} />}
                title="General Settings"
                subtitle={`${renewalDays} Day Window`}
                connected={true}
              />
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-3 rounded-lg">
              <ShieldCheck size={14} className="text-green-500" />
              <span>All connections are end-to-end encrypted</span>
            </div>
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