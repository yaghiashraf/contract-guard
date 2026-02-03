'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: 'unlimited' | 'pro') => void;
}

export default function PaywallModal({ isOpen, onClose, onUpgrade }: PaywallModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'unlimited' | 'pro'>('unlimited');

  const plans = [
    {
      id: 'unlimited' as const,
      name: 'Unlimited Plan',
      price: '$99',
      period: '/month',
      features: [
        '✓ Unlimited contract analyses',
        '✓ Standard risk detection',
        '✓ Plain-English reports',
        '✓ PDF exports',
        '✓ Priority support',
      ],
      cta: 'Upgrade to Unlimited',
      popular: true,
    },
    {
      id: 'pro' as const,
      name: 'Professional Plan',
      price: '$199',
      period: '/month',
      features: [
        '✓ Everything in Unlimited',
        '✓ Comprehensive deep analysis',
        '✓ AI clause substitution suggestions',
        '✓ Custom risk profiles',
        '✓ Team collaboration',
        '✓ White-label reports',
      ],
      cta: 'Upgrade to Professional',
      popular: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass max-w-5xl w-full rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="inline-block mb-4"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </motion.div>
                <h2 className="text-3xl font-bold mb-3">
                  You've Used Your Free Analysis
                </h2>
                <p className="text-zinc-400 text-lg">
                  Upgrade now to continue protecting yourself from bad contracts
                </p>
              </div>

              {/* Plans */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {plans.map((plan, i) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                      selectedPlan === plan.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-600'
                    } ${plan.popular ? 'shadow-xl shadow-blue-500/20' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </div>
                    )}

                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                        <span className="text-zinc-500 ml-2">{plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="text-sm text-zinc-300">
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {selectedPlan === plan.id && (
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="flex items-center justify-center text-blue-400 text-sm font-semibold"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Selected
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold transition"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => onUpgrade(selectedPlan)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition shadow-lg shadow-blue-500/50"
                >
                  {plans.find(p => p.id === selectedPlan)?.cta}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="flex items-center justify-center gap-8 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Cancel Anytime
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Money-Back Guarantee
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
