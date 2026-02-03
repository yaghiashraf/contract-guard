# 🚀 Contract Guard - Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

- [x] Code pushed to GitHub: `https://github.com/yaghiashraf/contract-guard.git`
- [x] All environment variables configured in `.env.local`
- [x] Next.js project ready for production

---

## 🎯 Quick Deploy (Recommended - 5 minutes)

### Option 1: Deploy via Vercel Dashboard

1. **Visit Vercel Dashboard**
   ```
   https://vercel.com/new
   ```

2. **Import GitHub Repository**
   - Click "Import Git Repository"
   - Search for: `yaghiashraf/contract-guard`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**

   **IMPORTANT:** Copy the values from your local `.env.local` file.

   To view your environment variables:
   ```bash
   cat .env.local
   ```

   Add these variables in Vercel dashboard (Settings → Environment Variables):

   ```bash
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=<from .env.local>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<from .env.local>
   SUPABASE_SERVICE_ROLE_KEY=<from .env.local>

   # Stripe (Test Mode)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<from .env.local>
   STRIPE_SECRET_KEY=<from .env.local>
   STRIPE_WEBHOOK_SECRET=<from .env.local>

   # Hugging Face AI (FREE Tier)
   HF_TOKEN=<from .env.local>

   # App URL (update after deployment)
   NEXT_PUBLIC_APP_URL=https://your-deployment-url.vercel.app
   ```

   **Quick Copy Command:**
   ```bash
   # View your local environment variables
   cat /home/yaghiashraf/claude-code-projects/contract-guard/.env.local
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete

6. **Update App URL**
   - After deployment, copy your live URL (e.g., `https://contract-guard-xxx.vercel.app`)
   - Go to: Settings → Environment Variables
   - Update `NEXT_PUBLIC_APP_URL` to your live URL
   - Redeploy if needed

---

## 🎯 Option 2: Deploy via Vercel CLI

### Step 1: Login to Vercel

```bash
cd /home/yaghiashraf/claude-code-projects/contract-guard
vercel login
```

This will open your browser to authenticate.

### Step 2: Deploy to Production

```bash
vercel --prod
```

### Step 3: Add Environment Variables via CLI

```bash
# Add all environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add HF_TOKEN production
vercel env add NEXT_PUBLIC_APP_URL production
```

When prompted, paste the values from your `.env.local` file.

### Step 4: Redeploy with Environment Variables

```bash
vercel --prod
```

---

## 📋 Environment Variables Reference

| Variable | Type | Description | Value Location |
|----------|------|-------------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL | `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anonymous key | `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Supabase service role key | `.env.local` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Public | Stripe publishable key (test) | `.env.local` |
| `STRIPE_SECRET_KEY` | Secret | Stripe secret key (test) | `.env.local` |
| `HF_TOKEN` | Secret | Hugging Face API token | `.env.local` |
| `NEXT_PUBLIC_APP_URL` | Public | Your live deployment URL | Update after deploy |

---

## ✅ Post-Deployment Checklist

After deployment completes:

1. **Get Your Live URL**
   ```
   https://contract-guard-xxx.vercel.app
   ```

2. **Test Core Functionality**
   - [ ] Upload a PDF contract
   - [ ] Verify AI analysis displays correctly
   - [ ] Check paywall appears on 2nd upload
   - [ ] Test Stripe payment flow (use test card: `4242 4242 4242 4242`)

3. **Update App URL**
   - [ ] Update `NEXT_PUBLIC_APP_URL` in Vercel dashboard
   - [ ] Redeploy to apply changes

4. **Set Up Stripe Webhooks** (Optional for now)
   - Webhook URL: `https://your-deployment-url.vercel.app/api/webhooks/stripe`
   - Events to listen: `checkout.session.completed`, `customer.subscription.created`

---

## 🔧 Troubleshooting

### Build Fails

**Issue**: "Module not found" or TypeScript errors

**Solution**:
```bash
# Ensure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### AI Analysis Not Working

**Issue**: HF_TOKEN not recognized

**Solution**:
- Verify `HF_TOKEN` is added to Vercel environment variables
- Check Hugging Face API status: https://status.huggingface.co
- Redeploy after adding environment variable

### Stripe Payments Not Working

**Issue**: "Invalid API key"

**Solution**:
- Confirm `STRIPE_SECRET_KEY` is set in production environment
- Use test card: `4242 4242 4242 4242` with any future date and CVC
- Check Stripe dashboard for API logs

### CORS Errors

**Issue**: "Access-Control-Allow-Origin" errors

**Solution**:
- Update `NEXT_PUBLIC_APP_URL` to match your live URL
- Redeploy the application

---

## 🎯 Next Steps After Deployment

1. **Custom Domain** (Optional)
   - Vercel Dashboard → Settings → Domains
   - Add your domain (e.g., `contractguard.ai`)
   - Update DNS records as instructed

2. **Enable Analytics**
   - Vercel Dashboard → Analytics
   - Enable Web Analytics (free on Hobby plan)

3. **Monitor Usage**
   - Check Vercel logs for errors
   - Monitor Stripe dashboard for test payments
   - Track Hugging Face API usage

4. **Go Live** (When Ready)
   - Replace Stripe test keys with live keys
   - Create live Stripe products
   - Update pricing page with live product IDs
   - Remove test mode indicators

---

## 🚀 Quick Commands

```bash
# Navigate to project
cd /home/yaghiashraf/claude-code-projects/contract-guard

# Login to Vercel (one-time)
vercel login

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Open project in browser
vercel --prod --open
```

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Stripe Test Mode**: https://stripe.com/docs/testing

---

**Ready to deploy? Use Option 1 (Dashboard) for the easiest experience!** 🚀
