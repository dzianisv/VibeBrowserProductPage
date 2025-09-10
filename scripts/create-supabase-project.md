# Create Your Supabase Project - Quick Steps

## 1. Go to Supabase
Open: https://supabase.com/dashboard

## 2. Sign In or Sign Up
- Use GitHub, Google, or email

## 3. Create New Project
Click "New Project" and fill in:
- **Organization**: Select or create one
- **Project name**: `vibebrowser-waitlist`
- **Database Password**: `VibeBrowser2025!` (or choose your own strong password)
- **Region**: Choose closest to you (e.g., US East)
- **Pricing Plan**: Free tier is fine

Click "Create new project" - wait ~2 minutes for setup

## 4. Get Your Credentials
Once created, go to **Settings > API** and copy:

- **Project URL**: Something like `https://abcdefghijk.supabase.co`
- **anon public key**: Long string starting with `eyJ...`

## 5. Create the Table
Go to **SQL Editor** and run this:

```sql
CREATE TABLE vibebrowser_waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  tier VARCHAR(50) DEFAULT 'free',
  source VARCHAR(50) DEFAULT 'website',
  metadata JSONB,
  confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 6. Update Your Environment
Replace in `.env` and `.env.local`:
```
SUPABASE_PROJECT_URL=https://YOUR_NEW_PROJECT.supabase.co
SUPABASE_API_KEY=your_new_anon_key_here
```

## 7. Update Vercel
Go to your Vercel project settings and update the same environment variables.

That's it! Your waitlist will work with Supabase.