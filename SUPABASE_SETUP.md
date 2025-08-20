# Supabase Setup for VibeBrowser Waitlist

## Steps to Set Up

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project or use an existing one

2. **Run the SQL Migration**
   - Go to the SQL Editor in your Supabase dashboard
   - Copy and run the SQL from `scripts/create-supabase-waitlist-table.sql`
   - This will create the `vibebrowser_waitlist` table with proper indexes and RLS policies

3. **Get Your API Keys**
   - Go to Settings > API in your Supabase dashboard
   - Copy the Project URL and anon/public key

4. **Configure Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase credentials:
     \`\`\`
     SUPABASE_PROJECT_URL=https://your-project.supabase.co
     SUPABASE_API_KEY=your-anon-key
     \`\`\`

5. **Optional: Configure Email Notifications**
   - If you want email notifications when someone joins the waitlist
   - Sign up for [Resend](https://resend.com)
   - Add your Resend API key to `.env.local`:
     \`\`\`
     RESEND_API_KEY=your-resend-api-key
     \`\`\`

## Table Structure

The `vibebrowser_waitlist` table includes:
- `id`: UUID primary key
- `email`: User's email (unique)
- `tier`: Subscription tier (free/pro)
- `source`: Where the signup came from
- `metadata`: JSON data for additional info
- `confirmed`: Email confirmation status
- `created_at`: Timestamp of signup
- `updated_at`: Last update timestamp

## Features

- Duplicate email prevention
- Tier tracking (free vs pro)
- Source tracking for analytics
- Email confirmation support
- Admin dashboard at `/admin/waitlist`
- CSV export functionality
- Real-time statistics

## Migration from Neon

If you're migrating from the Neon database implementation:
1. Export your existing waitlist data from Neon
2. Import it into the new Supabase table
3. Update your components to use `waitlist-supabase.ts` instead of `waitlist.ts`
