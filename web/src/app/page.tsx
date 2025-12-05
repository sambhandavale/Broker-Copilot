"use client";

import {
  ArrowRight,
  CalendarDays,
  BarChart3,
  Mail,
  Inbox,
  ShoppingCart,
  CheckCircle2,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
  Shield
} from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeaturesGrid } from "@/components/ui/features";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden">

      {/* Glow Blobs */}
      <div className="absolute -top-32 -left-32 h-[400px] w-[400px] bg-indigo-400/30 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 -right-32 h-[400px] w-[400px] bg-pink-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] bg-blue-400/20 rounded-full blur-[120px]" />

      <Navbar />

      <main>

        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-6">

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT CONTENT */}
            <div>

              <span className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold shadow-lg">
                <Shield className="w-4 h-4" />
                Unified Copilot for Brokers
              </span>

              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-slate-900 via-indigo-700 to-blue-700 bg-clip-text text-transparent">
                Broker Copilot <br /> Platform
              </h1>

              <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
                One intelligent dashboard to handle renewals, manage clients,
                send emails, schedule meetings & auto-prioritize your pipeline.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">

                <Button
                  asChild
                  className="px-10 py-6 text-lg shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 transition"
                >
                  <a href="/auth?varient=register" className="flex items-center gap-2">
                    Get started
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="px-10 py-6 text-lg border-2 hover:bg-indigo-50"
                >
                  <a href="/dashboard">View dashboard</a>
                </Button>

              </div>

              {/* Trust bar */}
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="text-green-600 w-5 h-5" />
                  Secure
                </span>
                <span className="flex items-center gap-2">
                  <Users className="text-blue-600 w-5 h-5" />
                  Built for teams
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="text-yellow-500 w-5 h-5" />
                  AI-powered
                </span>
              </div>

            </div>

            {/* RIGHT CONTENT - MOCK UI */}
            <div className="relative">

              <Card className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl p-6 relative z-10">

                <h3 className="font-bold text-lg mb-4">Live Renewals Overview</h3>

                <div className="space-y-4">

                  <div className="p-4 rounded-xl bg-indigo-50 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Auto Policy - Raj</p>
                      <p className="text-xs text-slate-500">Expires in 4 days</p>
                    </div>
                    <span className="text-indigo-600 font-bold text-sm">HIGH</span>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Vehicle Insurance - Amy</p>
                      <p className="text-xs text-slate-500">Expires in 10 days</p>
                    </div>
                    <span className="text-emerald-600 font-bold text-sm">MED</span>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-50 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Business Liability</p>
                      <p className="text-xs text-slate-500">No response</p>
                    </div>
                    <span className="text-rose-600 font-bold text-sm">URGENT</span>
                  </div>

                </div>

              </Card>

              {/* Floating stat */}
              <div className="absolute -bottom-6 -left-6 bg-white shadow-xl border border-indigo-100 px-6 py-4 rounded-2xl text-center">
                <h4 className="font-bold text-2xl text-indigo-600">+38%</h4>
                <p className="text-xs text-slate-500">Renewals</p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= HERO HIGHLIGHTS ================= */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Everything a modern broker needs
            </h2>

            <FeaturesGrid
              items={[
                {
                  icon: Inbox,
                  title: "Unified Inbox",
                  description: "Emails & messages in one smart view",
                  colorClass: "text-indigo-600",
                },
                {
                  icon: BarChart3,
                  title: "Renewal Scoring",
                  description: "Auto-prioritize every account",
                  colorClass: "text-blue-600",
                },
                {
                  icon: CalendarDays,
                  title: "Instant Meetings",
                  description: "Book from Outlook in one click",
                  colorClass: "text-emerald-600",
                },
                {
                  icon: ShoppingCart,
                  title: "Suggested Actions",
                  description: "Smart follow-ups & recommendations",
                  colorClass: "text-rose-600",
                },
              ]}
              columns={4}
            />

          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-24 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Start managing renewals like a pro
          </h2>

          <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg">
            Plug your Outlook, bring your clients, and let AI handle the noise.
          </p>

          <Button asChild size="lg" variant="secondary" className="text-indigo-700 font-bold px-10 py-6">
            <a href="/auth">Get Started Now</a>
          </Button>

        </section>

      </main>

      <Footer />

    </div>
  );
}
