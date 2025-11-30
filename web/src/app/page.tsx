"use client";

import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { 
  RefreshCw, 
  FileCheck, 
  Sparkles, 
  Check, 
  ScanSearch, 
  UserCheck, 
  Bot, 
  ArrowRight 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar />

      <main className="">
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

          <div className="max-w-7xl mx-auto relative">
            
            {/* Floating Card: Policy Renewals (Left) */}
            <div className="hidden lg:block absolute -left-4 top-10 animate-[bounce_4s_infinite]">
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 w-64 rotate-[-6deg] hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    {/* ICON: Renewal/Refresh */}
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">Renewal Alert</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-100 rounded-full w-3/4"></div>
                  <div className="h-2 bg-slate-100 rounded-full w-1/2"></div>
                </div>
                <div className="mt-3 text-xs text-slate-500 font-medium bg-red-50 inline-block px-2 py-1 rounded-md text-red-600">
                  Expires in 3 days
                </div>
              </div>
            </div>

            {/* Floating Card: Claims (Right) */}
            <div className="hidden lg:block absolute -right-4 top-20 animate-[bounce_5s_infinite]">
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 w-64 rotate-[6deg] hover:rotate-0 transition-transform duration-300">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">Active Claim</p>
                    <p className="text-sm font-bold text-slate-900">#CLM-2024-88</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    {/* ICON: File/Claim Check */}
                    <FileCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-8 w-8 rounded-full bg-slate-200"></div>
                  <div className="text-xs text-slate-600">
                    <p className="font-medium">Sarah Johnson</p>
                    <p>Auto Policy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Central Content */}
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 leading-[1.1]">
                Smarter Brokerage. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Zero Manual Work.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Your AI-powered partner for policy analysis, client servicing, renewals, and communication — all inside one intelligent workspace.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/auth?varient=register"
                  className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section: Side-by-Side */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              {/* Mockup Container */}
              <div className="relative bg-slate-900 rounded-2xl p-2 shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500">
                <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50">
                  {/* Mock UI Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 h-2 w-32 bg-slate-700 rounded-full"></div>
                  </div>
                  {/* Mock UI Body */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="h-8 w-1/3 bg-slate-700 rounded-md"></div>
                      <div className="h-8 w-24 bg-blue-600 rounded-md"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-slate-700/50 rounded-lg border border-slate-700"></div>
                      <div className="h-24 bg-slate-700/50 rounded-lg border border-slate-700"></div>
                      <div className="h-24 bg-slate-700/50 rounded-lg border border-slate-700"></div>
                    </div>
                    <div className="h-32 bg-slate-700/30 rounded-lg border border-slate-700 p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
                              {/* ICON: AI/Sparkles */}
                              <Sparkles className="w-5 h-5" />
                            </div>
                            <span className="text-slate-300 font-medium">Policy Expiring soon!!!</span>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 bg-slate-600 rounded w-full"></div>
                            <div className="h-2 bg-slate-600 rounded w-5/6"></div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
            </div>

            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                Core Capability
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 leading-tight">
                AI-Driven Policy Reading & Interpretation
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Upload any policy — motor, health, life, property — and let InsurePilot automatically extract key clauses, limits, add-ons, exclusions, and coverage gaps. No scrolling. No guesswork.
              </p>
              <ul className="space-y-5">
                {[
                  "OCR engine for scanned documents",
                  "AI clause breakdown in simple language",
                  "Gap & risk identification",
                  "Auto-generated client-friendly summaries",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                      {/* ICON: Checkmark */}
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Your entire agency, <br /> supercharged.
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                From lead gen to renewal management, BrokerFlow handles the busy work so you can focus on your clients.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                  {/* ICON: Pattern/Scan */}
                  <ScanSearch className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Claims Pattern Detection</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  AI analyses historical and ongoing claims to flag anomalies, detect potential fraud, and simplify decision-making.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6 text-teal-600">
                  {/* ICON: User Retention */}
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Client Retention Insights</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Identify clients at risk of churn, detect under-insured profiles, and trigger automated follow-ups that improve retention.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                  {/* ICON: Bot/Assistant */}
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">24/7 Client Assistant</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  A smart AI agent that quotes policies, answers coverage questions, books appointments, and nurtures leads — all automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Bring automation to your insurance agency.
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Join thousands of brokers boosting productivity with AI-powered policy reading, renewals, and client service automation.
            </p>
            <a
              href="/auth"
              className="inline-block px-10 py-5 text-xl font-bold text-slate-900 bg-white rounded-xl hover:bg-slate-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              Get Started for Free
            </a>
            <p className="mt-6 text-slate-500 text-sm">No credit card required. 14-day free trial.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}