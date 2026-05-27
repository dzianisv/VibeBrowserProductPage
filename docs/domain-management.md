# Domain and DNS Management

This runbook defines how domain and DNS changes are handled for this project.

## Source of truth

- **Spaceship is the registrar and DNS source of truth** for project domains.
- The `agentlabs.cc` DNS zone is managed in Spaceship.
- Do not treat Vercel, Cloudflare, or local machine config as authoritative DNS state.

## DNS change procedure

1. Confirm the requested change (record type, host, value, TTL, and expected behavior).
2. Open the `agentlabs.cc` zone in Spaceship DNS management.
3. Add, edit, or remove only the required record(s); avoid unrelated cleanup in the same change.
4. Save the change and capture what changed (record name/type/value/TTL) in issue or PR notes.
5. Wait for propagation (typically minutes, can be longer depending on TTL and resolver cache).

## Verification checklist

- [ ] Query authoritative DNS and confirm new record values resolve as expected.
- [ ] Verify from at least one public resolver (for example, Google `8.8.8.8` or Cloudflare `1.1.1.1`).
- [ ] Confirm application-level behavior (site load, TLS, email routing, webhook target, etc.) matches intent.
- [ ] Confirm no required records were removed or overwritten accidentally.
- [ ] Document final verification result in the related issue or PR.

## Security and documentation rules

- Never include secrets in docs (API keys, access tokens, account passwords, private cert material).
- Keep docs focused on process and public configuration values only.
