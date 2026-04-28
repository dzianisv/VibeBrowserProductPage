import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { WaitlistDialogIncognito } from '@/components/waitlist-dialog-incognito'
import { Cloud, Globe, Key, Terminal, Code, Shield, Server, Plug, Package, ArrowRight, Zap, CheckCircle2, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'VibeBrowser Cloud | Agentic Browser Infrastructure',
  description: 'Chrome-DevTools compatible MCP working in the cloud. Deploy Chrome instances globally, expose securely to your agents over HTTPS.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/cloud',
  },
}

export default function CloudPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-slate-50 selection:bg-purple-500/30">
      <SiteNav />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="container max-w-6xl px-4 md:px-6 mx-auto mb-20 text-center">
          <Badge variant="outline" className="mb-6 border-purple-500/30 bg-purple-500/10 text-purple-300 px-4 py-1.5 text-sm">
            <Cloud className="w-4 h-4 mr-2 inline" />
            Agentic Infrastructure
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            Chrome-DevTools MCP <br /> in the Cloud
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            Deploy Chrome instances on different regions securely. Use our web console, API, and open-source CLI to start instances, transfer cookies safely, and expose the browser to your AI agents over token-protected HTTPS.
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

        {/* Core Features */}
        <section className="container max-w-6xl px-4 md:px-6 mx-auto mb-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
              <Globe className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-slate-100">Global Regions</h3>
              <p className="text-slate-400">
                Deploy containerized Chrome instances in US, EU, and Asia regions. Route traffic locally to avoid captchas and geo-blocking for your agents.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
              <Shield className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-slate-100">Secure & Isolated</h3>
              <p className="text-slate-400">
                Each session is isolated. Safely transfer cookies and credentials via our API without exposing them to the agent. Access is protected by bearer tokens.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
              <Terminal className="w-10 h-10 text-pink-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-slate-100">API, CLI & Web Console</h3>
              <p className="text-slate-400">
                Full control over your instances. Use the web dashboard for visual debugging, or our open-source CLI/API for programmatic CI/CD integration.
              </p>
            </div>
          </div>
        </section>

        {/* Competitor Comparison Table */}
        <section className="container max-w-5xl px-4 md:px-6 mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">How We Compare</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              VibeBrowser Cloud is built natively on the Chrome-DevTools MCP standard, designed specifically for AI agents, and already battle-tested by OpenClaw.
            </p>
          </div>
          
          <div className="overflow-x-auto rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-800/50">
                  <th className="p-5 font-semibold text-slate-300 w-1/4">Feature</th>
                  <th className="p-5 font-bold text-purple-400 w-1/4 bg-purple-500/5 border-x border-purple-500/20">VibeBrowser Cloud</th>
                  <th className="p-5 font-semibold text-slate-400 w-1/4">Browserbase</th>
                  <th className="p-5 font-semibold text-slate-400 w-1/4">Traditional Scraping APIs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-5 text-slate-300 font-medium">Standard Compliance</td>
                  <td className="p-5 bg-purple-500/5 border-x border-purple-500/20 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 inline mr-2" /> Native Chrome-DevTools MCP
                  </td>
                  <td className="p-5 text-slate-400">Custom Puppeteer/Playwright</td>
                  <td className="p-5 text-slate-400">REST API / HTTP Proxy</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-5 text-slate-300 font-medium">Primary Use Case</td>
                  <td className="p-5 bg-purple-500/5 border-x border-purple-500/20 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 inline mr-2" /> AI Agent Reasoning (OpenClaw)
                  </td>
                  <td className="p-5 text-slate-400">Headless testing & agents</td>
                  <td className="p-5 text-slate-400">Data extraction & scraping</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-5 text-slate-300 font-medium">Credential Management</td>
                  <td className="p-5 bg-purple-500/5 border-x border-purple-500/20 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 inline mr-2" /> Secure type-in (Agent never sees password)
                  </td>
                  <td className="p-5 text-slate-400">Session injection</td>
                  <td className="p-5 text-slate-400">Basic cookie passing</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-5 text-slate-300 font-medium">Access Control</td>
                  <td className="p-5 bg-purple-500/5 border-x border-purple-500/20 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 inline mr-2" /> Token-protected HTTPS endpoint
                  </td>
                  <td className="p-5 text-slate-400">API Keys</td>
                  <td className="p-5 text-slate-400">Proxy auth</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-5 text-slate-300 font-medium">Open Source Core</td>
                  <td className="p-5 bg-purple-500/5 border-x border-purple-500/20 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 inline mr-2" /> Yes (CLI & MCP Server)
                  </td>
                  <td className="p-5 text-slate-400">SDKs only</td>
                  <td className="p-5 text-slate-400">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Built For OpenClaw */}
        <section className="container max-w-4xl px-4 md:px-6 mx-auto mb-20">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <Badge variant="outline" className="mb-4 border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
              Battle-Tested
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-slate-100">Powered by OpenClaw</h2>
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
