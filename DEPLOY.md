# Contract Guard - Deployment Guide

## ✅ All Credentials Ready

Your project is ready to deploy with all required credentials configured.

---

## 🚀 Option 1: Deploy via Vercel Dashboard (Easiest - 2 minutes)

### Step 1: Go to Vercel
Visit: https://vercel.com/new

### Step 2: Import Repository
- Click "Import Git Repository"
- Select: `yaghiashraf/contract-guard`
- Click "Import"

### Step 3: Add Environment Variables

**All credentials are in your `.env.local` file!**

In Vercel, add these environment variables (values are in your local `.env.local`):

```bash
# Required: Hugging Face AI Token (FREE)
HF_TOKEN=<from .env.local>

# Required: Stripe Payment Keys (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<from .env.local>
STRIPE_SECRET_KEY=<from .env.local>

# Optional: Supabase (for user management later)
NEXT_PUBLIC_SUPABASE_URL=<from .env.local>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from .env.local>
```

**Quick copy command:**
```bash
cat .env.local
```

### Step 4: Deploy
Click "Deploy" - takes ~2-3 minutes

---

## 🚀 Option 2: Deploy via Vercel CLI

### Prerequisites
```bash
# Login to Vercel (one-time)
vercel login
```

### Deploy with environment variables
```bash
# Navigate to project
cd /home/yaghiashraf/claude-code-projects/contract-guard

# Load environment variables from .env.local
source <(sed 's/^/export /' .env.local)

# Deploy to production with env vars
vercel --prod --yes
```

The CLI will use your `.env.local` file automatically!

---

## 📋 What's Included

### AI Analysis
- ✅ **Hugging Face Token**: FREE API access for AI analysis
- ✅ **Model**: facebook/bart-large-cnn (free tier)

### Payment Processing
- ✅ **Stripe Test Keys**: Ready for development testing
- ⚠️ **Note**: These are TEST keys - switch to live keys for production

### Database (Optional)
- ✅ **Supabase**: Pre-configured for user management
- ℹ️ **Current**: Not required for core functionality

---

## 🧪 Post-Deployment Testing

After deployment completes:

1. **Get your live URL**: `https://contract-guard-xxx.vercel.app`

2. **Test core flow**:
   - Upload a PDF contract
   - Verify AI analysis works
   - Check paywall appears on 2nd upload
   - Test premium feature previews

3. **Test payments** (when ready):
   - Use Stripe test card: `4242 4242 4242 4242`
   - Any future date + any CVC

---

## 🎯 Next Steps After Deployment

1. **Custom Domain** (optional):
   - Vercel Dashboard → Settings → Domains
   - Add your domain (e.g., `contractguard.ai`)

2. **Analytics**:
   - Enable Vercel Analytics
   - Or add Google Analytics

3. **Go Live**:
   - Replace Stripe test keys with live keys
   - Update environment variables in Vercel

---

## 🆘 Troubleshooting

**Build fails?**
- Check environment variables are added correctly
- Verify all variables are in "Production" environment

**AI not working?**
- Confirm HF_TOKEN is set
- Check Hugging Face API status: https://status.huggingface.co

**Payments not working?**
- These are test keys - use Stripe test cards only
- For live payments, get live keys from Stripe dashboard

---

**Ready to deploy? Choose Option 1 (Dashboard) for the easiest experience!** 🚀
