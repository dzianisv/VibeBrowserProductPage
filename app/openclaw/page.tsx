import Link from 'next/link'
import { ArrowRight, CheckCircle, Chrome, GitBranch, Globe, Shield, Terminal } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { CopyablePrompt } from '@/components/copyable-prompt'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PACKAGE_SPEC = '@vibebrowser/cli@latest'
const FULL_PACKAGE_SPEC = '@vibebrowser/mcp@latest'
const CLI_BASE = `npx -y ${PACKAGE_SPEC}`
const GITHUB_MCP_URL = 'https://github.com/VibeTechnologies/vibe-mcp'
const GITHUB_CLI_URL = 'https://github.com/VibeTechnologies/vibe-mcp/blob/main/src/browser-main.ts'
const SKILL_URL = 'https://skills.sh/vibetechnologies/agent-skills/vibebrowser'

const quickstartCommands = [
  {
    label: 'Verify the relay',
    command: `${CLI_BASE} --remote "<my remote>" --json status --wait-for-extension --wait-timeout 20000`,
  },
  {
    label: 'Read the real page',
    command: `${CLI_BASE} --remote "<my remote>" --json snapshot --format aria`,
  },
  {
    label: 'Open a URL',
    command: `${CLI_BASE} --remote "<my remote>" open https://example.com`,
  },
  {
    label: 'Click by ref after a snapshot',
    command: `${CLI_BASE} --remote "<my remote>" click A12`,
  },
]

const remoteCommand = `${CLI_BASE} --remote "<my remote>" --json status --wait-for-extension --wait-timeout 20000`

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
                Give your agents a <span className="text-[#ff4d4d]">command line to the web</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-[#c4cbe0] md:text-xl">
                OpenClaw-friendly commands for verifying relay status, reading the real page, and acting against your logged-in Chrome. Always run the published package through <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">npx -y @vibebrowser/cli@latest</code>.
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
                <Link href="/cli">
                  <Button size="lg" variant="outline" className="rounded-full border-[rgba(136,146,176,0.2)] bg-transparent px-8 py-6 text-[#b4b4ff] hover:bg-[rgba(158,158,255,0.08)] hover:text-[#d8dcff]">
                    General CLI Page
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
                    Install <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">@vibebrowser/cli</code> for lightweight command flows or <code className="rounded bg-[rgba(158,158,255,0.1)] px-1 text-[#b4b4ff]">@vibebrowser/mcp</code> for MCP agents — both share the same relay and browser connection.
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
                These are the direct CLI checks that prove browser control. A skill listing is not enough; verify <code className="rounded bg-[rgba(158,158,255,0.1)] px-1.5 py-0.5 text-[#b4b4ff]">extensionConnected</code> and a real page snapshot.
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
                      If your Vibe extension is connected in remote mode, use the same CLI with a UUID or full WSS URL:
                    </p>
                    <pre className="overflow-x-auto rounded-lg border border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.9)] p-4 text-sm text-[#b4b4ff]">
                      <code>{remoteCommand}</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card className="min-w-0 border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)]">
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-medium text-[#f0f4ff]">What this page is for</h3>
                    <p className="text-sm text-[#b7c0db]">
                      Use this route when you want OpenClaw-first command workflows. If you need a broader CLI positioning for non-OpenClaw runtimes, use <Link href="/cli" className="text-[#b4b4ff] hover:text-[#d8dcff] hover:underline">/cli</Link>. For JSON MCP config blocks (Claude Code, Codex, Cursor, VS Code), use <Link href="/mcp-stdio" className="text-[#b4b4ff] hover:text-[#d8dcff] hover:underline">Vibe Browser for Agents</Link>.
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
