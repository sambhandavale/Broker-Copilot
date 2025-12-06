"use client";

import { Inbox, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function UnifiedInboxSection() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold mb-6">
              <Inbox className="w-4 h-4" />
              Unified Inbox
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">All conversations in one place</h2>
            <p className="text-lg text-slate-600 mb-8">
              Manage client communications across email, chat, and phone calls in a unified interface. 
              Never miss a renewal opportunity again.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-slate-700">Smart message categorization</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-slate-700">Auto-assignment to team members</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-slate-700">Priority tagging and follow-ups</span>
              </div>
            </div>
          </motion.div>

          {/* Right Screenshot */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
              {/* Header */}
              <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Team Inbox</h3>
                  <p className="text-sm text-slate-500">All conversations</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">All</span>
                  <span className="bg-slate-200 text-slate-800 px-2 py-1 rounded-full text-xs font-medium">Needs attention 20</span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">Sales 1</span>
                </div>
              </div>
              
              {/* Conversation List */}
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-slate-600 text-white flex items-center justify-center text-sm font-bold">DB</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-800">Deepak B.</span>
                      <span className="text-xs text-slate-500">12:12pm</span>
                    </div>
                    <p className="text-sm text-slate-600">Hi! I would like to renew my auto policy...</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-xs">Sales</span>
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">Mumbai</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50">
                  <div className="w-10 h-10 rounded-full bg-slate-600 text-white flex items-center justify-center text-sm font-bold">YL</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-800">Yogesh L.</span>
                      <span className="text-xs text-slate-500">12:12pm</span>
                    </div>
                    <p className="text-sm text-slate-600">What are the coverage options for business insurance?</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-slate-600 mt-2"></div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50">
                  <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold">SM</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-800">Shivam M.</span>
                      <span className="text-xs text-slate-500">12:12pm</span>
                    </div>
                    <p className="text-sm text-slate-600">Can you send the payment link for renewal?</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}