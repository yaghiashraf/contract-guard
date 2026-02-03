'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import UploadSection from '@/components/UploadSection';
import PricingSection from '@/components/PricingSection';
import ImprovedHowItWorks from '@/components/ImprovedHowItWorks';
import SocialProof from '@/components/SocialProof';
import AnalysisResults from '@/components/AnalysisResults';
import AnimatedHero from '@/components/AnimatedHero';
import Logo from '@/components/Logo';
import ScrollReveal from '@/components/ScrollReveal';
import TrustSection from '@/components/TrustSection';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const scrollToUpload = () => {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <Logo size="sm" />
            <span className="text-2xl font-bold gradient-text">Contract Guard</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-6"
          >
            <a href="#how-it-works" className="text-zinc-400 hover:text-zinc-100 transition">How It Works</a>
            <a href="#pricing" className="text-zinc-400 hover:text-zinc-100 transition">Pricing</a>
            <button
              onClick={scrollToUpload}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition shadow-lg shadow-blue-500/30"
            >
              Try Free
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-4"
                >
                  <div className="glass px-4 py-2 rounded-full text-sm">
                    <span className="text-green-400">●</span> AI-Powered Contract Analysis
                  </div>
                </motion.div>

                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                  Stop Signing Contracts{' '}
                  <span className="gradient-text">That Will Screw You</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl md:text-2xl text-zinc-400 mb-4"
              >
                AI trained on millions of contracts spots hidden risks in seconds—so you don't pay lawyers thousands or lose more in bad deals.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-zinc-500 mb-8"
              >
                Upload any contract. Get AI-powered analysis in plain English. Spot the risky clauses before they cost you thousands.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <button
                  onClick={scrollToUpload}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold text-lg transition shadow-lg shadow-blue-500/50 animate-glow"
                >
                  Analyze Contract for $9.99
                </button>
                <button className="px-8 py-4 glass hover:bg-zinc-800/50 text-white rounded-lg font-semibold text-lg transition border border-zinc-700">
                  See Example Report
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-zinc-600"
              >
                98% cheaper than hiring a lawyer • Results in 2 minutes
              </motion.p>
            </div>

            {/* Right: Animated Document Demo */}
            <div className="flex justify-center">
              <AnimatedHero />
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Contracts Analyzed', value: '1,247' },
            { label: 'Red Flags Found', value: '3,891' },
            { label: 'Money Saved', value: '$234k+' },
            { label: 'Avg Review Time', value: '2 min' },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="text-center glass p-4 rounded-xl hover:border-blue-500/50 transition-all duration-300">
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </motion.div>
      </section>

      {/* Trust & Features Section */}
      <TrustSection />

      {/* Pain Points Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-16">
              Ever Been <span className="gradient-text">Burned</span> by a Bad Contract?
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💸',
                title: 'Lawyers Cost $300-500/Hour',
                description: 'Most small businesses can\'t afford legal review for every NDA, client agreement, or vendor contract.',
              },
              {
                icon: '😰',
                title: 'You Sign Blindly and Hope',
                description: 'You skim the contract, think "this looks fine," and sign. Then 6 months later, a hidden clause destroys you.',
              },
              {
                icon: '⏰',
                title: 'It Happens Too Often',
                description: 'You sign 3-5 contracts a month. Even one bad clause (non-compete, IP transfer, unlimited liability) can cost $50k+.',
              },
            ].map((pain, i) => (
              <ScrollReveal key={i} delay={i * 0.15} direction="up">
                <div className="glass p-8 rounded-xl hover:border-blue-500/50 transition-all duration-300 group h-full flex flex-col">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="text-5xl mb-4"
                  >
                    {pain.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{pain.title}</h3>
                  <p className="text-zinc-400 flex-grow">{pain.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section or Results */}
      {analysisResult && analysisResult.analysis ? (
        <AnalysisResults
          analysis={analysisResult.analysis}
          fileName={analysisResult.fileName || 'contract.pdf'}
        />
      ) : (
        <UploadSection setAnalysisResult={setAnalysisResult} />
      )}

      {/* How It Works */}
      {!analysisResult && <ImprovedHowItWorks />}

      {/* Social Proof */}
      <ScrollReveal>
        <SocialProof />
      </ScrollReveal>

      {/* Pricing */}
      <ScrollReveal>
        <PricingSection />
      </ScrollReveal>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center glass p-12 rounded-2xl relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Don't Sign Another Contract <span className="gradient-text">Without This</span>
              </h2>
              <p className="text-xl text-zinc-400 mb-8">
                One bad contract can cost you $50,000. Our AI costs $9.99.
              </p>
              <a
                href="#pricing"
                className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold text-xl transition shadow-lg shadow-blue-500/50 animate-glow"
              >
                Protect Yourself Now
              </a>
              <p className="text-sm text-zinc-600 mt-4">
                Start with our unlimited plan
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center space-x-3 mb-3 justify-center md:justify-start">
                <Logo size="sm" />
                <span className="font-bold text-lg">Contract Guard</span>
              </div>
              <p className="text-sm text-zinc-500 max-w-sm">
                AI-powered contract analysis to spot risky clauses before they cost you.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#how-it-works" className="text-zinc-500 hover:text-zinc-300 transition">How It Works</a>
              <a href="#pricing" className="text-zinc-500 hover:text-zinc-300 transition">Pricing</a>
              <a href="/privacy-policy" className="text-zinc-500 hover:text-zinc-300 transition">Privacy</a>
              <a href="/terms-of-service" className="text-zinc-500 hover:text-zinc-300 transition">Terms</a>
              <a href="/contact" className="text-zinc-500 hover:text-zinc-300 transition">Contact</a>
            </div>

            {/* Social */}
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-500 hover:text-zinc-300 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-300 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-300 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <p className="text-center text-sm text-zinc-600">
              © 2026 Contract Guard. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
