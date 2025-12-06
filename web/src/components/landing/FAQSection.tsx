"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How does Broker Copilot integrate with my existing workflow?",
    answer: "Broker Copilot seamlessly integrates with Microsoft Outlook, your email, and calendar. It automatically analyzes your client communications, tracks renewal dates, and helps you stay organized without changing your current processes."
  },
  {
    question: "Is my client data secure and private?",
    answer: "Absolutely. We use enterprise-grade encryption and follow industry best practices for data security. Your data is stored securely and never shared with third parties. We're compliant with major data protection regulations."
  },
  {
    question: "How does the AI help with insurance renewals?",
    answer: "Our AI analyzes your client database, tracks renewal dates, identifies at-risk accounts, and generates personalized renewal strategies. It can also draft emails and create reports to help you stay proactive with your renewals."
  },
  {
    question: "Can I customize the reports and insights?",
    answer: "Yes! Broker Copilot offers customizable dashboards and reports. You can filter by client type, renewal date, premium amount, and other criteria to get insights that matter most to your business."
  },
  {
    question: "What happens to my data if I cancel my subscription?",
    answer: "You maintain full control of your data. Upon cancellation, you can export all your data, and we'll securely delete it from our servers according to our data retention policy outlined in our privacy policy."
  },
  {
    question: "How long does it take to set up and start seeing results?",
    answer: "Setup takes less than 10 minutes. Simply connect your Outlook account, import your client data, and you'll start seeing insights immediately. Most brokers see significant time savings within the first week."
  },
  {
    question: "Do you offer customer support and training?",
    answer: "Yes! We provide comprehensive onboarding, video tutorials, and ongoing customer support. Our team is available to help you maximize the value of Broker Copilot for your specific business needs."
  },
  {
    question: "Can I try Broker Copilot before committing to a subscription?",
    answer: "Absolutely! We offer a free trial so you can experience the full power of Broker Copilot risk-free. No credit card required to get started."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get answers to common questions about Broker Copilot and how it can transform your insurance business.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-slate-200 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-slate-50/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-slate-900 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Still have questions?
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Contact our support team
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};