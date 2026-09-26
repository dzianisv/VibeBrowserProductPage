variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for vibebrowser.app"
  type        = string
  default     = "9f10b94c3422f57d10cc11c8539c0e6b"
}

variable "vercel_cname_target" {
  description = "Vercel custom-domain CNAME target (same target used for pitch.vibebrowser.app)"
  type        = string
  default     = "cname.vercel-dns.com"
}

variable "status_hostname" {
  description = "Public hostname this record serves. Documentation only — the record name is the `status` label."
  type        = string
  default     = "status.vibebrowser.app"
}
