import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const CHROME_WEB_STORE_URL =
  'https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado'

const ATTRIBUTION_COOKIE_NAME = 'vibe_attribution'
const ATTRIBUTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const response = NextResponse.redirect(CHROME_WEB_STORE_URL, { status: 302 })

  const source = searchParams.get('utm_source')

  if (source) {
    const medium = searchParams.get('utm_medium')
    const campaign = searchParams.get('utm_campaign')
    const term = searchParams.get('utm_term')
    const content = searchParams.get('utm_content')

    const payload = {
      source,
      ...(medium ? { medium } : {}),
      ...(campaign ? { campaign } : {}),
      ...(term ? { term } : {}),
      ...(content ? { content } : {}),
      capturedAt: Date.now(),
    }

    response.cookies.set(ATTRIBUTION_COOKIE_NAME, JSON.stringify(payload), {
      path: '/',
      maxAge: ATTRIBUTION_COOKIE_MAX_AGE,
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    })
  }

  return response
}
