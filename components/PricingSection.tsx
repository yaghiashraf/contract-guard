'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Pay Per Use',
      price: '$9.99',
      period: 'per contract',
      description: 'Perfect for occasional reviews',
      features: [
        'AI-powered analysis',
        'Plain-English report',
        'Risk scoring & recommendations',
        'PDF export',
        '48hr email support',
      ],
      cta: 'Analyze Contract',
      popular: false,
    },
    {
      name: 'Unlimited',
      price: billingCycle === 'monthly' ? '$99' : '$79',
      period: billingCycle === 'monthly' ? '/month' : '/month',
      billedAnnually: billingCycle === 'annual',
      description: 'For growing businesses',
      features: [
        'Everything in Pay Per Use',
        'Unlimited contract reviews',
        'Priority support (4hr response)',
        'Contract template library',
        'Team collaboration tools',
        'Custom risk profiles',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          98% Cheaper Than a <span className="gradient-text">Lawyer</span>
        </h2>
        <p className="text-zinc-400 text-center mb-12 text-lg">
          One bad contract can cost $50,000. Our AI costs $9.99.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="glass p-1.5 rounded-xl inline-flex relative">
            <motion.div
              className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
              animate={{
                left: billingCycle === 'monthly' ? '6px' : 'calc(50%)',
                right: billingCycle === 'monthly' ? 'calc(50%)' : '6px',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setBillingCycle('monthly')}
              className="px-8 py-3 rounded-lg transition relative z-10 font-medium w-[120px]"
              style={{
                color: billingCycle === 'monthly' ? 'white' : 'rgb(161, 161, 170)',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className="px-8 py-3 rounded-lg transition relative z-10 font-medium w-[120px]"
              style={{
                color: billingCycle === 'annual' ? 'white' : 'rgb(161, 161, 170)',
              }}
            >
              Annual
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: billingCycle === 'annual' ? 1 : 0.8 }}
                className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold"
              >
                Save 20%
              </motion.span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative glass p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col ${
                plan.popular
                  ? 'border-2 border-blue-500 shadow-xl shadow-blue-500/20'
                  : 'border border-zinc-800'
              }`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-1.5 rounded-full text-sm font-semibold shadow-lg"
                >
                  Most Popular
                </motion.div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                {plan.popular ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={billingCycle}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-baseline justify-center mb-3"
                    >
                      <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                      <span className="text-zinc-500 ml-2 text-lg">{plan.period}</span>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="flex items-baseline justify-center mb-3">
                    <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-zinc-500 ml-2 text-lg">{plan.period}</span>
                  </div>
                )}
                {plan.billedAnnually && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-green-400 mb-2"
                  >
                    Billed annually ($948/year)
                  </motion.p>
                )}
                <p className="text-zinc-400">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.05 }}
                    className="flex items-start"
                  >
                    <svg
                      className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-zinc-600 mt-12"
        >
          Cancel anytime • No hidden fees • Secure payment processing
        </motion.p>
      </motion.div>
    </section>
  );
}
