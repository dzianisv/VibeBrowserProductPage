import Link from 'next/link'
import { ArrowRight, CheckCircle, Chrome, GitBranch, Globe, Layers, Terminal } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PACKAGE_SPEC = '@vibebrowser/cli'
const CLI_BASE = `npx ${PACKAGE_SPEC}`
const FULL_RELAY_URL = 'wss://relay.api.vibebrowser.app/2d2f60a1-2031-4279-aa25-358f2c5b6f84'
const REMOTE_ID = '2d2f60a1-2031-4279-aa25-358f2c5b6f84'

const localCommands = [
  { label: 'Check the local bridge', command: `${CLI_BASE} --json status` },
  { label: 'Open a page', command: `${CLI_BASE} open https://example.com` },
  { label: 'Capture an indexed snapshot', command: `${CLI_BASE} --json snapshot` },
  { label: 'Click by index', command: `${CLI_BASE} click 12` },
  { label: 'Type into a field', command: `${CLI_BASE} type 13 "hello world"` },
]

const preferredRemoteCommand = `${CLI_BASE} --remote ${FULL_RELAY_URL} --json status`
const uuidRemoteCommand = `${CLI_BASE} --remote ${REMOTE_ID} --json status`

const useCases = [
  {
    title: 'Script real browser runbooks',
    description: 'Run status, open, snapshot, click, and type commands against the same tabs and authenticated sessions your operator already uses.',
    icon: Terminal,
  },
  {
    title: 'Control a remote browser',
    description: 'Use --remote with either the extension UUID or a full WebSocket relay URL.',
    icon: GitBranch,
  },
  {
    title: 'Escalate to MCP when needed',
    description: 'Start with shell-friendly commands, then move to @vibebrowser/mcp when the workflow needs richer agent orchestration.',
    icon: Layers,
  },
]

export default function CliPage() {
  return (
    <div
      className="flex min-h-screen flex-col bg-[#050810] text-[#f0f4ff]"
      style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
    >
      <SiteNav />

      <main className="flex-1">
        <section className="border-b border-[rgba(136,146,176,0.15)] bg-[radial-gradient(circle_at_top,_rgba(158,158,255,0.18),_transparent_36%),radial-gradient(circle_at_18%_20%,_rgba(255,77,77,0.18),_transparent_28%),linear-gradient(180deg,_#070b16_0%,_#050810_68%)]">
          <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-6 border-[rgba(255,77,77,0.2)] bg-[rgba(255,77,77,0.1)] px-4 py-2 text-sm font-medium text-[#ff6b6b]">
                <Terminal className="mr-2 h-4 w-4" />
                Browser CLI + Remote Relay
              </Badge>
              <h1
                className="text-4xl font-normal tracking-tight text-[#f0f4ff] sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                Vibe Browser <span className="text-[#ff4d4d]">CLI</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-[#c4cbe0] md:text-xl">
                Use <code className="rounded bg-[rgba(158,158,255,0.1)] px-1.5 py-0.5 text-[#b4b4ff]">@vibebrowser/cli</code> to control your real logged-in browser from the terminal. It talks to the same Vibe Browser extension and relay as <Link href="/mcp" className="text-[#b4b4ff] hover:text-[#d8dcff] hover:underline">Vibe Browser MCP</Link>, but keeps the interface as explicit shell commands.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced" target="_blank">
                  <Button size="lg" className="rounded-full bg-[#ff4d4d] px-8 py-6 text-[#fdf4f4] hover:bg-[#ff6b6b]">
                    <Chrome className="mr-2 h-5 w-5" />
                    Install in Chrome
                  </Button>
                </Link>
                <Link href="https://www.npmjs.com/package/@vibebrowser/cli" target="_blank">
                  <Button size="lg" variant="outline" className="rounded-full border-[rgba(136,146,176,0.2)] bg-transparent px-8 py-6 text-[#b4b4ff] hover:bg-[rgba(158,158,255,0.08)] hover:text-[#d8dcff]">
                    View npm Package
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[rgba(136,146,176,0.15)] py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {useCases.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.title} className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(255,77,77,0.12)]">
                        <Icon className="h-5 w-5 text-[#ff6b6b]" />
                      </div>
                      <h2 className="mb-2 text-lg font-medium text-[#f0f4ff]">{item.title}</h2>
                      <p className="text-sm leading-6 text-[#b7c0db]">{item.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-[rgba(136,146,176,0.15)] bg-[rgba(8,12,24,0.88)] py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.26em] text-[#7f8aa8]">Quick start</p>
              <h2
                className="mt-4 text-3xl font-normal text-[#f0f4ff]"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                Local commands first, remote relay when the browser is elsewhere
              </h2>
              <p className="mt-4 text-[#c4cbe0]">
                The CLI ships from the published <code className="rounded bg-[rgba(158,158,255,0.1)] px-1.5 py-0.5 text-[#b4b4ff]">@vibebrowser/cli</code> package. No separate browser profile or Chrome debug port is required.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
              <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                <CardContent className="p-0">
                  <div className="border-b border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.94)] px-5 py-3 text-sm text-[#b7c0db]">
                    Local browser session
                  </div>
                  <div className="space-y-5 p-5">
                    {localCommands.map((item) => (
                      <div key={item.label}>
                        <p className="mb-2 text-sm font-medium text-[#f0f4ff]">{item.label}</p>
                        <pre className="overflow-x-auto rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]">
                          <code>{item.command}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="min-w-0 space-y-6">
                <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#81c995]">
                      <Globe className="h-4 w-4" />
                      Preferred remote form
                    </div>
                    <p className="mb-3 text-sm leading-6 text-[#b7c0db]">
                      Use the full WebSocket relay URL form when you need to target an explicit relay endpoint.
                    </p>
                    <pre className="overflow-x-auto rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]">
                      <code>{preferredRemoteCommand}</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#9e9eff]">
                      <GitBranch className="h-4 w-4" />
                      UUID remote form
                    </div>
                    <p className="mb-3 text-sm leading-6 text-[#b7c0db]">
                      Use the UUID form for the default public relay.
                    </p>
                    <pre className="overflow-x-auto rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]">
                      <code>{uuidRemoteCommand}</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-medium text-[#f0f4ff]">When to use this route</h3>
                    <p className="text-sm leading-6 text-[#b7c0db]">
                      Use <Link href="/cli" className="text-[#b4b4ff] hover:text-[#d8dcff] hover:underline">/cli</Link> for terminal commands, <Link href="/openclaw" className="text-[#b4b4ff] hover:text-[#d8dcff] hover:underline">/openclaw</Link> for OpenClaw-style positioning, and <Link href="/mcp" className="text-[#b4b4ff] hover:text-[#d8dcff] hover:underline">/mcp</Link> for JSON MCP client configuration.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-6 text-center">
            <h2
              className="text-3xl font-normal text-[#f0f4ff]"
              style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
            >
              Shell-friendly browser control for the real Vibe session
            </h2>
            <div className="mx-auto mt-6 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
              {['Uses real tabs, cookies, and logins', 'Works locally or through the public relay', 'Returns JSON for scripts and agents', 'Pairs with vibebrowser-mcp when workflows need MCP'].map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-xl border border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)] p-4">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#81c995]" />
                  <span className="text-sm text-[#c4cbe0]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
