#!/bin/bash

echo "🚀 Complete Vercel Setup for VibeBrowser Waitlist"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI is not installed.${NC}"
    echo "Install it with: npm i -g vercel"
    exit 1
fi

echo -e "${GREEN}✅ Vercel CLI found${NC}"
echo ""

# Check if already linked
if [ -f ".vercel/project.json" ]; then
    echo -e "${GREEN}✅ Project already linked to Vercel${NC}"
else
    echo -e "${YELLOW}⚠️  Project not linked to Vercel yet${NC}"
    echo ""
    echo "Please follow these steps:"
    echo "1. Run: vercel"
    echo "2. Follow the prompts to link your project"
    echo "3. Use 'vibebrowser-landing' as the project name"
    echo "4. Then run this script again"
    echo ""
    echo "Or if the project already exists on Vercel:"
    echo "Run: vercel link"
    echo ""
    read -p "Press Enter after linking the project to continue..."
fi

echo ""
echo "Adding environment variables..."
echo "================================"

# Environment variables
SUPABASE_URL="https://svhdffutjfzislubdzos.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aGRmZnV0amZ6aXNsdWJkem9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1OTI2MTgsImV4cCI6MjA3MTE2ODYxOH0.m-kYpaksMvL9ex6bp8YUcTLwEFK3HqS-ePMTHDLdN5Q"
GIT_LFS_ENABLED="1"

# Add SUPABASE_PROJECT_URL
echo ""
echo "Adding SUPABASE_PROJECT_URL..."
echo "$SUPABASE_URL" | vercel env add SUPABASE_PROJECT_URL production 2>/dev/null && echo -e "${GREEN}✅ Added to production${NC}" || echo -e "${YELLOW}⚠️  Already exists in production${NC}"
echo "$SUPABASE_URL" | vercel env add SUPABASE_PROJECT_URL preview 2>/dev/null && echo -e "${GREEN}✅ Added to preview${NC}" || echo -e "${YELLOW}⚠️  Already exists in preview${NC}"
echo "$SUPABASE_URL" | vercel env add SUPABASE_PROJECT_URL development 2>/dev/null && echo -e "${GREEN}✅ Added to development${NC}" || echo -e "${YELLOW}⚠️  Already exists in development${NC}"

# Add SUPABASE_API_KEY
echo ""
echo "Adding SUPABASE_API_KEY..."
echo "$SUPABASE_KEY" | vercel env add SUPABASE_API_KEY production 2>/dev/null && echo -e "${GREEN}✅ Added to production${NC}" || echo -e "${YELLOW}⚠️  Already exists in production${NC}"
echo "$SUPABASE_KEY" | vercel env add SUPABASE_API_KEY preview 2>/dev/null && echo -e "${GREEN}✅ Added to preview${NC}" || echo -e "${YELLOW}⚠️  Already exists in preview${NC}"
echo "$SUPABASE_KEY" | vercel env add SUPABASE_API_KEY development 2>/dev/null && echo -e "${GREEN}✅ Added to development${NC}" || echo -e "${YELLOW}⚠️  Already exists in development${NC}"

# Add GIT_LFS_ENABLED
echo ""
echo "Adding GIT_LFS_ENABLED..."
echo "$GIT_LFS_ENABLED" | vercel env add GIT_LFS_ENABLED production 2>/dev/null && echo -e "${GREEN}✅ Added to production${NC}" || echo -e "${YELLOW}⚠️  Already exists in production${NC}"
echo "$GIT_LFS_ENABLED" | vercel env add GIT_LFS_ENABLED preview 2>/dev/null && echo -e "${GREEN}✅ Added to preview${NC}" || echo -e "${YELLOW}⚠️  Already exists in preview${NC}"
echo "$GIT_LFS_ENABLED" | vercel env add GIT_LFS_ENABLED development 2>/dev/null && echo -e "${GREEN}✅ Added to development${NC}" || echo -e "${YELLOW}⚠️  Already exists in development${NC}"

# Optional: Add RESEND_API_KEY
echo ""
read -p "Do you have a Resend API key for email notifications? (y/n): " HAS_RESEND

if [ "$HAS_RESEND" = "y" ] || [ "$HAS_RESEND" = "Y" ]; then
    read -p "Enter your RESEND_API_KEY: " RESEND_KEY
    echo ""
    echo "Adding RESEND_API_KEY..."
    echo "$RESEND_KEY" | vercel env add RESEND_API_KEY production 2>/dev/null && echo -e "${GREEN}✅ Added to production${NC}" || echo -e "${YELLOW}⚠️  Already exists in production${NC}"
    echo "$RESEND_KEY" | vercel env add RESEND_API_KEY preview 2>/dev/null && echo -e "${GREEN}✅ Added to preview${NC}" || echo -e "${YELLOW}⚠️  Already exists in preview${NC}"
    echo "$RESEND_KEY" | vercel env add RESEND_API_KEY development 2>/dev/null && echo -e "${GREEN}✅ Added to development${NC}" || echo -e "${YELLOW}⚠️  Already exists in development${NC}"
fi

echo ""
echo "================================"
echo -e "${GREEN}✅ Environment variables setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Deploy to production: vercel --prod"
echo "2. Or push to git to trigger automatic deployment"
echo ""
echo "Your waitlist will be available at:"
echo "- Production URL: https://[your-project].vercel.app"
echo "- Admin dashboard: https://[your-project].vercel.app/admin/waitlist"
