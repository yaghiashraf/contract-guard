# 🔐 Authentication Setup Guide

Complete guide to set up user authentication with Supabase for Contract Guard.

---

## 📋 Prerequisites

- Supabase account (free tier works)
- Existing Stripe setup (already configured)
- Vercel deployment

---

## 🚀 Step 1: Set Up Supabase Project

### 1. Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in details:
   - **Name**: Contract Guard
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users
4. Wait for project to be created (~2 minutes)

### 2. Get API Keys

Once project is ready:
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **service_role key** (`SUPABASE_SERVICE_ROLE_KEY`) - Keep this secret!

---

## 🗄️ Step 2: Create Database Tables

### Apply SQL Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into SQL Editor
5. Click **Run** or **Execute**

You should see: ✅ Success. No rows returned

### What This Creates

- **profiles** table - User information
- **subscriptions** table - Stripe subscription data
- **analyses** table - Contract analysis history
- **RLS policies** - Row-level security
- **Triggers** - Auto-create profile on signup

---

## 🔑 Step 3: Configure Environment Variables

### Local Development (.env.local)

Add these to your `.env.local` file:

```bash
# Supabase (from Step 1.2)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Existing Stripe keys (already set)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME=price_1SwoJeA3gGBV3QMF507d1sFl
NEXT_PUBLIC_STRIPE_PRICE_MONTHLY=price_1SwoJxA3gGBV3QMFrxcBXvC5
NEXT_PUBLIC_STRIPE_PRICE_ANNUAL=price_1SwoK8A3gGBV3QMFeOuBVfQi

# App URL (already set)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Vercel Production

Add the same variables to Vercel:

```bash
# Using Vercel CLI
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste value when prompted

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste value when prompted

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Paste value when prompted (this is secret!)
```

Or via Vercel Dashboard:
1. Go to project settings → Environment Variables
2. Add each variable for "Production" environment
3. Redeploy after adding

---

## ⚙️ Step 4: Configure Supabase Auth

### Enable Email/Password Auth

1. In Supabase dashboard → **Authentication** → **Providers**
2. Find **Email** provider
3. Ensure it's **enabled** (should be by default)

### Configure Email Templates (Optional but Recommended)

1. Go to **Authentication** → **Email Templates**
2. Customize:
   - **Confirm signup** - Welcome email
   - **Magic Link** - For passwordless login (if you add it later)
   - **Change Email Address** - Confirmation email
   - **Reset Password** - Password reset email

You can use your brand name "Contract Guard" in the templates.

### Site URL Configuration

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL**: `https://contract-guard-eta.vercel.app`
3. Add **Redirect URLs**:
   - `https://contract-guard-eta.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (for local dev)

---

## 🧪 Step 5: Test Everything

### 1. Test Local Development

```bash
npm run dev
```

Visit http://localhost:3000

### 2. Test Signup Flow

1. Click "Try Free" or go to `/signup`
2. Fill in:
   - Full Name
   - Email
   - Password (min 8 characters)
3. Click "Create Account"
4. Should redirect to dashboard
5. Check Supabase:
   - **Authentication** → **Users** (should see new user)
   - **Table Editor** → **profiles** (should see profile)

### 3. Test Login Flow

1. Sign out (click "Sign Out" in nav)
2. Go to `/login`
3. Enter email and password
4. Should redirect to dashboard

### 4. Test Payment + Auth Flow

1. Sign out if logged in
2. Go to home page
3. Upload a contract (uses free trial)
4. Try to upload again → paywall appears
5. Select a plan and checkout
6. Complete payment with test card: `4242 4242 4242 4242`
7. On success page, create an account
8. Should redirect to dashboard with premium access

### 5. Test Dashboard

1. Log in and go to `/dashboard`
2. Should see:
   - Welcome message with your name
   - Subscription status
   - Recent analyses (if you uploaded any)

---

## 🔄 Step 6: Test Stripe Webhook Integration

The webhook links Stripe payments to user accounts.

### Local Webhook Testing

1. Install Stripe CLI:
```bash
brew install stripe/stripe-cli/stripe  # macOS
# or download from https://stripe.com/docs/stripe-cli
```

2. Login to Stripe:
```bash
stripe login
```

3. Forward webhooks to local:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

4. Copy the webhook signing secret (starts with `whsec_`)
5. Add to `.env.local`:
```bash
STRIPE_WEBHOOK_SECRET=whsec_...
```

6. Make a test payment and watch the console

### Production Webhook Setup

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://contract-guard-eta.vercel.app/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Copy webhook signing secret
6. Add to Vercel:
```bash
vercel env add STRIPE_WEBHOOK_SECRET production
# Paste the signing secret when prompted
```
7. Redeploy

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Database tables created (profiles, subscriptions, analyses)
- [ ] Environment variables added locally
- [ ] Environment variables added to Vercel
- [ ] Can sign up new users
- [ ] Can log in existing users
- [ ] Dashboard shows user data
- [ ] Stripe webhook configured (local)
- [ ] Stripe webhook configured (production)
- [ ] Test payment creates subscription in database
- [ ] Contract analysis saves to database
- [ ] User can view past analyses in dashboard

---

## 🎯 What's Now Working

### User Features
✅ **Sign Up** - Create account with email/password
✅ **Login** - Access existing account
✅ **Dashboard** - View subscription and analyses
✅ **Profile** - User info stored in database
✅ **Cross-Device** - Access account from any device

### Backend Features
✅ **Database Storage** - All data persisted in Supabase
✅ **Row-Level Security** - Users only see their own data
✅ **Stripe Integration** - Payments linked to accounts
✅ **Analysis History** - Track all past uploads
✅ **Authentication Guards** - Protected routes require login

### No More Problems
❌ LocalStorage only (old system)
❌ Lose access on browser clear
❌ No cross-device support
❌ No user accounts
❌ No payment verification

---

## 🐛 Troubleshooting

### "Invalid API key"
- Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Make sure they're from the correct Supabase project
- Ensure no extra spaces or quotes

### "User not found" after signup
- Check if profile was created: Supabase → Table Editor → profiles
- Check Supabase logs: Supabase → Logs → Postgres Logs
- Ensure trigger `on_auth_user_created` exists

### Webhook not receiving events
- For local: Ensure Stripe CLI is running (`stripe listen`)
- For production: Check webhook endpoint URL is correct
- Check Stripe Dashboard → Webhooks → Attempts for errors

### Can't see analyses in dashboard
- Ensure user is logged in when analyzing contracts
- Check: Supabase → Table Editor → analyses
- Verify `user_id` matches authenticated user

### RLS Policy errors
- Check: Supabase → Authentication → Policies
- Ensure policies exist for all tables
- Verify `auth.uid()` matches `user_id` in queries

---

## 📞 Support

If you get stuck:
1. Check Supabase logs: Dashboard → Logs
2. Check browser console for errors
3. Check server logs: `vercel logs` or `npm run dev` output
4. Verify all environment variables are set correctly

---

## 🎉 Next Steps

Once everything is working:

1. **Switch Stripe to Live Mode**
   - Update Stripe keys in Vercel
   - Create live Stripe products
   - Update webhook endpoint

2. **Customize Email Templates**
   - Brand the Supabase auth emails
   - Add your logo and colors

3. **Add More Features**
   - Password reset flow (already supported)
   - Email verification (optional)
   - Social login (Google, GitHub, etc.)
   - User profile editing

4. **Monitor Usage**
   - Supabase → Reports (database usage)
   - Stripe → Customers (subscription metrics)
   - Vercel → Analytics (traffic)

---

**🚀 Your SaaS is now production-ready!**
