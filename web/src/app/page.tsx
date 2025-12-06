"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { UnifiedInboxSection } from "@/components/landing/UnifiedInboxSection";
import { DashboardSection } from "@/components/landing/DashboardSection";
import { OutlookIntegrationSection } from "@/components/landing/OutlookIntegrationSection";
import { AIAgentsSection } from "@/components/landing/AIAgentsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingPreviewSection } from "@/components/landing/PricingPreviewSection";
import { FAQSection } from "@/components/landing/FAQSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden">
      {/* Glow Blobs */}
      <div className="absolute -top-32 -left-32 h-[400px] w-[400px] bg-slate-800/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 -right-32 h-[400px] w-[400px] bg-slate-700/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] bg-slate-600/20 rounded-full blur-[120px]" />

      <Navbar />

      <main>
        <HeroSection />
        <UnifiedInboxSection />
        <DashboardSection />
        <OutlookIntegrationSection />
        <AIAgentsSection />
        <TestimonialsSection />
        <PricingPreviewSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}