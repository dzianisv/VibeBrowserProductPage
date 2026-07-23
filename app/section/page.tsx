import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const switchReasons = [
  'Re-auth loops kill long-running agent tasks.',
  'Stealth, proxy, and CAPTCHA add-ons inflate cloud automation bills.',
  'Teams burn engineering time babysitting flaky browser infra.',
]

const vibeDifferences = [
  'Runs in your real logged-in session, not disposable stealth browsers.',
  'No stealth tax for first-party workflows you already own.',
  'Model flexibility: pick Claude, Copilot, Codex, Gemini CLI, or local options.',
]

const compatibility = ['Claude', 'GitHub Copilot', 'Codex', 'Gemini CLI', 'MCP']

const securityModel = [
  'Local-first default for sensitive workflows.',
  'Cloud is opt-in when you need remote execution.',
  'No forced vendor lock-in: keep your browser, tools, and model choice.',
]

export const metadata: Metadata = {
  title: 'Vibe vs Browserbase | Real-Session Browser Automation',
  description:
    'See why teams choose Vibe for first-party browser workflows: no stealth/proxy stack required, fewer infra headaches, and dramatically lower cost.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/section',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vibebrowser.app/section',
    siteName: 'Vibe Browser',
    title: 'Vibe vs Browserbase | Real-Session Browser Automation',
    description:
      'Why teams move browser automation to Vibe: no stealth overhead, no infra drag, no model lock-in.',
    images: [
      {
        url: '/og/home',
        width: 1200,
        height: 630,
        alt: 'Vibe vs Browserbase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe vs Browserbase | Real-Session Browser Automation',
    description:
      'First-party browser workflows run in your own accounts — no stealth stack, fewer infra headaches, lower cost.',
    images: ['/og/home'],
    creator: '@vibebrowserapp',
  },
}

export default function SectionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-white">
      <SiteNav />
      <main className="flex-1 py-12 md:py-16">
        <section className="container max-w-6xl px-4 md:px-6 mx-auto space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200 px-4 py-1.5">
              Platform Evaluator
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Why teams move browser automation to Vibe
            </h1>
            <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
              Built for automating your own authenticated workflows without stealth overhead, infra drag, or model lock-in.
            </p>
            <p className="max-w-3xl mx-auto text-sm font-medium text-slate-700">
              90% cheaper than Browserbase — first-party workflows run in your own accounts, so no stealth stack is needed.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Why teams switch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {switchReasons.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-purple-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>How Vibe differs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {vibeDifferences.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-purple-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Integrations / compatibility snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {compatibility.map((item) => (
                  <Badge key={item} variant="outline" className="text-slate-700 border-slate-300">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Security and trust model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {securityModel.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-purple-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="rounded-2xl border border-purple-200 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Try the real-session workflow now</h2>
                <p className="text-muted-foreground">
                  Install in minutes, then connect your agents through MCP.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/install?utm_source=section_vs_browserbase" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Install Extension
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/mcp">
                  <Button variant="outline">
                    Open MCP Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
