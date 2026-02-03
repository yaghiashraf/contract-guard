# Contract Guard 🛡️

**AI-Powered Contract Analysis for Small Businesses**

Stop signing contracts that will screw you. Upload any contract, get AI-powered analysis in plain English, and spot risky clauses before they cost you thousands.

---

## 🚀 Tech Stack

- **Frontend:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS (Dark Mode)
- **Animations:** Framer Motion
- **AI:** Hugging Face Inference API (Mistral-7B) - FREE TIER
- **Database & Auth:** Supabase
- **Payments:** Stripe
- **Hosting:** Vercel (Free Tier)

**Total Monthly Cost:** $0 (all free tiers)

---

## 💰 Business Model

### Target Revenue: $1,000/month

**Pricing:**
- **Pay-per-use:** $9.99/contract
- **Unlimited:** $99/month (or $79/month annual)

**Target Customer:** Small businesses, freelancers, agencies, startups (10-20 customers)

---

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create `.env.local` (already configured with your tokens):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_pk
STRIPE_SECRET_KEY=your_sk

# Hugging Face (AI)
HF_TOKEN=your_hf_token

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Create Stripe Products

Go to https://dashboard.stripe.com/test/products and create:

1. **One-Time Payment Product**
   - Name: "Contract Analysis"
   - Price: $9.99
   - Type: One-time
   - Copy the Price ID → add to `.env.local` as `NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME`

2. **Monthly Subscription**
   - Name: "Contract Guard Unlimited"
   - Price: $99/month
   - Type: Recurring
   - Copy the Price ID → add to `.env.local` as `NEXT_PUBLIC_STRIPE_PRICE_MONTHLY`

3. **Annual Subscription**
   - Name: "Contract Guard Annual"
   - Price: $948/year (= $79/month)
   - Type: Recurring
   - Copy the Price ID → add to `.env.local` as `NEXT_PUBLIC_STRIPE_PRICE_ANNUAL`

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

---

## 📊 Features

### MVP (Phase 1) ✅
- [x] Landing page with dark mode UI
- [x] Contract upload (PDF)
- [x] AI-powered risk analysis
- [x] Plain-English reports
- [x] Stripe payment integration
- [x] Responsive design
- [x] Framer Motion animations

### Coming Soon (Phase 2)
- [ ] User authentication (Supabase Auth)
- [ ] Dashboard (view past analyses)
- [ ] Contract template library
- [ ] Team collaboration
- [ ] Email reports
- [ ] Word doc support (.docx)

---

## 🎯 Go-to-Market Strategy

### Week 1-2: Build & Beta
- ✅ MVP built
- [ ] Get 5 beta users (offer free unlimited for 1 month)
- [ ] Collect testimonials

### Week 3-4: Launch
- [ ] Post on Indie Hackers, r/entrepreneur, r/smallbusiness
- [ ] Create "How I got screwed by a bad contract" viral post
- [ ] LinkedIn outreach to small agency owners
- [ ] SEO blog: "10 contract clauses that will destroy your business"

### Week 5-8: Scale
- [ ] Partner with freelancer platforms (Upwork, Fiverr)
- [ ] YouTube demo videos
- [ ] Cold email 500 small business owners
- [ ] Offer affiliate program (20% commission)

---

## 🔒 Security Notes

- All API keys stored in `.env.local` (never committed)
- Using Stripe test keys for development
- Hugging Face free tier (rate limit: 30 req/min)
- PDF parsing done server-side only

---

## 📈 Metrics to Track

- Contracts analyzed
- Conversion rate (free → paid)
- Churn rate
- Average contract risk score
- Most common red flags

---

## 🚀 Deployment

### Deploy to Vercel

```bash
vercel --prod
```

Add environment variables in Vercel dashboard:
- All `.env.local` variables
- Set `NEXT_PUBLIC_APP_URL` to your production URL

---

## 💡 Future Upsell Ideas

1. **Lawyer Marketplace** ($49 to connect with real lawyer for review)
2. **Contract Templates** ($29 one-time for vetted templates)
3. **API Access** ($199/month for developers)
4. **White Label** ($499/month for agencies)

---

## 📞 Support

For issues or questions:
- Email: support@contractguard.com (set this up)
- GitHub Issues: Create an issue in this repo

---

## 📄 License

MIT License - feel free to fork and build on this!

---

**Built with ❤️ as a Micro-SaaS**

Target: $1k/month in 8 weeks 🎯
