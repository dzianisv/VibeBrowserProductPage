# status.vibebrowser.app — DNS alias onto the existing Vercel project

Adds one Cloudflare record: `status` CNAME `cname.vercel-dns.com`, proxied.

This is not a Cloudflare Pages project and not a new Vercel app. The page and
JSON already exist on the VibeBrowserProductPage deployment:

- `https://www.vibebrowser.app/status`
- `https://www.vibebrowser.app/status.json`

Next.js `proxy.ts` rewrites `status.*` `/` to `/status`. `/status.json` is
served by the existing route on every host. Do not point this name at a
second project.

## Prerequisites

1. Attach the hostname to the **existing** Vercel project (idempotent):

   ```bash
   vercel domains add status.vibebrowser.app vibebrowser.app
   ```

   Needs `VERCEL_TOKEN` (or a logged-in CLI) for org `team_vF4d4Phgfv1IqW1MEZw7mBre`,
   project `vibebrowser.app` (`prj_bzU6UmuJD6pyGq0stlYgtcU2zn91`). This does not
   remove `www.vibebrowser.app`.

2. `CLOUDFLARE_API_TOKEN` with Zone DNS edit on zone
   `9f10b94c3422f57d10cc11c8539c0e6b`. Do not apply without that token.

## Apply

```bash
cd terraform/status-domain
export CLOUDFLARE_API_TOKEN=...   # Zone DNS edit

terraform init
terraform plan    # expect: 1 to add, cloudflare_record.status only
terraform apply
```

After DNS propagates and Vercel shows the domain verified:

```bash
curl -I https://status.vibebrowser.app/
curl -s https://status.vibebrowser.app/status.json
curl -sI https://www.vibebrowser.app/status.json   # must stay 200
```

## Rollback

The record is new. Rollback deletes only this name:

```bash
cd terraform/status-domain
terraform destroy
```

Then remove the custom domain from the Vercel project if you also want the
hostname detached (`vercel domains rm status.vibebrowser.app`). Do not delete
the project or the `www` domain.

State is local and gitignored (`*.tfstate`, `.terraform/`). If state is lost,
delete the `status` CNAME in zone `9f10b94c3422f57d10cc11c8539c0e6b` by hand —
do not touch any other record.
