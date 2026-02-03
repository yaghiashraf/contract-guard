# 🔧 Quick Fix - "Failed to start checkout" Error

## The Problem

You're seeing "Failed to start checkout. Please try again." because the Stripe Price IDs haven't been created yet.

---

## ⚡ Quick Solution (5 Minutes)

### Option 1: Use Stripe Dashboard (Easiest)

1. **Go to Stripe Dashboard**
   ```
   https://dashboard.stripe.com/test/products
   ```

2. **Create Product #1: One-Time Payment**
   - Click "+ Add product"
   - Name: `Contract Analysis`
   - Description: `Single contract AI analysis`
   - Pricing model: `One-time`
   - Price: `$9.99`
   - Click "Save product"
   - **Copy the Price ID** (starts with `price_`)

3. **Create Product #2: Monthly Subscription**
   - Click "+ Add product"
   - Name: `Contract Guard Unlimited`
   - Description: `Unlimited contract analyses`
   - Pricing model: `Recurring`
   - Billing period: `Monthly`
   - Price: `$99.00`
   - Click "Save product"
   - **Copy the Price ID**

4. **Create Product #3: Annual Subscription**
   - Click "+ Add product"
   - Name: `Contract Guard Annual`
   - Description: `Save 20% with annual billing`
   - Pricing model: `Recurring`
   - Billing period: `Yearly`
   - Price: `$948.00` (= $79/month)
   - Click "Save product"
   - **Copy the Price ID**

5. **Add to Vercel**

   Go to: https://vercel.com/yaghiashrafs-projects/contract-guard/settings/environment-variables

   Add these 3 variables:
   ```
   Name: NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME
   Value: price_xxxxxxxxxxxxx (from step 2)
   Environment: Production, Preview, Development

   Name: NEXT_PUBLIC_STRIPE_PRICE_MONTHLY
   Value: price_xxxxxxxxxxxxx (from step 3)
   Environment: Production, Preview, Development

   Name: NEXT_PUBLIC_STRIPE_PRICE_ANNUAL
   Value: price_xxxxxxxxxxxxx (from step 4)
   Environment: Production, Preview, Development
   ```

6. **Redeploy**
   ```bash
   cd /home/yaghiashraf/claude-code-projects/contract-guard
   vercel --prod
   ```

---

### Option 2: Use Stripe CLI (Automated)

If you have Stripe CLI installed:

```bash
cd /home/yaghiashraf/claude-code-projects/contract-guard

# Login to Stripe
stripe login

# Run the automated setup
./setup-stripe-products.sh
```

This will create all 3 products and show you the Price IDs to add to Vercel.

---

## 🧪 After Setup - Test It

1. Visit: https://contract-guard-eta.vercel.app
2. Upload a contract (free)
3. Try second upload → paywall appears
4. Click any plan
5. Should now redirect to Stripe checkout ✅
6. Test with card: `4242 4242 4242 4242`

---

## 🆘 Still Not Working?

### Check Environment Variables

```bash
# View current Vercel env vars
vercel env ls

# Should see:
# NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME
# NEXT_PUBLIC_STRIPE_PRICE_MONTHLY
# NEXT_PUBLIC_STRIPE_PRICE_ANNUAL
```

### Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try clicking upgrade button
4. Look for detailed error message

Common errors:
- `Price ID not found` → Wrong Price ID, check Stripe dashboard
- `Invalid API key` → Check STRIPE_SECRET_KEY in Vercel
- `not configured` → Price IDs not set in Vercel

---

## 📋 Checklist

Before payments will work:

- [ ] Created 3 products in Stripe dashboard
- [ ] Copied all 3 Price IDs
- [ ] Added Price IDs to Vercel environment variables
- [ ] Selected all 3 environments (Production, Preview, Development)
- [ ] Redeployed with `vercel --prod`
- [ ] Tested checkout button
- [ ] Stripe checkout page opens ✅

---

## 💡 What Each Price ID Does

```
NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME
└─> Used for: "Pay $9.99" button
    Charges: $9.99 one-time payment

NEXT_PUBLIC_STRIPE_PRICE_MONTHLY
└─> Used for: "Subscribe for $99/mo" button
    Charges: $99 every month (recurring)

NEXT_PUBLIC_STRIPE_PRICE_ANNUAL
└─> Used for: "Subscribe for $79/mo" button
    Charges: $948 every year (shown as $79/month)
```

---

**After adding these, the error will be fixed!** 🎉
