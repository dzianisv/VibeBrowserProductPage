import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { WaitlistDialogIncognito } from '@/components/waitlist-dialog-incognito'
import { Cloud, Globe, Terminal, Code, Shield, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { CliDemo } from '@/components/cli-demo'

export const metadata: Metadata = {
  title: 'VibeBrowser Cloud — Cloud Browser MCP for AI Agents | $9/mo',
  description:
    'The best cloud browser MCP for AI agents. Connect Claude, Copilot, Gemini, or any MCP client to a real cloud browser in one command. Pre-authenticated sessions, markdown output. Starting at $9/mo — vs Browserbase $20/mo.',
  keywords: [
    'cloud browser MCP',
    'cloud browser MCP for AI agents',
    'best cloud browser MCP',
    'MCP browser cloud',
    'Browserbase alternative',
    'Browserless alternative',
    'cheap cloud browser automation',
    'authenticated browser sessions cloud',
    'browser MCP Claude',
    'browser MCP Gemini',
    'browser automation AI agents',
    'MCP browser control',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/cloud',
  },
  openGraph: {
    title: 'VibeBrowser Cloud — Cloud Browser MCP for AI Agents | $9/mo',
    description:
      'Connect Claude, Copilot, Gemini, or any MCP client to a real cloud browser in one command. Pre-authenticated sessions, markdown output. $9/mo vs Browserbase $20/mo.',
    url: 'https://www.vibebrowser.app/cloud',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'VibeBrowser Cloud — Cloud Browser MCP for AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeBrowser Cloud — Cloud Browser MCP for AI Agents | $9/mo',
    description:
      'Connect Claude, Copilot, or Gemini to a real cloud browser in one command. Pre-authenticated, markdown output, $9/mo.',
    images: ['/og/home.svg'],
    creator: '@vibebrowserapp',
  },
}

const cloudJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'VibeBrowser Cloud',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cloud',
    description:
      'VibeBrowser Cloud is a cloud browser MCP (Model Context Protocol) server for AI agents. Connect Claude, Copilot, Gemini CLI, or any MCP client to a real, pre-authenticated Chrome session running in the cloud — in one command. Starting at $9/mo.',
    url: 'https://www.vibebrowser.app/cloud',
    author: {
      '@type': 'Organization',
      name: 'Vibe Technologies',
      url: 'https://www.vibebrowser.app',
    },
    offers: {
      '@type': 'Offer',
      price: '9',
      priceCurrency: 'USD',
      availability: 'https://schema.org/PreOrder',
    },
    featureList: [
      'Cloud browser MCP server for AI agents',
      'Pre-authenticated Chrome sessions',
      'Markdown snapshot output — 99% smaller than raw HTML',
      'Compatible with Claude Code, GitHub Copilot, Codex CLI, Gemini CLI',
      'No stealth mode fees — you are a legitimate user',
      'No proxy rotation costs',
      'No CAPTCHA solving infrastructure',
      'Cloud IP address',
      'Always-on sessions (no laptop required)',
      'Open-source CLI: npx @vibebrowser/mcp',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does VibeBrowser Cloud differ from Claude for Chrome?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Claude for Chrome (Anthropic's official extension) lets Claude Code control your local browser. It is free, works with your logged-in sessions, and is excellent for Claude users running workflows interactively. VibeBrowser Cloud differs on four key axes: (1) Multi-model — works with any MCP client including Gemini CLI, GitHub Copilot, Codex CLI, Claude, Cursor, and Windsurf. Claude for Chrome is Claude-only. (2) Cloud sessions — VibeBrowser runs 24/7 without your laptop. Claude for Chrome requires Chrome open on your machine. (3) Markdown snapshots — VibeBrowser returns markdown (1–2 KB per page). Claude for Chrome passes raw HTML (200–400 KB). This is a 99%+ difference in LLM token cost per page. (4) Stable cloud IP — VibeBrowser Cloud gives you a cloud IP address; Claude for Chrome uses your current network.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best cloud browser MCP for AI agents?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'VibeBrowser Cloud is the best cloud browser MCP for AI agents that need to automate their own authenticated accounts. It starts at $9/mo, outputs markdown (99% smaller than HTML for LLM context efficiency), and connects in one command: npx @vibebrowser/mcp --remote <uuid>. For anonymous scraping at scale, Browserbase ($20/mo) is the leading alternative.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a cloud browser MCP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A cloud browser MCP is a Model Context Protocol server that gives AI agents (like Claude, Copilot, or Gemini) control over a real browser running in the cloud. The MCP protocol lets AI agents navigate pages, click elements, fill forms, and take snapshots — all through a standardized interface. Running the browser in the cloud means your agent works 24/7 without your laptop staying on.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I connect Claude to a cloud browser?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To connect Claude Code or Claude Desktop to VibeBrowser Cloud: 1) Join the waitlist at vibebrowser.app/cloud, 2) Install the VibeBrowser extension in your cloud Chrome session, 3) Run: npx @vibebrowser/mcp --remote <your-uuid>. Claude can then control the browser using MCP tools like navigate, snapshot, click, and fill.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does VibeBrowser Cloud work with Gemini CLI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. VibeBrowser Cloud works with any MCP-compatible AI client including Gemini CLI, Claude Code, GitHub Copilot, Codex CLI, and OpenClaw. Point your MCP config at the VibeBrowser endpoint and your agent gets full browser control with markdown snapshot output.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cheapest cloud browser MCP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'VibeBrowser Cloud is the cheapest cloud browser MCP at $9/mo. Competitors: Browserbase $20/mo, Browserless $25/mo, Steel.dev $29/mo, Hyperbrowser $30/mo, Anchor Browser $50/mo. VibeBrowser is cheaper because it eliminates the stealth mode, proxy rotation, and CAPTCHA-solving infrastructure that others bundle in — features you do not need when automating your own accounts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is VibeBrowser a Browserbase alternative?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. VibeBrowser Cloud is a Browserbase alternative for developers who want to automate their own authenticated accounts rather than scrape anonymous sites. VibeBrowser is $9/mo vs Browserbase $20/mo Starter. The key difference: Browserbase is optimized for anonymous scraping (stealth, proxies, CAPTCHA solving). VibeBrowser is optimized for automating accounts you already own — no stealth infrastructure needed.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does VibeBrowser output markdown instead of HTML?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'VibeBrowser snapshots return markdown instead of raw HTML because AI agents work with language models that have limited context windows. A typical page in raw HTML is 200-400 KB. The same page as structured markdown is 1-2 KB — 99% smaller. This reduces LLM API costs, speeds up agent responses, and prevents context window overflow on complex multi-step workflows.',
        },
      },
    ],
  },
]

export default function CloudPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-slate-50 selection:bg-purple-500/30">
      {cloudJsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SiteNav />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="container max-w-6xl px-4 md:px-6 mx-auto mb-20 text-center">
          <Badge variant="outline" className="mb-6 border-purple-500/30 bg-purple-500/10 text-purple-300 px-4 py-1.5 text-sm">
            <Cloud className="w-4 h-4 mr-2 inline" />
            Cloud Browser MCP for AI Agents
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            $9/mo.<br className="hidden md:block" /> Browserbase starts at $20.
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto mb-3 font-mono">
            VibeBrowser Cloud is a cloud browser MCP server — connect Claude, Copilot, Gemini, or any MCP client to a real Chrome session running in the cloud.
          </p>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4">
            Browserbase charges for stealth mode, proxy rotation, and bot detection — infrastructure built for scraping strangers&apos; sites.
          </p>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-10 font-medium">
            You&apos;re automating <em>your own</em> accounts. You don&apos;t need any of that. You just need your session in the cloud.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <WaitlistDialogIncognito tier="cloud">
              <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-8 font-semibold h-14 text-lg">
                Join the Cloud Waitlist <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </WaitlistDialogIncognito>
            <Button asChild size="lg" variant="outline" className="border-slate-700 bg-transparent hover:bg-slate-800 text-slate-300 rounded-full px-8 font-semibold h-14 text-lg">
              <Link href="/mcp">
                <Code className="mr-2 h-5 w-5" />
                View MCP Setup
              </Link>
            </Button>
          </div>
        </section>

        {/* Code Comparison — competitive to Browserbase */}
        <section className="container max-w-5xl px-4 md:px-6 mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-100">Less code. Less cost. Same result.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              Browserbase requires an SDK, two API calls, and CDP plumbing before you can touch a page.
              VibeBrowser is one command.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Browserbase side */}
            <div className="rounded-2xl overflow-hidden border border-red-900/40 bg-slate-950 font-mono text-xs">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="text-slate-500 text-xs flex-1">browserbase — 18 lines of setup</span>
                <span className="text-red-400/70 text-[11px] font-sans font-semibold">$20/mo+</span>
              </div>
              <pre className="p-5 text-slate-400 leading-relaxed overflow-x-auto [scrollbar-width:none]"><code>{`import Browserbase from "@browserbasehq/sdk";
import { chromium } from "playwright-core";

// 1. create session (API call #1)
const bb = new Browserbase({
  apiKey: process.env.BROWSERBASE_API_KEY,
});
const session = await bb.sessions.create({
  projectId: process.env.BROWSERBASE_PROJECT_ID,
});

// 2. fetch CDP URL (API call #2)
const { wsUrl } = await bb.sessions
  .debug(session.id);

// 3. connect Playwright over CDP
const browser = await chromium
  .connectOverCDP(wsUrl);
const [page] = browser.contexts()[0].pages();

// 4. finally do your work
await page.goto("https://mail.google.com");
const html = await page.content(); // 400 KB HTML

// 5. clean up
await browser.close();
await bb.sessions.update(session.id,
  { status: "REQUEST_RELEASE" });`}</code></pre>
            </div>

            {/* VibeBrowser side */}
            <div className="rounded-2xl overflow-hidden border border-emerald-900/40 bg-slate-950 font-mono text-xs">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-slate-500 text-xs flex-1">vibebrowser-cli — 1 command</span>
                <span className="text-emerald-400/80 text-[11px] font-sans font-semibold">$9/mo</span>
              </div>
              <pre className="p-5 text-slate-400 leading-relaxed overflow-x-auto [scrollbar-width:none]"><code>{`# Connect your AI agent to your cloud browser
npx @vibebrowser/mcp --remote YOUR_UUID

# ✓ Session ready  ·  IP 45.91.12.34
# ✓ Logged in as alice@gmail.com

# Your agent (Claude / Copilot / Gemini) now calls:
# navigate  →  go to any URL
# snapshot  →  get markdown (not raw HTML)
# click     →  click by label or selector
# fill      →  fill form fields

# Example agent prompt:
"Summarise my unread Gmail from today"

# Snapshot output: 1.1 KB markdown
# ── not 400 KB of HTML ──
#
# No SDK. No CDP. No session cleanup.
# Pre-authenticated. Always-on. ☁`}</code></pre>
            </div>
          </div>
          <p className="text-center text-slate-600 text-xs mt-4">
            Browserbase also requires <code className="text-slate-500">npm install @browserbasehq/sdk playwright-core</code> and two env vars before the first line runs.
          </p>
        </section>

        {/* CLI Demo */}
        <section className="container max-w-4xl px-4 md:px-6 mx-auto mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">See it in action</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              One command connects your AI agent to a real authenticated browser session.
              Snapshots come back as <span className="text-purple-400 font-semibold">markdown</span> —
              structured and compact, not bloated HTML.
            </p>
          </div>
          <CliDemo />
        </section>

        {/* Core Features */}
        <section className="container max-w-6xl px-4 md:px-6 mx-auto mb-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
              <Shield className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-slate-100">No stealth tax</h3>
              <p className="text-slate-400">
                You&apos;re a legitimate user on sites you already have accounts on. No bot detection, no CAPTCHA solving, no proxy rotation. That&apos;s how we keep costs low.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
              <Globe className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-slate-100">Your credentials, your sessions</h3>
              <p className="text-slate-400">
                Transfer your logins once. Every cloud browser session starts pre-authenticated. Agents reach vendor portals, SaaS dashboards, and internal tools without re-auth.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
              <Terminal className="w-10 h-10 text-pink-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-slate-100">One npx command away</h3>
              <p className="text-slate-400">
                No SDK to install, no session object to manage. Point your MCP agent at a cloud browser endpoint and go. Works with Claude Code, Codex, Copilot, and Gemini CLI.
              </p>
            </div>
          </div>
        </section>

        {/* What you stop paying for */}
        <section className="container max-w-5xl px-4 md:px-6 mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">What you stop paying for</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Browserbase and Browserless are built for scraping sites that don&apos;t know you. VibeBrowser Cloud is built for automating sites that do.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-8">
              <p className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-5">Browserbase / Browserless</p>
              <ul className="space-y-4">
                {[
                  'Stealth mode & fingerprint randomization',
                  'Residential proxy rotation ($10–12/GB)',
                  'CAPTCHA solving infrastructure',
                  'Bot detection bypass engine',
                  'Sessions for sites that don\'t know you',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-400">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-2xl p-8">
              <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-5">VibeBrowser Cloud</p>
              <ul className="space-y-4">
                {[
                  'Your real Chrome, pre-logged-in',
                  'No proxies needed (it\'s your account)',
                  'No CAPTCHAs (you\'re a real user)',
                  'No stealth (sites already trust you)',
                  'Fraction of the cost',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center">
            <p className="text-slate-400 mb-6">
              Starting at a fraction of Browserbase pricing. Join the waitlist for early access pricing.
            </p>
            <WaitlistDialogIncognito tier="cloud">
              <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-8 font-semibold h-12">
                Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </WaitlistDialogIncognito>
          </div>
        </section>

        {/* Competitor Comparison Table */}
        <section className="container max-w-6xl px-4 md:px-6 mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">How we compare</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Every competitor is built for anonymous scraping. VibeBrowser Cloud is built for automating accounts you already own.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-800/50">
                  <th className="p-4 font-semibold text-slate-300 w-[16%]"></th>
                  <th className="p-4 font-bold text-purple-400 w-[13%] bg-purple-500/5 border-x border-purple-500/20 text-center">
                    VibeBrowser<br />Cloud
                  </th>
                  <th className="p-4 font-semibold text-slate-400 w-[13%] text-center">Claude<br />for Chrome</th>
                  <th className="p-4 font-semibold text-slate-400 w-[13%] text-center">Browserbase</th>
                  <th className="p-4 font-semibold text-slate-400 w-[13%] text-center">Browserless</th>
                  <th className="p-4 font-semibold text-slate-400 w-[13%] text-center">Steel.dev</th>
                  <th className="p-4 font-semibold text-slate-400 w-[13%] text-center">Hyperbrowser</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {/* Entry price */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">Entry price</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 font-bold text-base">$9/mo</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">Free*<br />(Anthropic plan)</td>
                  <td className="p-4 text-slate-400 text-center">$20/mo</td>
                  <td className="p-4 text-slate-400 text-center">$25/mo</td>
                  <td className="p-4 text-slate-400 text-center">$29/mo</td>
                  <td className="p-4 text-slate-400 text-center">$30/mo</td>
                </tr>

                {/* Works with */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">Works with</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 font-semibold text-xs">Any MCP client<br />(Claude, Copilot,<br />Gemini, Codex…)</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">Claude Code<br />only</td>
                  <td className="p-4 text-slate-500 text-center text-xs">CDP / Playwright<br />+ MCP</td>
                  <td className="p-4 text-slate-500 text-center text-xs">CDP /<br />Playwright</td>
                  <td className="p-4 text-slate-500 text-center text-xs">CDP /<br />Playwright</td>
                  <td className="p-4 text-slate-500 text-center text-xs">CDP /<br />MCP</td>
                </tr>

                {/* Cloud / local */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">Cloud session</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 font-semibold text-xs">✅ Cloud 24/7<br />+ free local</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">❌ Local only<br />(laptop must be on)</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Cloud</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Cloud</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Cloud</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Cloud</td>
                </tr>

                {/* Snapshot format */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">Snapshot format</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 font-semibold text-xs">✅ Markdown<br />~1–2 KB/page</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">Raw HTML<br />200–400 KB/page</td>
                  <td className="p-4 text-slate-400 text-center text-xs">Raw HTML<br />200–400 KB</td>
                  <td className="p-4 text-slate-400 text-center text-xs">Raw HTML<br />200–400 KB</td>
                  <td className="p-4 text-slate-400 text-center text-xs">Raw HTML<br />200–400 KB</td>
                  <td className="p-4 text-slate-400 text-center text-xs">Raw HTML<br />200–400 KB</td>
                </tr>

                {/* Stealth */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">Stealth / fingerprinting</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 text-xs font-medium">Not needed —<br />you&apos;re the user</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">Not needed —<br />your real Chrome</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Included<br />("Agent Identity")</td>
                  <td className="p-4 text-slate-400 text-center text-xs">⚠️ Not tiered<br />on pricing page</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Per-plan<br />rates</td>
                  <td className="p-4 text-slate-400 text-center text-xs">⚠️ Ultra stealth:<br />enterprise only</td>
                </tr>

                {/* MCP */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">MCP support</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 font-semibold text-xs">✅ Native<br />npx @vibebrowser/mcp</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Official<br />(Claude Code only)</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Official<br />mcp.browserbase.com</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Yes</td>
                  <td className="p-4 text-slate-400 text-center text-xs">❓ Not found<br />in docs</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ hyperbrowser-mcp<br />npm package</td>
                </tr>

                {/* Open source */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">Open source</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 font-semibold text-xs">✅ MCP CLI<br />open source</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">❌ Proprietary</td>
                  <td className="p-4 text-slate-400 text-center text-xs">❌ SDKs only</td>
                  <td className="p-4 text-slate-400 text-center text-xs">⚠️ Partial</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ 6.9k ⭐<br />self-hostable</td>
                  <td className="p-4 text-slate-400 text-center text-xs">❌</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-slate-600 text-xs mt-4">
            *Claude for Chrome requires an Anthropic Pro/Max/Team/Enterprise plan ($20–25/mo). Pricing verified April 2026. Sources: browserbase.com/pricing, browserless.io/pricing, steel.dev, hyperbrowser.ai/pricing, docs.anthropic.com.
          </p>
        </section>

        {/* Pricing */}
        <section className="container max-w-4xl px-4 md:px-6 mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">Simple pricing</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Start free on your local machine. Upgrade when you need a cloud IP and always-on access.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free tier */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 flex flex-col">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Local</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-slate-100">Free</span>
                <span className="text-slate-400 ml-2">forever</span>
              </div>
              <ul className="space-y-3 text-slate-300 flex-1 mb-8">
                {[
                  'Chrome extension — no account needed',
                  'Your local browser, pre-authenticated',
                  'MCP via `npx @vibebrowser/mcp`',
                  'Works with Claude Code, Copilot, Codex',
                  'Open source',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="border-slate-600 bg-transparent hover:bg-slate-700 text-slate-200 rounded-full w-full">
                <Link href="/mcp-stdio">Get the extension →</Link>
              </Button>
            </div>

            {/* Cloud tier */}
            <div className="bg-gradient-to-br from-purple-900/40 to-slate-800/80 border border-purple-500/40 rounded-2xl p-8 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-purple-500 text-white border-0 px-3 py-1 text-xs font-semibold">
                  Waitlist open
                </Badge>
              </div>
              <p className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">Cloud</p>
              <div className="mb-2">
                <span className="text-5xl font-extrabold text-slate-100">$9</span>
                <span className="text-slate-400 ml-2">/mo</span>
              </div>
              <p className="text-slate-500 text-sm mb-6">vs Browserbase Starter at $20/mo</p>
              <ul className="space-y-3 text-slate-300 flex-1 mb-8">
                {[
                  'Cloud IP — agent runs 24/7, not from your laptop',
                  'Your real Chrome session, pre-authenticated',
                  'MCP endpoint accessible from anywhere',
                  'No stealth fees — you\'re a legitimate user',
                  'No proxy costs, no CAPTCHA charges',
                  'Everything in the Free tier, plus cloud',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <WaitlistDialogIncognito tier="cloud">
                <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white rounded-full w-full font-semibold">
                  Join the waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </WaitlistDialogIncognito>
            </div>
          </div>
        </section>

        {/* Built For OpenClaw */}
        <section className="container max-w-4xl px-4 md:px-6 mx-auto mb-20">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <Badge variant="outline" className="mb-4 border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
              Battle-Tested
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-slate-100">Battle-tested in production</h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              VibeBrowser Cloud infrastructure is already well-tested in production. It is the core engine that <strong className="text-slate-200">openclaw.vibebrowser.app</strong> uses to start and control remote browsers securely.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline" className="border-slate-600 bg-slate-800 hover:bg-slate-700 text-slate-200">
                <Link href="/openclaw">
                  Explore OpenClaw <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ — LLM and SEO optimized */}
        <section className="container max-w-3xl px-4 md:px-6 mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'How does VibeBrowser differ from Claude for Chrome?',
                a: "Claude for Chrome (Anthropic's official extension) lets Claude Code control your local browser — free and great if you only use Claude and can keep your laptop open. VibeBrowser differs on four axes: (1) Multi-model — works with any MCP client: Gemini CLI, GitHub Copilot, Codex, Claude, Cursor. (2) Cloud — sessions run 24/7 without your laptop on. (3) Markdown snapshots — 99%+ smaller than raw HTML, so LLM token costs drop dramatically. (4) Stable cloud IP — useful for consistent geolocation.",
              },
              {
                q: 'What is the best cloud browser MCP for AI agents?',
                a: 'VibeBrowser Cloud is the best cloud browser MCP for AI agents that need to automate their own authenticated accounts. It starts at $9/mo, outputs markdown snapshots (99% smaller than raw HTML — critical for LLM context efficiency), and connects in one command: npx @vibebrowser/mcp --remote <uuid>. For anonymous scraping at scale, Browserbase ($20/mo) is the leading alternative.',
              },
              {
                q: 'What is a cloud browser MCP?',
                a: 'A cloud browser MCP (Model Context Protocol server) gives AI agents — like Claude, Copilot, or Gemini — control over a real browser running in the cloud. Through MCP, the agent can navigate pages, click, fill forms, and take snapshots without your laptop running. The cloud browser keeps sessions alive 24/7 with a stable cloud IP.',
              },
              {
                q: 'How do I connect Claude to a cloud browser?',
                a: 'Install the VibeBrowser extension in your cloud Chrome session, then run: npx @vibebrowser/mcp --remote <your-uuid>. Claude Code and Claude Desktop will pick up the MCP server and gain full browser control — navigate, snapshot, click, fill — over your pre-authenticated cloud session.',
              },
              {
                q: 'Does VibeBrowser work with Gemini CLI, Copilot, or Codex?',
                a: 'Yes. VibeBrowser works with any MCP-compatible AI client: Gemini CLI, GitHub Copilot, Codex CLI, Claude Code, OpenClaw, and more. It follows the standard Model Context Protocol specification, so any tool that supports MCP can control the browser immediately.',
              },
              {
                q: 'Why is VibeBrowser cheaper than Browserbase, Steel, and Hyperbrowser?',
                a: 'Competitors bundle stealth mode, residential proxy rotation, CAPTCHA solving, and bot-detection bypass into their pricing — because they are built for scraping sites that don\'t know you. VibeBrowser is built for automating sites you already have accounts on. You don\'t need any of that infrastructure. No stealth tax, no proxy costs, no CAPTCHA fees. That\'s how $9/mo is possible.',
              },
              {
                q: 'Why does VibeBrowser output markdown instead of HTML?',
                a: 'Raw HTML for a typical page is 200–400 KB. The same page as structured markdown is 1–2 KB — 99% smaller. For AI agents, this means dramatically lower LLM API costs, faster responses, and no context window overflow on complex workflows. All other cloud browser MCPs return raw HTML or accessibility trees that bloat the model\'s context on every single page.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-slate-700/50 bg-slate-800/30 open:bg-slate-800/60 transition-colors">
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 font-semibold text-slate-200 gap-4">
                  {q}
                  <span className="ml-4 shrink-0 text-slate-500 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
                </summary>
                <p className="px-6 pb-5 text-slate-400 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

      </main>
      
      <SiteFooter />
    </div>
  )
}
