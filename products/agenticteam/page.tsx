"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import {
  Zap,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Shield,
  Lock,
  Eye,
  Target,
  Brain,
  ArrowRight,
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Globe,
  Code,
  BarChart3,
  Layers,
  RefreshCw,
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

// SEO metadata for this page
export const metadata: Metadata = {
  title: "Agentic Team - AI-Powered Outreach for Agencies | Vibe Browser",
  description: "Run an AI-powered outreach agency at software margins. Privacy-first SDR automation with Vibe Browser. White-label ready. Works on LinkedIn, Twitter, Reddit, Gmail.",
  keywords: [
    "AI SDR",
    "AI sales automation",
    "AI outreach agency",
    "AI-native agency",
    "automated lead generation",
    "LinkedIn automation",
    "email outreach AI",
    "white-label SDR",
    "privacy-first sales",
    "AI BDR",
    "sales automation platform",
  ],
  openGraph: {
    title: "Agentic Team - AI-Powered Outreach for Agencies",
    description: "Run an AI-powered outreach agency at software margins. Privacy-first SDR automation with Vibe Browser.",
    url: "https://agenticteam.vibebrowser.app",
    siteName: "Agentic Team by Vibe Browser",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Team - AI-Powered Outreach for Agencies",
    description: "Run an AI-powered outreach agency at software margins. Privacy-first SDR automation with Vibe Browser.",
  },
}

export default function AgenticTeamPage() {
  React.useEffect(() => {
    // Structured data for SEO
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Agentic Team by Vibe Browser",
      "applicationCategory": "BusinessApplication",
      "description": "AI-powered outreach automation platform for agencies. Run an AI sales team at software margins with privacy-first architecture.",
      "url": "https://agenticteam.vibebrowser.app",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/PreOrder"
      },
      "featureList": [
        "AI-powered SDR automation",
        "Privacy-first architecture",
        "White-label ready",
        "Multi-channel outreach",
        "LinkedIn, Twitter, Reddit, Gmail",
        "Human-in-the-loop approval",
        "Model-agnostic AI"
      ]
    })
    document.head.appendChild(script)
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/vibebrowser-logo.png" alt="Agentic Team" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent hidden sm:inline">
            Agentic Team
          </span>
          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
            by Vibe Browser
          </Badge>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="#problem" className="text-sm font-medium hover:text-orange-600 transition-colors">
            Problem
          </Link>
          <Link href="#solution" className="text-sm font-medium hover:text-orange-600 transition-colors">
            Solution
          </Link>
          <Link href="#comparison" className="text-sm font-medium hover:text-orange-600 transition-colors">
            Compare
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-orange-600 transition-colors">
            Pricing
          </Link>
        </nav>
        <WaitlistDialog>
          <Button size="sm" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
            Get Early Access
          </Button>
        </WaitlistDialog>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-6 text-center max-w-5xl mx-auto">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-orange-100 text-orange-700 border-orange-200">
                <Building2 className="w-4 h-4 mr-2" />
                YC RFS 2026: AI-Native Agencies
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Run an AI Outreach Agency at
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"> Software Margins</span>
              </h1>

              <p className="max-w-3xl text-lg text-muted-foreground md:text-xl leading-relaxed mb-8">
                Agencies can't scale without headcount. Cloud SDR tools have compliance issues. <strong>Agentic Team</strong> gives you the AI backbone to run a privacy-first outreach operation with 80%+ margins.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
                <WaitlistDialog>
                  <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-lg px-8 py-6 h-auto">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Join the Waitlist
                  </Button>
                </WaitlistDialog>
                <Link href="https://www.vibebrowser.app" target="_blank">
                  <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-2 h-auto bg-white hover:bg-slate-50">
                    Learn About Vibe Browser
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-6 justify-center items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>Privacy-first (local AI)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>White-label ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-600" />
                  <span>Human approval workflow</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="w-full py-16 md:py-24 bg-slate-50">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="px-4 py-2 mb-4 bg-red-100 text-red-700 border-red-200">
                The Problem
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Agencies Are Stuck Between Two Bad Options
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Neither scaling with headcount nor using cloud SDR tools works for modern agencies
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 border-red-200 shadow-lg bg-gradient-to-br from-red-50 to-white">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Option A: Hire More SDRs</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">x</span>
                      <span>$60-80K per SDR + management overhead</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">x</span>
                      <span>Training time, turnover, quality variance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">x</span>
                      <span>Linear scaling = shrinking margins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">x</span>
                      <span>Hard to maintain quality at scale</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 shadow-lg bg-gradient-to-br from-red-50 to-white">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Option B: Cloud SDR Tools</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">x</span>
                      <span>Client data sent to third-party servers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">x</span>
                      <span>Compliance nightmares (GDPR, CCPA, SOC2)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">x</span>
                      <span>Vendor lock-in, proprietary AI models</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">x</span>
                      <span>Enterprise clients won't approve</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="w-full py-16 md:py-24 bg-white">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="px-4 py-2 mb-4 bg-green-100 text-green-700 border-green-200">
                The Solution
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Agentic Team: AI Backbone for Privacy-First Agencies
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Run autonomous outreach across LinkedIn, Twitter, Reddit, and Gmail—with AI that runs locally on your device
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Privacy-First Architecture</h3>
                  <p className="text-sm text-muted-foreground">
                    AI runs 100% locally with Gemini Nano. Client data never leaves their device. Enterprise-ready from day one.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Multi-Channel Outreach</h3>
                  <p className="text-sm text-muted-foreground">
                    Works on LinkedIn, Twitter, Reddit, Gmail. No APIs needed. Operates on the real web like a human SDR.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Human-in-the-Loop</h3>
                  <p className="text-sm text-muted-foreground">
                    Every message drafted, reviewed, and approved before sending. Quality control without the bottleneck.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Layers className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">White-Label Ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Deploy under your agency brand. Your clients see your brand, not ours. Full customization available.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                    <Code className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Model Agnostic</h3>
                  <p className="text-sm text-muted-foreground">
                    Use GPT, Claude, Gemini, Grok, DeepSeek, or local models. Switch anytime. No vendor lock-in.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">80%+ Margins</h3>
                  <p className="text-sm text-muted-foreground">
                    Software-like unit economics. AI handles the volume, you handle the strategy. Scale without headcount.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Workflow Visualization */}
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-orange-900 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6 text-center">How It Works for Agencies</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-1">Client Brief</h4>
                  <p className="text-sm text-white/70">Define ICP, messaging, channels</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-1">AI Researches</h4>
                  <p className="text-sm text-white/70">Finds leads, reads profiles, drafts messages</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-1">You Approve</h4>
                  <p className="text-sm text-white/70">Review batch, edit if needed, approve</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <h4 className="font-semibold mb-1">AI Executes</h4>
                  <p className="text-sm text-white/70">Sends messages, tracks responses</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="w-full py-16 md:py-24 bg-slate-50">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                How We Compare
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Built for agencies, not just sales teams
              </p>
            </div>

            <div className="max-w-5xl mx-auto overflow-x-auto">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-orange-50 to-red-50">
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold text-orange-600">
                        <div className="flex items-center justify-center gap-2">
                          <span>Agentic Team</span>
                          <Badge className="bg-orange-600 text-white">You</Badge>
                        </div>
                      </th>
                      <th className="px-4 py-4 text-center text-sm font-semibold text-gray-900">11x.ai</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold text-gray-900">Artisan.co</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold text-gray-900">Manus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 bg-orange-50/30">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">Local/Private AI</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-600 mt-1">Gemini Nano</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-red-600 text-xl">x</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-red-600 text-xl">x</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-red-600 text-xl">x</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">White-Label Ready</td>
                      <td className="px-4 py-4 text-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-red-600 text-xl">x</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-red-600 text-xl">x</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-red-600 text-xl">x</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 bg-orange-50/30">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">Model Choice</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-600 mt-1">Any model</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-gray-500">Proprietary</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-gray-500">Proprietary</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-gray-500">Manus only</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">Human Approval Flow</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-600 mt-1">Before send</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-gray-500">Limited</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-gray-500">Limited</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-gray-500">After action</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 bg-orange-50/30">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">Multi-Channel</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-600 mt-1">LinkedIn, Twitter, Reddit, Gmail</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-gray-500">Email, LinkedIn</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-gray-500">Email, LinkedIn</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-gray-500">Web only</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">Pricing Model</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-600 mt-1">Flat rate + free tier</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-gray-500">Per-seat enterprise</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-gray-500">Per-seat enterprise</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs text-gray-500">Usage-based</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Built for These Agencies
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Linkedin className="w-8 h-8 text-blue-600" />
                    <h3 className="font-bold text-lg">LinkedIn Outreach Agencies</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Scale LinkedIn connection campaigns without hiring. AI personalizes each message based on profile analysis.
                  </p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>- Profile research and personalization</li>
                    <li>- Connection request drafting</li>
                    <li>- Follow-up sequence automation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-8 h-8 text-red-600" />
                    <h3 className="font-bold text-lg">Cold Email Agencies</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    High-volume email campaigns with personal touch. AI researches prospects and crafts relevant openers.
                  </p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>- Prospect research automation</li>
                    <li>- Personalized email drafting</li>
                    <li>- A/B testing at scale</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                    <h3 className="font-bold text-lg">Full-Service SDR Shops</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Multi-channel outreach coordination. Unified workflow across LinkedIn, email, Twitter, and more.
                  </p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>- Cross-channel campaign coordination</li>
                    <li>- Unified reporting dashboard</li>
                    <li>- White-label client portals</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-16 md:py-24 bg-gradient-to-r from-orange-600 to-red-600">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center text-white">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <DollarSign className="w-4 h-4 mr-2" />
                Agency Pricing
              </Badge>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl max-w-4xl">
                Pricing That Makes Sense for Agencies
              </h2>

              <p className="max-w-2xl text-xl opacity-90 mb-4">
                Free to start. Scale as you grow. Keep your margins.
              </p>

              <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                  <h4 className="text-xl font-bold mb-2">Starter</h4>
                  <p className="text-3xl font-bold mb-1">Free</p>
                  <p className="text-sm opacity-75 mb-4">Perfect for testing</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Unlimited local AI (Gemini Nano)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>LinkedIn + Gmail automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Human approval workflow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>1 workspace</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left border-2 border-white/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold">Agency</h4>
                    <Badge className="bg-white/20 text-white border-white/30">Popular</Badge>
                  </div>
                  <p className="text-sm opacity-90 mb-1"><span className="text-3xl font-bold">$199</span>/month</p>
                  <p className="text-sm opacity-75 mb-4">Per agency seat</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Everything in Starter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Premium AI models (GPT-5, Claude)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Multi-channel (Twitter, Reddit)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Unlimited workspaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                  <h4 className="text-xl font-bold mb-2">White-Label</h4>
                  <p className="text-3xl font-bold mb-1">Custom</p>
                  <p className="text-sm opacity-75 mb-4">Your brand, your platform</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Everything in Agency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Full white-label branding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Client portal access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Dedicated success manager</span>
                    </li>
                  </ul>
                </div>
              </div>

              <WaitlistDialog>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-slate-100 text-xl px-12 py-8 font-bold shadow-2xl">
                  Get Early Access
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </WaitlistDialog>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Questions from Agency Owners
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    How does this work with my clients' LinkedIn accounts?
                  </AccordionTrigger>
                  <AccordionContent>
                    Agentic Team runs as a Chrome extension on your or your client's browser. It automates actions on their logged-in session, so there's no need to share credentials or use third-party access. The AI operates on the real web, just like a human would.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Is this compliant with LinkedIn's Terms of Service?
                  </AccordionTrigger>
                  <AccordionContent>
                    We design Agentic Team for responsible use. The human approval workflow ensures every message is reviewed before sending. We recommend staying within LinkedIn's daily limits and using personalized, non-spammy messages. Always consult LinkedIn's current TOS for your specific use case.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Can my clients see what messages are being sent?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. With the white-label option, you can give clients access to a portal where they see drafted messages, approve/edit them, and track campaign performance. Full transparency builds trust.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    How is this different from 11x or Artisan?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">Key differences:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Privacy:</strong> Local AI means client data never leaves their device. 11x/Artisan send data to their cloud.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>White-label:</strong> We're built for agencies to resell. They're built for end customers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Model choice:</strong> Use any AI model. They lock you into their proprietary AI.</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-16 bg-slate-900">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Scale Your Agency Without Headcount?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Join the waitlist for early access and agency pricing.
            </p>
            <WaitlistDialog>
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-xl px-12 py-6">
                Get Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </WaitlistDialog>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white">
        <div className="container max-w-7xl px-4 md:px-6 py-12 mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src="/vibebrowser-logo.png" alt="Agentic Team" className="w-8 h-8 object-contain" />
                <span className="font-bold text-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Agentic Team
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered outreach for agencies with software margins.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Product</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#problem" className="text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                  Problem
                </Link>
                <Link href="#solution" className="text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                  Solution
                </Link>
                <Link href="#comparison" className="text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                  Compare
                </Link>
                <Link href="#pricing" className="text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                  Pricing
                </Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Powered By</h3>
              <nav className="flex flex-col gap-2">
                <Link href="https://www.vibebrowser.app" className="text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                  Vibe Browser
                </Link>
                <Link href="https://docs.vibebrowser.app" className="text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                  Documentation
                </Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Legal</h3>
              <nav className="flex flex-col gap-2">
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                  Terms of Service
                </Link>
              </nav>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-xs text-center text-muted-foreground">
              (c) 2025 Agentic Team by Vibe Browser. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
