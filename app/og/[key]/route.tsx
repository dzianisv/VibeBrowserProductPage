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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params
  const design = ogImageDesigns[key]

  if (!design) {
    return new Response('Not found', { status: 404 })
  }

  return new ImageResponse(design(), {
    ...size,
    headers: {
      'Content-Type': contentType,
    },
  })
}
