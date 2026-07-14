'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function IosWaitlistPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    const response = await fetch('/api/ios-waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => null)

    if (!response) {
      setError('We could not reach the waitlist. Please try again.')
      setStatus('error')
      return
    }

    const body = await response.json().catch(() => null)
    if (!response.ok) {
      setError(body?.error ?? 'We could not add you right now. Please try again.')
      setStatus('error')
      return
    }

    setStatus('success')
  }

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-xs font-mono mb-5" style={{ color: 'var(--muted)' }}>
              [ IOS · IN DEVELOPMENT ]
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
              OpenCode Mobile<br />
              <span style={{ color: 'var(--muted)' }}>is coming to iOS.</span>
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: 'var(--muted)' }}>
              We are building the open-source opencode client for iPhone and iPad.
              Join the waitlist and we will email you when it is ready to test or download.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm" style={{ color: 'var(--muted)' }}>
              <span>[*] Open source</span>
              <span>[*] Self-hosted servers</span>
              <span>[*] Release updates only</span>
            </div>
          </div>

          <div className="card p-7 sm:p-8">
            {status === 'success' ? (
              <div aria-live="polite">
                <p className="text-xs font-mono mb-4" style={{ color: 'var(--green)' }}>YOU ARE ON THE LIST</p>
                <h2 className="text-2xl font-bold mb-3">We will email you.</h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                  Your address was added to the OpenCode Mobile iOS waitlist.
                </p>
                <Link href="/" className="btn-secondary text-sm">
                  Back to OpenCode Mobile
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-3">Join the iOS waitlist</h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                  One email when testing opens, plus important release updates. No spam.
                </p>
                <form onSubmit={submit} className="space-y-4">
                  <label htmlFor="ios-email" className="block text-sm font-medium">
                    Email address
                  </label>
                  <input
                    id="ios-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    inputMode="email"
                    required
                    maxLength={254}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
                    style={{
                      backgroundColor: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--fg)',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary text-sm w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Joining…' : 'Notify me about iOS'}
                  </button>
                  {status === 'error' && (
                    <p className="text-sm" role="alert" style={{ color: '#ff8585' }}>
                      {error}
                    </p>
                  )}
                </form>
                <p className="text-xs leading-relaxed mt-5" style={{ color: 'var(--muted)' }}>
                  By joining, you agree to receive OpenCode Mobile iOS release emails.
                  Read our <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-20 pt-12 border-t" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-4">Built in public</h2>
          <p className="text-sm leading-relaxed max-w-2xl mb-6" style={{ color: 'var(--muted)' }}>
            The Android and iOS apps share the same public repository. You can follow development,
            review the code, report issues, or contribute.
          </p>
          <a
            href="https://github.com/dzianisv/opencode-mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            Follow on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
