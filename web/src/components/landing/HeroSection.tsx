"use client";

import {
  ArrowRight,
  BarChart3,
  Mail,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
  Shield,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export function HeroSection() {
  const { data: session } = useSession();

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* LEFT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-slate-800 text-white text-sm font-semibold shadow-lg">
              <Shield className="w-4 h-4" />
              Unified Copilot for Brokers
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-slate-800">
              Broker Copilot <br /> Platform
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
              One intelligent dashboard to handle renewals, manage clients,
              send emails, schedule meetings & auto-prioritize your pipeline.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">500+</div>
              <div className="text-xs text-slate-500">Active Brokers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">₹2.5Cr</div>
              <div className="text-xs text-slate-500">Premiums Managed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-xs text-slate-500">Renewal Rate</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              className="px-8 py-4 text-base shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 transition-all duration-200"
            >
              <a href="/auth?varient=register" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            
            {/* <Button
              asChild
              variant="outline"
              className="px-8 py-4 text-base border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
            >
              <a href="#demo" className="flex items-center gap-2">
                Watch Demo
                <span className="w-4 h-4 rounded-full bg-slate-600 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
                </span>
              </a>
            </Button> */}

            {session && (
              <Button
                asChild
                variant="ghost"
                className="px-8 py-4 text-base hover:bg-slate-100"
              >
                <a href="/dashboard" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Go to Dashboard
                </a>
              </Button>
            )}
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <ShieldCheck className="text-green-600 w-5 h-5" />
              <span className="font-medium">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="text-blue-600 w-5 h-5" />
              <span className="font-medium">Team Collaboration</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Zap className="text-yellow-500 w-5 h-5" />
              <span className="font-medium">AI-Powered</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">+</div>
            </div>
            <div className="text-sm text-slate-600">
              <span className="font-semibold">200+ insurance professionals</span> are already automating their renewals
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT - ENHANCED MOCK UI */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          {/* Main Dashboard Card */}
          <Card className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl p-6 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg">Today's Priority</h3>
                <p className="text-sm text-slate-500">December 6, 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-600 animate-pulse"></div>
                <span className="text-xs text-slate-600">Live</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 flex justify-between items-center hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold">RK</div>
                  <div>
                    <p className="font-medium text-slate-800">Auto Policy - Rajesh Kumar</p>
                    <p className="text-xs text-slate-500">₹45,000 • Expires tomorrow</p>
                  </div>
                </div>
                <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce">URGENT</span>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 flex justify-between items-center hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">TC</div>
                  <div>
                    <p className="font-medium text-slate-800">Business Liability - Tech Corp</p>
                    <p className="text-xs text-slate-500">₹1,20,000 • Expires in 3 days</p>
                  </div>
                </div>
                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold">HIGH</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-600 text-white flex items-center justify-center text-sm font-bold">PS</div>
                  <div>
                    <p className="font-medium text-slate-800">Home Insurance - Priya Singh</p>
                    <p className="text-xs text-slate-500">₹25,000 • Expires in 7 days</p>
                  </div>
                </div>
                <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-xs font-bold">MEDIUM</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Quick Actions</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-left hover:bg-slate-100 transition-colors">
                  <Mail className="w-4 h-4 text-slate-600 mb-1" />
                  <div className="text-xs font-medium text-slate-800">Send Email</div>
                </button>
                <button className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-left hover:bg-slate-100 transition-colors">
                  <Calendar className="w-4 h-4 text-slate-600 mb-1" />
                  <div className="text-xs font-medium text-slate-800">Book Meeting</div>
                </button>
              </div>
            </div>
          </Card>

          {/* Floating Stats */}
          <div className="absolute -bottom-6 -left-6 bg-white shadow-xl border border-slate-100 px-6 py-4 rounded-2xl text-center z-20">
            <h4 className="font-bold text-2xl text-slate-800">+38%</h4>
            <p className="text-xs text-slate-500">Renewal Rate</p>
          </div>

          <div className="absolute -top-4 -right-4 bg-white shadow-xl border border-slate-100 px-4 py-3 rounded-xl text-center z-20">
            <h4 className="font-bold text-lg text-emerald-600">₹2.1L</h4>
            <p className="text-xs text-slate-500">Today's Revenue</p>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-slate-200 rounded-full blur-xl opacity-60 animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-slate-300 rounded-full blur-xl opacity-60 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-slate-200 rounded-full blur-xl opacity-60"></div>
    </section>
  );
}