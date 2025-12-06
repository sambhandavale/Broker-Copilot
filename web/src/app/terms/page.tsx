"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
          
          <p className="text-lg text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Acceptance of Terms</h2>
            <p className="text-slate-700 mb-4">
              By accessing and using Broker Copilot's services, you accept and agree to be bound by the 
              terms and provision of this agreement. These Terms of Service ("Terms") govern your use 
              of our platform and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Description of Service</h2>
            <p className="text-slate-700 mb-4">
              Broker Copilot is an AI-powered platform designed to assist insurance professionals with:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Managing insurance renewals and client communications</li>
              <li>Integrating with Microsoft Outlook for email and calendar management</li>
              <li>Generating reports and insights for insurance business operations</li>
              <li>Automating routine tasks related to insurance brokerage</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">User Responsibilities</h2>
            <p className="text-slate-700 mb-4">
              As a user of Broker Copilot, you agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Provide accurate and complete information when creating your account</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the service only for lawful business purposes</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect the intellectual property rights of others</li>
              <li>Not attempt to disrupt or interfere with the service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Account Terms</h2>
            <p className="text-slate-700 mb-4">
              You are responsible for maintaining the confidentiality of your account and password. 
              You agree to accept responsibility for all activities that occur under your account.
            </p>
            <p className="text-slate-700 mb-4">
              We reserve the right to refuse service, terminate accounts, or remove content at our 
              sole discretion if we determine that the Terms have been violated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Data and Privacy</h2>
            <p className="text-slate-700 mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which also governs 
              your use of the service, to understand our practices regarding your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Service Availability</h2>
            <p className="text-slate-700 mb-4">
              While we strive to provide continuous service, we do not guarantee that the service 
              will be available at all times. We may suspend or discontinue the service temporarily 
              for maintenance, updates, or other operational reasons.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Intellectual Property</h2>
            <p className="text-slate-700 mb-4">
              The Broker Copilot service and its original content, features, and functionality are 
              and will remain the exclusive property of Broker Copilot and its licensors. The service 
              is protected by copyright, trademark, and other laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-slate-700 mb-4">
              In no event shall Broker Copilot be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including without limitation, loss of profits, 
              data, use, goodwill, or other intangible losses, resulting from your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Indemnification</h2>
            <p className="text-slate-700 mb-4">
              You agree to defend, indemnify, and hold harmless Broker Copilot and its licensee and 
              licensors from and against any and all claims, damages, obligations, losses, liabilities, 
              costs or debt, and expenses (including but not limited to attorney's fees).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Termination</h2>
            <p className="text-slate-700 mb-4">
              We may terminate or suspend your account and bar access to the service immediately, 
              without prior notice or liability, under our sole discretion, for any reason whatsoever 
              and without limitation, including but not limited to a breach of the Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Changes to Terms</h2>
            <p className="text-slate-700 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will provide at least 30 days notice prior to any new terms 
              taking effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Contact Information</h2>
            <p className="text-slate-700">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 text-slate-700">
              <p>Email: legal@brokercopilot.com</p>
              <div className="mt-2">
                <p className="font-medium">Address:</p>
                <p>Broker Tech Solutions Pvt. Ltd.</p>
                <p>Unit No. 804, 8th Floor, Skyline Corporate Park</p>
                <p>Andheri Road, Andheri (East)</p>
                <p>Mumbai – 400059</p>
                <p>Maharashtra, India</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}