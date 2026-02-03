# Development Workflow - Git + Vercel Only

## 🚀 Recommended Workflow (No Local Testing Needed)

This is the fastest way to iterate on Contract Guard without local environment hassles.

---

## Initial Setup (One Time)

### 1. Deploy to Vercel
- Go to https://vercel.com/new
- Import `yaghiashraf/contract-guard`
- Add environment variables (from `.env.local`)
- Click Deploy

### 2. Enable Auto-Deploy
✅ Vercel automatically deploys on every push to `main`!

**Preview Deployments:**
- Every push to any branch gets its own preview URL
- Test features in isolation before merging

---

## Daily Workflow

### Make Changes
```bash
# Edit files locally
code app/page.tsx

# Commit and push
git add .
git commit -m "feat: update hero section"
git push origin main
```

### Vercel Auto-Deploys
- ⚡ Build starts automatically
- 🔗 Get deployment URL in ~2 minutes
- ✅ Test on live URL
- 🐛 Found bug? Commit fix and push again

---

## Feature Branch Workflow

### For Testing New Features
```bash
# Create feature branch
git checkout -b feature/new-pricing

# Make changes
code components/PricingSection.tsx

# Push to branch
git add .
git commit -m "test: new pricing tiers"
git push origin feature/new-pricing
```

**Vercel automatically creates a preview URL for your branch!**
- Test at: `contract-guard-xxx-feature-new-pricing.vercel.app`
- Share with others for feedback
- Merge to main when ready

---

## Benefits

✅ **No local environment setup**
- No need for `npm install` or local server
- No environment variable configuration locally
- No "works on my machine" issues

✅ **Instant live testing**
- Test on real Vercel infrastructure
- See exactly how it performs in production
- Share links with stakeholders immediately

✅ **Automatic deployments**
- Push to Git = Deploy to Vercel
- No manual deployment commands
- No CLI authentication needed

✅ **Preview deployments**
- Every branch gets its own URL
- Test features safely before merging
- Easy A/B testing and feedback gathering

✅ **Git history = deployment history**
- Easy rollbacks via Git
- Clear audit trail
- Revert bad deployments instantly

---

## Quick Commands

```bash
# Update main (auto-deploys)
git add . && git commit -m "fix: whatever" && git push

# Test new feature (gets preview URL)
git checkout -b test/something
# make changes
git add . && git commit -m "test: something" && git push origin test/something

# Rollback (deploy previous version)
git revert HEAD
git push

# Check deployment status
# Just visit: https://vercel.com/dashboard
```

---

## Vercel Dashboard Features

**Monitor your app:**
- Real-time build logs
- Performance analytics
- Error tracking
- Usage metrics

**Access from:**
https://vercel.com/dashboard

---

## Environment Variables

**Update via Vercel Dashboard:**
1. Go to Project → Settings → Environment Variables
2. Update values
3. Redeploy (automatic or manual trigger)

**No need to update locally!**

---

## This Workflow vs Local Development

| Task | Local Dev | Git + Vercel |
|------|-----------|--------------|
| Setup time | 10-15 min | 2 min |
| Environment issues | Common | Never |
| Testing environment | localhost | Production-like |
| Sharing with others | ngrok/tunnel | Direct URL |
| Deployment | Manual step | Automatic |
| Rollback | Complex | One git command |

---

## Pro Tips

1. **Use branch names that describe the change:**
   - `test/new-hero`
   - `fix/paywall-bug`
   - `feature/ai-improvements`

2. **Commit messages matter:**
   - Clear messages = clear deployment history
   - Use conventional commits: `feat:`, `fix:`, `test:`

3. **Check Vercel dashboard for build status:**
   - Don't wait for email notifications
   - Watch builds in real-time

4. **Keep main branch stable:**
   - Test risky changes on feature branches first
   - Merge only when preview deployment looks good

---

**This workflow eliminates 90% of development friction!** 🎉
