"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, Activity, MessageCircle, ToggleLeft, AlertTriangle } from "lucide-react"

export default function TelemetrySupportPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/vibebrowser-logo.png" alt="Vibe Co-Pilot" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vibe Co-Pilot
          </span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/privacy" className="text-sm font-medium hover:text-purple-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Privacy Policy
          </Link>
        </nav>
      </header>

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Telemetry, Error Reporting &amp; Support</h1>
            <p className="text-muted-foreground">Last updated: August 2026 | Provider: Vibe Technologies, LLC</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            {/* Telemetry */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">What telemetry we collect and why</h2>
                  <p className="text-muted-foreground mb-4">
                    We collect two categories of telemetry from the Extension: <strong>product analytics</strong> (Google
                    Analytics 4, via a first-party endpoint) and <strong>error/crash reports</strong> (Sentry). Full detail
                    on what is sent to each is in the{" "}
                    <Link href="/privacy#relay" className="text-purple-600 hover:underline">Privacy Policy</Link> and the{" "}
                    <Link href="/subprocessors" className="text-purple-600 hover:underline">Subprocessors list</Link>. In
                    summary:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
                    <li>Analytics events: event names and low-cardinality properties, a pseudonymous client ID, a hashed
                      user ID, and plan tier. For settings changes we send the setting key name, never its value. We use
                      this to understand which features are used and to fix what is broken — not for advertising.</li>
                    <li>Error reports: error messages, stack traces, browser/extension version. Session replay is
                      disabled; cookies, request headers, and URLs are stripped/sanitized before sending.</li>
                  </ul>
                  <p className="text-muted-foreground">
                    <strong>Purpose:</strong> product analytics tells us which features people actually use, so we build
                    the right things. Error reports let us find and fix crashes without waiting for a user to report
                    them manually. Neither is used to build advertising profiles, and neither is sold.
                  </p>
                </div>
              </div>
            </section>

            {/* Opt-out */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ToggleLeft className="w-5 h-5 text-green-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">How to opt out</h2>
                  <p className="text-muted-foreground mb-4">
                    Open the Extension, go to <strong>Settings → Product Analytics</strong>, and turn the toggle off.
                    This flips the <code>vibe.analytics.enabled</code> storage key to <code>false</code>. That key is
                    read as a hard gate before every analytics event is queued or sent — when it is off, no event
                    leaves the browser, full stop. Analytics is on by default (an opt-out model, not opt-in); we are
                    stating that plainly rather than implying otherwise.
                  </p>
                  <p className="text-muted-foreground">
                    Error reporting (Sentry) does not currently have its own opt-out toggle. <code>lib/sentry-config.js</code>
                    initializes Sentry whenever a DSN is configured in the build, independent of the analytics toggle above.
                    We are disclosing this as the current, unflattering fact rather than describing a control that does not
                    exist. A dedicated error-reporting opt-out is tracked as follow-up work; until it ships, the only way
                    to stop error reports is to disable the Extension itself. If this matters for your use case, email{" "}
                    <a href="mailto:privacy@vibebrowser.app" className="text-purple-600 hover:underline">privacy@vibebrowser.app</a>.
                  </p>
                </div>
              </div>
            </section>

            {/* Honesty about gaps */}
            <section className="bg-amber-50 rounded-xl p-6 shadow-sm border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Honest history</h2>
                  <p className="text-muted-foreground text-sm">
                    Funnel/onboarding analytics events were silently absent from every build for roughly a month before
                    being found and fixed. That means "what we collect" was not a settled internal fact for that
                    period — the events we intended to send were not actually arriving. We are disclosing this rather
                    than implying our analytics pipeline has always matched its design. The fix restored the intended
                    event set; this page reflects what is sent today, verified against the current <code>lib/analytics.ts</code>
                    consent gate and event list, not the historical gap.
                  </p>
                </div>
              </div>
            </section>

            {/* Support */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Support channel</h2>
                  <p className="text-muted-foreground mb-4">
                    <a href="mailto:support@vibebrowser.app" className="text-purple-600 hover:underline">support@vibebrowser.app</a>{" "}
                    is our owned support channel. It is a real, monitored inbox: mail sent to it is routed by a
                    Cloudflare Email Worker into our shared Chatwoot support desk, where a human (or an agent acting on
                    a human's behalf) triages and replies.
                  </p>
                  <p className="text-muted-foreground mb-2"><strong>Response target:</strong> we aim to send a first
                    response within <strong>1 business day</strong> (Monday–Friday, excluding US holidays). This is an
                    operating target, not a contractual SLA — we do not currently offer paid-tier guaranteed response
                    times or an enterprise support contract. If you need one, email us and we will discuss it as a
                    custom agreement.</p>
                  <p className="text-muted-foreground">
                    For account, billing, or refund requests, see the{" "}
                    <Link href="/refund" className="text-purple-600 hover:underline">Refund &amp; Cancellation Policy</Link>.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full border-t bg-white py-8">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto text-center">
          <p className="text-sm text-muted-foreground">© 2026 Vibe Technologies, LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
