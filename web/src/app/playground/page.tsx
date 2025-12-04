"use client";

import React, { useState } from "react";
import { Play, Trash2, Clock, CheckCircle, AlertCircle, Code, Loader2 } from "lucide-react";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export default function ApiPlayground() {
  const [url, setUrl] = useState("/api/outlook/emails");
  const [method, setMethod] = useState<Method>("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  const handleSend = async () => {
    setLoading(true);
    setResponse(null);
    setStatus(null);
    setDuration(null);
    
    const startTime = performance.now();

    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (method !== "GET" && body) {
        try {
          // Validate JSON before sending
          JSON.parse(body);
          options.body = body;
        } catch (e) {
          alert("Invalid JSON in body");
          setLoading(false);
          return;
        }
      }

      const res = await fetch(url, options);
      const endTime = performance.now();
      
      setStatus(res.status);
      setDuration(Math.round(endTime - startTime));

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        setResponse(data);
      } else {
        const text = await res.text();
        setResponse(text);
      }
    } catch (error: any) {
      setResponse({ error: error.message });
      setStatus(500);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (s: number | null) => {
    if (!s) return "bg-gray-800 text-gray-400";
    if (s >= 200 && s < 300) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (s >= 400 && s < 500) return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return "bg-rose-500/10 text-rose-500 border-rose-500/20";
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <Code className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">API Playground</h1>
            <p className="text-sm text-slate-400">Test internal endpoints with your current session</p>
          </div>
        </div>
      </div>

      {/* Main Control Bar */}
      <div className="flex flex-col md:flex-row gap-3 p-1 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm shadow-xl">
        <select 
          value={method}
          onChange={(e) => setMethod(e.target.value as Method)}
          className="bg-slate-800 text-sm font-semibold text-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 border border-transparent"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="/api/example"
          className="flex-1 bg-transparent text-slate-200 placeholder-slate-600 px-4 py-3 outline-none font-mono text-sm"
        />

        <button 
          onClick={handleSend}
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
          <span>Send Request</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        
        {/* Left Column: Request Body */}
        <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/30">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Request Body (JSON)</span>
            <button 
              onClick={() => setBody("")}
              className="text-slate-500 hover:text-slate-300 transition-colors"
              title="Clear Body"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 relative">
             {method === "GET" && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 z-10 backdrop-blur-[1px]">
                    <span className="text-slate-500 text-sm">GET requests usually don't have a body</span>
                </div>
             )}
            <textarea 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{ "userId": "123" }'
              className="w-full h-full bg-transparent text-slate-300 p-4 font-mono text-sm resize-none outline-none focus:bg-slate-900/50 transition-colors"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Right Column: Response */}
        <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/30 min-h-[48px]">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Response</span>
            
            {status !== null && (
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                  {status >= 200 && status < 300 ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {status} {status === 200 ? 'OK' : ''}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {duration}ms
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-auto bg-[#0d1117] p-4 relative group">
            {response ? (
              <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap break-words">
                {typeof response === 'object' ? JSON.stringify(response, null, 2) : response}
              </pre>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                    <Play className="w-6 h-6 opacity-50 ml-1" />
                </div>
                <p>Send a request to see the response</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}