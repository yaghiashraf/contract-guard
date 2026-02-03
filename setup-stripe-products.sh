#!/bin/bash

# Contract Guard - Quick Stripe Product Setup
# This script creates the 3 required Stripe products and adds them to Vercel

set -e

echo "🚀 Contract Guard - Stripe Product Setup"
echo "=========================================="
echo ""

# Check if Stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    echo "❌ Stripe CLI is not installed"
    echo ""
    echo "Please install it first:"
    echo "  Mac: brew install stripe/stripe-cli/stripe"
    echo "  Linux: https://stripe.com/docs/stripe-cli#install"
    echo ""
    exit 1
fi

echo "✅ Stripe CLI found"
echo ""

# Check if logged in to Stripe
if ! stripe config --list &> /dev/null; then
    echo "🔐 Please login to Stripe first:"
    echo "   stripe login"
    echo ""
    exit 1
fi

echo "Creating Stripe products in TEST mode..."
echo ""

# Create Product 1: One-Time Payment ($9.99)
echo "📦 Creating: Contract Analysis ($9.99 one-time)"
ONETIME_PRICE=$(stripe prices create \
  --unit-amount 999 \
  --currency usd \
  --product-data name="Contract Analysis" \
  --product-data description="Single contract AI analysis with risk detection" \
  | grep "^id" | awk '{print $2}')

echo "   ✅ Created: $ONETIME_PRICE"
echo ""

# Create Product 2: Monthly Subscription ($99/month)
echo "📦 Creating: Unlimited Plan ($99/month)"
MONTHLY_PRICE=$(stripe prices create \
  --unit-amount 9900 \
  --currency usd \
  --recurring interval=month \
  --product-data name="Contract Guard Unlimited" \
  --product-data description="Unlimited contract analyses with advanced features" \
  | grep "^id" | awk '{print $2}')

echo "   ✅ Created: $MONTHLY_PRICE"
echo ""

# Create Product 3: Annual Subscription ($948/year = $79/month)
echo "📦 Creating: Annual Plan ($79/month billed annually)"
ANNUAL_PRICE=$(stripe prices create \
  --unit-amount 94800 \
  --currency usd \
  --recurring interval=year \
  --product-data name="Contract Guard Annual" \
  --product-data description="Unlimited contracts - Save 20% with annual billing" \
  | grep "^id" | awk '{print $2}')

echo "   ✅ Created: $ANNUAL_PRICE"
echo ""

echo "✅ All Stripe products created!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Your Stripe Price IDs:"
echo ""
echo "NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME=$ONETIME_PRICE"
echo "NEXT_PUBLIC_STRIPE_PRICE_MONTHLY=$MONTHLY_PRICE"
echo "NEXT_PUBLIC_STRIPE_PRICE_ANNUAL=$ANNUAL_PRICE"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔧 Next Steps:"
echo ""
echo "1. Add these to Vercel (choose one method):"
echo ""
echo "   METHOD A: Via Vercel CLI (Recommended)"
echo "   ----------------------------------------"
echo "   vercel env add NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME production"
echo "   # Paste: $ONETIME_PRICE"
echo ""
echo "   vercel env add NEXT_PUBLIC_STRIPE_PRICE_MONTHLY production"
echo "   # Paste: $MONTHLY_PRICE"
echo ""
echo "   vercel env add NEXT_PUBLIC_STRIPE_PRICE_ANNUAL production"
echo "   # Paste: $ANNUAL_PRICE"
echo ""
echo "   METHOD B: Via Vercel Dashboard"
echo "   ----------------------------------------"
echo "   Go to: https://vercel.com/yaghiashrafs-projects/contract-guard/settings/environment-variables"
echo "   Add each variable with the values above"
echo ""
echo "2. Redeploy:"
echo "   vercel --prod"
echo ""
echo "3. Test payments with test card:"
echo "   Card: 4242 4242 4242 4242"
echo "   Expiry: 12/25"
echo "   CVC: 123"
echo ""
echo "🎉 Ready to accept payments!"
echo ""
