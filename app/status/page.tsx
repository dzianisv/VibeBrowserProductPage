import { computeDisplayStatus, STALE_AFTER_MINUTES, type ServiceState, type StatusPayload } from '@/lib/status'
import { getCachedStatusPayload } from '@/lib/status-cache'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Vibe Browser Status',
  description: 'Live status of Vibe Browser services, generated from the same on-call health sweep that pages the team.',
}

async function readStatus(): Promise<StatusPayload | null> {
  try {
    // Same in-process, TTL-cached generator that backs /status.json -- one
    // code path, so the page and the machine-readable artifact can never
    // disagree (AGE-1095 review fix: no more static public/status.json
    // committed by a 15-minute cron).
    return await getCachedStatusPayload()
  } catch {
    return null
  }
}

function badge(state: ServiceState) {
  if (state === 'up') return { text: 'Operational', color: 'bg-green-100 text-green-800 border-green-300' }
  if (state === 'down') return { text: 'Down', color: 'bg-red-100 text-red-800 border-red-300' }
  return { text: 'Unknown', color: 'bg-slate-100 text-slate-600 border-slate-300' }
}

export default async function StatusPage() {
  const payload = await readStatus()
  // This is a dynamic (force-dynamic, revalidate=0) server component whose
  // whole purpose is to report the current wall-clock freshness of the
  // published data on every request; there is no cached/pure render to
  // violate by reading the clock here.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now()

  // Fail-closed: if the underlying data is missing or stale, every service
  // renders as "unknown" — never green — regardless of the last recorded
  // state. See lib/status.ts for the unit-tested derivation.
  const { isStale, ageMinutes, overallState, services } = computeDisplayStatus(payload, now)

  const overallBadge = badge(overallState)

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Vibe Browser Status</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Generated from the same automated on-call health sweep
          (<code>oncall-health-sweep.yml</code>) that pages the team internally. Data older than{' '}
          {STALE_AFTER_MINUTES} minutes is shown as <strong>Unknown</strong>, never as healthy.
        </p>

        <div className={`rounded-lg border px-4 py-3 mb-8 font-medium ${overallBadge.color}`} data-testid="overall-status">
          Overall: {overallBadge.text}
        </div>

        {payload === null && (
          <p className="text-sm text-red-700" data-testid="no-data">
            No status data is currently published. This itself renders as Unknown above — it does
            not fall back to reporting healthy.
          </p>
        )}

        <ul className="divide-y divide-slate-200 border rounded-lg bg-white" data-testid="service-list">
          {services.map((svc) => {
            const b = badge(svc.state)
            return (
              <li key={svc.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="font-medium">{svc.label}</div>
                  <div className="text-xs text-muted-foreground">{svc.url}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded border ${b.color}`} data-testid={`state-${svc.id}`}>
                  {b.text}
                </span>
              </li>
            )
          })}
        </ul>

        <p className="text-xs text-muted-foreground mt-8" data-testid="last-updated">
          {payload
            ? `Last updated: ${payload.generatedAt} (${Math.round(ageMinutes)} min ago)${isStale ? ' — STALE, forced to Unknown' : ''}`
            : 'No generation timestamp available.'}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Need a human? Email{' '}
          <a href="mailto:support@vibebrowser.app" className="underline">
            support@vibebrowser.app
          </a>
          .
        </p>
      </div>
    </main>
  )
}
