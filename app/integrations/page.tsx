import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import {
  CodeBlock,
  FaqList,
  JsonLd,
  SectionHeading,
  breadcrumbLd,
  faqPageLd,
  softwareApplicationLd,
} from '@/components/integration-ui'
import { COMPARISON, INTEGRATIONS, MCP_TOOLS, RELAY_NOTE } from '@/lib/integrations'

const PAGE_URL = 'https://www.vibebrowser.app/integrations'

const TITLE = 'Vibe Browser Integrations — Works With Any AI Agent'
const DESCRIPTION =
  'Vibe Browser works with any MCP client: Claude Desktop, Claude Code, OpenAI Codex CLI, Cursor, VS Code Copilot, Windsurf, Gemini CLI, and OpenCode. Copy-paste configs for each.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vibebrowser.app'),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'browser mcp integrations',
    'mcp browser client list',
    'claude desktop browser control',
    'cursor browser mcp',
    'codex cli browser mcp',
    'github copilot browser mcp',
    'windsurf browser mcp',
    'gemini cli browser mcp',
    'ai agent browser control',
    'multi agent browser automation',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Vibe Browser',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

const HUB_FAQS = [
  {
    q: 'Which AI agents work with Vibe Browser?',
    a: 'Vibe Browser works with any MCP client. Documented setups exist for Claude Desktop, Claude Code, OpenAI Codex CLI, Cursor, VS Code (GitHub Copilot), Windsurf, Gemini CLI, and OpenCode. All of them use the same @vibebrowser/mcp server.',
  },
  {
    q: 'Can two AI agents control the same browser at once?',
    a: 'Yes. Vibe MCP is the only browser automation server built for multi-agent use. A local relay daemon multiplexes connections, so Claude Desktop, Cursor, and a CLI agent can all drive the same Chrome window without port conflicts.',
  },
  {
    q: 'Do I need a separate browser or a cloud browser?',
    a: 'No. Vibe runs as a Chrome extension inside the browser you already use, so agents act on your existing tabs, cookies, and logged-in sessions instead of a clean headless profile.',
  },
  {
    q: 'How is Vibe different from Playwright MCP or BrowserMCP?',
    a: 'Playwright MCP and BrowserMCP launch an isolated browser with no sessions and fail when a second agent connects. Vibe uses your real browser profile, keeps logged-in sessions, and supports multiple agents simultaneously.',
  },
  {
    q: 'Is my browsing data sent anywhere?',
    a: 'No. The MCP server and relay daemon run locally on your machine. Page content is only shared with the AI agent you connected.',
  },
]

export default function IntegrationsHubPage() {
  const lastUpdated = 'August 2026'

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <JsonLd
        data={[
          softwareApplicationLd({
            name: 'Vibe MCP — Browser Control for AI Agents',
            description: DESCRIPTION,
            url: PAGE_URL,
          }),
          faqPageLd(HUB_FAQS),
          breadcrumbLd([
            { name: 'Home', url: 'https://www.vibebrowser.app' },
            { name: 'Integrations', url: PAGE_URL },
          ]),
        ]}
      />
      <SiteNav />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-14">
        <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-neutral-300">Integrations</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Vibe Browser works with any AI agent
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-300">
            One MCP server — <code className="rounded bg-white/10 px-1.5 py-0.5 text-[15px]">@vibebrowser/mcp</code>{' '}
            — gives Claude Desktop, Claude Code, OpenAI Codex CLI, Cursor, VS Code Copilot,
            Windsurf, Gemini CLI, and OpenCode control of your <strong>real, logged-in Chrome</strong>.
            Not a headless clone. The browser you already use.
          </p>
          <p className="mt-3 text-sm text-neutral-500">Last updated: {lastUpdated}</p>
        </header>

        {/* Extractable answer block (40-60 words) */}
        <section aria-labelledby="what-is" className="mt-12">
          <SectionHeading id="what-is">What is Vibe MCP?</SectionHeading>
          <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-neutral-200">
            Vibe MCP is a Model Context Protocol server that gives any AI agent control of your real
            Chrome browser. Install the Vibe extension, add one entry to your agent&apos;s MCP config, and
            the agent can navigate, click, fill forms, screenshot, and read pages — including sites you
            are already logged into. Multiple agents can share one browser.
          </p>
        </section>

        {/* Hosted-assistant shortcut. Claude and ChatGPT in the browser are the
            two highest-volume asks and they do NOT use the config-file path the
            rest of this hub describes — they take a URL. Surface them up front
            so a reader on the wrong path bails out early. */}
        <section aria-labelledby="connectors" className="mt-12 rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.05] p-6">
          <SectionHeading id="connectors">Using Claude or ChatGPT in a browser tab?</SectionHeading>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-neutral-200">
            Those cannot run a local MCP server, so skip the config files below — they take a single
            connector URL instead. Both paths are set up and verified end to end, including the exact
            click path, what &ldquo;connected&rdquo; looks like, and a prompt you can run to prove it
            works. Neither needs domain verification or an allowlist. Both accept the canonical
            OAuth URL{" "}
            <code className="text-[#9aa0a6]">https://relay.api.vibebrowser.app/mcp</code> — paste it,
            approve the <code className="text-[#9aa0a6]">browser:read</code> and{" "}
            <code className="text-[#9aa0a6]">browser:control</code> consent screen, and nothing
            secret ever goes into the chat UI. The older per-user URL{" "}
            <code className="text-[#9aa0a6]">https://relay.api.vibebrowser.app/mcp/&lt;your-routing-uuid&gt;</code>{" "}
            still works for headless clients that cannot show a consent screen —{" "}
            <strong className="text-[#e8eaed]">that URL is a bearer credential for your browser</strong>
            : do not share it, and regenerate it in the extension if it leaks.
          </p>
          <nav aria-label="Connector guides" className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/integrations/claude-connector"
              className="rounded-full border border-emerald-400/40 px-4 py-2 text-sm font-medium text-emerald-200 transition-colors hover:border-emerald-300 hover:text-emerald-100"
            >
              Claude connector setup →
            </Link>
            <Link
              href="/integrations/chatgpt-connector"
              className="rounded-full border border-emerald-400/40 px-4 py-2 text-sm font-medium text-emerald-200 transition-colors hover:border-emerald-300 hover:text-emerald-100"
            >
              ChatGPT connector setup →
            </Link>
            <Link
              href="/mcp"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-neutral-200 transition-colors hover:border-white/40 hover:text-white"
            >
              Hosted remote MCP (/mcp)
            </Link>
          </nav>
        </section>

        <section aria-labelledby="clients" className="mt-14">
          <SectionHeading id="clients">Supported AI agents</SectionHeading>
          <p className="mt-3 max-w-3xl text-[15px] text-neutral-400">
            Every client below is documented in the{' '}
            <a
              href="https://github.com/VibeTechnologies/vibe-mcp#2-configure-your-ai-application"
              className="underline decoration-white/30 underline-offset-4 hover:text-white"
              rel="noopener"
            >
              @vibebrowser/mcp README
            </a>
            . The config snippets are the real ones — copy, paste, restart.
          </p>

          <div className="mt-8 space-y-8">
            {INTEGRATIONS.map((integration) => (
              <article
                key={integration.slug}
                id={integration.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-white">
                    <Link
                      href={`/integrations/${integration.slug}`}
                      className="hover:underline underline-offset-4"
                    >
                      {integration.name}
                    </Link>
                  </h3>
                  <span className="text-xs uppercase tracking-wide text-neutral-500">
                    {integration.vendor}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-neutral-300">
                  {integration.answerBlock}
                </p>
                {integration.steps.find((s) => s.config)?.config ? (
                  <CodeBlock config={integration.steps.find((s) => s.config)!.config!} />
                ) : null}
                <Link
                  href={`/integrations/${integration.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-emerald-300 hover:text-emerald-200"
                >
                  Full {integration.name} setup guide →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="tools" className="mt-14">
          <SectionHeading id="tools">Tools every agent gets</SectionHeading>
          <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-neutral-300">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Tool
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {MCP_TOOLS.map((t) => (
                  <tr key={t.tool}>
                    <td className="px-4 py-3 font-mono text-[13px] text-emerald-200">{t.tool}</td>
                    <td className="px-4 py-3">{t.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="compare" className="mt-14">
          <SectionHeading id="compare">Vibe MCP vs Playwright MCP vs BrowserMCP</SectionHeading>
          <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-neutral-300">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Feature
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Vibe MCP
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Playwright MCP
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    BrowserMCP
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-3">{row.feature}</td>
                    <td className="px-4 py-3 text-emerald-300">{row.vibe}</td>
                    <td className="px-4 py-3">{row.playwright}</td>
                    <td className="px-4 py-3">{row.browsermcp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="security" className="mt-14">
          <SectionHeading id="security">Security</SectionHeading>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-neutral-300">{RELAY_NOTE}</p>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-neutral-300">
            What the relay carries, what it logs, how long it keeps it, and how to revoke access is documented in our{' '}
            <Link href="/privacy" className="underline decoration-white/40 underline-offset-4 hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="faq" className="mt-14">
          <SectionHeading id="faq">Frequently asked questions</SectionHeading>
          <FaqList faqs={HUB_FAQS} />
        </section>

        <section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-2xl font-bold">Get started</h2>
          <p className="mt-3 max-w-2xl text-[15px] text-neutral-300">
            Install the Vibe extension, then pick your agent above and paste the config.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/install"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200"
            >
              Install the extension
            </Link>
            <Link
              href="/mcp"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/50"
            >
              Remote MCP endpoint
            </Link>
            <Link
              href="/compare"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/50"
            >
              Compare alternatives
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
