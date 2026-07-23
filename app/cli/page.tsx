import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Chrome, Code2, Cpu, GitBranch, Globe, KeyRound, Layers, Settings, Shield, Terminal } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { CopyablePrompt } from '@/components/copyable-prompt'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PACKAGE_SPEC = '@vibebrowser/cli@latest'
const FULL_PACKAGE_SPEC = '@vibebrowser/mcp@latest'
const CLI_BASE = `npx -y ${PACKAGE_SPEC}`
const CLI_REMOTE = `${CLI_BASE} --remote "<my remote>" --json status --wait-for-extension --wait-timeout 20000`
const CLI_SNAPSHOT = `${CLI_BASE} --remote "<my remote>" --json snapshot --format aria`
const MCP_OPENCLAW = `npx -y -p ${FULL_PACKAGE_SPEC} vibebrowser-mcp openclaw --remote "<my remote>"`

const RELAY_HOST = 'relay.api.vibebrowser.app'
const RELAY_URL_PLACEHOLDER = `wss://${RELAY_HOST}/<uuid>`
const REMOTE_ENV_COMMAND = `# Bare UUID or full relay URL both work — set it once, reuse it:
export VIBE_REMOTE_URL="<uuid-or-${RELAY_URL_PLACEHOLDER}>"

${CLI_BASE} --remote "$VIBE_REMOTE_URL" --json status --wait-for-extension --wait-timeout 20000`

const AGENT_INSTALL_PROMPT = `You are setting yourself up to control my real Chrome through Vibe Browser. Work through the steps in order. Do not claim a step is done until you have proven it.

1. Install the "vibebrowser" skill for your runtime, then confirm it is listed:
   - OpenClaw:  npx -y skills add VibeTechnologies/vibe-mcp -s vibebrowser -a openclaw -g -y --copy --dangerously-accept-openclaw-risks
                then run \`openclaw skills list\`. You may report the vibebrowser row only if you actually checked it.
   - Hermes:    npx -y skills add VibeTechnologies/vibe-mcp -s vibebrowser -y
                Do not treat \`npx -y skills list\` as proof that browser control works. A listed row is only a skill listing.

2. Remember my remote so I only give it to you once. Save it to a file \`vibebrowser-cli.md\` in your persistent agent workspace root as a line \`remote: <value>\`; if your runtime can also write memory keys, additionally store it under \`vibebrowser_remote\`. On every later command — including the first message of a new conversation — load it back from that file and reuse it without asking me again.

3. Record these standing rules so you route correctly later:
   - Whenever I ask you to do anything in MY browser / MY Chrome / MY tabs / the page I'm on, use the vibebrowser skill to drive my REAL browser, not your built-in, headless, or in-pod browser, and not web-fetch.
   - Never run \`vibebrowser\` directly. Always run \`npx -y @vibebrowser/cli@latest\` for direct CLI verification commands.

4. Confirm you can control my Chrome, retrying on "Extension reconnecting" (wait 3s, up to 5x):
   npx -y @vibebrowser/cli@latest --remote "<my remote>" --json status --wait-for-extension --wait-timeout 20000
   npx -y @vibebrowser/cli@latest --remote "<my remote>" --json snapshot --format aria

Then report the real proof: extensionConnected is true, and the snapshot returned real page content from my browser. For OpenClaw only, also report the skill listing if you checked it. Do not claim Hermes browser control works because a skill row exists.

My remote: <PASTE YOUR UUID OR wss:// URL HERE>`

const GITHUB_MCP_URL = 'https://github.com/VibeTechnologies/vibe-mcp'
const GITHUB_CLI_URL = 'https://github.com/VibeTechnologies/vibe-mcp/blob/main/src/browser-main.ts'
const SKILL_URL = 'https://skills.sh/vibetechnologies/agent-skills/vibebrowser'

const commandSurfaces = [
  {
    title: 'Verify the relay',
    description: 'Wait for the extension and confirm the browser is connected.',
    command: CLI_REMOTE,
  },
  {
    title: 'Read the real page',
    description: 'Capture an accessibility snapshot from the actual browser tab.',
    command: CLI_SNAPSHOT,
  },
  {
    title: 'Open a URL',
    description: 'Use an explicit CLI verb against your live session.',
    command: `${CLI_BASE} --remote "<my remote>" open https://example.com`,
  },
  {
    title: 'Click a snapshot ref',
    description: 'Act only after a snapshot gives you a stable ref.',
    command: `${CLI_BASE} --remote "<my remote>" click A12`,
  },
]

export const metadata: Metadata = {
  title: 'Vibe Browser CLI for Any Agent Runtime | @vibebrowser/cli',
  description:
    'A small npx command surface for checking status, reading snapshots, and acting on your real logged-in Chrome through the Vibe Browser relay. Works with Claude, GitHub Copilot, Codex, Gemini CLI, and OpenClaw.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/cli',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vibebrowser.app/cli',
    siteName: 'Vibe Browser',
    title: 'Vibe Browser CLI for Any Agent Runtime | @vibebrowser/cli',
    description:
      'Check status, read snapshots, and act on your real logged-in Chrome through the Vibe Browser relay using a small npx command surface.',
    images: [
      {
        url: '/og/home',
        width: 1200,
        height: 630,
        alt: 'Vibe Browser CLI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Browser CLI for Any Agent Runtime | @vibebrowser/cli',
    description:
      'A small npx command surface for status, snapshots, and actions against your real logged-in Chrome via the Vibe Browser relay.',
    images: ['/og/home'],
    creator: '@vibebrowserapp',
  },
}

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
                A small <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">npx</code> command surface for checking status, reading snapshots, and acting on your real logged-in Chrome through Vibe Browser relay.
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
                  @vibebrowser/cli source
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                    Use <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">npx -y @vibebrowser/cli@latest</code> for shell flows
                    and <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">vibebrowser-mcp</code> when orchestration grows.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[rgba(136,146,176,0.15)] bg-[rgba(10,15,29,0.92)]">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(129,201,149,0.12)]">
                    <Cpu className="h-5 w-5 text-[#81c995]" />
                  </div>
                  <h2 className="mb-2 text-lg font-medium text-[#f0f4ff]">Direct DevTools mode</h2>
                  <p className="text-sm text-[#b7c0db]">
                    Use <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">--devtools</code> to bypass the extension relay and drive Chrome directly over the DevTools Protocol — no extension required.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b border-[rgba(136,146,176,0.15)] bg-[rgba(8,12,24,0.88)] py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.26em] text-[#7f8aa8]">How it works</p>
              <h2
                className="mt-4 text-3xl font-normal text-[#f0f4ff]"
                style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}
              >
                What <code className="rounded bg-[rgba(158,158,255,0.1)] px-1.5 py-0.5 text-[#b4b4ff]">--remote</code> actually connects to
              </h2>
              <p className="mt-4 text-[#c4cbe0]">
                Every command on this page needs a remote value. This is where it comes from, what forms it takes, and what it grants.
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
                    <code>{`  @vibebrowser/cli  (laptop, CI runner, or any host)
        │
        │  --remote "<uuid-or-full-relay-url>"
        ▼
  wss://relay.api.vibebrowser.app/<uuid>   ← hosted by Vibe, routes by UUID
        │
        ▼
  Vibe extension in your real Chrome   ← set to "Remote (internet)"`}</code>
                  </pre>
                  <div className="border-t border-[rgba(136,146,176,0.15)] px-5 py-4 text-sm text-[#b7c0db]">
                    Local mode talks to the extension on your machine and never leaves it. Remote mode routes every command through Vibe&apos;s hosted relay over the internet — the two are different trust boundaries, not equivalent ones.
                  </div>
                </CardContent>
              </Card>

              <div className="min-w-0 space-y-6">
                <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#9e9eff]">
                      <Settings className="h-4 w-4" />
                      Where the value comes from
                    </div>
                    <p className="mb-4 text-sm text-[#b7c0db]">
                      In the Vibe extension: <span className="text-[#f0f4ff]">Settings → AI Agent Control</span>. Turn on <span className="text-[#f0f4ff]">Enable external AI agent control</span>, select <span className="text-[#f0f4ff]">Remote (internet)</span>, then copy the UUID/relay URL from <span className="text-[#f0f4ff]">Relay access</span>.
                    </p>
                    <p className="mb-2 text-sm text-[#b7c0db]">Both accepted forms route to the same place:</p>
                    <ul className="space-y-1.5 text-sm">
                      <li>
                        <code className="rounded bg-[rgba(158,158,255,0.1)] px-1.5 py-0.5 text-[#b4b4ff]">{'<uuid>'}</code>{' '}
                        <span className="text-[#9aa0a6]">— bare UUID</span>
                      </li>
                      <li>
                        <code className="rounded bg-[rgba(158,158,255,0.1)] px-1.5 py-0.5 text-[#b4b4ff]">{RELAY_URL_PLACEHOLDER}</code>{' '}
                        <span className="text-[#9aa0a6]">— full relay URL</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="min-w-0 border-[rgba(255,77,77,0.2)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#ff8a8a]">
                      <KeyRound className="h-4 w-4" />
                      Treat it like a password
                    </div>
                    <p className="text-sm text-[#b7c0db]">
                      Either form is the sole credential that authorizes a relay connection to your browser — whoever holds it can read tabs, take screenshots, and act as you in that session.
                    </p>
                    <p className="mt-3 text-sm text-[#b7c0db]">
                      Never commit it, paste it into a public chat, or share it with anyone you don&apos;t want controlling your browser. If it ever leaks, regenerate it from the same Settings page.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mx-auto mt-8 flex items-center gap-2 text-xs text-[#7f8aa8]">
              <Shield className="h-3.5 w-3.5 shrink-0" />
              <span>Values shown here are placeholders. Never paste a real UUID or relay URL into a shared doc, ticket, or chat.</span>
            </div>
            <div className="mx-auto mt-4 max-w-4xl">
              <CopyablePrompt text={REMOTE_ENV_COMMAND} title="Set it once, reuse it" className="mx-auto" />
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
                Use the published package every time: <code className="rounded bg-[rgba(158,158,255,0.1)] px-1.5 py-0.5 text-[#b4b4ff]">npx -y @vibebrowser/cli@latest</code>. Do not run a bare <code className="rounded bg-[rgba(158,158,255,0.1)] px-1.5 py-0.5 text-[#b4b4ff]">vibebrowser</code> binary.
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
                      Need richer tool orchestration? Use the same package via <Link href="/mcp-stdio" className="text-[#b4b4ff] hover:text-[#d8dcff] hover:underline">/mcp-stdio setup</Link> without changing the execution layer.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[rgba(136,146,176,0.15)] bg-[rgba(8,12,24,0.88)] py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.26em] text-[#7f8aa8]">Agent setup</p>
              <h2 className="mt-4 text-3xl font-normal text-[#f0f4ff]" style={{ fontFamily: "'Clash Display', 'Satoshi', system-ui, sans-serif" }}>
                One-shot install prompt
              </h2>
              <p className="mt-4 text-[#c4cbe0]">
                Paste this block into your OpenClaw or Hermes agent. The button copies the full prompt so users do not have to select text manually.
              </p>
            </div>
            <CopyablePrompt text={AGENT_INSTALL_PROMPT} title="Agent install prompt" className="mx-auto max-w-4xl" />
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
                <p className="text-sm font-medium text-[#f0f4ff]">@vibebrowser/cli</p>
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
