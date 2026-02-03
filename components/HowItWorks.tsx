'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Upload Contract',
      description: 'Drop any PDF, DOC, or DOCX contract into our analyzer.',
      icon: '📤',
    },
    {
      number: '2',
      title: 'AI Analyzes in Seconds',
      description: 'Our AI reads every clause and compares against 10,000+ risky patterns.',
      icon: '🤖',
    },
    {
      number: '3',
      title: 'Get Plain-English Report',
      description: 'Red flags highlighted with explanations like "This prevents you from working in your industry for 2 years."',
      icon: '✅',
    },
  ];

  return (
    <section id="how-it-works" className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-4">
          How It Works
        </h2>
        <p className="text-zinc-400 text-center mb-16 max-w-2xl mx-auto">
          No legal degree needed. Just upload, wait 2 minutes, and get results you can actually understand.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="glass p-8 rounded-xl hover:border-blue-500/50 transition-all duration-300">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/50">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-zinc-400">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass p-8 rounded-xl"
        >
          <h3 className="text-2xl font-bold mb-4">What Our AI Catches:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              '🚫 Non-compete clauses that block your career',
              '💰 Unlimited liability (you pay for everything)',
              '📝 Automatic renewals with no escape',
              '⚖️ Unfair termination terms',
              '🔒 IP transfers (they own your work)',
              '💸 Hidden fees and penalties',
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
