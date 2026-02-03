'use client';

import { motion } from 'framer-motion';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`${sizes[size]} relative flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Base Platform */}
        <motion.rect
          x="30"
          y="75"
          width="40"
          height="4"
          rx="2"
          fill="url(#mainGradient)"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />

        {/* Center Pole */}
        <motion.rect
          x="48"
          y="30"
          width="4"
          height="45"
          rx="2"
          fill="url(#mainGradient)"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ transformOrigin: 'bottom' }}
        />

        {/* Horizontal Beam */}
        <motion.rect
          x="25"
          y="28"
          width="50"
          height="3"
          rx="1.5"
          fill="url(#mainGradient)"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        />

        {/* Left Chain */}
        <motion.line
          x1="35"
          y1="31"
          x2="35"
          y2="45"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />

        {/* Right Chain */}
        <motion.line
          x1="65"
          y1="31"
          x2="65"
          y2="45"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />

        {/* Left Scale Pan */}
        <motion.ellipse
          cx="35"
          cy="47"
          rx="10"
          ry="3"
          fill="url(#goldGradient)"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, delay: 0.8, type: 'spring' }}
        />

        {/* Right Scale Pan */}
        <motion.ellipse
          cx="65"
          cy="47"
          rx="10"
          ry="3"
          fill="url(#goldGradient)"
          initial={{ scale: 0, rotate: 15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, delay: 0.8, type: 'spring' }}
        />

        {/* Document Icon on Left Pan */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
        >
          <rect x="30" y="40" width="10" height="6" rx="1" fill="white" opacity="0.9" />
          <line x1="31" y1="42" x2="39" y2="42" stroke="url(#mainGradient)" strokeWidth="0.5" />
          <line x1="31" y1="44" x2="37" y2="44" stroke="url(#mainGradient)" strokeWidth="0.5" />
        </motion.g>

        {/* Checkmark on Right Pan */}
        <motion.path
          d="M62 42 L64 44 L68 40"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        />

        {/* Shield Background */}
        <motion.path
          d="M50 15 L58 18 L58 25 Q58 30 50 33 Q42 30 42 25 L42 18 Z"
          fill="url(#mainGradient)"
          opacity="0.15"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
      </svg>
    </div>
  );
}
