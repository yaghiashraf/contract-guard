// Usage tracking for free tier limits
export const USAGE_KEY = 'contract_guard_usage';
export const MAX_FREE_ANALYSES = 1;

export interface Usage {
  count: number;
  lastAnalysis: string;
  isPremium: boolean;
}

export function getUsage(): Usage {
  if (typeof window === 'undefined') {
    return { count: 0, lastAnalysis: '', isPremium: false };
  }

  const stored = localStorage.getItem(USAGE_KEY);
  if (!stored) {
    return { count: 0, lastAnalysis: '', isPremium: false };
  }

  try {
    return JSON.parse(stored);
  } catch {
    return { count: 0, lastAnalysis: '', isPremium: false };
  }
}

export function incrementUsage(): Usage {
  const usage = getUsage();
  const updated = {
    ...usage,
    count: usage.count + 1,
    lastAnalysis: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(USAGE_KEY, JSON.stringify(updated));
  }

  return updated;
}

export function canAnalyze(): boolean {
  const usage = getUsage();
  return usage.isPremium || usage.count < MAX_FREE_ANALYSES;
}

export function getRemainingAnalyses(): number {
  const usage = getUsage();
  if (usage.isPremium) return Infinity;
  return Math.max(0, MAX_FREE_ANALYSES - usage.count);
}

export function upgradeToPremium(): void {
  const usage = getUsage();
  const updated = { ...usage, isPremium: true };
  if (typeof window !== 'undefined') {
    localStorage.setItem(USAGE_KEY, JSON.stringify(updated));
  }
}

export function resetUsage(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USAGE_KEY);
  }
}
