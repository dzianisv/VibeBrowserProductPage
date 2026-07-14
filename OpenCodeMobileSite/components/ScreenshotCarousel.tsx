'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

type Slide = {
  src: string
  title: string
  alt: string
}

const slides: Slide[] = [
  {
    src: '/media/screenshots/opencode-play-01.png',
    title: 'Add a connection',
    alt: 'Add Connection screen with IP address, port, name, and optional password fields for pairing with an OpenCode server.',
  },
  {
    src: '/media/screenshots/opencode-play-02.png',
    title: 'Browse your sessions',
    alt: 'Sessions list showing the connected server and recent coding conversations.',
  },
  {
    src: '/media/screenshots/opencode-play-03.png',
    title: 'Start a new session',
    alt: 'Sessions list right after creating a new session, shown at the top with the connected server.',
  },
  {
    src: '/media/screenshots/opencode-play-04.png',
    title: 'Draft a coding task',
    alt: 'New session screen with a coding task typed into the message composer, ready to send.',
  },
  {
    src: '/media/screenshots/opencode-play-05.png',
    title: 'Agent plans and searches',
    alt: 'Assistant reasoning about the task and running tool calls such as a glob search before editing files.',
  },
  {
    src: '/media/screenshots/opencode-play-06.png',
    title: 'Agent creates the file',
    alt: 'Tool call succeeds and the assistant creates hello.ts with the requested console output.',
  },
  {
    src: '/media/screenshots/opencode-play-07.png',
    title: 'Review the finished task',
    alt: 'Completed hello.ts file with usage instructions shown in the chat transcript.',
  },
]

export default function ScreenshotCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const startSpacerRef = useRef<HTMLDivElement>(null)
  const endSpacerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const [active, setActive] = useState(0)

  const syncActive = useCallback(() => {
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    const cards = Array.from(viewport.querySelectorAll<HTMLElement>('[data-slide]'))

    if (cards.length === 0) {
      return
    }

    const center = viewport.scrollLeft + viewport.clientWidth / 2
    let closest = 0
    let distance = Number.POSITIVE_INFINITY

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const delta = Math.abs(center - cardCenter)

      if (delta >= distance) {
        return
      }

      distance = delta
      closest = idx
    })

    setActive(closest)
  }, [])

  const scrollToSlide = useCallback((idx: number) => {
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    const next = Math.min(slides.length - 1, Math.max(0, idx))
    const card = viewport.querySelector<HTMLElement>(`[data-slide="${next}"]`)

    if (!card) {
      return
    }

    // Center the target card in the viewport, matching syncActive's
    // center-based detection so Prev/Next always land on the true active slide.
    const target = card.offsetLeft + card.offsetWidth / 2 - viewport.clientWidth / 2

    viewport.scrollTo({ left: target, behavior: 'smooth' })
  }, [])

  // Sized so the first and last cards can reach the viewport center too,
  // exactly like every interior card. Without this, edge slides can only
  // ever align to the scroll container's start/end, not its center.
  const syncSpacers = useCallback(() => {
    const viewport = viewportRef.current
    const startSpacer = startSpacerRef.current
    const endSpacer = endSpacerRef.current

    if (!viewport || !startSpacer || !endSpacer) {
      return
    }

    startSpacer.style.width = '0px'
    endSpacer.style.width = '0px'

    const firstCard = viewport.querySelector<HTMLElement>('[data-slide="0"]')

    if (!firstCard) {
      return
    }

    const targetLeft = viewport.clientWidth / 2 - firstCard.offsetWidth / 2
    const spacerWidth = Math.max(0, targetLeft - firstCard.offsetLeft)

    startSpacer.style.width = `${spacerWidth}px`
    endSpacer.style.width = `${spacerWidth}px`
  }, [])

  const onScroll = useCallback(() => {
    if (frameRef.current !== null) {
      return
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null
      syncActive()
    })
  }, [syncActive])

  useEffect(() => {
    syncSpacers()
    syncActive()

    const onResize = () => {
      syncSpacers()
      syncActive()
    }

    window.addEventListener('resize', onResize)

    const viewport = viewportRef.current
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(onResize)

    if (observer && viewport) {
      observer.observe(viewport)
    }

    return () => {
      window.removeEventListener('resize', onResize)
      observer?.disconnect()

      if (frameRef.current === null) {
        return
      }

      window.cancelAnimationFrame(frameRef.current)
    }
  }, [syncActive, syncSpacers])

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--fg)' }}>
          Mobile walkthrough
        </h2>
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="text-xs font-mono"
          style={{ color: 'var(--muted)' }}
        >
          Slide {active + 1} of {slides.length}: {slides[active].title}
        </p>
      </div>

      <div className="relative">
        <div
          ref={viewportRef}
          className="flex gap-4 overflow-x-auto pb-3 px-4 sm:px-6 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={onScroll}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              scrollToSlide(active - 1)
            }

            if (event.key === 'ArrowRight') {
              event.preventDefault()
              scrollToSlide(active + 1)
            }
          }}
          tabIndex={0}
          role="region"
          aria-label="Play Store screenshots carousel"
        >
          <div ref={startSpacerRef} aria-hidden className="shrink-0" style={{ width: 0 }} />

          {slides.map((slide, idx) => (
            <article
              key={slide.src}
              data-slide={idx}
              className="snap-center shrink-0 w-[78%] sm:w-[48%] lg:w-[34%] max-w-[360px] min-w-[220px]"
            >
              <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border)' }}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={1280}
                  height={2560}
                  className="w-full h-auto"
                  priority={idx === 0}
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 48vw, 34vw"
                />
              </div>
              <p className="mt-3 text-xs" style={{ color: 'var(--muted)' }}>
                {slide.title}
              </p>
            </article>
          ))}

          <div ref={endSpacerRef} aria-hidden className="shrink-0" style={{ width: 0 }} />
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollToSlide(active - 1)}
          disabled={active === 0}
          className="btn-secondary text-sm px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Show previous screenshot"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => scrollToSlide(active + 1)}
          disabled={active === slides.length - 1}
          className="btn-secondary text-sm px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Show next screenshot"
        >
          Next
        </button>
      </div>
    </div>
  )
}
