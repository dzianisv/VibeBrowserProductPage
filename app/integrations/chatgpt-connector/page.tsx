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

const integration = getIntegration('chatgpt-connector')!
const BASE = 'https://www.vibebrowser.app'
const url = `${BASE}/integrations/${integration.slug}`

/**
 * The one hosted-connector URL readers paste into Plugins → Create app.
 * Single literal so the page, the FAQ, and the catalog never drift.
 */
const CONNECTOR_URL = 'https://relay.api.vibebrowser.app/mcp/<your-routing-uuid>'

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
        url: '/og/home',
        width: 1200,
        height: 630,
        alt: 'Vibe Browser ChatGPT connector',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: integration.title,
    description: integration.description,
    images: ['/og/home'],
    creator: '@vibebrowserapp',
  },
}

export default function ChatGPTConnectorPage() {
  return (
    <div
      className="flex min-h-screen flex-col bg-[#050810] text-[#f0f4ff]"
      style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
    >
      <SiteNav />

      <main className="flex-1">
        {/* Hero — mirrors /cli */}
        <section
          className="border-b border-[rgba(136,146,176,0.15)] bg-[radial-gradient(circle_at_top,_rgba(158,158,255,0.18),_transparent_36%),radial-gradient(circle_at_18%_20%,_rgba(255,77,77,0.18),_transparent_28%),linear-gradient(180deg,_#070b16_0%,_#050810_68%)]"
        >
          <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-6 border-[rgba(255,77,77,0.2)] bg-[rgba(255,77,77,0.1)] px-4 py-2 text-sm font-medium text-[#ff6b6b]">
                <Terminal className="mr-2 h-4 w-4" />
                ChatGPT Connector • Remote MCP
              </Badge>
              <h1
                className="text-4xl font-normal tracking-tight text-[#f0f4ff] sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                Give ChatGPT on the web <span className="text-[#ff4d4d]">control of your browser</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-[#c4cbe0] md:text-xl">
                A remote MCP URL —{' '}
                <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">{CONNECTOR_URL}</code>{' '}
                — pasted into ChatGPT Settings → Plugins → Create app. No local MCP server, no npx command, nothing running locally besides the Vibe extension.
              </p>
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(255,77,77,0.12)]">
                    <CheckCircle className="h-5 w-5 text-[#ff6b6b]" />
                  </div>
                  <h2 className="mb-2 text-lg font-medium text-[#f0f4ff]">Real browser session</h2>
                  <p className="text-sm text-[#b7c0db]">
                    ChatGPT drives the Chrome profile you are already signed into — same tabs, same cookies, same logged-in sessions.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(158,158,255,0.12)]">
                    <Globe className="h-5 w-5 text-[#9e9eff]" />
                  </div>
                  <h2 className="mb-2 text-lg font-medium text-[#f0f4ff]">One URL, no local server</h2>
                  <p className="text-sm text-[#b7c0db]">
                    The connector URL is the whole configuration — paste it once into Plugins → Create app and ChatGPT reaches your browser through the Vibe relay.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(255,77,77,0.12)]">
                    <Shield className="h-5 w-5 text-[#ff8a8a]" />
                  </div>
                  <h2 className="mb-2 text-lg font-medium text-[#f0f4ff]">Treat the URL like a password</h2>
                  <p className="text-sm text-[#b7c0db]">
                    It grants live control of your logged-in browser. Never paste it into a shared chat or commit it — regenerate it in the extension if it leaks.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(129,201,149,0.12)]">
                    <Cpu className="h-5 w-5 text-[#81c995]" />
                  </div>
                  <h2 className="mb-2 text-lg font-medium text-[#f0f4ff]">Verify end to end</h2>
                  <p className="text-sm text-[#b7c0db]">
                    Ask ChatGPT to open duckduckgo.com and find when the first GPT model was released. Expect 2018 — and watch your own browser navigate.
                  </p>
                </CardContent>
              </Card>
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
                What the connector URL actually connects to
              </h2>
              <p className="mt-4 text-[#c4cbe0]">
                Every connector setup on this page needs your routing UUID. This is where it comes from, what form it takes, and what it grants.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 border-b border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.94)] px-5 py-3 text-sm text-[#b7c0db]">
                    <Globe className="h-4 w-4 text-[#9e9eff]" />
                    Relay path
                  </div>
                  <pre className="overflow-x-auto p-5 text-xs leading-relaxed text-[#9aa0a6]">
                    <code>{`  ChatGPT on the web
        │
        │  paste ${CONNECTOR_URL}
        ▼
  wss://relay.api.vibebrowser.app/<uuid>   ← hosted by Vibe, routes by UUID
        │
        ▼
  Vibe extension in your real Chrome   ← set to "Remote (internet)"`}</code>
                  </pre>
                  <div className="border-t border-[rgba(136,146,176,0.15)] px-5 py-4 text-sm text-[#b7c0db]">
                    The URL is a bearer capability: whoever holds it can read your tabs and act as you in that session. Nothing else is needed — no consent screen, no client id, no scopes.
                  </div>
                </CardContent>
              </Card>

              <div className="min-w-0 space-y-6">
                <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#9e9eff]">
                      <Settings className="h-4 w-4" />
                      Where the URL comes from
                    </div>
                    <p className="mb-4 text-sm text-[#b7c0db]">
                      In the Vibe extension: <span className="text-[#f0f4ff]">Settings → AI Agent Control</span>. Turn on <span className="text-[#f0f4ff]">Enable external AI agent control</span>, select <span className="text-[#f0f4ff]">Remote (internet)</span>, then copy the <span className="text-[#f0f4ff]">Agent connection URL</span>. The last path segment is your routing UUID; the connector URL is {CONNECTOR_URL} with that UUID as the last segment.
                    </p>
                  </CardContent>
                </Card>

                <Card className="min-w-0 border-[rgba(255,77,77,0.2)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#ff8a8a]">
                      <KeyRound className="h-4 w-4" />
                      Treat it like a password
                    </div>
                    <p className="text-sm text-[#b7c0db]">
                      Anyone who holds this URL can open your tabs, read the pages you are signed into, and act as you — no second factor. Never paste it into a shared chat, ticket, or README. If it leaks, regenerate the connection URL in the extension settings; the old UUID stops routing immediately.
                    </p>
                    <p className="mt-3 text-sm text-[#b7c0db]">
                      Turn "Enable external AI agent control" off when you are not using it — with it off, the URL routes nowhere.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mx-auto mt-8 flex items-center gap-2 text-xs text-[#7f8aa8]">
              <Shield className="h-3.5 w-3.5 shrink-0" />
              <span>Values shown here are placeholders. Never paste a real UUID or relay URL into a shared doc, ticket, or chat.</span>
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
                Connect ChatGPT in four steps
              </h2>
              <p className="mt-4 text-[#c4cbe0]">
                Install the extension, copy your connector URL, create the app in ChatGPT, then enable it in a conversation.
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
                          <pre className="overflow-x-auto rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]">
                            <code>{step.config.code}</code>
                          </pre>
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
                      <KeyRound className="h-4 w-4" />
                      Paid plan required
                    </div>
                    <p className="text-sm text-[#b7c0db]">
                      On a FREE ChatGPT account, Plugins → Create app silently no-ops — no app is created and the URL field never appears. Connectors are a paid-plan feature. Either upgrade, or use the{' '}
                      <Link href="/integrations/chatgpt-desktop" className="text-[#b4b4ff] hover:text-[#d8dcff] hover:underline">
                        ChatGPT desktop app
                      </Link>{' '}
                      path, which runs the local MCP server with no relay.
                    </p>
                  </CardContent>
                </Card>

                <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#9e9eff]">
                      <Globe className="h-4 w-4" />
                      Or keep everything local
                    </div>
                    <p className="text-sm text-[#b7c0db]">
                      If you run a desktop client (Claude Desktop, Cursor, VS Code Copilot, Codex CLI), register{' '}
                      <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">@vibebrowser/mcp</code>{' '}
                      as a local STDIO server instead — page content never leaves your machine. See the{' '}
                      <Link href="/mcp" className="text-[#b4b4ff] hover:text-[#d8dcff] hover:underline">
                        MCP setup page
                      </Link>
                      .
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mx-auto mt-4 max-w-4xl">
              <CopyablePrompt
                text={CONNECTOR_URL}
                title="Connector URL — paste into Plugins → Create app"
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
                Your connector URL lives in the Vibe extension under Settings → AI Agent Control → Agent connection URL. It grants live control of your browser, so treat it like a password.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6">
              <Card
                key="chatgpt"
                id="chatgpt"
                className="min-w-0 scroll-mt-24 border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-[#f0f4ff]">ChatGPT on the web</h3>
                  <p className="mt-2 text-sm text-[#b7c0db]">
                    Turn on Developer mode under Settings → Security and login, go to Plugins → Create app, and paste your connector URL. Enable the app for a conversation before asking ChatGPT to open a page.
                  </p>
                  <pre className="mt-4 overflow-x-auto rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]">
                    <code>{CONNECTOR_URL}</code>
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
