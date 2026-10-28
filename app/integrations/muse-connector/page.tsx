import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle,
  Chrome,
  Code2,
  Cpu,
  Globe,
  KeyRound,
  MessageSquare,
  Settings,
  Shield,
  Terminal,
} from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { CopyablePrompt } from '@/components/copyable-prompt'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getIntegration } from '@/lib/integrations'

const integration = getIntegration('muse-connector')!
const BASE = 'https://www.vibebrowser.app'
const url = `${BASE}/integrations/${integration.slug}`

/**
 * Muse's connector is created from chat: the prompt carries the host, and the
 * secure card only ever receives the session ID. Both strings come from the
 * catalog so the page and the extension settings cannot drift.
 */
const RELAY_HOST = 'relay.api.vibebrowser.app'
const SESSION_URL = `https://${RELAY_HOST}/mcp/<your-session-id>`
const MUSE_PROMPT =
  integration.steps.find((step) => step.config?.language === 'bash')?.config?.code ?? ''

const FEATURE_TONES = {
  red: { wrap: 'bg-[rgba(255,77,77,0.12)]', icon: 'text-[#ff6b6b]' },
  violet: { wrap: 'bg-[rgba(158,158,255,0.12)]', icon: 'text-[#9e9eff]' },
  green: { wrap: 'bg-[rgba(129,201,149,0.12)]', icon: 'text-[#81c995]' },
  rose: { wrap: 'bg-[rgba(255,77,77,0.12)]', icon: 'text-[#ff8a8a]' },
} as const

const features = [
  {
    icon: MessageSquare,
    tone: 'violet' as const,
    title: 'One prompt builds it',
    body: integration.solution[0],
  },
  {
    icon: Settings,
    tone: 'green' as const,
    title: 'Lives in your connectors',
    body: integration.solution[1],
  },
  {
    icon: Globe,
    tone: 'red' as const,
    title: 'Works inside your Chrome',
    body: integration.solution[2],
  },
]

export const metadata: Metadata = {
  title: integration.title,
  description: integration.description,
  alternates: { canonical: url },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url,
    siteName: 'Vibe Browser',
    title: integration.title,
    description: integration.description,
    images: [
      {
        url: `/og/${integration.slug}`,
        width: 1200,
        height: 630,
        alt: 'Vibe Browser Muse connector',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: integration.title,
    description: integration.description,
    images: [`/og/${integration.slug}`],
    creator: '@vibebrowserapp',
  },
}

export default function MuseConnectorPage() {
  return (
    <div
      className="flex min-h-screen flex-col bg-[#050810] text-[#f0f4ff]"
      style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
    >
      <SiteNav />

      <main className="flex-1">
        {/* Hero — mirrors /cli */}
        <section className="border-b border-[rgba(136,146,176,0.15)] bg-[radial-gradient(circle_at_top,_rgba(158,158,255,0.18),_transparent_36%),radial-gradient(circle_at_18%_20%,_rgba(255,77,77,0.18),_transparent_28%),linear-gradient(180deg,_#070b16_0%,_#050810_68%)]">
          <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-6 border-[rgba(255,77,77,0.2)] bg-[rgba(255,77,77,0.1)] px-4 py-2 text-sm font-medium text-[#ff6b6b]">
                <Terminal className="mr-2 h-4 w-4" />
                Muse Connector • Remote MCP
              </Badge>
              <h1
                className="text-4xl font-normal tracking-tight text-[#f0f4ff] sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                Give Muse <span className="text-[#ff4d4d]">control of your browser</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-[#c4cbe0] md:text-xl">
                {integration.tagline}
              </p>
              {integration.connectorStatus ? (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      integration.connectorStatus.tone === 'ok'
                        ? 'border-emerald-400/40 text-emerald-300'
                        : 'border-amber-400/40 text-amber-300'
                    }`}
                  >
                    {integration.connectorStatus.badge}
                  </span>
                </div>
              ) : null}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/install" target="_blank">
                  <Button size="lg" className="rounded-full bg-[#ff4d4d] px-8 py-6 text-[#fdf4f4] hover:bg-[#ff6b6b]">
                    <Chrome className="mr-2 h-5 w-5" />
                    Install in Chrome
                  </Button>
                </Link>
                <Link href="/integrations">
                  <Button size="lg" variant="outline" className="rounded-full border-[rgba(136,146,176,0.2)] bg-transparent px-8 py-6 text-[#b4b4ff] hover:bg-[rgba(158,158,255,0.08)] hover:text-[#d8dcff]">
                    All integrations
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#b7c0db]">
                <Link href="https://github.com/VibeTechnologies/vibe-mcp" target="_blank" className="hover:text-[#f0f4ff] hover:underline">
                  vibebrowser-mcp (GitHub)
                </Link>
                <Link href="https://github.com/VibeTechnologies/vibe-mcp/blob/main/src/browser-main.ts" target="_blank" className="hover:text-[#f0f4ff] hover:underline">
                  @vibebrowser/mcp source
                </Link>
                <Link href="https://skills.sh/vibetechnologies/agent-skills/vibebrowser" target="_blank" className="hover:text-[#f0f4ff] hover:underline">
                  VibeBrowser skill
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature cards — mirrors /cli */}
        <section className="border-b border-[rgba(136,146,176,0.15)] py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon
                const tone = FEATURE_TONES[feature.tone]
                return (
                  <Card
                    key={feature.title}
                    className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]"
                  >
                    <CardContent className="p-6">
                      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${tone.wrap}`}>
                        <Icon className={`h-5 w-5 ${tone.icon}`} />
                      </div>
                      <h2 className="mb-2 text-lg font-medium text-[#f0f4ff]">{feature.title}</h2>
                      <p className="text-sm text-[#b7c0db]">{feature.body}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How it works — mirrors /cli */}
        <section className="border-b border-[rgba(136,146,176,0.15)] bg-[rgba(8,12,24,0.88)] py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.26em] text-[#7f8aa8]">How it works</p>
              <h2
                className="mt-4 text-3xl font-normal text-[#f0f4ff]"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                What the secure card actually connects to
              </h2>
              <p className="mt-4 text-[#c4cbe0]">{integration.answerBlock}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 border-b border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.94)] px-5 py-3 text-sm text-[#b7c0db]">
                    <Globe className="h-4 w-4 text-[#9e9eff]" />
                    Connector path
                  </div>
                  <pre className="overflow-x-auto p-5 text-xs leading-relaxed text-[#9aa0a6]">
                    <code>{`  Muse app (chat)
        │
        │  send the prompt → Muse opens a secure card
        ▼
  Add custom connector card   ← paste ONLY the session ID
        │
        ▼
  https://relay.api.vibebrowser.app/mcp/<session-id>   ← routes by session ID
        │
        ▼
  Vibe extension in your real Chrome   ← set to "Remote (internet)"`}</code>
                  </pre>
                  <div className="border-t border-[rgba(136,146,176,0.15)] px-5 py-4 text-sm text-[#b7c0db]">
                    The prompt carries no secret. Muse asks for the credential on its secure card, and the relay routes that session ID to the extension running in the Chrome you are already signed into.
                  </div>
                </CardContent>
              </Card>

              <div className="min-w-0 space-y-6">
                <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#9e9eff]">
                      <Settings className="h-4 w-4" />
                      Where the session ID comes from
                    </div>
                    <p className="mb-4 text-sm text-[#b7c0db]">{integration.steps[2].body}</p>
                    <p className="mb-1 text-xs text-[#7f8aa8]">MCP connector URL (HTTPS)</p>
                    <pre className="overflow-x-auto rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]">
                      <code>{SESSION_URL}</code>
                    </pre>
                    <p className="mt-3 text-xs text-[#7f8aa8]">
                      The card takes only the last segment, after /mcp/ — never the full URL.
                    </p>
                  </CardContent>
                </Card>

                <Card className="min-w-0 border-[rgba(255,77,77,0.2)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#ff8a8a]">
                      <KeyRound className="h-4 w-4" />
                      {integration.security?.heading ?? 'Treat it like a password'}
                    </div>
                    <p className="text-sm text-[#b7c0db]">{integration.security?.body}</p>
                    <ul className="mt-4 space-y-2">
                      {integration.security?.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 text-sm text-[#b7c0db]">
                          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff8a8a]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mx-auto mt-8 flex items-center gap-2 text-xs text-[#7f8aa8]">
              <Shield className="h-3.5 w-3.5 shrink-0" />
              <span>Values shown here are placeholders. Never paste a real session ID or relay URL into a shared doc, ticket, or chat.</span>
            </div>
          </div>
        </section>

        {/* Quickstart — mirrors /cli */}
        <section className="border-b border-[rgba(136,146,176,0.15)] bg-[rgba(8,12,24,0.88)] py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.26em] text-[#7f8aa8]">Quickstart</p>
              <h2
                className="mt-4 text-3xl font-normal text-[#f0f4ff]"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                {`Connect Muse in ${integration.steps.length} steps`}
              </h2>
              <p className="mt-4 text-[#c4cbe0]">
                Install the extension, turn on remote control, copy the session ID, send Muse one prompt, then paste the ID on its secure card.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                <CardContent className="p-0">
                  <div className="border-b border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.94)] px-5 py-3 text-sm text-[#b7c0db]">
                    Setup steps
                  </div>
                  <div className="space-y-5 p-5">
                    {integration.steps.map((step) => (
                      <div key={step.title}>
                        <p className="mb-2 text-sm font-medium text-[#f0f4ff]">{step.title}</p>
                        <p className="mb-2 text-xs text-[#9aa0a6]">{step.body}</p>
                        {step.config ? (
                          <>
                            <p className="mb-1 text-xs text-[#7f8aa8]">{step.config.location}</p>
                            <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]">
                              <code>{step.config.code}</code>
                            </pre>
                          </>
                        ) : null}
                        {step.image ? (
                          <img
                            src={step.image.src}
                            alt={step.image.alt}
                            loading="lazy"
                            className="mt-3 w-full rounded-lg border border-[rgba(136,146,176,0.15)]"
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="min-w-0 space-y-6">
                <Card className="min-w-0 border-[rgba(255,77,77,0.2)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#ff8a8a]">
                      <CheckCircle className="h-4 w-4" />
                      {integration.connectorStatus?.badge ?? 'Guide — verification pending'}
                    </div>
                    <p className="text-sm text-[#b7c0db]">{integration.connectorStatus?.summary}</p>
                  </CardContent>
                </Card>

                {integration.faqs.map((faq) => (
                  <Card
                    key={faq.q}
                    className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-sm font-medium text-[#f0f4ff]">{faq.q}</h3>
                      <p className="mt-2 text-sm text-[#b7c0db]">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-4 max-w-4xl">
              <CopyablePrompt
                text={MUSE_PROMPT}
                title="Prompt to send Muse — contains no secret"
                className="mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Per-client setup — mirrors /cli #clients */}
        <section id="clients" className="border-b border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.94)] py-16 md:py-24 scroll-mt-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.26em] text-[#7f8aa8]">Per-client setup</p>
              <h2
                className="mt-4 text-3xl font-normal text-[#f0f4ff]"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                Connect your agent
              </h2>
              <p className="mt-4 text-[#c4cbe0]">
                Your session ID lives in the Vibe extension under Settings → AI Agent Control → MCP connector URL (HTTPS). It grants live control of your browser, so treat it like a password.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6">
              <Card
                id="muse"
                className="min-w-0 scroll-mt-24 border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-[#f0f4ff]">{integration.name}</h3>
                  <p className="mt-2 text-sm text-[#b7c0db]">
                    Open Muse and send the prompt from Quickstart. When the secure Add custom connector card appears, paste only your session ID — not the full URL — and tap Add. The connector then appears under Settings → Connectors → Custom connectors, where you can view and manage it.
                  </p>
                  <pre className="mt-4 overflow-x-auto rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]">
                    <code>{SESSION_URL}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Open-source references — mirrors /cli */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-6 text-center">
            <div className="mb-8 flex flex-col items-center gap-3">
              <Code2 className="h-6 w-6 text-[#ff8a8a]" />
              <h2
                className="text-3xl font-normal text-[#f0f4ff]"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                Open-source references
              </h2>
            </div>
            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
              <Link href="https://github.com/VibeTechnologies/vibe-mcp" target="_blank" className="rounded-xl border border-[rgba(136,146,176,0.2)] bg-[rgba(10,15,29,0.92)] p-4 text-left hover:border-[rgba(158,158,255,0.35)]">
                <p className="text-sm font-medium text-[#f0f4ff]">vibebrowser-mcp</p>
                <p className="mt-1 text-xs text-[#b7c0db]">MCP server + relay commands, public repo.</p>
              </Link>
              <Link href="https://github.com/VibeTechnologies/vibe-mcp/blob/main/src/browser-main.ts" target="_blank" className="rounded-xl border border-[rgba(136,146,176,0.2)] bg-[rgba(10,15,29,0.92)] p-4 text-left hover:border-[rgba(158,158,255,0.35)]">
                <p className="text-sm font-medium text-[#f0f4ff]">@vibebrowser/mcp source</p>
                <p className="mt-1 text-xs text-[#b7c0db]">CLI entrypoint source in the public repo.</p>
              </Link>
              <Link href="https://skills.sh/vibetechnologies/agent-skills/vibebrowser" target="_blank" className="rounded-xl border border-[rgba(136,146,176,0.2)] bg-[rgba(10,15,29,0.92)] p-4 text-left hover:border-[rgba(158,158,255,0.35)]">
                <p className="text-sm font-medium text-[#f0f4ff]">VibeBrowser skill</p>
                <p className="mt-1 text-xs text-[#b7c0db]">skills.sh listing for plug-and-play agent usage.</p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
