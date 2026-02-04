# Supabase Database Setup

## Apply Database Migration

You need to run the SQL migration in your Supabase project:

### Option 1: Supabase Dashboard (Easiest)
1. Go to https://supabase.com/dashboard
2. Select your project: **Contract Guard**
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy and paste the contents of `migrations/001_initial_schema.sql`
6. Click "Run" to execute

### Option 2: Supabase CLI
```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref <your-project-ref>

# Push migration
supabase db push
```

## Database Schema

### Tables Created

1. **profiles** - User profile information
   - Extends auth.users with additional fields
   - Automatically created when user signs up

2. **subscriptions** - Stripe subscription data
   - Links users to their Stripe subscriptions
   - Tracks subscription status and period

3. **analyses** - Contract analysis history
   - Stores all contract analyses performed by users
   - Includes risk scores, flags, and summaries

### Row Level Security (RLS)

All tables have RLS enabled:
- Users can only view/edit their own data
- Service role (webhooks) can manage subscriptions
- Secure by default

## Environment Variables Required

Make sure these are set in your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

The service role key is needed for webhook operations that bypass RLS.
