# GitHub Actions Secrets Setup

To enable automatic deployments, you need to add the following secrets to your GitHub repository:

## Required Secrets

1. **VERCEL_TOKEN**
   - Get your token from: https://vercel.com/account/tokens
   - Create a new token with full scope
   - Name it something like "GitHub Actions Deploy"

2. **VERCEL_ORG_ID**
   ```
   team_vF4d4Phgfv1IqW1MEZw7mBre
   ```

3. **VERCEL_PROJECT_ID**
   ```
   prj_bzU6UmuJD6pyGq0stlYgtcU2zn91
   ```

## How to Add Secrets to GitHub

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each secret with the name and value above

## Using GitHub CLI (Alternative)

If you have GitHub CLI installed, you can run these commands:

```bash
# First, set your Vercel token as an environment variable
export VERCEL_TOKEN="your-vercel-token-here"

# Then run these commands
gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN"
gh secret set VERCEL_ORG_ID --body "team_vF4d4Phgfv1IqW1MEZw7mBre"
gh secret set VERCEL_PROJECT_ID --body "prj_bzU6UmuJD6pyGq0stlYgtcU2zn91"
```

## Verify Setup

After adding the secrets, the GitHub Action will automatically:
- Deploy to production when you push to `main` or `master` branch
- Create preview deployments for pull requests
- Comment the deployment URLs on commits and PRs