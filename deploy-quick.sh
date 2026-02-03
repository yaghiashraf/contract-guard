#!/bin/bash

# Contract Guard - Quick Deployment Script
# This script helps deploy Contract Guard to Vercel with all environment variables

set -e

echo "🚀 Contract Guard - Vercel Deployment Script"
echo "=============================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed"
    echo "Install with: npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI found"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found"
    echo "Please create .env.local with all required environment variables"
    exit 1
fi

echo "✅ .env.local file found"
echo ""

# Login to Vercel
echo "📝 Step 1: Login to Vercel"
echo "=========================="
vercel login

echo ""
echo "✅ Logged in to Vercel"
echo ""

# Deploy to production
echo "🚀 Step 2: Deploying to Production"
echo "===================================="
vercel --prod

echo ""
echo "✅ Deployed to production"
echo ""

# Instructions for adding environment variables
echo "📋 Step 3: Add Environment Variables"
echo "====================================="
echo ""
echo "You need to add the following environment variables in Vercel dashboard:"
echo ""
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Select your 'contract-guard' project"
echo "3. Go to: Settings → Environment Variables"
echo "4. Add these variables from your .env.local file:"
echo ""
echo "   ├─ NEXT_PUBLIC_SUPABASE_URL"
echo "   ├─ NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   ├─ SUPABASE_SERVICE_ROLE_KEY"
echo "   ├─ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo "   ├─ STRIPE_SECRET_KEY"
echo "   ├─ HF_TOKEN"
echo "   └─ NEXT_PUBLIC_APP_URL (your deployment URL)"
echo ""
echo "Or add them via CLI:"
echo ""
echo "   vercel env add NEXT_PUBLIC_SUPABASE_URL production"
echo "   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production"
echo "   vercel env add SUPABASE_SERVICE_ROLE_KEY production"
echo "   vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production"
echo "   vercel env add STRIPE_SECRET_KEY production"
echo "   vercel env add HF_TOKEN production"
echo "   vercel env add NEXT_PUBLIC_APP_URL production"
echo ""
echo "5. After adding environment variables, redeploy:"
echo "   vercel --prod"
echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next Steps:"
echo "  1. Copy your deployment URL"
echo "  2. Update NEXT_PUBLIC_APP_URL environment variable"
echo "  3. Test your application"
echo ""
echo "🎉 Happy deploying!"
