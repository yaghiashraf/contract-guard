'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: 1,
    title: 'Upload Your Contract',
    description: 'Drop any PDF contract. No sign-up required.',
    icon: '📄',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: 2,
    title: 'AI Scans Every Clause',
    description: 'Our AI reads the entire document in seconds, analyzing each clause for risks.',
    icon: '🔍',
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: 3,
    title: 'Get Risk Report',
    description: 'Receive a detailed breakdown of red flags, risk score, and plain English recommendations.',
    icon: '📊',
    color: 'from-orange-500 to-red-500',
  },
  {
    number: 4,
    title: 'Negotiate Smarter',
    description: 'Use our insights to push back on unfair terms and protect yourself.',
    icon: '💪',
    color: 'from-green-500 to-emerald-500',
  },
];

export default function ImprovedHowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" ref={ref} className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-4">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          From upload to insights in under 2 minutes. No legal degree required.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Flow Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                  className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-zinc-700 to-zinc-800 origin-left"
                  style={{ width: 'calc(100% - 2rem)' }}
                >
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.8 + index * 0.15,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </motion.div>
                </motion.div>
              )}

              {/* Card */}
              <div className="glass p-6 rounded-2xl hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
                {/* Number Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    delay: 0.2 + index * 0.15,
                  }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto`}
                >
                  {step.number}
                </motion.div>

                {/* Icon */}
                <div className="text-5xl mb-4 text-center">{step.icon}</div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                <p className="text-zinc-400 text-center text-sm flex-grow">
                  {step.description}
                </p>

                {/* Animated Border Glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: [0, 0.5, 0] } : {}}
                  transition={{
                    duration: 2,
                    delay: 1 + index * 0.3,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 blur-xl -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline for mobile */}
        <div className="lg:hidden mt-12 relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500" />
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 glass p-8 rounded-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '< 2 min', label: 'Average Analysis Time' },
              { value: '98%', label: 'Accuracy Rate' },
              { value: '$0', label: 'First Contract Free' },
              { value: '24/7', label: 'Always Available' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
