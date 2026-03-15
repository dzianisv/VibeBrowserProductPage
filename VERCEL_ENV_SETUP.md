# Vercel Environment Variables Setup

## Required Environment Variables

Add these environment variables to your Vercel project settings:

### 1. Go to Vercel Dashboard
Visit: https://vercel.com/[your-team]/vibebrowserproductpage/settings/environment-variables

### 2. Add the Following Variables

#### SUPABASE_PROJECT_URL
- **Value**: `[Your Supabase project URL]`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- **Description**: Supabase project URL for waitlist database

#### SUPABASE_API_KEY
- **Value**: `[Your Supabase anon/public API key]`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- **Description**: Supabase anonymous API key for client-side access

#### RESEND_API_KEY (Optional)
- **Value**: `[Your Resend API Key if you have one]`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- **Description**: Optional - for email notifications when someone joins waitlist

## Quick Setup Methods

### Method 1: Manual (Recommended)
1. Go to your Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable above with values from your own Supabase/Vercel setup
4. Click "Save" for each variable

### Method 2: Using Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Link your project (if not already linked)
vercel link

# Run the setup script
bash scripts/setup-vercel-env.sh
```

### Method 3: Copy-Paste Commands
If you have Vercel CLI installed, you can run these commands directly:

```bash
# Set SUPABASE_PROJECT_URL
echo "<SUPABASE_PROJECT_URL>" | vercel env add SUPABASE_PROJECT_URL production
echo "<SUPABASE_PROJECT_URL>" | vercel env add SUPABASE_PROJECT_URL preview
echo "<SUPABASE_PROJECT_URL>" | vercel env add SUPABASE_PROJECT_URL development

# Set SUPABASE_API_KEY
echo "<SUPABASE_API_KEY>" | vercel env add SUPABASE_API_KEY production
echo "<SUPABASE_API_KEY>" | vercel env add SUPABASE_API_KEY preview
echo "<SUPABASE_API_KEY>" | vercel env add SUPABASE_API_KEY development
```

## After Adding Variables

1. **Trigger Redeployment**: 
   - Go to Deployments tab in Vercel
   - Click on the three dots next to the latest deployment
   - Select "Redeploy"
   - Or run `vercel --prod` from command line

2. **Verify It's Working**:
   - Visit your production URL
   - Try signing up for the waitlist
   - Check the admin dashboard at `/admin/waitlist`

## Troubleshooting

If the waitlist isn't working after deployment:

1. **Check Environment Variables**: Ensure all variables are added correctly in Vercel dashboard
2. **Check Deployment Logs**: Look for any errors in Vercel's function logs
3. **Verify Supabase Table**: Make sure the `vibebrowser_waitlist` table exists in Supabase
4. **Test Locally**: Run `npm run dev` with `.env.local` to verify it works locally

## Security Note

The API key provided is the **anon/public** key which is safe to use in client-side code. It only allows operations permitted by your Row Level Security policies.

Still, keep live values out of Git. Use the Vercel dashboard or ignored local env files instead of committing `.env.prod` or other secret-bearing env files.
