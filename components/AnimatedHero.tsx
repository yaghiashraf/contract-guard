'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedHero() {
  const [currentPage, setCurrentPage] = useState(1);
  const [redFlags, setRedFlags] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [clausesOk, setClausesOk] = useState(0);
  const [scanning, setScanning] = useState(true);

  const controls = useAnimation();
  const totalPages = 5;

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await controls.start({ opacity: 1, y: 0 });

      // Simulate page flipping and scanning
      for (let page = 1; page <= totalPages; page++) {
        setCurrentPage(page);
        await new Promise(resolve => setTimeout(resolve, 800));

        // Update counters progressively
        if (page === 2) {
          setRedFlags(1);
          setClausesOk(3);
          setRiskScore(25);
        } else if (page === 3) {
          setClausesOk(6);
          setRiskScore(40);
        } else if (page === 4) {
          setRedFlags(2);
          setClausesOk(9);
          setRiskScore(55);
        } else if (page === 5) {
          setClausesOk(12);
          setRiskScore(65);
        }
      }

      setScanning(false);
    };

    sequence();
  }, [controls]);

  return (
    <div className="relative w-full max-w-md mx-auto h-[400px] mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        className="relative"
      >
        {/* Document Stack */}
        <div className="relative">
          {/* Background Pages */}
          {[3, 2, 1].map((depth) => (
            <motion.div
              key={depth}
              className="absolute inset-0 bg-white rounded-lg shadow-xl"
              style={{
                zIndex: -depth,
                transform: `translateY(${depth * 4}px) translateX(${depth * 2}px)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: scanning ? 0.3 : 0.5 }}
            />
          ))}

          {/* Main Document */}
          <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Page Number Indicator */}
            <div className="absolute top-4 right-4 z-20">
              <div className="glass px-3 py-1 rounded-full text-xs font-mono text-zinc-700">
                Page {currentPage}/{totalPages}
              </div>
            </div>

            {/* Document Content */}
            <div className="p-8 space-y-3 relative z-10">
              {/* Document Header */}
              <div className="mb-6">
                <div className="h-3 w-32 bg-gray-300 rounded mb-2" />
                <div className="h-2 w-48 bg-gray-200 rounded" />
              </div>

              {/* Document Lines - Changes per page */}
              {[...Array(14)].map((_, i) => {
                const isHighlighted =
                  (currentPage === 2 && i === 5) ||
                  (currentPage === 4 && (i === 8 || i === 11));

                const lineWidth = i === 3 || i === 7 || i === 13 ? '60%' : '100%';

                return (
                  <motion.div
                    key={i}
                    className="h-2 bg-gray-200 rounded relative"
                    style={{ width: lineWidth }}
                    animate={{
                      backgroundColor: isHighlighted ? '#fca5a5' : '#e5e7eb',
                      scale: isHighlighted ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isHighlighted && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute -right-12 top-1/2 -translate-y-1/2"
                      >
                        <div className="text-red-500 text-xs font-bold">🚩</div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Scanning Beam */}
            {scanning && (
              <>
                <motion.div
                  animate={{
                    top: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: totalPages - 1,
                    ease: 'linear',
                  }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70 z-20"
                  style={{ filter: 'blur(1px)' }}
                />

                {/* Scan Lines Effect */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  <div
                    className="w-full h-full opacity-5"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        0deg,
                        rgba(59, 130, 246, 0.3) 0px,
                        transparent 1px,
                        transparent 2px,
                        rgba(59, 130, 246, 0.3) 3px
                      )`,
                    }}
                  />
                </div>
              </>
            )}

            {/* Page Flip Animation */}
            {scanning && (
              <motion.div
                key={currentPage}
                initial={{ rotateY: -15, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none"
                style={{ transformStyle: 'preserve-3d' }}
              />
            )}

            {/* Completion Badge */}
            {!scanning && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="absolute top-4 left-4 z-20"
              >
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                  <span>✓</span>
                  <span>Scan Complete</span>
                </div>
              </motion.div>
            )}

            {/* Approval Stamp */}
            {!scanning && (
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.5
                }}
                className="absolute bottom-8 right-8 z-20"
              >
                {/* Wax Seal */}
                <div className="relative">
                  {/* Seal Base */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-xl flex items-center justify-center">
                    {/* Wax Texture Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-red-500/30 via-transparent to-transparent" />

                    {/* Seal Design */}
                    <div className="relative z-10 text-center">
                      {/* Shield Icon */}
                      <svg
                        className="w-10 h-10 text-red-200 mx-auto mb-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div className="text-[8px] font-bold text-red-200 tracking-wider">VERIFIED</div>
                    </div>

                    {/* Seal Border Effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-red-400/20" />
                  </div>

                  {/* Drip Effect */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-gradient-to-b from-red-700 to-red-800 rounded-b-full origin-top"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Live Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-3 gap-4"
        >
          {/* Red Flags Counter */}
          <div className="glass p-4 rounded-lg text-center relative overflow-hidden">
            <motion.div
              key={redFlags}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-red-400"
            >
              {redFlags}
            </motion.div>
            <div className="text-xs text-zinc-400 mt-1">Red Flags</div>
            {scanning && redFlags > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                className="absolute top-1 right-1"
              >
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              </motion.div>
            )}
          </div>

          {/* Risk Score Counter */}
          <div className="glass p-4 rounded-lg text-center relative overflow-hidden">
            <motion.div
              key={riskScore}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-3xl font-bold ${
                riskScore >= 60 ? 'text-yellow-400' : 'text-blue-400'
              }`}
            >
              {riskScore}
            </motion.div>
            <div className="text-xs text-zinc-400 mt-1">Risk Score</div>
            {scanning && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-yellow-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${riskScore}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>

          {/* Clauses OK Counter */}
          <div className="glass p-4 rounded-lg text-center">
            <motion.div
              key={clausesOk}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-green-400"
            >
              {clausesOk}
            </motion.div>
            <div className="text-xs text-zinc-400 mt-1">Clauses OK</div>
          </div>
        </motion.div>

        {/* Scanning Status */}
        {scanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center"
          >
            <div className="inline-flex items-center space-x-2 text-sm text-zinc-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
              />
              <span>Analyzing contract...</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
