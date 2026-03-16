import { trace } from '@opentelemetry/api'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type TelemetryPrimitive = string | number | boolean | null

interface TelemetryEventPayload {
  eventName: string
  pathname: string
  properties?: Record<string, TelemetryPrimitive>
}

const telemetryEnabled = Boolean(
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT && process.env.OTEL_EXPORTER_OTLP_HEADERS
)

const ALLOWED_EVENT_PROPERTIES: Record<string, Set<string>> = {
  cta_click: new Set(['cta_name', 'location']),
  dialog_open: new Set(['dialog_name']),
  generate_lead: new Set([
    'event_category',
    'event_label',
    'referral_source',
    'utm_source',
    'utm_medium',
    'utm_campaign',
  ]),
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

function isTelemetryPrimitive(value: unknown): value is TelemetryPrimitive {
  return (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

function isSafePathname(value: string): boolean {
  return value.startsWith('/') && value.length <= 200
}

function sanitizeString(value: string): string {
  return value.replace(/\s+/g, ' ').trim().slice(0, 200)
}

function sanitizePropertyValue(value: TelemetryPrimitive): string | number | boolean | null {
  if (typeof value === 'string') {
    return sanitizeString(value)
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }

  return value
}

function isTelemetryEventPayload(value: unknown): value is TelemetryEventPayload {
  if (!value || typeof value !== 'object') {
    return false
  }

  const payload = value as Record<string, unknown>

  if (!isNonEmptyString(payload.eventName) || !ALLOWED_EVENT_PROPERTIES[payload.eventName]) {
    return false
  }

  if (!isNonEmptyString(payload.pathname) || !isSafePathname(payload.pathname)) {
    return false
  }

  if (payload.properties === undefined) {
    return true
  }

  if (!payload.properties || typeof payload.properties !== 'object' || Array.isArray(payload.properties)) {
    return false
  }

  return Object.values(payload.properties).every(isTelemetryPrimitive)
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

  if (!isTelemetryEventPayload(payload)) {
    return NextResponse.json(
      { error: 'Invalid telemetry event payload' },
      {
        status: 400,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  }

  const allowedProperties = ALLOWED_EVENT_PROPERTIES[payload.eventName]
  const tracer = trace.getTracer('vibebrowser-events')

  tracer.startActiveSpan(`ui-event ${payload.eventName}`, (span) => {
    span.setAttributes({
      'app.event.name': payload.eventName,
      'app.event.type': 'client',
      'url.path': payload.pathname,
    })

    for (const [key, rawValue] of Object.entries(payload.properties ?? {})) {
      if (!allowedProperties.has(key)) {
        continue
      }

      const value = sanitizePropertyValue(rawValue)

      if (value !== null) {
        span.setAttribute(`app.event.${key}`, value)
      }
    }

    span.end()
  })

  return new NextResponse(null, {
    status: 202,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}
