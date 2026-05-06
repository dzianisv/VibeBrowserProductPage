import Link from 'next/link'
import { ArrowRight, CheckCircle, Chrome, Code2, GitBranch, Globe, Layers, Shield, Terminal } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PACKAGE_SPEC = '@vibebrowser/mcp@latest'
const CLI_BASE = `npx -y --package ${PACKAGE_SPEC} vibebrowser-cli`
const CLI_REMOTE = `${CLI_BASE} --remote YOUR_UUID --json status`
const MCP_OPENCLAW = `npx -y --package ${PACKAGE_SPEC} vibebrowser-mcp openclaw --remote YOUR_UUID`

const GITHUB_MCP_URL = 'https://github.com/VibeTechnologies/vibe-mcp'
const GITHUB_CLI_URL = 'https://github.com/VibeTechnologies/vibe-mcp/blob/main/src/browser-main.ts'
const SKILL_URL = 'https://skills.sh/vibetechnologies/agent-skills/vibebrowser'

const commandSurfaces = [
  {
    title: 'Inspect browser state',
    description: 'Confirm a live connection and capture machine-readable page state before acting.',
    command: `${CLI_BASE} --json snapshot`,
  },
  {
    title: 'Execute explicit browser actions',
    description: 'Use open, click, and type verbs against your real session without launching a disposable browser.',
    command: `${CLI_BASE} click A12`,
  },
  {
    title: 'Run the same flow remotely',
    description: 'Swap local control for UUID relay access when the browser and agent are on different machines.',
    command: CLI_REMOTE,
  },
]

const runtimeTargets = [
  {
    title: 'OpenClaw workflows',
    description: 'Keep OpenClaw-style command flows, but execute against your real logged-in browser state.',
  },
  {
    title: 'Custom agent runners',
    description: 'Use the CLI in shell scripts, task runners, and operator runbooks with deterministic steps.',
  },
  {
    title: 'MCP-connected coding agents',
    description: 'Escalate from CLI commands to MCP tooling with the same published package when needed.',
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
                Browser CLI + Relay
              </Badge>
              <h1
                className="text-4xl font-normal tracking-tight text-[#f0f4ff] sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                Vibe Browser CLI for <span className="text-[#ff4d4d]">any agent runtime</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-[#c4cbe0] md:text-xl">
                One command surface for OpenClaw, custom operators, and MCP-connected agents. Use your real logged-in browser
                session locally or through remote relay.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced" target="_blank">
                  <Button size="lg" className="rounded-full bg-[#ff4d4d] px-8 py-6 text-[#fdf4f4] hover:bg-[#ff6b6b]">
                    <Chrome className="mr-2 h-5 w-5" />
                    Install in Chrome
                  </Button>
                </Link>
                <Link href="/openclaw">
                  <Button size="lg" variant="outline" className="rounded-full border-[rgba(136,146,176,0.2)] bg-transparent px-8 py-6 text-[#b4b4ff] hover:bg-[rgba(158,158,255,0.08)] hover:text-[#d8dcff]">
                    OpenClaw Integration
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#b7c0db]">
                <Link href={GITHUB_MCP_URL} target="_blank" className="hover:text-[#f0f4ff] hover:underline">
                  vibebrowser-mcp (GitHub)
                </Link>
                <Link href={GITHUB_CLI_URL} target="_blank" className="hover:text-[#f0f4ff] hover:underline">
                  vibebrowser-cli (GitHub)
                </Link>
                <Link href={SKILL_URL} target="_blank" className="hover:text-[#f0f4ff] hover:underline">
                  VibeBrowser skill
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
                    Operate against the tabs, cookies, and logins that already exist in your daily browser profile.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(158,158,255,0.12)]">
                    <Globe className="h-5 w-5 text-[#9e9eff]" />
                  </div>
                  <h2 className="mb-2 text-lg font-medium text-[#f0f4ff]">Local or relay mode</h2>
                  <p className="text-sm text-[#b7c0db]">
                    Keep one command shape and switch between local and remote UUID routing as your deployment changes.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(255,77,77,0.12)]">
                    <Shield className="h-5 w-5 text-[#ff8a8a]" />
                  </div>
                  <h2 className="mb-2 text-lg font-medium text-[#f0f4ff]">CLI + MCP in one package</h2>
                  <p className="text-sm text-[#b7c0db]">
                    Use <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">vibebrowser-cli</code> for shell flows
                    and <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">vibebrowser-mcp</code> when orchestration grows.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b border-[rgba(136,146,176,0.15)] bg-[rgba(8,12,24,0.88)] py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.26em] text-[#7f8aa8]">Quickstart</p>
              <h2
                className="mt-4 text-3xl font-normal text-[#f0f4ff]"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                CLI commands that stay explicit
              </h2>
              <p className="mt-4 text-[#c4cbe0]">
                Start with simple browser verbs, then move to the OpenClaw bridge command if your runtime expects it.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                <CardContent className="p-0">
                  <div className="border-b border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.94)] px-5 py-3 text-sm text-[#b7c0db]">
                    Command surfaces
                  </div>
                  <div className="space-y-5 p-5">
                    {commandSurfaces.map((item) => (
                      <div key={item.title}>
                        <p className="mb-2 text-sm font-medium text-[#f0f4ff]">{item.title}</p>
                        <p className="mb-2 text-xs text-[#9aa0a6]">{item.description}</p>
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
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#9e9eff]">
                      <GitBranch className="h-4 w-4" />
                      OpenClaw bridge command
                    </div>
                    <p className="mb-3 text-sm text-[#b7c0db]">
                      For OpenClaw-style bridge routing, run:
                    </p>
                    <pre className="overflow-x-auto rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]">
                      <code>{MCP_OPENCLAW}</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#ff8a8a]">
                      <Layers className="h-4 w-4" />
                      MCP escalation path
                    </div>
                    <p className="text-sm text-[#b7c0db]">
                      Need richer tool orchestration? Use the same package via <Link href="/mcp" className="text-[#b4b4ff] hover:text-[#d8dcff] hover:underline">/mcp setup</Link> without changing the execution layer.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[rgba(136,146,176,0.15)] py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2
                className="text-3xl font-normal text-[#f0f4ff]"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                Built for more than one agent ecosystem
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {runtimeTargets.map((target) => (
                <Card key={target.title} className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-[#f0f4ff]">{target.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#b7c0db]">{target.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

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
              <Link href={GITHUB_MCP_URL} target="_blank" className="rounded-xl border border-[rgba(136,146,176,0.2)] bg-[rgba(10,15,29,0.92)] p-4 text-left hover:border-[rgba(158,158,255,0.35)]">
                <p className="text-sm font-medium text-[#f0f4ff]">vibebrowser-mcp</p>
                <p className="mt-1 text-xs text-[#b7c0db]">GitHub repository for MCP server + relay commands.</p>
              </Link>
              <Link href={GITHUB_CLI_URL} target="_blank" className="rounded-xl border border-[rgba(136,146,176,0.2)] bg-[rgba(10,15,29,0.92)] p-4 text-left hover:border-[rgba(158,158,255,0.35)]">
                <p className="text-sm font-medium text-[#f0f4ff]">vibebrowser-cli</p>
                <p className="mt-1 text-xs text-[#b7c0db]">CLI entrypoint source in the public repo.</p>
              </Link>
              <Link href={SKILL_URL} target="_blank" className="rounded-xl border border-[rgba(136,146,176,0.2)] bg-[rgba(10,15,29,0.92)] p-4 text-left hover:border-[rgba(158,158,255,0.35)]">
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
