# =============================================================================
# DNS alias: status.vibebrowser.app -> existing Vercel project
# =============================================================================
#
# This is NOT a Cloudflare Pages project and NOT a second app. The status page
# already ships from the root Next.js app on Vercel (www.vibebrowser.app/status
# and /status.json). This module only adds the `status` CNAME in the
# vibebrowser.app zone so that hostname reaches the same Vercel project.
#
# Own root module, own state. Do not add other zone records here.
#
# Apply only after `vercel domains add status.vibebrowser.app` has attached the
# hostname to the existing VibeBrowserProductPage project. See README.md.

terraform {
  required_version = ">= 1.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  # Uses CLOUDFLARE_API_TOKEN (Zone DNS edit on vibebrowser.app).
}

# Orange-cloud CNAME, same shape as docs.vibebrowser.app's cutover record, but
# the target is Vercel's documented custom-domain CNAME — not a Pages hostname.
# allow_overwrite is intentionally false: this name must not exist yet, and a
# collision should fail the plan rather than replace some other record.
resource "cloudflare_record" "status" {
  zone_id = var.cloudflare_zone_id
  name    = "status"
  type    = "CNAME"
  content = var.vercel_cname_target
  ttl     = 1
  proxied = true
  comment = "status.vibebrowser.app -> existing Vercel project (VibeBrowserProductPage)"
}
