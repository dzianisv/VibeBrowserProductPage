"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Users,
  Share2,
  BarChart3,
  Settings,
  CheckCircle,
  XCircle,
  ArrowRight,
  Shield,
  Brain,
  Target,
  Layers,
  UserPlus,
  FolderSync,
  Activity,
  CreditCard,
  Sparkles,
  ChevronRight,
} from "lucide-react"

// Rotating words for the hero animation
const ROTATING_WORDS = [
  "Sales",
  "Research",
  "Operations",
  "Marketing",
  "Recruiting",
  "Support",
]

// Typewriter hook with delete and retype animation
function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState(words[0])
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false)
        setIsDeleting(true)
        return
      }

      if (isDeleting) {
        if (displayText === "") {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        } else {
          setDisplayText(displayText.slice(0, -1))
        }
      } else {
        const nextWord = words[wordIndex]
        if (displayText === nextWord) {
          setIsPaused(true)
        } else {
          setDisplayText(nextWord.slice(0, displayText.length + 1))
        }
      }
    }, isPaused ? pauseTime : isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, wordIndex, isDeleting, isPaused, words, typingSpeed, deletingSpeed, pauseTime])

  return displayText
}

export default function TeamsPage() {
  const rotatingWord = useTypewriter(ROTATING_WORDS, 100, 60, 2500)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/vibebrowser-logo.png" alt="Vibe AI Browser" className="w-9 h-9 object-contain" />
          <span className="text-lg font-semibold text-slate-900">
            Vibe Browser<span className="text-slate-500"> for Teams</span>
          </span>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
          <a href="#use-cases" className="text-slate-600 hover:text-slate-900 transition-colors">Use Cases</a>
          <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
          <a href="#faq" className="text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
        </nav>
        <div className="flex gap-3 items-center">
          <Link href="https://docs.vibebrowser.app/getting-started/extension" className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors hidden sm:block">
            Install Free →
          </Link>
          <WaitlistDialog>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full">
              Request Demo
            </Button>
          </WaitlistDialog>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 border-blue-200">
                <Users className="w-4 h-4 mr-2" />
                Built for Teams of 5-50
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-slate-900">
                  AI Browser Automation for{" "}
                  <br className="hidden sm:block" />
                  <span className="inline-block min-w-[140px] sm:min-w-[180px] md:min-w-[220px] text-left">
                    <span className="text-blue-600">{rotatingWord}</span>
                    <span className="animate-pulse text-blue-600">|</span>
                  </span>
                  {" "}Teams
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Build workflows once, share with your whole team. Track productivity. Control AI models centrally.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <WaitlistDialog>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-6 h-auto rounded-full">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Request Team Demo
                  </Button>
                </WaitlistDialog>
                <Link href="https://docs.vibebrowser.app/getting-started/extension" target="_blank">
                  <Button variant="outline" size="lg" className="px-8 py-6 h-auto rounded-full border-purple-300 bg-white hover:bg-purple-50 text-purple-700">
                    Install Free Extension
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500 mt-8 pt-8 border-t border-slate-200">
                <span className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-blue-600" />
                  Shared Skills Library
                </span>
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  Team Dashboard
                </span>
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-600" />
                  Centralized Control
                </span>
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  Unified Billing
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="w-full py-16 md:py-24 bg-slate-100">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Teams waste time rebuilding the same automations
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Every team member creates their own workflows. Knowledge stays siloed. No visibility into what's working.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Problem Card */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Without Vibe Teams</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-600">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Each person builds workflows from scratch</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-600">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Best practices stay with top performers</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-600">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>No visibility into team AI usage</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-600">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Individual billing, expense reports</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-600">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>API keys scattered across team members</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Solution Card */}
              <Card className="bg-white border-blue-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">With Vibe Teams</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span>Build once, share with the whole team</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span>Team workflow library with best practices</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span>Dashboard shows team activity & wins</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span>One invoice, easy seat management</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span>Admin controls API keys & model access</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 bg-white">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Everything your team needs
              </h2>
              <p className="text-slate-600">
                All the power of Vibe Browser, plus collaboration features built for teams
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Shared Skills */}
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <FolderSync className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Shared Skills Library</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Build a workflow once, deploy to your whole team. Curate your best automations in a team library.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-500" />
                      One-click share to team
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-500" />
                      Version control for workflows
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-500" />
                      Usage analytics per skill
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Activity Dashboard */}
              <Card className="bg-gradient-to-br from-green-50 to-white border-green-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Team Activity Dashboard</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    See what automations your team is running. Track productivity gains. Identify top performers.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-green-500" />
                      Real-time activity feed
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-green-500" />
                      Time saved metrics
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-green-500" />
                      Team leaderboards
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Admin Controls */}
              <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Centralized Admin</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Control which AI models your team can use. Manage API keys centrally. Easy seat management.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-purple-500" />
                      Model allowlist
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-purple-500" />
                      Centralized API keys
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-purple-500" />
                      Add/remove seats instantly
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Onboarding */}
              <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <UserPlus className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Team Onboarding</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    New hires get your best workflows on day one. Push recommended skills to new team members.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-orange-500" />
                      Starter skill bundles
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-orange-500" />
                      Role-based defaults
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-orange-500" />
                      Adoption tracking
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Billing */}
              <Card className="bg-gradient-to-br from-pink-50 to-white border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Unified Billing</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    One invoice for the whole team. No more expense reports. Volume discounts as you grow.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-pink-500" />
                      Single monthly invoice
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-pink-500" />
                      Usage breakdown by member
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-pink-500" />
                      Volume discounts 10+ seats
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Privacy */}
              <Card className="bg-gradient-to-br from-slate-50 to-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Privacy-First</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Same local AI option as individual. Your team's data stays on their devices.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                      Gemini Nano (100% local)
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                      No data leaves devices
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                      Model-agnostic
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="w-full py-16 md:py-24 bg-slate-50">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Built for these teams
              </h2>
              <p className="text-slate-600">
                Any team doing repetitive web work can benefit from shared AI workflows
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                    <h3 className="font-bold text-lg text-slate-900">Financial Advisors</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Automate Morningstar research inside Schwab with advisor-ready summaries.
                  </p>
                  <ul className="text-xs space-y-1 text-slate-500">
                    <li>• Fund comparison tables</li>
                    <li>• Risk and fee analysis</li>
                    <li>• Client-ready memos</li>
                  </ul>
                  <Link href="/use-cases/financial-advisor-morningstar-schwab" className="mt-4 inline-flex text-xs font-semibold text-blue-700 hover:text-blue-800">
                    Read finance story →
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-slate-600" />
                    <h3 className="font-bold text-lg text-slate-900">Legal Teams</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Keep research private inside self-hosted case databases.
                  </p>
                  <ul className="text-xs space-y-1 text-slate-500">
                    <li>• Redaction-safe summaries</li>
                    <li>• On-prem data controls</li>
                    <li>• Audit-ready workflows</li>
                  </ul>
                  <Link href="/use-cases/privacy-first-legal-research" className="mt-4 inline-flex text-xs font-semibold text-slate-700 hover:text-slate-800">
                    Read legal story →
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                    <h3 className="font-bold text-lg text-slate-900">Recruiting Teams</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Automate LinkedIn sourcing with skills-based messaging.
                  </p>
                  <ul className="text-xs space-y-1 text-slate-500">
                    <li>• Candidate matching</li>
                    <li>• Personalized outreach</li>
                    <li>• CRM status updates</li>
                  </ul>
                  <Link href="/use-cases/recruiter-linkedin-automation" className="mt-4 inline-flex text-xs font-semibold text-purple-700 hover:text-purple-800">
                    Read recruiting story →
                  </Link>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 text-center">
              <Link href="/use-cases" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
                Explore all use cases →
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="w-full py-16 md:py-24 bg-white">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Simple per-seat pricing
              </h2>
              <p className="text-slate-600">
                Start with a free trial. Scale as your team grows.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Team Starter */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Team Starter</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-slate-900">$20</span>
                    <span className="text-slate-500">/seat/month</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-6">
                    For small teams getting started with shared workflows.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Shared skills library
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Basic team dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Unified billing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      3-50 seats
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Email support
                    </li>
                  </ul>
                  <WaitlistDialog>
                    <Button variant="outline" className="w-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700">
                      Request Demo
                    </Button>
                  </WaitlistDialog>
                </CardContent>
              </Card>

              {/* Team Pro */}
              <Card className="bg-white border-blue-300 shadow-lg relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                </div>
                <CardContent className="p-6 pt-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Team Pro</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-slate-900">$50</span>
                    <span className="text-slate-500">/seat/month</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-6">
                    Full visibility and control for growing teams.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Everything in Starter
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Advanced activity dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Model access controls
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Centralized API key management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Premium AI models included
                    </li>
                  </ul>
                  <WaitlistDialog>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Request Demo
                    </Button>
                  </WaitlistDialog>
                </CardContent>
              </Card>

              {/* Enterprise */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Enterprise</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-slate-900">Custom</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-6">
                    For organizations with compliance requirements.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Everything in Team Pro
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      SSO / SAML
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Audit logs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Self-hosted / TEE options
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Dedicated account manager
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Custom integrations
                    </li>
                  </ul>
                  <Link href="/v2">
                    <Button variant="outline" className="w-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700">
                      Learn About Enterprise
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-sm text-slate-500 mt-8">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </section>

        {/* Individual CTA Section */}
        <section className="w-full py-16 md:py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-purple-100 text-purple-700 border-purple-200 mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Free for Individual Use
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Just need it for yourself?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Install Vibe Browser as a free Chrome extension and start automating immediately. No team features required.
              </p>
            </div>

            <Card className="bg-white border-purple-200 shadow-lg max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      Individual Plan Includes
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>Unlimited local AI (Gemini Nano)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>Works on any website</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>Bring your own API keys</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>Personal workflow automation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center gap-4">
                    <Link href="https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado" target="_blank">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3">
                        <Shield className="mr-2 h-4 w-4" />
                        Install from Chrome Store
                      </Button>
                    </Link>
                    <Link href="https://docs.vibebrowser.app/getting-started/extension" target="_blank">
                      <Button variant="outline" className="w-full border-purple-300 bg-white hover:bg-purple-50 text-purple-700">
                        View Installation Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <p className="text-xs text-slate-500 text-center">
                      Or read the <Link href="https://docs.vibebrowser.app" target="_blank" className="text-purple-600 hover:underline">full documentation</Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="w-full py-16 md:py-24 bg-slate-50">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently asked questions
            </h2>

            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-1" className="border border-slate-200 bg-white rounded-lg px-4">
                <AccordionTrigger className="text-slate-900 hover:no-underline">
                  How is Teams different from individual accounts?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Teams adds collaboration features: shared skills library, team activity dashboard, centralized admin controls, and unified billing. Individual accounts are great for personal use, but Teams helps you scale automation across your organization.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-slate-200 bg-white rounded-lg px-4">
                <AccordionTrigger className="text-slate-900 hover:no-underline">
                  Can team members still use their own workflows?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Yes! Team members keep their personal workspace and can create private workflows. They also get access to the team's shared library. Admins can choose which workflows to share with the team.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-slate-200 bg-white rounded-lg px-4">
                <AccordionTrigger className="text-slate-900 hover:no-underline">
                  What AI models can my team use?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Vibe is model-agnostic. Your team can use GPT, Claude, Gemini, Grok, DeepSeek, or local models like Gemini Nano. On Team Pro, admins can control which models are available to the team.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-slate-200 bg-white rounded-lg px-4">
                <AccordionTrigger className="text-slate-900 hover:no-underline">
                  Is data shared between team members?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  No. Each team member's browsing data stays private on their own device. Only workflow definitions (skills) are shared—not the data processed through them. With local AI (Gemini Nano), data never leaves the device at all.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-slate-200 bg-white rounded-lg px-4">
                <AccordionTrigger className="text-slate-900 hover:no-underline">
                  Can I try it before committing?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Yes! We offer a 14-day free trial for all team plans. You can also try the individual product for free at vibebrowser.app to see how the core automation works.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border border-slate-200 bg-white rounded-lg px-4">
                <AccordionTrigger className="text-slate-900 hover:no-underline">
                  What's the minimum team size?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Team plans start at 3 seats. For teams of 1-2, we recommend individual Pro accounts. For teams larger than 50 or with compliance requirements, check out our Enterprise plan.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to scale your team with AI?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Join teams at startups, agencies, and SMBs who are automating repetitive web work with Vibe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WaitlistDialog>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-8 py-6 h-auto rounded-full">
                  Request Team Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </WaitlistDialog>
              <Link href="https://docs.vibebrowser.app/getting-started/extension" target="_blank">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent hover:bg-white/10 text-white font-medium px-8 py-6 h-auto rounded-full">
                  Install Individual Free
                </Button>
              </Link>
            </div>
            <p className="text-xs text-blue-200 mt-8">
              Questions? <a href="mailto:teams@vibebrowser.app" className="text-white hover:underline">teams@vibebrowser.app</a>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white">
        <div className="container max-w-5xl px-4 md:px-6 py-8 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <img src="/vibebrowser-logo.png" alt="Vibe AI Browser" className="w-6 h-6 object-contain" />
              <span>Vibe Technologies</span>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
              <Link href="https://docs.vibebrowser.app/getting-started/extension" className="hover:text-purple-600 text-purple-500 transition-colors">Install Free</Link>
              <Link href="https://docs.vibebrowser.app" className="hover:text-slate-900 transition-colors">Docs</Link>
              <Link href="/v2" className="hover:text-slate-900 transition-colors">Enterprise</Link>
              <Link href="https://t.me/VibeBrowser" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Telegram</Link>
              <a href="mailto:teams@vibebrowser.app" className="hover:text-slate-900 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
