'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import PaywallModal from './PaywallModal';
import { canAnalyze, incrementUsage, getRemainingAnalyses, upgradeToPremium } from '@/lib/usage-tracker';

interface UploadSectionProps {
  setAnalysisResult: (result: any) => void;
}

export default function UploadSection({ setAnalysisResult }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    setRemaining(getRemainingAnalyses());
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  const analyzeContract = async () => {
    if (!file) return;

    // Check if user can analyze
    if (!canAnalyze()) {
      setShowPaywall(true);
      return;
    }

    setAnalyzing(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setError(result.error || 'Analysis failed');
        return;
      }

      // Increment usage after successful analysis
      incrementUsage();
      setRemaining(getRemainingAnalyses());

      setAnalysisResult(result);
    } catch (error: any) {
      console.error('Analysis failed:', error);
      setError(error.message || 'Failed to connect to server');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleUpgrade = async (plan: 'onetime' | 'monthly' | 'annual') => {
    try {
      // Import Stripe checkout function
      const { createCheckoutSession, STRIPE_PRICES } = await import('@/lib/stripe');

      // Determine price ID and mode based on plan
      let priceId: string;
      let mode: 'payment' | 'subscription';

      if (plan === 'onetime') {
        priceId = STRIPE_PRICES.oneTime;
        mode = 'payment';
      } else if (plan === 'monthly') {
        priceId = STRIPE_PRICES.monthly;
        mode = 'subscription';
      } else {
        priceId = STRIPE_PRICES.annual;
        mode = 'subscription';
      }

      // Create Stripe checkout session
      const { url } = await createCheckoutSession(priceId, mode);

      // Redirect to Stripe checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Upgrade failed:', error);
      alert('Failed to start checkout. Please try again.');
    }
  };

  return (
    <>
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onUpgrade={handleUpgrade}
      />

      <section id="upload" className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            Try It Free (First Contract)
          </h2>
          <p className="text-zinc-400 text-center mb-4">
            Upload a contract and see what our AI finds. No credit card required.
          </p>
          {remaining !== Infinity && (
            <p className="text-center text-sm text-blue-400 mb-8">
              {remaining > 0 ? `${remaining} free analysis remaining` : 'Upgrade for unlimited analyses'}
            </p>
          )}

        <div
          {...getRootProps()}
          className={`glass p-16 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-zinc-700 hover:border-zinc-600'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <div className="text-6xl mb-4">📄</div>
            {file ? (
              <>
                <p className="text-xl font-semibold mb-2">{file.name}</p>
                <p className="text-sm text-zinc-500 mb-6">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </>
            ) : (
              <>
                <p className="text-xl font-semibold mb-2">
                  Drop your contract here
                </p>
                <p className="text-zinc-500">
                  or click to browse (PDF, DOC, DOCX)
                </p>
              </>
            )}
          </div>
        </div>

        {file && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <button
              onClick={analyzeContract}
              disabled={analyzing}
              className="px-12 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-lg transition shadow-lg"
            >
              {analyzing ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Analyzing...</span>
                </span>
              ) : remaining > 0 || remaining === Infinity ? (
                'Analyze Contract'
              ) : (
                'Upgrade to Analyze'
              )}
            </button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400"
              >
                ⚠️ {error}
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
    </>
  );
}
