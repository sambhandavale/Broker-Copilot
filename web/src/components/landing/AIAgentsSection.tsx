"use client";

import { motion } from "framer-motion";
import { Bot, Mail, CalendarDays, BarChart3, ShoppingCart, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AIAgentsSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
            <Bot className="w-4 h-4" />
            AI-Powered Agents
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Your AI team that never sleeps</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Meet the intelligent agents working behind the scenes to automate your renewal process and maximize your conversion rates.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Email Agent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 hover:shadow-xl transition-all duration-300 group border-2 hover:border-blue-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Email Agent</h3>
              <p className="text-slate-600 mb-4">
                Reads incoming emails, categorizes by priority, and drafts personalized renewal responses using client history and policy data.
              </p>
              <div className="bg-blue-50 rounded-lg p-3 text-sm">
                <div className="font-medium text-blue-800 mb-1">Currently processing:</div>
                <div className="text-blue-700">47 renewal inquiries</div>
              </div>
            </Card>
          </motion.div>

          {/* Calendar Agent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 hover:shadow-xl transition-all duration-300 group border-2 hover:border-indigo-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CalendarDays className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Calendar Agent</h3>
              <p className="text-slate-600 mb-4">
                Analyzes your schedule, suggests optimal meeting times, and automatically books appointments with clients for renewal discussions.
              </p>
              <div className="bg-indigo-50 rounded-lg p-3 text-sm">
                <div className="font-medium text-indigo-800 mb-1">Next available slot:</div>
                <div className="text-indigo-700">Today 3:00 PM - 4:00 PM</div>
              </div>
            </Card>
          </motion.div>

          {/* Renewal Scoring Agent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 hover:shadow-xl transition-all duration-300 group border-2 hover:border-blue-800">
              <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-blue-100" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Renewal Scoring Agent</h3>
              <p className="text-slate-600 mb-4">
                Calculates priority scores based on premium value, client loyalty, expiry urgency, and provides clear explanations for each ranking.
              </p>
              <div className="bg-blue-900/10 rounded-lg p-3 text-sm">
                <div className="font-medium text-blue-900 mb-1">High-priority renewals:</div>
                <div className="text-blue-800">8 requiring immediate attention</div>
              </div>
            </Card>
          </motion.div>

          {/* Brief Generation Agent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 hover:shadow-xl transition-all duration-300 group border-2 hover:border-blue-500">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-6 h-6 text-blue-100" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Brief Generation Agent</h3>
              <p className="text-slate-600 mb-4">
                Creates detailed one-page renewal summaries with coverage recommendations, premium adjustments, and risk assessments.
              </p>
              <div className="bg-blue-500/10 rounded-lg p-3 text-sm">
                <div className="font-medium text-blue-700 mb-1">Briefs generated:</div>
                <div className="text-blue-600">23 ready for review</div>
              </div>
            </Card>
          </motion.div>

          {/* Data Aggregator Agent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 hover:shadow-xl transition-all duration-300 group border-2 hover:border-blue-700">
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-blue-100" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Data Aggregator Agent</h3>
              <p className="text-slate-600 mb-4">
                Syncs client data from CRM systems, email platforms, and calendars to create a unified view of all client interactions.
              </p>
              <div className="bg-blue-700/10 rounded-lg p-3 text-sm">
                <div className="font-medium text-blue-800 mb-1">Data sources synced:</div>
                <div className="text-blue-700">CRM, Outlook, 3 others</div>
              </div>
            </Card>
          </motion.div>

          {/* Insights Agent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 hover:shadow-xl transition-all duration-300 group border-2 hover:border-indigo-500">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-indigo-100" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Insights Agent</h3>
              <p className="text-slate-600 mb-4">
                Learns from successful renewals, identifies best-performing templates, and suggests optimization strategies for higher conversion rates.
              </p>
              <div className="bg-indigo-500/10 rounded-lg p-3 text-sm">
                <div className="font-medium text-indigo-700 mb-1">Optimization found:</div>
                <div className="text-indigo-600">+15% email open rate improvement</div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}