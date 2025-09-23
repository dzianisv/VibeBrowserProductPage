#!/bin/bash

echo "==================================="
echo "GitHub Actions Secrets Setup Script"
echo "==================================="
echo ""
echo "This script will help you set up the required GitHub secrets for automatic Vercel deployment."
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed. Please install it first:"
    echo "   brew install gh"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI. Please run:"
    echo "   gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is installed and authenticated"
echo ""

# Get repository info
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "📦 Repository: $REPO"
echo ""

# Check for existing Vercel token
echo "🔑 To get your Vercel token:"
echo "   1. Go to: https://vercel.com/account/tokens"
echo "   2. Click 'Create Token'"
echo "   3. Give it a name (e.g., 'GitHub Actions')"
echo "   4. Select 'Full Access' scope"
echo "   5. Click 'Create'"
echo ""

read -p "Please enter your Vercel token: " VERCEL_TOKEN
echo ""

if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Vercel token cannot be empty"
    exit 1
fi

echo "Setting up GitHub secrets..."
echo ""

# Set the secrets
echo "Setting VERCEL_TOKEN..."
echo "$VERCEL_TOKEN" | gh secret set VERCEL_TOKEN

echo "Setting VERCEL_ORG_ID..."
echo "team_vF4d4Phgfv1IqW1MEZw7mBre" | gh secret set VERCEL_ORG_ID

echo "Setting VERCEL_PROJECT_ID..."
echo "prj_bzU6UmuJD6pyGq0stlYgtcU2zn91" | gh secret set VERCEL_PROJECT_ID

echo ""
echo "✅ All secrets have been configured!"
echo ""
echo "Your GitHub Actions workflow is now ready to:"
echo "  • Auto-deploy to production when you push to main/master"
echo "  • Create preview deployments for pull requests"
echo "  • Comment deployment URLs on commits and PRs"
echo ""
echo "The workflow should trigger automatically on your next push to main!"