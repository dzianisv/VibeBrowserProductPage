# Vercel Environment Variables Setup

## Required Environment Variables

Add these environment variables to your Vercel project settings:

### 1. Go to Vercel Dashboard
Visit: https://vercel.com/[your-team]/vibebrowserproductpage/settings/environment-variables

### 2. Add the Following Variables

#### BREVO_API_KEY
- **Value**: `[Your Brevo v3 API key]`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- **Description**: Required. Brevo is the single source of truth for the waitlist
  and mailing list. The server actions in `actions/waitlist.ts` read this at
  request time — without it, signups fail with "Brevo is not configured".

#### BREVO_LIST_ID
- **Value**: `[Numeric id of your Brevo waitlist contact list]`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- **Description**: Required. Contacts are upserted onto (and read back from) this list.

#### RESEND_API_KEY (Optional)
- **Value**: `[Your Resend API Key if you have one]`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- **Description**: Optional - for email notifications when someone joins waitlist

#### NEXT_PUBLIC_POSTHOG_TOKEN (Optional, recommended)
- **Value**: `[Your PostHog project token]`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- **Description**: Enables PostHog pageviews, autocapture, session replay, and custom waitlist events

#### NEXT_PUBLIC_POSTHOG_HOST (Optional)
- **Value**: `/ingest`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- **Description**: Recommended first-party PostHog proxy path to reduce ad-blocking and route analytics through your own domain

#### NEXT_PUBLIC_POSTHOG_UI_HOST (Optional)
- **Value**: `https://us.posthog.com`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- **Description**: PostHog app host used for in-product links and region-specific setup

## Quick Setup Methods

### Method 1: Manual (Recommended)
1. Go to your Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable above with values from your own Brevo/Vercel setup
4. Click "Save" for each variable

### Method 2: Copy-Paste Commands
If you have Vercel CLI installed, you can run these commands directly:

```bash
# Set BREVO_API_KEY
echo "<BREVO_API_KEY>" | vercel env add BREVO_API_KEY production
echo "<BREVO_API_KEY>" | vercel env add BREVO_API_KEY preview
echo "<BREVO_API_KEY>" | vercel env add BREVO_API_KEY development

# Set BREVO_LIST_ID
echo "<BREVO_LIST_ID>" | vercel env add BREVO_LIST_ID production
echo "<BREVO_LIST_ID>" | vercel env add BREVO_LIST_ID preview
echo "<BREVO_LIST_ID>" | vercel env add BREVO_LIST_ID development

# Set NEXT_PUBLIC_POSTHOG_TOKEN
echo "<NEXT_PUBLIC_POSTHOG_TOKEN>" | vercel env add NEXT_PUBLIC_POSTHOG_TOKEN production
echo "<NEXT_PUBLIC_POSTHOG_TOKEN>" | vercel env add NEXT_PUBLIC_POSTHOG_TOKEN preview
echo "<NEXT_PUBLIC_POSTHOG_TOKEN>" | vercel env add NEXT_PUBLIC_POSTHOG_TOKEN development

# Set NEXT_PUBLIC_POSTHOG_HOST
echo "/ingest" | vercel env add NEXT_PUBLIC_POSTHOG_HOST production
echo "/ingest" | vercel env add NEXT_PUBLIC_POSTHOG_HOST preview
echo "/ingest" | vercel env add NEXT_PUBLIC_POSTHOG_HOST development

# Set NEXT_PUBLIC_POSTHOG_UI_HOST
echo "https://us.posthog.com" | vercel env add NEXT_PUBLIC_POSTHOG_UI_HOST production
echo "https://us.posthog.com" | vercel env add NEXT_PUBLIC_POSTHOG_UI_HOST preview
echo "https://us.posthog.com" | vercel env add NEXT_PUBLIC_POSTHOG_UI_HOST development
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
3. **Verify the Brevo list**: Confirm `BREVO_LIST_ID` points at an existing contact
   list and that the API key has Contacts read/write scope. `npm run waitlist:stats`
   reads the same list locally.
4. **Test Locally**: Run `npm run dev` with `.env.local` to verify it works locally

## Security Note

`BREVO_API_KEY` is a **server-side secret** — it is only ever read inside server
actions (`actions/waitlist.ts`) and the `scripts/get-waitlist.js` CLI. Never expose
it to the client or prefix it with `NEXT_PUBLIC_`.

Keep live values out of Git. Use the Vercel dashboard or ignored local env files instead of committing `.env.prod` or other secret-bearing env files.
