# Blocked: credentials are not in this workspace

The requested design is already in the branch. This file exists because the brief says to write `OBJECTION.md` and stop when `CLOUDFLARE_API_TOKEN` is unset, instead of inventing an apply. This is not an architecture objection.

## What is wrong with applying now

- `CLOUDFLARE_API_TOKEN` is unset. `terraform -chdir=terraform/status-domain init` succeeded (provider cloudflare 4.52.9). `terraform plan` then failed at provider configuration:

  `Error: must provide exactly one of "api_key", "api_token" or "api_user_service_key".`

  No `terraform apply` was run. No zone record was created or changed.

- `VERCEL_TOKEN` is unset. The local Vercel CLI has no credentials (`vercel whoami` started a device login; that process was killed). `vercel domains add status.vibebrowser.app` was not run. GitHub secret `VERCEL_TOKEN` exists on `dzianisv/VibeBrowserProductPage` but its value is not readable from this workspace.

## What to do instead (same design, not a second app)

1. With the existing project token: `vercel domains add status.vibebrowser.app vibebrowser.app` (org `team_vF4d4Phgfv1IqW1MEZw7mBre`, project `prj_bzU6UmuJD6pyGq0stlYgtcU2zn91`). Do not create a new Vercel project.
2. Export a real Zone DNS `CLOUDFLARE_API_TOKEN`, then `terraform -chdir=terraform/status-domain plan` and apply only if the plan is exactly one `cloudflare_record.status` add.
3. After DNS + Vercel verification: `curl -I https://status.vibebrowser.app/` and `curl -s https://status.vibebrowser.app/status.json`. Confirm `https://www.vibebrowser.app/status.json` is still 200.

`status.vibebrowser.app` does not resolve yet. Production is not done.
