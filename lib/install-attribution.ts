export const ATTRIBUTION_COOKIE_NAME = 'vibe_attribution'
export const ATTRIBUTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
export const ATTRIBUTION_UTM_MAX_LENGTH = 256
// Chrome commonly caps one cookie at 4096 bytes. Keep the encoded value at 3500
// so the cookie name and current/future attributes retain more than 500 bytes.
export const ATTRIBUTION_COOKIE_VALUE_MAX_BYTES = 3500

type AttributionPayload = {
  source: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  capturedAt: number
}

const OPTIONAL_FIELDS = ['content', 'term', 'campaign', 'medium'] as const

type CookieResponse = {
  cookies: {
    set: (name: string, value: string, options: Record<string, unknown>) => unknown
  }
}

function validUtm(searchParams: URLSearchParams, key: string): string | undefined {
  const value = searchParams.get(key)
  if (!value || value.length > ATTRIBUTION_UTM_MAX_LENGTH || value.includes('\uFFFD')) {
    return undefined
  }
  return value
}

export function buildAttributionPayload(
  searchParams: URLSearchParams,
  capturedAt = Date.now(),
): AttributionPayload | null {
  const source = validUtm(searchParams, 'utm_source')
  if (!source) return null

  const medium = validUtm(searchParams, 'utm_medium')
  const campaign = validUtm(searchParams, 'utm_campaign')
  const term = validUtm(searchParams, 'utm_term')
  const content = validUtm(searchParams, 'utm_content')

  return {
    source,
    ...(medium ? { medium } : {}),
    ...(campaign ? { campaign } : {}),
    ...(term ? { term } : {}),
    ...(content ? { content } : {}),
    capturedAt,
  }
}

export function encodedAttributionValue(payload: AttributionPayload): string {
  return encodeURIComponent(JSON.stringify(payload))
}

function fitAttributionPayload(payload: AttributionPayload): AttributionPayload | null {
  for (const field of OPTIONAL_FIELDS) {
    if (encodedAttributionValue(payload).length <= ATTRIBUTION_COOKIE_VALUE_MAX_BYTES) {
      return payload
    }
    delete payload[field]
  }

  return encodedAttributionValue(payload).length <= ATTRIBUTION_COOKIE_VALUE_MAX_BYTES
    ? payload
    : null
}

export function setAttributionCookie(
  response: CookieResponse,
  searchParams: URLSearchParams,
  capturedAt = Date.now(),
): boolean {
  const builtPayload = buildAttributionPayload(searchParams, capturedAt)
  const payload = builtPayload ? fitAttributionPayload(builtPayload) : null
  if (!payload) return false

  // NextResponse percent-encodes JSON into valid cookie octets. Readers of the
  // stored cookie value must decodeURIComponent before JSON.parse.
  response.cookies.set(ATTRIBUTION_COOKIE_NAME, JSON.stringify(payload), {
    path: '/',
    maxAge: ATTRIBUTION_COOKIE_MAX_AGE,
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  })
  return true
}
