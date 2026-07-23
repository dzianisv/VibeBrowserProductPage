import { ImageResponse } from 'next/og'
import { ogImageDesigns } from '@/lib/og-image-designs'

const size = {
  width: 1200,
  height: 630,
}

const contentType = 'image/png'

// Pre-render every known key at build time so this route is served as a
// static asset (like the per-route opengraph-image.tsx files it replaced),
// not re-rendered via Satori on every crawler/social-unfurl request.
export function generateStaticParams() {
  return Object.keys(ogImageDesigns).map((key) => ({ key }))
}

// The key set is closed (only the keys enumerated by generateStaticParams
// exist). Reject anything else with a standard, cheaply-cached 404 instead
// of attempting on-demand ISR generation/caching for keys that will never
// exist.
export const dynamicParams = false

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params

  // Object.hasOwn guards against prototype-chain keys (`constructor`,
  // `toString`, `__proto__`, `hasOwnProperty`, ...) which are truthy on a
  // plain object literal and would otherwise bypass the "unknown key" 404
  // and get passed to ImageResponse as a non-JSX value, causing a 500 (or,
  // for callable-but-wrong-shape members, a meaningless 200).
  if (!Object.hasOwn(ogImageDesigns, key)) {
    return new Response('Not found', { status: 404 })
  }

  const design = ogImageDesigns[key]

  return new ImageResponse(design(), {
    ...size,
    headers: {
      'Content-Type': contentType,
    },
  })
}
