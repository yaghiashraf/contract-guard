'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function PrivacyPolicy() {
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
          <h1 className="text-5xl font-bold mb-4 gradient-text">Privacy Policy</h1>
          <p className="text-zinc-500 mb-12">Last updated: February 2, 2026</p>

          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="glass p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Privacy Matters</h2>
              <p className="text-zinc-300 leading-relaxed">
                At Contract Guard, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information and contract data.
              </p>
            </div>

            <div className="space-y-8">
              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">1. Information We Collect</h3>
                <div className="text-zinc-300 space-y-3">
                  <p><strong>Account Information:</strong> Email address, name, and payment details when you create an account or subscribe.</p>
                  <p><strong>Contract Documents:</strong> The contracts you upload for analysis are temporarily processed by our AI.</p>
                  <p><strong>Usage Data:</strong> Analytics about how you use our service to improve features and user experience.</p>
                  <p><strong>Device Information:</strong> Browser type, IP address, and device identifiers for security purposes.</p>
                </div>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">2. How We Use Your Information</h3>
                <ul className="text-zinc-300 space-y-2 list-disc list-inside">
                  <li>To provide contract analysis services</li>
                  <li>To process payments and manage subscriptions</li>
                  <li>To send important service updates and notifications</li>
                  <li>To improve our AI models and detection accuracy</li>
                  <li>To prevent fraud and ensure platform security</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">3. Data Security & Storage</h3>
                <div className="text-zinc-300 space-y-3">
                  <p><strong>Encryption:</strong> All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.</p>
                  <p><strong>Document Retention:</strong> Uploaded contracts are permanently deleted after analysis unless you save them to your account.</p>
                  <p><strong>Access Control:</strong> Strict access controls ensure only authorized personnel can access systems.</p>
                  <p><strong>Compliance:</strong> We are GDPR compliant and SOC 2 Type II certified.</p>
                </div>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">4. Data Sharing & Disclosure</h3>
                <div className="text-zinc-300 space-y-3">
                  <p>We do not sell your personal information. We may share data with:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Service Providers:</strong> Payment processors (Stripe), hosting providers (AWS), and analytics tools</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger or acquisition</li>
                  </ul>
                </div>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">5. Your Rights</h3>
                <div className="text-zinc-300 space-y-2">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your data</li>
                    <li>Export your data in a portable format</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                  <p className="mt-4">To exercise these rights, contact us at <a href="mailto:privacy@contractguard.ai" className="text-blue-400 hover:text-blue-300">privacy@contractguard.ai</a></p>
                </div>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">6. Cookies & Tracking</h3>
                <div className="text-zinc-300 space-y-3">
                  <p>We use cookies and similar technologies for:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Authentication and security</li>
                    <li>Preferences and settings</li>
                    <li>Analytics and performance monitoring</li>
                  </ul>
                  <p>You can control cookies through your browser settings.</p>
                </div>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">7. International Data Transfers</h3>
                <p className="text-zinc-300">
                  Your data may be processed in countries outside your residence. We ensure adequate protections through standard contractual clauses and Privacy Shield frameworks where applicable.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">8. Children's Privacy</h3>
                <p className="text-zinc-300">
                  Our service is not intended for users under 18. We do not knowingly collect data from children.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">9. Changes to This Policy</h3>
                <p className="text-zinc-300">
                  We may update this policy periodically. We will notify you of significant changes via email or through the service.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl border-2 border-blue-500">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Contact Us</h3>
                <div className="text-zinc-300 space-y-2">
                  <p>For privacy-related questions or concerns:</p>
                  <p>Email: <a href="mailto:privacy@contractguard.ai" className="text-blue-400 hover:text-blue-300">privacy@contractguard.ai</a></p>
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
