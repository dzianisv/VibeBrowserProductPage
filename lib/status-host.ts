/**
 * Host rewrite for status.vibebrowser.app.
 *
 * The status page and JSON already live on this Next.js app
 * (`/status`, `/status.json`). The status subdomain is only an alias:
 * rewrite `/` to `/status` and leave every other path, including
 * `/status.json`, untouched so www.vibebrowser.app/status.json keeps working.
 */
export function statusHostRewritePath(host: string, pathname: string): '/status' | null {
  if (!host.startsWith('status.')) return null
  if (pathname === '/') return '/status'
  return null
}
