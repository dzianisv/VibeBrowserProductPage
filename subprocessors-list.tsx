"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, Globe, ShieldAlert } from "lucide-react"

interface Subprocessor {
  name: string
  purpose: string
  dataShared: string
  region: string
  status: string
}

const subprocessors: Subprocessor[] = [
  {
    name: "OpenAI",
    purpose: "AI model provider (when you configure OpenAI as your model)",
    dataShared: "Prompts, page text/DOM, screenshots when the task needs them, tool call context",
    region: "United States (global infrastructure)",
    status: "Active — only when you select this provider",
  },
  {
    name: "Anthropic",
    purpose: "AI model provider (when you configure Anthropic/Claude as your model)",
    dataShared: "Prompts, page text/DOM, screenshots when the task needs them, tool call context",
    region: "United States (global infrastructure)",
    status: "Active — only when you select this provider",
  },
  {
    name: "Google (Gemini)",
    purpose: "AI model provider (when you configure Gemini as your model)",
    dataShared: "Prompts, page text/DOM, screenshots when the task needs them, tool call context",
    region: "United States / global infrastructure",
    status: "Active — only when you select this provider",
  },
  {
    name: "DeepSeek",
    purpose: "AI model provider (when you configure DeepSeek as your model)",
    dataShared: "Prompts, page text/DOM, screenshots when the task needs them, tool call context",
    region: "People's Republic of China. This is a materially different jurisdiction for data protection and government-access law than the other model providers on this list — evaluate this before selecting DeepSeek for sensitive tasks.",
    status: "Active — only when you select this provider.",
  },
  {
    name: "OpenRouter",
    purpose: "AI model routing provider (when you configure OpenRouter as your model)",
    dataShared: "Prompts, page text/DOM, screenshots when the task needs them, tool call context. OpenRouter forwards these to whichever underlying model you select through it.",
    region: "United States (routes to multiple underlying providers/regions)",
    status: "Active — only when you select this provider",
  },
  {
    name: "Langfuse",
    purpose: "LLM tracing/observability",
    dataShared: "Prompts, model inputs/outputs, page content captured in traces",
    region: "Vibe-operated, self-hosted instance at langfuse.vibebrowser.app (confirmed from the configured client's baseUrl in the currently served build; hosting region unverified). Not cloud.langfuse.com — that hostname appears only as the Langfuse SDK's generic fallback default, never as the configured destination.",
    status: "At the last served-artifact check on August 22, 2026, Google's Chrome Web Store build still contained Vibe's Langfuse client configuration and attempted client-side tracing to langfuse.vibebrowser.app. While the embedded credential remains valid, trace content may be sent there. A merged fix disables extension-side Langfuse initialization entirely. Release verification tracks provider-side key revocation and confirmation that Google serves the clean artifact.",
  },
  {
    name: "Sentry",
    purpose: "Error tracking and crash diagnostics",
    dataShared: "Error messages, stack traces, browser/extension version, sanitized error context. Session replay is disabled. Cookies and request headers are stripped before sending.",
    region: "United States (Sentry.io)",
    status: "Active whenever a Sentry DSN is configured in the build (lib/sentry-config.js). There is currently no separate opt-out toggle for error reporting — this is a disclosed gap, not a described control.",
  },
  {
    name: "Google Analytics 4",
    purpose: "Product analytics",
    dataShared: "Pseudonymous client identifier, hashed user identifier, plan tier, low-cardinality event names/properties. Routed through a first-party endpoint on api.vibebrowser.app first.",
    region: "United States / global infrastructure (Google)",
    status: "Active by default (consent-gated toggle); opt-out in Extension settings.",
  },
  {
    name: "Stripe",
    purpose: "Payment processing and subscription billing",
    dataShared: "Billing email, subscription status, customer identifier. Card numbers are entered on Stripe's systems directly — we never receive or store full card details.",
    region: "United States (global payments infrastructure)",
    status: "Active for all paid plans.",
  },
  {
    name: "Supabase",
    purpose: "Account/auth backend for the extension's portal (sign-in, plan/entitlement state) and the marketing site's waitlist database",
    dataShared: "Account email, OAuth identity, subscription/plan status, waitlist signup metadata (UTM/referral fields).",
    region: "Hosted Supabase project (US region unless otherwise configured)",
    status: "Active for signed-in users and waitlist signups.",
  },
  {
    name: "Chatwoot (self-hosted)",
    purpose: "Customer support inbox for support@vibebrowser.app and in-app reports",
    dataShared: "Your support message content, email address, and any attachments you send us.",
    region: "Self-hosted at support.agentlabs.cc, on our own infrastructure (see Oracle/Cloudflare rows below)",
    status: "Active — only when you contact support.",
  },
  {
    name: "Cloudflare",
    purpose: "CDN, DNS, and Workers used to route the marketing site and the support-email-to-Chatwoot pipeline",
    dataShared: "Standard request metadata (IP, headers) for traffic it proxies; email content for the support-forwarding Worker.",
    region: "Global edge network",
    status: "Active for all vibebrowser.app web traffic and the support-email path.",
  },
  {
    name: "Oracle Cloud Infrastructure (OCI)",
    purpose: "Control-plane hosting for backend/API infrastructure (see infra-tree)",
    dataShared: "Whatever backend data those services hold at rest (account/session data described above) — OCI itself is an infrastructure host, not a separate data recipient with its own use of the data.",
    region: "Oracle Cloud region in use for our deployment",
    status: "Active — underlying infrastructure, not user-facing.",
  },
]

export default function SubprocessorsList() {
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
        <div className="container max-w-5xl px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Subprocessors</h1>
            <p className="text-muted-foreground">Last updated: August 2026 | Provider: Vibe Technologies, LLC</p>
          </div>

          <section className="bg-white rounded-xl p-6 shadow-sm border mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-muted-foreground">
                  This page lists every third party that receives user data, prompt content, or page content through
                  the Extension, the hosted relay, the marketing site, or our support channel, referenced from our{" "}
                  <Link href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>. "Active"
                  entries below process data as part of normal operation; entries marked "only when you select this
                  provider" or "off by default" depend on your own configuration choices.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Subprocessor</th>
                    <th className="text-left py-3 px-4 font-semibold">Purpose</th>
                    <th className="text-left py-3 px-4 font-semibold">Data shared</th>
                    <th className="text-left py-3 px-4 font-semibold">Region</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subprocessors.map((s) => (
                    <tr key={s.name} className="border-b align-top">
                      <td className="py-3 px-4 font-medium whitespace-nowrap">{s.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{s.purpose}</td>
                      <td className="py-3 px-4 text-muted-foreground">{s.dataShared}</td>
                      <td className="py-3 px-4 text-muted-foreground">{s.region}</td>
                      <td className="py-3 px-4 text-muted-foreground">{s.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-amber-50 rounded-xl p-6 shadow-sm border border-amber-200 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Verification note (August 2026 audit)</h2>
                <p className="text-muted-foreground text-sm mb-2">
                  This list was built by walking the codebase, not by inference: model provider configs
                  (<code>apps/chat4/src/constants/providers.ts</code>, <code>models.ts</code>), the analytics/consent
                  gate (<code>lib/analytics.ts</code>, <code>vibe.analytics.enabled</code>), the Supabase auth/config
                  client (<code>lib/shared/vibe-supabase-config.ts</code>), and the live Chatwoot support inbox
                  configuration. Before this update, Supabase, Chatwoot, Cloudflare, Oracle Cloud, and DeepSeek were
                  not disclosed anywhere in the Privacy Policy even though each one is live in production today. That
                  was the gap this page and the linked Privacy Policy updates close.
                </p>
                <p className="text-muted-foreground text-sm">
                  We will keep this page in sync with the Privacy Policy. If you believe a subprocessor is missing,
                  email <a href="mailto:privacy@vibebrowser.app" className="text-purple-600 hover:underline">privacy@vibebrowser.app</a>.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full border-t bg-white py-8">
        <div className="container max-w-5xl px-4 md:px-6 mx-auto text-center">
          <p className="text-sm text-muted-foreground">© 2026 Vibe Technologies, LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
