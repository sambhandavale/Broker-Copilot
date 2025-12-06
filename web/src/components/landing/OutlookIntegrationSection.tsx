"use client";

import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Mail, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export function OutlookIntegrationSection() {
  const { data: session } = useSession();
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <CalendarDays className="w-4 h-4" />
              Outlook Integration
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Seamless email & calendar sync</h2>
            <p className="text-lg text-slate-600 mb-8">
              Connect your Microsoft Outlook to automatically sync emails, schedule meetings, 
              and track all client communications in one place.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span className="text-slate-700">One-click meeting scheduling</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span className="text-slate-700">Automated email templates</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span className="text-slate-700">Calendar availability sharing</span>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild>
                <a href={session ? "/connectorwiz": "/auth"}>Connect Microsoft</a>
              </Button>
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
              <div className="bg-blue-600 px-6 py-4 text-white flex items-center gap-3">
                <CalendarDays className="w-6 h-6" />
                <div>
                  <h3 className="font-bold text-lg">Quick Actions</h3>
                  <p className="text-blue-100 text-sm">For Rajesh Kumar - Auto Policy Renewal</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="p-6 space-y-4">
                <button className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-left hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-800">Send Renewal Email</div>
                      <div className="text-sm text-slate-500">Personalized template ready</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-left hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-800">Schedule Meeting</div>
                      <div className="text-sm text-slate-500">Available slots: Today 3 PM, Tomorrow 10 AM</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-left hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-800">Generate Renewal Brief</div>
                      <div className="text-sm text-slate-500">AI-powered recommendations</div>
                    </div>
                  </div>
                </button>
              </div>
              
              {/* Footer */}
              <div className="px-6 pb-6">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-xs text-slate-600 mb-1">Next best action:</div>
                  <div className="text-sm font-medium text-slate-800">Send email within 2 hours for best response rate</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}