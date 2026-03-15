import { trace } from '@opentelemetry/api'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type WebVitalRating = 'good' | 'needs-improvement' | 'poor'

interface WebVitalPayload {
  id: string
  name: string
  delta: number
  value: number
  rating?: WebVitalRating
  navigationType?: string
  pathname: string
  href: string
}

const ALLOWED_WEB_VITALS = new Set(['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'])
const telemetryEnabled = Boolean(
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT && process.env.OTEL_EXPORTER_OTLP_HEADERS
)

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isWebVitalRating(value: unknown): value is WebVitalRating {
  return value === 'good' || value === 'needs-improvement' || value === 'poor'
}

function isWebVitalPayload(value: unknown): value is WebVitalPayload {
  if (!value || typeof value !== 'object') {
    return false
  }

  const payload = value as Record<string, unknown>

  return (
    isNonEmptyString(payload.id) &&
    isNonEmptyString(payload.name) &&
    ALLOWED_WEB_VITALS.has(payload.name) &&
    isFiniteNumber(payload.delta) &&
    isFiniteNumber(payload.value) &&
    isNonEmptyString(payload.pathname) &&
    isNonEmptyString(payload.href) &&
    (payload.rating === undefined || isWebVitalRating(payload.rating)) &&
    (payload.navigationType === undefined || isNonEmptyString(payload.navigationType))
  )
}

export async function POST(request: Request) {
  if (!telemetryEnabled) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  }

  const payload = await request.json()

  if (!isWebVitalPayload(payload)) {
    return NextResponse.json(
      { error: 'Invalid web vitals payload' },
      {
        status: 400,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  }

  const tracer = trace.getTracer('vibebrowser-web-vitals')

  tracer.startActiveSpan(`web-vital ${payload.name}`, (span) => {
    span.setAttributes({
      'app.metric.type': 'web-vital',
      'web_vital.id': payload.id,
      'web_vital.name': payload.name,
      'web_vital.value': payload.value,
      'web_vital.delta': payload.delta,
      'web_vital.rating': payload.rating ?? 'unrated',
      'web_vital.navigation_type': payload.navigationType ?? 'unknown',
      'url.path': payload.pathname,
      'url.full': payload.href,
      'user_agent.original': request.headers.get('user-agent') ?? 'unknown',
    })
    span.end()
  })

  return new NextResponse(null, {
    status: 202,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}
