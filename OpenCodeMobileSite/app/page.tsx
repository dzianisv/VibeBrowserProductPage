import type { Metadata } from 'next'
import Link from 'next/link'
import ScreenshotCarousel from '@/components/ScreenshotCarousel'
import ShowcaseVideo from '@/components/ShowcaseVideo'

export const metadata: Metadata = {
  title: 'OpenCode Mobile — Android App, iOS Coming Soon',
  description:
    'The free, open-source opencode client is available for Android. The iOS app is in development — join the waitlist for release updates.',
  alternates: { canonical: 'https://opencode.agentlabs.cc' },
}

const features = [
  {
    bullet: '[*]',
    title: 'Multi-server',
    description: 'Switch between local, cloud, and team servers. Credentials stay on device.',
  },
  {
    bullet: '[*]',
    title: 'Streaming diffs',
    description: 'Watch AI changes in real time with syntax-highlighted diffs.',
  },
  {
    bullet: '[*]',
    title: 'Biometric unlock',
    description: 'Fingerprint or Face ID. No password typing.',
  },
  {
    bullet: '[*]',
    title: 'Any model',
    description: 'Claude, GPT, Gemini, local models — whatever your server runs.',
  },
  {
    bullet: '[*]',
    title: 'Session management',
    description: 'Create, resume, and switch between coding sessions.',
  },
  {
    bullet: '[*]',
    title: 'MIT licensed',
    description: 'Fully open source. Audit, fork, self-build. No telemetry.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6" style={{ color: 'var(--fg)' }}>
            AI coding on Android.<br />
            <span style={{ color: 'var(--muted)' }}>iOS is next.</span>
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl" style={{ color: 'var(--muted)' }}>
            Free mobile client for{' '}
            <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer"
              className="underline underline-offset-3 decoration-1" style={{ color: 'var(--fg)' }}>
              opencode
            </a>
            . Connect to your own server, stream diffs in real time, and review AI changes from anywhere.
            The iOS app is now in active development.
          </p>

          {/* Install / Download */}
          <div className="flex flex-wrap gap-3 mb-4">
            <a
              href="https://play.google.com/store/apps/details?id=cc.agentlabs.opencode"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Download for Android
            </a>
            <a
              href="https://github.com/dzianisv/opencode-mobile/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              GitHub Releases
            </a>
            <Link href="/ios" className="btn-secondary text-sm">
              Join the iOS waitlist
            </Link>
            <a
              href="https://dzianisv.github.io/opencode-mobile/fdroid/repo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              F-Droid
            </a>
          </div>

          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            Android 8.0+ &nbsp;&middot;&nbsp; iOS in active development
          </p>
        </div>
      </section>

      {/* Screenshots */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScreenshotCarousel />
        </div>
      </section>

      {/* Showcase video */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--fg)' }}>
            10× end-to-end CUA demo
          </h2>
          <p className="text-sm text-center mb-6" style={{ color: 'var(--muted)' }}>
            Full onboarding-to-task CUA run accelerated 10× for a quick real-world walkthrough.
          </p>
          <ShowcaseVideo />
        </div>
      </section>

      {/* Features — opencode.ai style bullet list */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-12" style={{ color: 'var(--fg)' }}>
            What you get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <span className="text-sm font-mono shrink-0 mt-0.5" style={{ color: 'var(--muted)' }}>{f.bullet}</span>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--fg)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--fg)' }}>
                100% open source
              </h2>
              <p className="max-w-lg text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                MIT-licensed. Audit the code, self-build, contribute features, or fork it.
                No telemetry without consent. No hidden servers. Your data stays yours.
              </p>
            </div>
            <a
              href="https://github.com/dzianisv/opencode-mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm shrink-0"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Platform CTA */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            Choose your platform
          </h2>
          <p className="text-sm mb-8 max-w-lg" style={{ color: 'var(--muted)' }}>
            Android is available now. Join the iOS waitlist and we will email you when the App Store release is ready.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card">
              <p className="text-xs font-mono mb-3" style={{ color: 'var(--green)' }}>AVAILABLE</p>
              <h3 className="text-xl font-semibold mb-2">Android</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
                Download from Google Play or join the testing group.
              </p>
              <Link href="/beta" className="btn-primary text-sm">
                Get Android
              </Link>
            </div>
            <div className="card">
              <p className="text-xs font-mono mb-3" style={{ color: 'var(--muted)' }}>IN DEVELOPMENT</p>
              <h3 className="text-xl font-semibold mb-2">iPhone and iPad</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
                The same open-source opencode client, built for iOS.
              </p>
              <Link href="/ios" className="btn-secondary text-sm">
                Join the iOS waitlist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
