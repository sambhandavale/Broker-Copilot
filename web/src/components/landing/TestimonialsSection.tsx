"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export function TestimonialsSection() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
            <Users className="w-4 h-4" />
            Customer Success
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by insurance professionals</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See how Broker Copilot is transforming renewal processes for brokers across India.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-white hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                <div>
                  <div className="font-bold text-slate-900">Rajesh Patel</div>
                  <div className="text-sm text-slate-500">Senior Insurance Broker, Mumbai</div>
                </div>
              </div>
              <p className="text-slate-600 mb-4 italic">
                "Broker Copilot increased our renewal rate from 70% to 92% in just 3 months. The AI prioritization helps us focus on high-value clients first."
              </p>
              <div className="text-emerald-600 font-semibold text-lg">+22% renewal rate</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-white hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                <div>
                  <div className="font-bold text-slate-900">Priya Sharma</div>
                  <div className="text-sm text-slate-500">Insurance Agency Owner, Delhi</div>
                </div>
              </div>
              <p className="text-slate-600 mb-4 italic">
                "The automated email templates save us 15 hours per week. Our team can now handle 3x more renewals with the same headcount."
              </p>
              <div className="text-blue-600 font-semibold text-lg">3x productivity gain</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-white hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-400"></div>
                <div>
                  <div className="font-bold text-slate-900">Amit Kumar</div>
                  <div className="text-sm text-slate-500">Regional Manager, Bangalore</div>
                </div>
              </div>
              <p className="text-slate-600 mb-4 italic">
                "Integration with Outlook was seamless. Now all our client communications are tracked and we never miss a follow-up."
              </p>
              <div className="text-purple-600 font-semibold text-lg">0 missed follow-ups</div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}