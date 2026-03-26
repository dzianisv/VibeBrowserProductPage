import Link from 'next/link'
import { ArrowRight, CheckCircle, Chrome, Globe, GitBranch, Shield, Terminal } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PACKAGE_SPEC = '@vibebrowser/mcp@latest'
const CLI_BASE = `npx -y --package ${PACKAGE_SPEC} vibebrowser-cli`
const MCP_BROWSER_ALIAS = `npx -y --package ${PACKAGE_SPEC} vibebrowser-mcp browser`

const quickstartCommands = [
  {
    label: 'Check the local bridge',
    command: `${CLI_BASE} --json status`,
  },
  {
    label: 'Open a page',
    command: `${CLI_BASE} open https://example.com`,
  },
  {
    label: 'Capture an indexed snapshot',
    command: `${CLI_BASE} --json snapshot`,
  },
  {
    label: 'Click by ref',
    command: `${CLI_BASE} click A12`,
  },
  {
    label: 'Type into a field',
    command: `${CLI_BASE} type A13 "hello world"`,
  },
]

const remoteCommand = `${CLI_BASE} --remote YOUR_UUID --json status`
const aliasCommand = `${MCP_BROWSER_ALIAS} --json status`

export default function OpenClawPage() {
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
                Browser CLI + Relay
              </Badge>
              <h1
                className="text-4xl font-normal tracking-tight text-[#f0f4ff] sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                Vibe Browser for <span className="text-[#ff4d4d]">OpenClaw</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-[#c4cbe0] md:text-xl">
                Use OpenClaw-style browser commands against your real logged-in browser session. <code className="rounded bg-[rgba(158,158,255,0.1)] px-1.5 py-0.5 text-[#b4b4ff]">vibebrowser-cli</code> gives
                you a command-oriented surface for status, open, snapshot, click, type, and remote relay flows without switching to a disposable browser profile.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced" target="_blank">
                  <Button size="lg" className="rounded-full bg-[#ff4d4d] px-8 py-6 text-[#fdf4f4] hover:bg-[#ff6b6b]">
                    <Chrome className="mr-2 h-5 w-5" />
                    Install in Chrome
                  </Button>
                </Link>
                <Link href="/mcp">
                  <Button size="lg" variant="outline" className="rounded-full border-[rgba(136,146,176,0.2)] bg-transparent px-8 py-6 text-[#b4b4ff] hover:bg-[rgba(158,158,255,0.08)] hover:text-[#d8dcff]">
                    MCP Page for Agents
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
              <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(255,77,77,0.12)]">
                    <CheckCircle className="h-5 w-5 text-[#ff6b6b]" />
                  </div>
                  <h2 className="mb-2 text-lg font-medium text-[#f0f4ff]">Real browser session</h2>
                  <p className="text-sm text-[#b7c0db]">
                    Reuse your actual tabs, cookies, logins, extensions, and saved state instead of spinning up a separate browser runtime.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(158,158,255,0.12)]">
                    <Globe className="h-5 w-5 text-[#9e9eff]" />
                  </div>
                  <h2 className="mb-2 text-lg font-medium text-[#f0f4ff]">Local or remote relay</h2>
                  <p className="text-sm text-[#b7c0db]">
                    Start locally on the same machine or point the CLI at a remote UUID when your browser is exposed through the Vibe relay.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(255,77,77,0.12)]">
                    <Shield className="h-5 w-5 text-[#ff8a8a]" />
                  </div>
                  <h2 className="mb-2 text-lg font-medium text-[#f0f4ff]">Same package, two surfaces</h2>
                  <p className="text-sm text-[#b7c0db]">
                    The published npm package gives you both <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">vibebrowser-cli</code> for command flows and <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">vibebrowser-mcp</code> for MCP agents.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b border-[rgba(136,146,176,0.15)] bg-[rgba(8,12,24,0.88)] py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2
                className="text-3xl font-normal text-[#f0f4ff]"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                Quick start for OpenClaw-style flows
              </h2>
              <p className="mt-4 text-[#c4cbe0]">
                These are the real published commands from <code className="rounded bg-[rgba(158,158,255,0.1)] px-1.5 py-0.5 text-[#b4b4ff]">@vibebrowser/mcp</code>. Start with the CLI, then layer your OpenClaw skill or workflow on top.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                <CardContent className="p-0">
                  <div className="border-b border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.94)] px-5 py-3 text-sm text-[#b7c0db]">
                    Local commands
                  </div>
                  <div className="space-y-5 p-5">
                    {quickstartCommands.map((item) => (
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

              <div className="space-y-6">
                <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#9e9eff]">
                      <GitBranch className="h-4 w-4" />
                      Remote relay
                    </div>
                    <p className="mb-3 text-sm text-[#b7c0db]">
                      If your Vibe extension is connected in remote mode, use the same CLI with a UUID:
                    </p>
                    <pre className="overflow-x-auto rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]">
                      <code>{remoteCommand}</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#ff8a8a]">
                      <Terminal className="h-4 w-4" />
                      Alias through the MCP binary
                    </div>
                    <p className="mb-3 text-sm text-[#b7c0db]">
                      If you prefer one binary, the same command surface is also available as a subcommand on the MCP executable:
                    </p>
                    <pre className="overflow-x-auto rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]">
                      <code>{aliasCommand}</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-medium text-[#f0f4ff]">What this page is for</h3>
                    <p className="text-sm text-[#b7c0db]">
                      Use this route when you want a command-oriented browser interface, OpenClaw-compatible verbs, or relay-backed skill flows. If you need JSON MCP config blocks for Claude Code, Codex, Cursor, or VS Code, use <Link href="/mcp" className="text-[#b4b4ff] hover:text-[#d8dcff] hover:underline">Vibe Browser for Agents</Link>.
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
              Command-oriented browser control, not a disposable browser
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[#c4cbe0]">
              Vibe Browser for OpenClaw does not pretend to manage a fresh isolated browser lifecycle. It gives OpenClaw-style command flows access to the same real browser session your team already uses day to day.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="https://www.npmjs.com/package/@vibebrowser/mcp" target="_blank">
                <Button size="lg" className="rounded-full bg-[#ff4d4d] px-8 py-6 text-[#fdf4f4] hover:bg-[#ff6b6b]">
                  View npm Package
                </Button>
              </Link>
              <Link href="/mcp">
                <Button size="lg" variant="outline" className="rounded-full border-[rgba(136,146,176,0.2)] bg-transparent px-8 py-6 text-[#b4b4ff] hover:bg-[rgba(158,158,255,0.08)] hover:text-[#d8dcff]">
                  See MCP Setup
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
