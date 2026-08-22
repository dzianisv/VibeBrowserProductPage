/**
 * Pure display logic for the public status page (AGE-1095).
 *
 * Kept separate from app/status/page.tsx so the fail-closed staleness rule
 * (stale or missing data -> "unknown", never "up") is unit-testable without
 * spinning up Next's server-component rendering.
 */

export type ServiceState = 'up' | 'down' | 'unknown'

export type ServiceResult = {
  id: string
  label: string
  url: string
  // "unknown" covers network errors/timeouts talking to the probed
  // endpoint itself (as opposed to a determinate 2xx/predicate failure,
  // which is "down") -- see scripts/generate-status.mjs.
  state: 'up' | 'down' | 'unknown'
  httpStatus: number | null
  error?: string
}

export type StatusPayload = {
  generatedAt: string
  overall: 'operational' | 'degraded' | 'unknown'
  services: ServiceResult[]
}

export type DisplayService = {
  id: string
  label: string
  url: string
  state: ServiceState
  httpStatus: number | null
}

export type DisplayStatus = {
  isStale: boolean
  ageMinutes: number
  overallState: ServiceState
  services: DisplayService[]
}

export const STALE_AFTER_MINUTES = 30

/**
 * Computes what should be rendered, given the raw published payload (or
 * null if it could not be read/parsed) and the current time.
 *
 * Fail-closed contract: if `payload` is null, its timestamp is unparsable,
 * or its age exceeds STALE_AFTER_MINUTES, every service (and the overall
 * banner) renders as "unknown" — the last-known "up" state is never shown
 * as current once it might be stale.
 */
export function computeDisplayStatus(
  payload: StatusPayload | null,
  nowMs: number,
  staleAfterMinutes: number = STALE_AFTER_MINUTES
): DisplayStatus {
  const generatedAtMs = payload ? Date.parse(payload.generatedAt) : NaN
  const ageMinutes = Number.isFinite(generatedAtMs) ? (nowMs - generatedAtMs) / 60000 : Infinity
  const isStale = !payload || !Number.isFinite(generatedAtMs) || ageMinutes > staleAfterMinutes

  const services: DisplayService[] =
    payload?.services.map((s) => ({
      id: s.id,
      label: s.label,
      url: s.url,
      state: isStale ? 'unknown' : s.state,
      httpStatus: s.httpStatus,
    })) ?? []

  // Worst-of ranking (AGE-1095 review fix): "down" always outranks
  // "unknown", which always outranks "up" -- mirrors
  // VibeWebAgent/scripts/status/generate-status.mjs's fail > unknown > ok
  // ordering. Previously this only checked for "down" and defaulted to
  // "up" otherwise, which meant a service the generator could not reach
  // (network error -> "unknown") rendered the whole banner as healthy
  // instead of unknown -- exactly the fail-closed floor this page exists
  // to guarantee.
  const RANK: Record<ServiceState, number> = { up: 0, unknown: 1, down: 2 }
  const overallState: ServiceState = isStale
    ? 'unknown'
    : services.length === 0
      ? 'unknown'
      : services.reduce<ServiceState>((worst, s) => (RANK[s.state] > RANK[worst] ? s.state : worst), 'up')

  return { isStale, ageMinutes, overallState, services }
}
