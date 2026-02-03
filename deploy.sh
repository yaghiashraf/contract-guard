#!/bin/bash
# Contract Guard - Automated Deployment Script
# This script deploys Contract Guard to Vercel with all environment variables

set -e  # Exit on error

echo "🚀 Contract Guard - Automated Deployment"
echo "=========================================="
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the contract-guard directory"
    exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local not found"
    exit 1
fi

echo "✓ Found .env.local with credentials"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "✓ Vercel CLI is ready"
echo ""

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Vercel authentication required..."
    echo "   A browser window will open for authentication."
    echo ""
    vercel login
    echo ""
fi

echo "✓ Authenticated with Vercel"
echo ""

# Load environment variables from .env.local
echo "📦 Loading environment variables..."
source .env.local

# Deploy to Vercel production with environment variables
echo "🚀 Deploying to Vercel production..."
echo ""

vercel --prod \
  --env HF_TOKEN="$HF_TOKEN" \
  --env NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" \
  --env STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY" \
  --env NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
  --env NEXT_PUBLIC_SUPABASE_ANON_KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  --yes

echo ""
echo "=========================================="
echo "✅ Deployment complete!"
echo ""
echo "Your app is now live on Vercel!"
echo ""
echo "Next steps:"
echo "  1. Test the live URL provided above"
echo "  2. Upload a contract to test AI analysis"
echo "  3. Verify paywall works on 2nd upload"
echo ""
