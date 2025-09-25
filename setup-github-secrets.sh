#!/bin/bash

echo "==================================="
echo "GitHub Secrets Setup for Vercel CI"
echo "==================================="
echo ""

# Check if secrets are already set
echo "✓ Checking existing GitHub secrets..."
gh secret list

echo ""
echo "✓ Already set:"
echo "  - VERCEL_ORG_ID: team_vF4d4Phgfv1IqW1MEZw7mBre"
echo "  - VERCEL_PROJECT_ID: prj_bzU6UmuJD6pyGq0stlYgtcU2zn91"
echo ""

echo "⚠️  VERCEL_TOKEN still needs to be set!"
echo ""
echo "To complete the setup:"
echo "1. Go to: https://vercel.com/account/tokens"
echo "2. Click 'Create Token'"
echo "3. Name it: 'github-actions-deploy'"
echo "4. Copy the token value"
echo "5. Run this command:"
echo ""
echo "   gh secret set VERCEL_TOKEN --body 'YOUR_TOKEN_HERE'"
echo ""
echo "Alternative: Set it manually in GitHub:"
echo "   https://github.com/dzianisv/VibeBrowserProductPage/settings/secrets/actions"
echo ""
echo "Once the VERCEL_TOKEN is set, the automatic deployment will work!"
echo ""
echo "To test the workflow after setting the token:"
echo "   gh workflow run deploy-vercel.yml"
echo ""