#!/bin/bash

# Setup script for Vercel environment variables
# Run this script with: bash scripts/setup-vercel-env.sh

echo "🚀 Setting up Vercel environment variables for VibeBrowser Waitlist"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "Install it with: npm i -g vercel"
    exit 1
fi

# Get the Supabase credentials from the local .env file
if [ -f ".env.local" ]; then
    echo "📋 Reading from .env.local..."
    export $(cat .env.local | grep -v '^#' | xargs)
else
    echo "⚠️  .env.local not found. Using manual input..."
fi

# Set SUPABASE_PROJECT_URL
if [ -z "$SUPABASE_PROJECT_URL" ]; then
    read -p "Enter SUPABASE_PROJECT_URL: " SUPABASE_PROJECT_URL
fi

echo "Setting SUPABASE_PROJECT_URL..."
vercel env add SUPABASE_PROJECT_URL production <<< "$SUPABASE_PROJECT_URL"
vercel env add SUPABASE_PROJECT_URL preview <<< "$SUPABASE_PROJECT_URL"
vercel env add SUPABASE_PROJECT_URL development <<< "$SUPABASE_PROJECT_URL"

# Set SUPABASE_API_KEY
if [ -z "$SUPABASE_API_KEY" ]; then
    read -p "Enter SUPABASE_API_KEY: " SUPABASE_API_KEY
fi

echo "Setting SUPABASE_API_KEY..."
vercel env add SUPABASE_API_KEY production <<< "$SUPABASE_API_KEY"
vercel env add SUPABASE_API_KEY preview <<< "$SUPABASE_API_KEY"
vercel env add SUPABASE_API_KEY development <<< "$SUPABASE_API_KEY"

# Optional: Set RESEND_API_KEY
read -p "Do you have a Resend API key for email notifications? (y/n): " HAS_RESEND

if [ "$HAS_RESEND" = "y" ] || [ "$HAS_RESEND" = "Y" ]; then
    if [ -z "$RESEND_API_KEY" ]; then
        read -p "Enter RESEND_API_KEY: " RESEND_API_KEY
    fi
    
    echo "Setting RESEND_API_KEY..."
    vercel env add RESEND_API_KEY production <<< "$RESEND_API_KEY"
    vercel env add RESEND_API_KEY preview <<< "$RESEND_API_KEY"
    vercel env add RESEND_API_KEY development <<< "$RESEND_API_KEY"
fi

echo ""
echo "✅ Environment variables have been added to Vercel!"
echo ""
echo "You can verify them at:"
echo "https://vercel.com/your-team/vibebrowserproductpage/settings/environment-variables"
echo ""
echo "To trigger a new deployment with these variables, run:"
echo "vercel --prod"