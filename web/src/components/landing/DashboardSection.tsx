"use client";

import { motion } from "framer-motion";
import { BarChart3, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DashboardSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Screenshot */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4 text-white">
                <h3 className="font-bold text-lg">Renewals Dashboard</h3>
                <p className="text-indigo-100 text-sm">Priority overview for this week</p>
              </div>
              
              {/* Stats Cards */}
              <div className="p-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">24</div>
                  <div className="text-xs text-slate-500">Due Soon</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">12</div>
                  <div className="text-xs text-slate-500">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-600">8</div>
                  <div className="text-xs text-slate-500">Overdue</div>
                </div>
              </div>
              
              {/* Renewal Items */}
              <div className="px-6 pb-6 space-y-3">
                <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-slate-800">Auto Policy - Rajesh Kumar</p>
                    <p className="text-xs text-slate-500">Premium: ₹45,000 • Expires tomorrow</p>
                  </div>
                  <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold">URGENT</span>
                </div>
                
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-slate-800">Business Liability - Tech Corp</p>
                    <p className="text-xs text-slate-500">Premium: ₹1,20,000 • Expires in 3 days</p>
                  </div>
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">HIGH</span>
                </div>
                
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-slate-800">Home Insurance - Priya Singh</p>
                    <p className="text-xs text-slate-500">Premium: ₹25,000 • Expires in 7 days</p>
                  </div>
                  <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-xs font-bold">MEDIUM</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
              <BarChart3 className="w-4 h-4" />
              Smart Dashboard
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">AI-powered priority scoring</h2>
            <p className="text-lg text-slate-600 mb-8">
              Our intelligent system analyzes premium value, client history, and expiry dates 
              to automatically prioritize your renewals.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-slate-600" />
                <span className="text-slate-700">Automatic priority scoring</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-slate-600" />
                <span className="text-slate-700">Revenue impact analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-slate-600" />
                <span className="text-slate-700">Real-time status updates</span>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild variant="outline" className="mr-4">
                <a href="/dashboard">View Dashboard</a>
              </Button>
              <Button asChild>
                <a href="/auth">Get Started</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}