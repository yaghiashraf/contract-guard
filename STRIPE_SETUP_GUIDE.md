# 🔧 Stripe Integration Setup Guide

Complete guide to setting up payments for Contract Guard.

---

## ✅ What's Already Done

1. ✅ Checkout API endpoint (`/api/create-checkout`)
2. ✅ Success page (`/success`)
3. ✅ Webhook handler (`/api/webhooks/stripe`)
4. ✅ All pricing modals wired up
5. ✅ User upgrade flow integrated

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Create Stripe Products

Go to: https://dashboard.stripe.com/test/products

Create **3 products** with these exact details:

#### Product 1: One-Time Payment
- **Name**: Contract Analysis
- **Description**: Single contract AI analysis with risk detection
- **Pricing Model**: One-time
- **Price**: $9.99 USD
- Click "Save product"
- **Copy the Price ID** (looks like `price_xxxxxxxxxxxxx`)

#### Product 2: Monthly Subscription
- **Name**: Contract Guard Unlimited
- **Description**: Unlimited contract analyses with advanced features
- **Pricing Model**: Recurring
- **Billing Period**: Monthly
- **Price**: $99 USD/month
- Click "Save product"
- **Copy the Price ID** (looks like `price_xxxxxxxxxxxxx`)

#### Product 3: Annual Subscription
- **Name**: Contract Guard Annual
- **Description**: Unlimited contracts - Save 20% with annual billing
- **Pricing Model**: Recurring
- **Billing Period**: Yearly
- **Price**: $948 USD/year (displayed as $79/month)
- Click "Save product"
- **Copy the Price ID** (looks like `price_xxxxxxxxxxxxx`)

---

### Step 2: Add Price IDs to Vercel

#### Option A: Via Vercel Dashboard
1. Go to: https://vercel.com/yaghiashrafs-projects/contract-guard/settings/environment-variables
2. Click "Add New"
3. Add these 3 variables:

```
Name: NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME
Value: price_xxxxxxxxxxxxx (from Product 1)
Environment: Production, Preview, Development

Name: NEXT_PUBLIC_STRIPE_PRICE_MONTHLY
Value: price_xxxxxxxxxxxxx (from Product 2)
Environment: Production, Preview, Development

Name: NEXT_PUBLIC_STRIPE_PRICE_ANNUAL
Value: price_xxxxxxxxxxxxx (from Product 3)
Environment: Production, Preview, Development
```

#### Option B: Via CLI
```bash
cd /home/yaghiashraf/claude-code-projects/contract-guard

# Add one-time price
vercel env add NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME production
# Paste: price_xxxxxxxxxxxxx

# Add monthly price
vercel env add NEXT_PUBLIC_STRIPE_PRICE_MONTHLY production
# Paste: price_xxxxxxxxxxxxx

# Add annual price
vercel env add NEXT_PUBLIC_STRIPE_PRICE_ANNUAL production
# Paste: price_xxxxxxxxxxxxx
```

---

### Step 3: Set Up Stripe Webhook (Optional for MVP)

For subscription management, you need webhooks:

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Endpoint URL:
   ```
   https://contract-guard-eta.vercel.app/api/webhooks/stripe
   ```
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Click "Add endpoint"
6. **Copy the Signing Secret** (looks like `whsec_xxxxxxxxxxxxx`)

7. Add webhook secret to Vercel:
   ```bash
   vercel env add STRIPE_WEBHOOK_SECRET production
   # Paste: whsec_xxxxxxxxxxxxx
   ```

---

### Step 4: Update Local Environment

Update your local `.env.local`:

```bash
# Add these lines (replace with your actual Price IDs)
NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME=price_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_MONTHLY=price_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_ANNUAL=price_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

---

### Step 5: Redeploy

```bash
cd /home/yaghiashraf/claude-code-projects/contract-guard
vercel --prod
```

---

## 🧪 Testing the Integration

### Test Checkout Flow

1. **Visit**: https://contract-guard-eta.vercel.app
2. **Upload a contract** (first one is free)
3. **Try second upload** → Paywall appears
4. **Select any plan** and click upgrade button
5. **Verify Stripe checkout opens** with correct pricing

### Test Payments

Use Stripe test cards:

#### Successful Payment
```
Card: 4242 4242 4242 4242
Expiry: 12/25 (any future date)
CVC: 123 (any 3 digits)
ZIP: 12345 (any 5 digits)
```

#### Test Scenarios
- **Successful payment**: `4242 4242 4242 4242`
- **Payment declined**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`
- **Insufficient funds**: `4000 0000 0000 9995`

### Verify Success Flow

After successful payment:
1. ✅ Redirects to `/success` page
2. ✅ Shows success message with session ID
3. ✅ User is marked as premium (can upload unlimited contracts)
4. ✅ Receipt email sent by Stripe

---

## 🔍 How It Works

### Payment Flow Diagram

```
User uploads 2nd contract
        ↓
Paywall modal appears
        ↓
User selects plan (One-time / Monthly / Annual)
        ↓
Click "Upgrade" button
        ↓
Frontend calls /api/create-checkout
        ↓
API creates Stripe checkout session
        ↓
User redirected to Stripe checkout page
        ↓
User enters payment details
        ↓
[PAYMENT SUCCESSFUL]
        ↓
Stripe redirects to /success?session_id=xxx
        ↓
Success page marks user as premium
        ↓
User can now upload unlimited contracts
```

### Webhook Flow (For Subscriptions)

```
User completes payment on Stripe
        ↓
Stripe sends webhook to /api/webhooks/stripe
        ↓
Webhook verifies signature
        ↓
Handles event (subscription.created, etc.)
        ↓
Updates user status in database (TODO)
        ↓
Sends confirmation email (TODO)
```

---

## 📋 Checklist

Before going live, complete these:

### MVP (Minimum Viable Product)
- [x] Stripe test mode configured
- [x] Checkout API working
- [x] Success page created
- [ ] Stripe products created
- [ ] Price IDs added to Vercel
- [ ] Payment flow tested with test cards
- [ ] Webhook endpoint created (optional for MVP)

### Production Ready
- [ ] Switch to Stripe live mode
- [ ] Update Stripe keys in Vercel (live keys)
- [ ] Create live Stripe products
- [ ] Update Price IDs with live IDs
- [ ] Set up live webhook endpoint
- [ ] Add database for user management
- [ ] Implement proper user authentication
- [ ] Send email receipts & confirmations
- [ ] Add subscription management page
- [ ] Test cancellation flow

---

## 🔐 Security Notes

### Current Setup (MVP)
- ✅ API keys in environment variables (not committed)
- ✅ Stripe test mode only
- ✅ Webhook signature verification
- ⚠️ User status stored in localStorage (browser only)

### Production Recommendations
- 🔒 Add user authentication (Supabase Auth)
- 🔒 Store user data in database (not localStorage)
- 🔒 Verify session IDs server-side
- 🔒 Add rate limiting to API endpoints
- 🔒 Implement proper session management
- 🔒 Use environment-specific webhook secrets

---

## 🆘 Troubleshooting

### Payment button does nothing
**Solution**: Check browser console for errors. Verify Price IDs are set in Vercel.

```bash
# Check environment variables
vercel env ls
```

### "Invalid API key" error
**Solution**: Verify `STRIPE_SECRET_KEY` is set and correct.

### Checkout page shows wrong price
**Solution**: Price IDs might be wrong. Check Stripe dashboard and update Vercel env vars.

### Success page shows error
**Solution**: Check if session_id is in URL. Verify webhook is configured.

### Webhook fails with 400 error
**Solution**: Webhook secret is wrong or missing. Update `STRIPE_WEBHOOK_SECRET`.

---

## 📞 Getting Help

- **Stripe Docs**: https://stripe.com/docs/payments/checkout
- **Stripe Testing**: https://stripe.com/docs/testing
- **Vercel Env Vars**: https://vercel.com/docs/environment-variables

---

## 💡 Next Features (Future)

1. **User Dashboard**: View past analyses & manage subscription
2. **Email Notifications**: Welcome email, payment receipts, renewal reminders
3. **Team Features**: Add team members to subscription
4. **Usage Analytics**: Track how many contracts analyzed
5. **Stripe Customer Portal**: Let users manage billing themselves
6. **Promo Codes**: Offer discounts & referral bonuses

---

**Ready to accept payments!** 💰

Follow the 5 steps above to complete your Stripe integration.
