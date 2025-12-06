"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
          
          <p className="text-lg text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Information We Collect</h2>
            <p className="text-slate-700 mb-4">
              Broker Copilot collects information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support.
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Account information (name, email address, company details)</li>
              <li>Email and calendar data when you connect your Outlook account</li>
              <li>Client and renewal information you input into our system</li>
              <li>Usage data and analytics to improve our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">How We Use Your Information</h2>
            <p className="text-slate-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and manage insurance renewals</li>
              <li>Generate insights and reports for your business</li>
              <li>Communicate with you about our services</li>
              <li>Ensure the security and integrity of our platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-700 mb-4">
              We implement industry-standard security measures to protect your data, including encryption, 
              secure data transmission, and regular security audits. Your data is stored securely and 
              access is restricted to authorized personnel only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Third-Party Services</h2>
            <p className="text-slate-700 mb-4">
              Broker Copilot integrates with Microsoft Outlook and other third-party services. 
              These integrations are governed by their respective privacy policies in addition to ours.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Data Retention</h2>
            <p className="text-slate-700 mb-4">
              We retain your information for as long as necessary to provide our services and fulfill 
              our legal obligations. You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Your Rights</h2>
            <p className="text-slate-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Access, update, or delete your personal information</li>
              <li>Opt-out of certain communications</li>
              <li>Request a copy of your data</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-700">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 text-slate-700">
              <p>Email: privacy@brokercopilot.com</p>
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

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Changes to This Policy</h2>
            <p className="text-slate-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}