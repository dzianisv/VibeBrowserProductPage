export const ATTRIBUTION_COOKIE_NAME = 'vibe_attribution'
export const ATTRIBUTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
export const ATTRIBUTION_UTM_MAX_LENGTH = 256

type AttributionPayload = {
  source: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  capturedAt: number
}

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

export function setAttributionCookie(
  response: CookieResponse,
  searchParams: URLSearchParams,
  capturedAt = Date.now(),
): boolean {
  const payload = buildAttributionPayload(searchParams, capturedAt)
  if (!payload) return false

  // NextResponse percent-encodes JSON into valid cookie octets. Chrome returns
  // those octets unchanged, so readers must decodeURIComponent before JSON.parse.
  response.cookies.set(ATTRIBUTION_COOKIE_NAME, JSON.stringify(payload), {
    path: '/',
    maxAge: ATTRIBUTION_COOKIE_MAX_AGE,
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  })
  return true
}
