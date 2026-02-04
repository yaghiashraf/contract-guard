'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { createClient } from '@/lib/supabase/client';

interface DashboardClientProps {
  user: any;
  profile: any;
  subscription: any;
  analyses: any[];
}

export default function DashboardClient({
  user,
  profile,
  subscription,
  analyses,
}: DashboardClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const hasActiveSubscription = subscription && subscription.status === 'active';
  const isOneTime = subscription && subscription.plan_type === 'onetime';

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Logo size="sm" />
            <span className="text-2xl font-bold gradient-text">Contract Guard</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/#upload" className="px-4 py-2 text-sm hover:text-blue-500 transition">
              Analyze Contract
            </Link>
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition disabled:opacity-50"
            >
              {loading ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {profile?.full_name || 'User'}!
            </h1>
            <p className="text-zinc-400">{user.email}</p>
          </div>

          {/* Subscription Status */}
          <div className="glass p-6 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold mb-4">Subscription Status</h2>
            {hasActiveSubscription ? (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-green-500 mb-1">Active Premium</p>
                  <p className="text-zinc-400">
                    Plan: {subscription.plan_type === 'monthly' ? 'Monthly Unlimited' : subscription.plan_type === 'annual' ? 'Annual Unlimited' : 'One-Time Analysis'}
                  </p>
                  {!isOneTime && subscription.current_period_end && (
                    <p className="text-sm text-zinc-500 mt-2">
                      {subscription.cancel_at_period_end ? 'Cancels' : 'Renews'} on{' '}
                      {new Date(subscription.current_period_end).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {!isOneTime && (
                  <Link
                    href="/#pricing"
                    className="px-4 py-2 glass hover:bg-zinc-800/50 text-sm rounded-lg transition border border-zinc-700"
                  >
                    Manage Plan
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold mb-1">Free Trial</p>
                  <p className="text-zinc-400">You have 1 free analysis available</p>
                </div>
                <Link
                  href="/#pricing"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition shadow-lg shadow-blue-500/50"
                >
                  Upgrade Now
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/#upload"
              className="glass p-6 rounded-2xl hover:bg-zinc-800/50 transition group"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyze Contract</h3>
              <p className="text-sm text-zinc-400">Upload a new contract for AI analysis</p>
            </Link>

            <Link
              href="/#pricing"
              className="glass p-6 rounded-2xl hover:bg-zinc-800/50 transition group"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">View Plans</h3>
              <p className="text-sm text-zinc-400">Upgrade or manage your subscription</p>
            </Link>

            <Link
              href="/contact"
              className="glass p-6 rounded-2xl hover:bg-zinc-800/50 transition group"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Help</h3>
              <p className="text-sm text-zinc-400">Contact support for assistance</p>
            </Link>
          </div>

          {/* Recent Analyses */}
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Recent Analyses</h2>
            {analyses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-zinc-400 mb-4">No analyses yet</p>
                <Link
                  href="/#upload"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition shadow-lg shadow-blue-500/50"
                >
                  Analyze Your First Contract
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {analyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-zinc-700 transition"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{analysis.file_name}</h3>
                        <p className="text-sm text-zinc-400">
                          {new Date(analysis.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            analysis.overall_risk === 'high'
                              ? 'bg-red-500/20 text-red-500'
                              : analysis.overall_risk === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-500'
                              : 'bg-green-500/20 text-green-500'
                          }`}
                        >
                          {analysis.overall_risk.toUpperCase()} RISK
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">{analysis.summary}</p>
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span>Risk Score: {analysis.risk_score}/100</span>
                      <span>•</span>
                      <span>{analysis.red_flags_count} Red Flags</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
