output "status_hostname" {
  description = "Public hostname aliased onto the existing Vercel project"
  value       = var.status_hostname
}

output "status_cname_target" {
  description = "CNAME target for status.vibebrowser.app"
  value       = cloudflare_record.status.content
}

output "status_record_id" {
  description = "Cloudflare record id, for a manual rollback if state is lost"
  value       = cloudflare_record.status.id
}
