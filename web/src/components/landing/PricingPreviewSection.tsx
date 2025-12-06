"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PricingPreviewSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
            <ShieldCheck className="w-4 h-4" />
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Start free, scale as you grow</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
            No hidden fees, no long-term contracts. Pay only for what you use.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-2 border-slate-200 relative">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-4xl font-bold text-slate-900 mb-1">₹0</div>
                <div className="text-slate-500 mb-6">for 14 days</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700">Up to 50 renewals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700">Basic AI prioritization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700">Email templates</span>
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <a href="/auth?varient=register">Start Free Trial</a>
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-2 border-slate-300 relative bg-slate-50">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="text-4xl font-bold text-slate-900 mb-1">₹2,999</div>
                <div className="text-slate-500 mb-6">per month</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700">Unlimited renewals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700">Advanced AI agents</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700">Outlook integration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700">Priority support</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <a href="/auth?varient=register">Get Started</a>
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <p className="text-sm text-slate-500 mt-8">
          All plans include 24/7 support and 99.9% uptime guarantee
        </p>
      </div>
    </section>
  );
}