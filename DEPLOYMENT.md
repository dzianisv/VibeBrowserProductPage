# Deployment Configuration

## Automatic Deployment with GitHub Actions

This project automatically deploys to Vercel production on every push to the `main` branch.

### Required GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

1. **VERCEL_TOKEN**
   - Get from: https://vercel.com/account/tokens
   - Create a new token with full access

2. **VERCEL_ORG_ID**
   - Value: `team_vF4d4Phgfv1IqW1MEZw7mBre`
   - Found in `.vercel/project.json`

3. **VERCEL_PROJECT_ID**
   - Value: `prj_bzU6UmuJD6pyGq0stlYgtcU2zn91`
   - Found in `.vercel/project.json`

### How It Works

1. Push code to `main` branch
2. GitHub Actions workflow triggers automatically
3. Builds the project with Vercel CLI
4. Deploys to production environment
5. Creates deployment status in GitHub

### Manual Deployment

If needed, you can still deploy manually:

```bash
vercel --prod
```

### Environment Variables

Ensure these are configured in Vercel dashboard:
- `SUPABASE_PROJECT_URL`
- `SUPABASE_API_KEY`

### Monitoring Deployments

- Check Actions tab in GitHub for deployment status
- View deployment history in Vercel dashboard
- Production URL: https://www.vibebrowser.app