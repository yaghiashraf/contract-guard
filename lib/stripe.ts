// Stripe Price IDs (create these in Stripe Dashboard)
// For MVP, use test mode

export const STRIPE_PRICES = {
  oneTime: process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME || 'price_xxx', // $9.99 one-time
  monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || 'price_yyy', // $99/month
  annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL || 'price_zzz', // $79/month billed annually
};

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription' = 'subscription') {
  const response = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId, mode }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  const data = await response.json();
  return data;
}
