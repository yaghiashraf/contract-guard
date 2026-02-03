'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Logo size="sm" />
            <span className="text-2xl font-bold gradient-text">Contract Guard</span>
          </Link>
          <Link href="/" className="text-zinc-400 hover:text-zinc-100 transition">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Terms of Service</h1>
          <p className="text-zinc-500 mb-12">Last updated: February 2, 2026</p>

          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-yellow-500/50">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Important Notice</h2>
              <p className="text-zinc-300 leading-relaxed">
                Contract Guard provides AI-powered contract analysis tools. Our service is designed to help you identify potential risks, but it does not constitute legal advice. Always consult with a qualified attorney for legal matters.
              </p>
            </div>

            <div className="space-y-8">
              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">1. Acceptance of Terms</h3>
                <p className="text-zinc-300">
                  By accessing or using Contract Guard's services, you agree to be bound by these Terms of Service. If you do not agree, you may not use our services.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">2. Service Description</h3>
                <div className="text-zinc-300 space-y-3">
                  <p>Contract Guard provides:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>AI-powered contract analysis and risk assessment</li>
                    <li>Plain-language summaries of contract terms</li>
                    <li>Identification of potentially problematic clauses</li>
                    <li>Downloadable reports with recommendations</li>
                  </ul>
                  <p className="mt-4">Our AI is trained to detect common contract issues but cannot replace professional legal review.</p>
                </div>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">3. User Accounts</h3>
                <div className="text-zinc-300 space-y-3">
                  <p><strong>Account Creation:</strong> You must provide accurate information when creating an account.</p>
                  <p><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.</p>
                  <p><strong>Prohibited Uses:</strong> You may not use our service for illegal purposes, to analyze contracts you don't have rights to, or to circumvent usage limits.</p>
                </div>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">4. Subscription & Payment</h3>
                <div className="text-zinc-300 space-y-3">
                  <p><strong>Pricing:</strong> Current pricing is available on our website and may change with notice.</p>
                  <p><strong>Billing:</strong> Subscriptions are billed in advance on a monthly or annual basis.</p>
                  <p><strong>Cancellation:</strong> You may cancel your subscription at any time. No refunds for partial billing periods.</p>
                  <p><strong>Free Trial:</strong> Free trials are available for new users only, one per customer.</p>
                </div>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">5. Intellectual Property</h3>
                <div className="text-zinc-300 space-y-3">
                  <p><strong>Your Content:</strong> You retain all rights to contracts you upload. We only use them to provide our service.</p>
                  <p><strong>Our Content:</strong> All reports, analysis, and service features are proprietary to Contract Guard.</p>
                  <p><strong>License:</strong> We grant you a limited, non-exclusive license to use our service for its intended purpose.</p>
                </div>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">6. Disclaimers & Limitations</h3>
                <div className="text-zinc-300 space-y-3">
                  <p><strong>No Legal Advice:</strong> Our service provides information, not legal advice. Do not rely solely on our analysis for legal decisions.</p>
                  <p><strong>Accuracy:</strong> While we strive for accuracy, our AI may miss issues or provide incorrect assessments.</p>
                  <p><strong>Warranty Disclaimer:</strong> Service provided "AS IS" without warranties of any kind.</p>
                  <p><strong>Liability Limit:</strong> Our liability is limited to the amount you paid in the last 12 months.</p>
                </div>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">7. Indemnification</h3>
                <p className="text-zinc-300">
                  You agree to indemnify Contract Guard from claims arising from your use of the service, violation of these terms, or infringement of third-party rights.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">8. Termination</h3>
                <div className="text-zinc-300 space-y-3">
                  <p>We may suspend or terminate your account if you:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Violate these terms</li>
                    <li>Engage in fraudulent activity</li>
                    <li>Fail to pay fees</li>
                    <li>Use the service in a way that harms others or our platform</li>
                  </ul>
                </div>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">9. Dispute Resolution</h3>
                <div className="text-zinc-300 space-y-3">
                  <p><strong>Governing Law:</strong> These terms are governed by the laws of California.</p>
                  <p><strong>Arbitration:</strong> Disputes will be resolved through binding arbitration, not court proceedings.</p>
                  <p><strong>Class Action Waiver:</strong> You agree to resolve disputes individually, not as part of a class action.</p>
                </div>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">10. Changes to Terms</h3>
                <p className="text-zinc-300">
                  We may modify these terms at any time. Continued use after changes constitutes acceptance of new terms. Material changes will be notified via email.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">11. Contact Information</h3>
                <div className="text-zinc-300 space-y-2">
                  <p>For questions about these terms:</p>
                  <p>Email: <a href="mailto:legal@contractguard.ai" className="text-blue-400 hover:text-blue-300">legal@contractguard.ai</a></p>
                  <p>Address: Contract Guard Inc., 123 Tech Street, San Francisco, CA 94105</p>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
