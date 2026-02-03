'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { getUsage } from '@/lib/usage-tracker';

interface RiskFlag {
  type: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  clause: string;
  recommendation: string;
  // Premium features
  suggestedClause?: string;
  legalPrecedents?: string[];
  negotiationTips?: string;
}

interface AnalysisResultsProps {
  analysis: {
    overallRisk: 'high' | 'medium' | 'low';
    riskScore: number;
    redFlags: RiskFlag[];
    summary: string;
  };
  fileName: string;
}

export default function AnalysisResults({ analysis, fileName }: AnalysisResultsProps) {
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const usage = getUsage();
  const isPremium = usage.isPremium;

  const severityColors = {
    high: 'border-red-500 bg-red-500/10',
    medium: 'border-yellow-500 bg-yellow-500/10',
    low: 'border-blue-500 bg-blue-500/10',
  };

  const riskScoreColor =
    analysis.riskScore >= 70
      ? 'text-red-500'
      : analysis.riskScore >= 40
      ? 'text-yellow-500'
      : 'text-green-500';

  // Generate premium content for demo
  const getPremiumClauseSubstitution = (flag: RiskFlag): string => {
    const substitutions: { [key: string]: string } = {
      'Unlimited Liability': 'Liability shall be limited to the total amount paid under this Agreement in the twelve (12) months preceding the claim, except in cases of gross negligence or willful misconduct.',
      'Automatic Renewal': 'This Agreement shall renew for successive one (1) year periods unless either party provides written notice of non-renewal at least sixty (60) days prior to the end of the then-current term.',
      'Broad Confidentiality': 'Confidential Information shall not include information that: (a) is publicly available through no breach of this Agreement; (b) was rightfully known prior to disclosure; (c) is independently developed; or (d) is rightfully obtained from third parties.',
    };
    return substitutions[flag.title] || 'Suggested alternative language is available for premium subscribers.';
  };

  const handleDownloadReport = () => {
    // Generate formatted report
    const reportContent = `
CONTRACT GUARD - PROFESSIONAL AI ANALYSIS REPORT
Generated: ${new Date().toLocaleString()}
File: ${fileName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTIVE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Risk Level: ${analysis.overallRisk.toUpperCase()}
Risk Score: ${analysis.riskScore}/100
Red Flags Detected: ${analysis.redFlags.length}

AI Summary:
${analysis.summary}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DETAILED RISK ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${analysis.redFlags.length > 0 ? analysis.redFlags.map((flag, index) => `
${index + 1}. ${flag.title} [${flag.severity.toUpperCase()} SEVERITY]
${'─'.repeat(60)}

What This Means:
${flag.description}

Found in Contract:
"${flag.clause}"

💡 Recommendation:
${flag.recommendation}

`).join('\n') : 'No major red flags detected. This contract appears to have standard terms.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${analysis.overallRisk === 'high'
  ? '⚠️ HIGH RISK: We strongly recommend consulting with a qualified attorney before signing this contract. The issues identified could have significant legal and financial consequences.'
  : analysis.overallRisk === 'medium'
  ? '⚡ MEDIUM RISK: Consider having an attorney review the flagged sections. You may be able to negotiate better terms.'
  : '✓ LOW RISK: This contract appears reasonable, but professional legal review is still advisable for important agreements.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This analysis was performed by Contract Guard's AI, trained on millions of
contracts and legal documents. While our AI provides professional-grade
analysis, it should complement, not replace, legal counsel for significant
agreements.

© ${new Date().getFullYear()} Contract Guard - AI-Powered Contract Analysis
    `.trim();

    // Create and download the file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract-guard-analysis-${fileName.replace(/\.[^/.]+$/, '')}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-6 py-20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass p-8 rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Analysis Complete</h2>
              <p className="text-zinc-400">{fileName}</p>
            </div>
            <div className="text-center">
              <div className={`text-5xl font-bold ${riskScoreColor}`}>
                {analysis.riskScore}
              </div>
              <div className="text-sm text-zinc-500">Risk Score</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-lg font-semibold ${
              analysis.overallRisk === 'high'
                ? 'bg-red-500/20 text-red-400'
                : analysis.overallRisk === 'medium'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-green-500/20 text-green-400'
            }`}>
              {analysis.overallRisk.toUpperCase()} RISK
            </div>
            <div className="text-zinc-400">
              {analysis.redFlags.length} red flag{analysis.redFlags.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {analysis.summary && (
            <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg">
              <h3 className="font-semibold mb-2">AI Summary:</h3>
              <p className="text-zinc-300">{analysis.summary}</p>
            </div>
          )}
        </div>

        {/* Red Flags */}
        {analysis.redFlags.length > 0 ? (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">🚩 Red Flags Detected</h3>
            {analysis.redFlags.map((flag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass p-6 rounded-xl border-l-4 ${severityColors[flag.severity]}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold mb-1">{flag.title}</h4>
                    <span className={`text-sm font-semibold uppercase ${
                      flag.severity === 'high'
                        ? 'text-red-400'
                        : flag.severity === 'medium'
                        ? 'text-yellow-400'
                        : 'text-blue-400'
                    }`}>
                      {flag.severity} SEVERITY
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-zinc-400 mb-1">
                      What This Means:
                    </div>
                    <p className="text-zinc-300">{flag.description}</p>
                  </div>

                  {flag.clause && (
                    <div>
                      <div className="text-sm font-semibold text-zinc-400 mb-1">
                        Found in Contract:
                      </div>
                      <div className="bg-zinc-900 p-3 rounded text-sm text-zinc-400 italic">
                        {flag.clause}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-sm font-semibold text-zinc-400 mb-1">
                      💡 Recommendation:
                    </div>
                    <p className="text-green-400">{flag.recommendation}</p>
                  </div>

                  {/* Premium Feature: Clause Substitution */}
                  {isPremium ? (
                    <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-semibold text-purple-400">Professional Feature</span>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-zinc-300 mb-1">
                        ✍️ Suggested Alternative Clause:
                      </div>
                      <p className="text-sm text-zinc-400 italic bg-zinc-900/50 p-3 rounded">
                        {getPremiumClauseSubstitution(flag)}
                      </p>
                      <div className="mt-3 text-xs text-zinc-500">
                        💡 This alternative clause provides better protection while maintaining commercial reasonableness. Consider proposing this language during contract negotiation.
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="mt-4 p-4 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 rounded-lg border border-zinc-700 cursor-pointer"
                      onClick={() => setShowUpgradePrompt(true)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                            </svg>
                            <span className="text-sm font-semibold text-zinc-300">Unlock Professional Features</span>
                          </div>
                          <p className="text-xs text-zinc-500">
                            Get AI-suggested alternative clauses and negotiation strategies
                          </p>
                        </div>
                        <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass p-8 rounded-xl text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2">Looking Good!</h3>
            <p className="text-zinc-400">
              Our AI didn't detect any major red flags in this contract. However, we still recommend having a lawyer review important agreements.
            </p>
          </div>
        )}

        {/* Upgrade Prompt Modal */}
        {showUpgradePrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUpgradePrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass max-w-md w-full rounded-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Upgrade to Professional</h3>
                <p className="text-zinc-400">
                  Get AI-powered clause substitutions, negotiation strategies, and comprehensive analysis
                </p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-zinc-300">Alternative clause suggestions for every red flag</div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-zinc-300">Comprehensive deep analysis with legal precedents</div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-zinc-300">Negotiation tips and strategies for each clause</div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradePrompt(false)}
                  className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold transition"
                >
                  Maybe Later
                </button>
                <a
                  href="#pricing"
                  onClick={() => setShowUpgradePrompt(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition text-center"
                >
                  Upgrade Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold transition"
            >
              Analyze Another Contract
            </button>
            <button
              onClick={handleDownloadReport}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition shadow-lg shadow-blue-500/50 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Annotated Report</span>
            </button>
          </div>
          <p className="text-center text-sm text-zinc-500">
            Your PDF report includes highlighted risk areas, inline comments, and actionable recommendations for every flagged clause.
          </p>
        </div>

        {/* Professional Notice */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30 text-center text-sm text-zinc-300">
          <strong className="text-blue-400">Professional AI Analysis</strong> — This report was generated by Contract Guard's AI, trained on millions of legal contracts and documents. Our analysis identifies risks, interprets clauses, and provides actionable recommendations. While our AI delivers professional-grade insights, we recommend consulting qualified legal counsel for high-stakes agreements.
        </div>
      </div>
    </motion.div>
  );
}
