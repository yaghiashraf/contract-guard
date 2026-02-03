// Stripe Price IDs (create these in Stripe Dashboard)
// For MVP, use test mode

export const STRIPE_PRICES = {
  oneTime: process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME || '', // $9.99 one-time
  monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || '', // $99/month
  annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL || '', // $79/month billed annually
};

// Validate that price IDs are set
export function validatePriceIds() {
  const missing = [];
  if (!STRIPE_PRICES.oneTime) missing.push('NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME');
  if (!STRIPE_PRICES.monthly) missing.push('NEXT_PUBLIC_STRIPE_PRICE_MONTHLY');
  if (!STRIPE_PRICES.annual) missing.push('NEXT_PUBLIC_STRIPE_PRICE_ANNUAL');

  if (missing.length > 0) {
    throw new Error(
      `Missing Stripe Price IDs. Please set these environment variables in Vercel:\n${missing.join('\n')}\n\nSee STRIPE_SETUP_GUIDE.md for instructions.`
    );
  }
}

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription' = 'subscription') {
  // Validate price ID
  if (!priceId || priceId === '' || priceId === 'price_xxx' || priceId === 'price_yyy' || priceId === 'price_zzz') {
    throw new Error(
      'Stripe products not configured yet. Please create Stripe products and add Price IDs to Vercel environment variables. See STRIPE_SETUP_GUIDE.md for instructions.'
    );
  }

  const response = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId, mode }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout session');
  }

  const data = await response.json();
  return data;
}
