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
  title: 'VibeBrowser Cloud | Browserbase Alternative — Your Accounts, Your Sessions',
  description: "90% cheaper than Browserbase. No stealth mode needed — you're automating your own accounts. Real Chrome sessions with your credentials, globally deployed.",
  keywords: [
    'Browserbase alternative',
    'Browserless alternative',
    'cheap browser automation cloud',
    'affordable browser as a service',
    'authenticated browser sessions cloud',
    'browser automation for your own accounts',
    'no stealth mode browser agent',
    'MCP browser cloud cheap',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/cloud',
  },
  openGraph: {
    title: 'VibeBrowser Cloud | Browserbase Alternative — Your Accounts, Your Sessions',
    description: "90% cheaper than Browserbase. No stealth mode needed — you're automating your own accounts. Real Chrome sessions with your credentials, globally deployed.",
    url: 'https://www.vibebrowser.app/cloud',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'VibeBrowser Cloud — Affordable Browserbase Alternative',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeBrowser Cloud | Browserbase Alternative — Your Accounts, Your Sessions',
    description: "90% cheaper than Browserbase. No stealth mode needed — you're automating your own accounts.",
    images: ['/og/home.svg'],
    creator: '@vibebrowserapp',
  },
}

const cloudJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'VibeBrowser Cloud',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Cloud',
  description:
    'Affordable Browserbase alternative. Automate your own accounts without stealth mode, proxy rotation, or CAPTCHA solving. Real Chrome sessions pre-loaded with your credentials.',
  url: 'https://www.vibebrowser.app/cloud',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://www.vibebrowser.app',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder',
  },
  featureList: [
    'No stealth mode needed — you are a legitimate user',
    'No proxy rotation costs',
    'No CAPTCHA solving infrastructure',
    'Pre-authenticated Chrome sessions',
    'Chrome DevTools Protocol over HTTPS',
    'MCP server for AI agents',
    'Global Chrome instance deployment',
    'Open-source CLI',
    'Compatible with Claude, Copilot, Codex, Gemini CLI',
  ],
}

export default function CloudPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-slate-50 selection:bg-purple-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cloudJsonLd) }}
      />
      <SiteNav />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="container max-w-6xl px-4 md:px-6 mx-auto mb-20 text-center">
          <Badge variant="outline" className="mb-6 border-purple-500/30 bg-purple-500/10 text-purple-300 px-4 py-1.5 text-sm">
            <Cloud className="w-4 h-4 mr-2 inline" />
            Browserbase Alternative
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            $9/mo.<br className="hidden md:block" /> Browserbase starts at $49.
          </h1>
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
              <Link href="https://github.com/ChromeDevTools/chrome-devtools-mcp" target="_blank" rel="noopener noreferrer">
                <Code className="mr-2 h-5 w-5" />
                View MCP Protocol
              </Link>
            </Button>
          </div>
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
                  <th className="p-4 font-semibold text-slate-300 w-[18%]"></th>
                  <th className="p-4 font-bold text-purple-400 w-[14%] bg-purple-500/5 border-x border-purple-500/20 text-center">
                    VibeBrowser<br />Cloud
                  </th>
                  <th className="p-4 font-semibold text-slate-400 w-[14%] text-center">Browserbase</th>
                  <th className="p-4 font-semibold text-slate-400 w-[14%] text-center">Browserless</th>
                  <th className="p-4 font-semibold text-slate-400 w-[14%] text-center">Steel.dev</th>
                  <th className="p-4 font-semibold text-slate-400 w-[14%] text-center">Anchor Browser</th>
                  <th className="p-4 font-semibold text-slate-400 w-[14%] text-center">Hyperbrowser</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {/* Entry price */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">Entry price</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 font-bold text-base">$9/mo</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center">$20/mo</td>
                  <td className="p-4 text-slate-400 text-center">$25/mo</td>
                  <td className="p-4 text-slate-400 text-center">$29/mo</td>
                  <td className="p-4 text-slate-400 text-center">$50/mo</td>
                  <td className="p-4 text-slate-400 text-center">$30/mo</td>
                </tr>

                {/* Free tier */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">Free tier</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 font-semibold">Local extension<br />free forever</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">1 hr total,<br />3 concurrent</td>
                  <td className="p-4 text-slate-400 text-center text-xs">~8 min,<br />2 concurrent</td>
                  <td className="p-4 text-slate-400 text-center text-xs">$10 credits<br />(~100 hr)</td>
                  <td className="p-4 text-slate-400 text-center text-xs">5 credits,<br />500 sessions</td>
                  <td className="p-4 text-slate-400 text-center text-xs">~50 hr,<br />1 concurrent</td>
                </tr>

                {/* Use case */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">Built for</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-slate-200 text-xs">Your own accounts<br />&amp; authenticated workflows</span>
                  </td>
                  <td className="p-4 text-slate-500 text-center text-xs">AI agents + scraping + QA</td>
                  <td className="p-4 text-slate-500 text-center text-xs">General headless browser</td>
                  <td className="p-4 text-slate-500 text-center text-xs">Scraping + AI agents</td>
                  <td className="p-4 text-slate-500 text-center text-xs">Computer-use enterprise</td>
                  <td className="p-4 text-slate-500 text-center text-xs">Scraping + AI agents</td>
                </tr>

                {/* Stealth */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">Stealth / fingerprinting</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 text-xs font-medium">Not needed —<br />you&apos;re the user</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Included<br />("Agent Identity")</td>
                  <td className="p-4 text-slate-400 text-center text-xs">⚠️ Not tiered<br />on pricing page</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Per-plan<br />rates</td>
                  <td className="p-4 text-slate-400 text-center text-xs">⚠️ Full stealth:<br />$2,000/mo only</td>
                  <td className="p-4 text-slate-400 text-center text-xs">⚠️ Ultra stealth:<br />enterprise only</td>
                </tr>

                {/* Proxy */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">Proxy rotation</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 text-xs font-medium">Not needed —<br />it&apos;s your account</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">1 GB/mo included,<br />extra after</td>
                  <td className="p-4 text-slate-400 text-center text-xs">6 units/MB<br />(extra)</td>
                  <td className="p-4 text-slate-400 text-center text-xs">$10/GB<br />(extra)</td>
                  <td className="p-4 text-slate-400 text-center text-xs">Geo proxy<br />included</td>
                  <td className="p-4 text-slate-400 text-center text-xs">$10/GB<br />(extra)</td>
                </tr>

                {/* CAPTCHA */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">CAPTCHA solving</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 text-xs font-medium">Not needed —<br />real users aren&apos;t bots</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Auto included</td>
                  <td className="p-4 text-slate-400 text-center text-xs">10 units/solve<br />(extra)</td>
                  <td className="p-4 text-slate-400 text-center text-xs">$4/1k solves<br />(extra)</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Included</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Included<br />(paid tiers)</td>
                </tr>

                {/* MCP */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">MCP support</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 font-semibold text-xs">✅ Native<br />npx @vibebrowser/mcp</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Official<br />mcp.browserbase.com</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ Yes</td>
                  <td className="p-4 text-slate-400 text-center text-xs">❓ Not found<br />in docs</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ SDK + MCP</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ hyperbrowser-mcp<br />npm package</td>
                </tr>

                {/* Open source */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 font-medium">Open source</td>
                  <td className="p-4 bg-purple-500/5 border-x border-purple-500/20 text-center">
                    <span className="text-emerald-400 font-semibold text-xs">✅ MCP CLI<br />open source</span>
                  </td>
                  <td className="p-4 text-slate-400 text-center text-xs">❌ SDKs only</td>
                  <td className="p-4 text-slate-400 text-center text-xs">⚠️ Partial</td>
                  <td className="p-4 text-slate-400 text-center text-xs">✅ 6.9k ⭐<br />self-hostable</td>
                  <td className="p-4 text-slate-400 text-center text-xs">❌</td>
                  <td className="p-4 text-slate-400 text-center text-xs">❌</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-slate-600 text-xs mt-4">
            Pricing verified April 2026. Sources: browserbase.com/pricing, browserless.io/pricing, steel.dev, anchorbrowser.io, hyperbrowser.ai/pricing.
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
                <Link href="/mcp">Get the extension →</Link>
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
              <p className="text-slate-500 text-sm mb-6">vs Browserbase Starter at $49/mo</p>
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

      </main>
      
      <SiteFooter />
    </div>
  )
}
