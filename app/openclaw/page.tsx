import Link from 'next/link'
import { ArrowRight, CheckCircle, Chrome, Eye, GitBranch, Globe, Layers, MousePointerClick, Shield, Terminal } from 'lucide-react'
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

const commandSurfaces = [
  {
    label: 'Observe',
    title: 'Read browser state before acting',
    description:
      'Command-oriented flows work when the operator can inspect the live page first. Status and indexed snapshots make the next action explicit instead of guessy.',
    commands: [`${CLI_BASE} --json status`, `${CLI_BASE} --json snapshot`],
    note: 'Best for bug reproduction, portal triage, and any runbook that needs stable refs before the next click.',
    icon: Eye,
    tone: 'bg-[rgba(158,158,255,0.12)] text-[#9e9eff]',
  },
  {
    label: 'Act',
    title: 'Use explicit verbs against the live page',
    description:
      'Open a page, click by ref, and type by ref with a thin command surface that still talks to the real browser session your team already uses.',
    commands: [`${CLI_BASE} open https://example.com`, `${CLI_BASE} click A12`, `${CLI_BASE} type A13 "hello world"`],
    note: 'Good when you want shell-friendly control without turning the task into a full MCP integration yet.',
    icon: MousePointerClick,
    tone: 'bg-[rgba(255,77,77,0.12)] text-[#ff6b6b]',
  },
  {
    label: 'Relay',
    title: 'Point the same flow at a remote browser',
    description:
      'When the browser lives on another machine, keep the same command shape and swap in a UUID-backed remote relay instead of rewriting the workflow.',
    commands: [remoteCommand],
    note: 'Useful for home-office browser access, remote operators, and hosted runners that still need the human browser state.',
    icon: GitBranch,
    tone: 'bg-[rgba(129,201,149,0.12)] text-[#81c995]',
  },
  {
    label: 'Escalate',
    title: 'Move to MCP without changing the package',
    description:
      'The CLI is the thin command surface. When the job becomes richer, use the same published package to expose the browser to MCP agents.',
    commands: [aliasCommand],
    note: 'That lets OpenClaw-style command flows and broader agent systems share one execution layer instead of fragmenting the product story.',
    icon: Layers,
    tone: 'bg-[rgba(255,138,138,0.12)] text-[#ff8a8a]',
  },
]

const operatorPatterns = [
  {
    eyebrow: 'Operator pattern',
    title: 'Browser bug reproduction loop',
    description:
      'Open the failing route, capture a snapshot, click the suspect control, and hand the resulting evidence to a coding agent. This keeps the browser runbook explicit and replayable.',
    outputs: [
      'Deterministic command history',
      'Snapshot refs an agent can reuse immediately',
      'A cleaner handoff into richer MCP tooling when debugging expands',
    ],
  },
  {
    eyebrow: 'Operator pattern',
    title: 'Portal runbooks with a real session',
    description:
      'For internal tools and authenticated portals, one human logs in once and the CLI reuses that exact browser state across repeated open, snapshot, click, and type steps.',
    outputs: [
      'No disposable browser profile to babysit',
      'A shell-friendly interface for repeatable portal rituals',
      'Lower ceremony than full custom automation stacks',
    ],
  },
  {
    eyebrow: 'Operator pattern',
    title: 'Remote browser, local commands',
    description:
      'The browser can sit on a different machine while the command runner lives elsewhere. The remote relay keeps the flow thin without pretending the browser moved into the terminal.',
    outputs: [
      'Same CLI shape in local and remote modes',
      'Better fit for distributed operators and hosted agents',
      'A clear upgrade path into /mcp when more orchestration is needed',
    ],
  },
]

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
                <Link href="https://www.npmjs.com/package/@vibebrowser/mcp" target="_blank">
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
              <p className="text-xs uppercase tracking-[0.26em] text-[#7f8aa8]">Command surfaces</p>
              <h2
                className="mt-4 text-3xl font-normal text-[#f0f4ff]"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                Package the OpenClaw surface as explicit verbs
              </h2>
              <p className="mt-4 text-[#c4cbe0]">
                This is where a Tavily-style lesson actually applies. Not the branding, but the discipline:
                name the surfaces clearly so technical buyers understand what the route is for in under a minute.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {commandSurfaces.map((surface) => {
                const Icon = surface.icon
                return (
                  <Card key={surface.label} className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                    <CardContent className="p-6">
                      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${surface.tone}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[#7f8aa8]">{surface.label}</p>
                      <h3 className="mt-2 text-xl font-medium text-[#f0f4ff]">{surface.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#b7c0db]">{surface.description}</p>

                      <div className="mt-5 space-y-3">
                        {surface.commands.map((command) => (
                          <pre
                            key={command}
                            className="overflow-x-auto rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]"
                          >
                            <code>{command}</code>
                          </pre>
                        ))}
                      </div>

                      <p className="mt-4 text-sm leading-6 text-[#c4cbe0]">{surface.note}</p>
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

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
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

              <div className="min-w-0 space-y-6">
                <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
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

                <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
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

                <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
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

        <section className="border-b border-[rgba(136,146,176,0.15)] py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.26em] text-[#7f8aa8]">Where it wins</p>
              <h2
                className="mt-4 text-3xl font-normal text-[#f0f4ff]"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                OpenClaw-style command flows for real operator work
              </h2>
              <p className="mt-4 text-[#c4cbe0]">
                This route should not read like a generic browser automation page. It is for operators who
                want a thin, explicit command layer on top of a real browser session.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {operatorPatterns.map((pattern) => (
                <Card key={pattern.title} className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                  <CardContent className="p-6">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#7f8aa8]">{pattern.eyebrow}</p>
                    <h3 className="mt-3 text-lg font-medium text-[#f0f4ff]">{pattern.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-[#b7c0db]">{pattern.description}</p>
                    <div className="mt-5 space-y-2">
                      {pattern.outputs.map((output) => (
                        <div key={output} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#81c995]" />
                          <span className="text-sm text-[#c4cbe0]">{output}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
              <Link href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced" target="_blank">
                <Button size="lg" variant="outline" className="rounded-full border-[rgba(136,146,176,0.2)] bg-transparent px-8 py-6 text-[#b4b4ff] hover:bg-[rgba(158,158,255,0.08)] hover:text-[#d8dcff]">
                  Open Install Guide
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
