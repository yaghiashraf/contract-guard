'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { createClient } from '@/lib/supabase/client';

interface NavigationProps {
  showCTA?: boolean;
  onCTAClick?: () => void;
}

export default function Navigation({ showCTA = true, onCTAClick }: NavigationProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-zinc-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/" className="flex items-center space-x-3">
            <Logo size="sm" />
            <span className="text-2xl font-bold gradient-text">Contract Guard</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-6"
        >
          <a href="/#how-it-works" className="text-zinc-400 hover:text-zinc-100 transition hidden sm:block">
            How It Works
          </a>
          <a href="/#pricing" className="text-zinc-400 hover:text-zinc-100 transition hidden sm:block">
            Pricing
          </a>

          {!loading && (
            <>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-zinc-400 hover:text-zinc-100 transition"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-zinc-400 hover:text-zinc-100 transition"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-zinc-400 hover:text-zinc-100 transition"
                  >
                    Sign In
                  </Link>
                  {showCTA && (
                    <button
                      onClick={onCTAClick}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition shadow-lg shadow-blue-500/30"
                    >
                      Try Free
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </motion.div>
      </div>
    </nav>
  );
}
