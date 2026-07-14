'use client'

import { useEffect, useState } from 'react'

export default function ShowcaseVideo() {
  const [autoplay, setAutoplay] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setAutoplay(!query.matches)

    sync()

    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', sync)

      return () => query.removeEventListener('change', sync)
    }

    query.addListener(sync)

    return () => query.removeListener(sync)
  }, [])

  return (
    <div className="w-full max-w-[360px] mx-auto">
      <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <video
          controls
          muted
          playsInline
          loop
          preload="metadata"
          autoPlay={autoplay}
          poster="/media/video/cua-showcase-10x-poster.jpg"
          style={{ width: '100%', display: 'block' }}
          aria-label="10x-speed end-to-end CUA onboarding and coding demo"
        >
          <source src="/media/video/cua-showcase-10x.webm" type="video/webm" />
          <source src="/media/video/cua-showcase-10x.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
