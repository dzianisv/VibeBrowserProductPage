"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SiteFooter } from '@/components/site-footer'
import { TypewriterEffect } from "@/components/typewriter-effect"
import {
Chrome,
Zap,
MessageSquare,
Plane,
CreditCard,
FileText,
Youtube,
Sparkles,
Download,
  CheckCircle,
  Shield,
  Lock,
  Play,
Clock,
ShoppingCart,
Calendar,
Search,
Globe,
MapPin,
Camera,
Code,
MousePointer,
Edit,
Key,
Brain,
Database,
ListTodo,
Home,
Puzzle,
Settings,
Store,
ArrowRight,
RefreshCw,
  Target,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Moon,
  Palette,
  Cloud,
  Info,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { trackCTAClick } from "@/components/google-analytics"

export default function Component() {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [installDropdownOpen, setInstallDropdownOpen] = useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setInstallDropdownOpen(false)
      }
    }
    
    if (installDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [installDropdownOpen])

  const demos = [
    {
      id: 'linkedin-warm-outreach',
      title: 'LinkedIn Warm Outreach',
      subtitle: 'AI-powered personalized outreach automation',
      description: 'Vibe Browser finds leads, reads profiles, and drafts personalized outreach — across the real web, not APIs. Works on LinkedIn, Twitter, Reddit, Gmail. Tell it who to reach. It handles the rest.',
      task: {
        label: 'Warm Outreach:',
        description: 'Vibe AI Agent analyzes profiles and sends personalized connection messages.'
      },
      badges: ['LinkedIn Outreach', 'Personalization', 'AI Networking', 'Sales Automation'],
      videoSrc: '/linkedin-warm-outreach-demo',
      icon: MessageSquare,
      iconColor: 'text-blue-600',
      highlights: [
        { icon: MessageSquare, title: 'Personalized Messages', description: 'AI crafts tailored outreach messages' },
        { icon: Brain, title: 'Profile Analysis', description: 'Understands context before reaching out' },
        { icon: Target, title: 'Higher Response Rates', description: 'Warm, relevant connection requests' }
      ]
    },
    {
      id: 'linkedin-automation',
      title: 'LinkedIn Automation',
      subtitle: 'AI-powered LinkedIn task automation',
      description: 'Watch Vibe AI Agent autonomously handle LinkedIn tasks',
      task: {
        label: 'LinkedIn Automation:',
        description: 'Vibe AI Agent autonomously manages LinkedIn interactions.'
      },
      badges: ['LinkedIn Automation', 'Professional Networking', 'AI Assistant', 'Workflow Automation'],
      videoSrc: '/linkedin-demo',
      icon: MessageSquare,
      iconColor: 'text-blue-600',
      highlights: [
        { icon: MessageSquare, title: 'Auto-Networking', description: 'Automated connection management' },
        { icon: Brain, title: 'Smart Engagement', description: 'AI-powered professional interactions' },
        { icon: Target, title: 'Task Completion', description: 'End-to-end workflow automation' }
      ]
    },
    {
      id: 'google-calendar',
      title: 'Google Calendar Integration',
      subtitle: 'Vibe AI works seamlessly with Google Calendar',
      description: 'Watch our AI agent interact with Google Calendar to manage your schedule',
      task: {
        label: 'Calendar Management:',
        description: 'Vibe AI works with Google Calendar.'
      },
      badges: ['Calendar Management', 'Google Integration', 'Smart Scheduling', 'AI Assistant'],
      videoSrc: '/google-calendar-demo',
      icon: Calendar,
      iconColor: 'text-purple-600',
      highlights: [
        { icon: Calendar, title: 'Calendar Integration', description: 'Seamlessly manage your schedule' },
        { icon: Brain, title: 'Smart Scheduling', description: 'AI-powered calendar management' },
        { icon: Target, title: 'Event Organization', description: 'Automatically organize and track events' }
      ]
    },
    {
      id: 'gmail-inbox',
      title: 'Gmail Inbox Summary',
      subtitle: 'AI-powered email analysis and summarization',
      description: 'Watch Vibe AI Agent work with your Gmail inbox to prepare short summaries',
      task: {
        label: 'Email Analysis:',
        description: 'Vibe AI Agent works with Google inbox, preparing a short summary for you.'
      },
      badges: ['Email Analysis', 'Smart Summarization', 'Inbox Management', 'AI Assistant'],
      videoSrc: '/gmail-inbox-summary-demo',
      icon: MessageSquare,
      iconColor: 'text-red-600',
      highlights: [
        { icon: MessageSquare, title: 'Email Processing', description: 'Analyze and summarize email content' },
        { icon: FileText, title: 'Smart Summaries', description: 'Get concise overviews of your inbox' },
        { icon: Target, title: 'Priority Detection', description: 'Identify important messages instantly' }
      ]
    },
    {
      id: 'github-issue-creation',
      title: 'GitHub Issue Creation',
      subtitle: 'AI-powered form filling and issue creation',
      description: 'Watch Vibe Co-Pilot assist with filling out a GitHub issue form — navigating fields, adding context, and submitting automatically.',
      task: {
        label: 'Form Filling:',
        description: 'Vibe Co-Pilot fills out the GitHub issue form and submits it for you.'
      },
      badges: ['Form Filling', 'GitHub', 'Issue Tracking', 'Developer Workflow'],
      videoSrc: '/github-ticket-demo',
      icon: Code,
      iconColor: 'text-gray-800',
      highlights: [
        { icon: Edit, title: 'Smart Form Filling', description: 'Automatically fills fields with context' },
        { icon: Code, title: 'GitHub Integration', description: 'Works directly on github.com' },
        { icon: Target, title: 'End-to-End Automation', description: 'From description to submitted issue' }
      ]
    },
    {
      id: 'market-research',
      title: 'Value Investing Research',
      subtitle: 'AI-powered market research and analysis',
      description: 'Watch Vibe AI Agent perform comprehensive market research for value investing',
      task: {
        label: 'Research Task:',
        description: 'Vibe AI Agent is doing a market research for you.'
      },
      badges: ['Market Research', 'Value Investing', 'Financial Analysis', 'AI Research'],
      videoSrc: '/value-investing-research-demo',
      icon: TrendingUp,
      iconColor: 'text-green-600',
      highlights: [
        { icon: TrendingUp, title: 'Market Analysis', description: 'Comprehensive market research and analysis' },
        { icon: Brain, title: 'Investment Insights', description: 'AI-powered value investing research' },
        { icon: Target, title: 'Data-Driven Decisions', description: 'Make informed investment choices' }
      ]
    }
  ]

  const nextDemo = () => {
    setCurrentDemo((prev) => (prev + 1) % demos.length)
  }

  const prevDemo = () => {
    setCurrentDemo((prev) => (prev - 1 + demos.length) % demos.length)
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <img src="/vibebrowser-logo.png" alt="VibeBrowser Co-Pilot" className="w-10 h-10 object-contain" />
          <div className="hidden sm:flex flex-col leading-tight min-w-0">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
              VibeBrowser Co-Pilot
            </span>
            <span className="text-xs font-semibold text-slate-600 truncate">
              for Everyone!
            </span>
          </div>
          <div className="sm:hidden flex flex-col leading-tight min-w-0">
            <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
              VibeBrowser
            </span>
            <span className="text-[10px] font-semibold text-slate-600 truncate">
              for Everyone!
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/mcp" className="text-sm font-medium hover:text-purple-600 transition-colors">
            MCP
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Pricing
          </Link>
          <Link href="https://docs.vibebrowser.app" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Docs
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Blog
          </Link>
          <Link href="/aboutus" className="text-sm font-medium hover:text-purple-600 transition-colors">
            About Us
          </Link>
        </nav>
        {/* Mobile navigation */}
        <nav className="flex md:hidden flex-wrap items-center justify-end gap-x-3 gap-y-1 text-[11px]">
          <Link href="/mcp" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            MCP
          </Link>
          <Link href="#pricing" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Pricing
          </Link>
          <Link href="/blog" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Blog
          </Link>
          <Link href="/aboutus" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            About Us
          </Link>
        </nav>
        {/* Install CTA */}
        <a
          href="https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTAClick('install_extension', 'sticky_header')}
        >
          <Button
            size="sm"
            className="ml-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white whitespace-nowrap"
          >
            <Chrome className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Install Free</span>
          </Button>
        </a>
      </header>

  <main className="flex-1">
    {/* Hero Section with Hook */}
    <section id="demo" className="w-full py-10 md:py-16 lg:py-20">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center gap-5 text-center max-w-4xl mx-auto">
          <Badge variant="secondary"
            className="px-4 py-2 text-sm font-medium bg-purple-100 text-purple-700 border-purple-200">
            <Sparkles className="w-4 h-4 mr-2" />
            Browser Automation Co-Pilot
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            AI Browser Co-Pilot that
            <span className="mt-1 block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              <span className="inline-flex w-full justify-center">
                <TypewriterEffect
                  words={[
                    "completes overcomplicated web tasks",
                    "runs in your logged-in browser",
                    "turns repetitive clicks into reusable workflows",
                  ]}
                  typingSpeed={90}
                  deletingSpeed={50}
                  pauseDuration={1900}
                  className="inline-block w-full px-2 text-center"
                />
              </span>
            </span>
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground md:text-xl leading-relaxed mb-6">
            VibeBrowser Co-Pilot runs inside your existing logged-in browser session and turns repetitive website, Gmail, and Calendar work into reusable workflows you can run again with guardrails.
          </p>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Use it directly or through <strong>MCP</strong> from Claude Code, Codex, OpenCode, and Gemini CLI while keeping model choice, sessions, and execution control on your side.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
            <div className="relative" ref={dropdownRef}>
              <div className="flex">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 h-auto rounded-r-none" 
                  onClick={() => {
                    trackCTAClick('install_extension', 'hero_primary')
                    window.open('https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado', '_blank')
                  }}
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Install Extension
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white px-3 py-6 h-auto rounded-l-none border-l border-white/20"
                  onClick={() => setInstallDropdownOpen(!installDropdownOpen)}
                >
                  <ChevronDown className={`h-5 w-5 transition-transform ${installDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>
              </div>
              {installDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                  <button
                    className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100"
                    onClick={() => {
                      trackCTAClick('install_extension_chrome_web_store', 'hero_dropdown')
                      window.open('https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado', '_blank')
                      setInstallDropdownOpen(false)
                    }}
                  >
                    <Chrome className="h-4 w-4 text-purple-600" />
                    <div>
                      <div className="font-medium text-gray-900">Chrome Web Store</div>
                      <div className="text-xs text-gray-500">Stable release</div>
                    </div>
                  </button>
                  <button
                    className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                    onClick={() => {
                      trackCTAClick('install_extension_developer_version', 'hero_dropdown')
                      window.open('https://vibeextensioncdn.blob.core.windows.net/extensions/vibe-ai-copilot-latest.zip', '_blank')
                      setInstallDropdownOpen(false)
                    }}
                  >
                    <Code className="h-4 w-4 text-orange-600" />
                    <div>
                      <div className="font-medium text-gray-900">Developer Version</div>
                      <div className="text-xs text-gray-500">Latest features, manual install</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
            <Link href="/mcp">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-2 h-auto w-64 bg-white hover:bg-slate-50 text-gray-900">
                See MCP Setup
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-5 justify-center items-center text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Runs in your logged-in session</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <span>Human-in-control guardrails</span>
            </div>
            <div className="flex items-center gap-2">
              <Puzzle className="w-4 h-4 text-orange-600" />
              <span>Secrets vault + type-in</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Gmail + Calendar built in</span>
            </div>
          </div>

          {/* Demo Carousel */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative" style={{ paddingBottom: '62.5%' }}>
                  <video
                    ref={videoRef}
                    key={currentDemo}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    src={`${demos[currentDemo].videoSrc}.mp4`}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    Your browser does not support the video tag.
                  </video>

                  <button
                    onClick={prevDemo}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-20"
                    aria-label="Previous demo"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                  </button>
                  <button
                    onClick={nextDemo}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-20"
                    aria-label="Next demo"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-800" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {demos.map((demo, index) => (
                  <button
                    key={demo.id}
                    onClick={() => setCurrentDemo(index)}
                    className={`px-4 py-2 rounded-full transition-all text-sm font-medium ${
                      currentDemo === index
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {demo.title}
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {demos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentDemo(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentDemo === index ? 'w-8 bg-purple-600' : 'w-1.5 bg-gray-300'
                    }`}
                    aria-label={`Go to demo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full max-w-5xl mx-auto mt-10 mb-10">
            <div className="text-center mb-5">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
                What Vibe actually solves
              </h2>
              <p className="text-muted-foreground">
                If work happens in your logged-in browser, Vibe can run it for you.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Repetitive web work</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Offload repetitive browser tasks while staying in control.
                  </p>
                  <ul className="text-xs text-left space-y-1 text-muted-foreground">
                    <li>• Find records across dashboards</li>
                    <li>• Fill forms without manual retyping</li>
                    <li>• Update tools and statuses</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-orange-50 to-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Overcomplicated account flows</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Let Vibe handle confusing navigation paths and setup steps.
                  </p>
                  <ul className="text-xs text-left space-y-1 text-muted-foreground">
                    <li>• Supabase API keys</li>
                    <li>• Capital One virtual cards</li>
                    <li>• Other nested settings / multi-step flows</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Repeatable team workflows</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Turn successful runs into consistent, reviewable team processes.
                  </p>
                  <ul className="text-xs text-left space-y-1 text-muted-foreground">
                    <li>• Save successful runs</li>
                    <li>• Reuse them across teammates</li>
                    <li>• Keep human approvals before final actions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-3">
                Outcome proof from real workflows
              </h3>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900 mb-1">Supabase API key setup flow</p>
                  <p className="text-xs text-slate-600">Navigates project settings, finds keys, and completes setup without manual digging.</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900 mb-1">Capital One virtual card flow</p>
                  <p className="text-xs text-slate-600">Handles nested account screens to create a virtual card through the full flow.</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900 mb-1">GitHub issue form completion</p>
                  <p className="text-xs text-slate-600">Fills issue fields, adds context, and submits from the live repository form.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/compare" className="text-sm font-semibold text-purple-700 hover:text-purple-800">
                Explore full comparison →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Why Vibe */}
    <section className="w-full py-14 md:py-20 bg-white">
      <div className="container max-w-5xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
            Why Vibe feels native
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Vibe stays close to how people already work in Chrome: same session, same tabs, clearer control.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              icon: "🪟",
              title: "Uses your current browser session",
              copy: "Run workflows in the tabs, logins, and cookies you already have.",
            },
            {
              icon: "🔒",
              title: "Local-first execution",
              copy: "Browser actions run on your device, with optional self-hosted models for stricter data control.",
            },
            {
              icon: "🔓",
              title: "Model flexibility",
              copy: "Choose cloud or local models and switch as quality, cost, or policy needs change.",
            },
            {
              icon: "🌐",
              title: "Works across real websites",
              copy: "Automate multi-step flows on dashboards, portals, and internal tools without site-specific APIs.",
            },
          ].map(({ icon, title, copy }) => (
            <article key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{icon}</span>
                <h3 className="text-sm font-bold text-slate-900">{title}</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{copy}</p>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/compare">
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              Explore full comparison →
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Backed by Research */}
    <section className="w-full py-12 md:py-16 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Backed by Research
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Vibe&apos;s architecture is validated by 2025-2026 academic research and industry standards from Google and Microsoft.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold">Privacy &amp; Security</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                &quot;Agent-to-agent communications in context-rich enterprise environments markedly increase privacy risk.&quot;
              </p>
              <div className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-2 rounded-lg inline-block">
                Microsoft Research: Privacy Risks (2024)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold">Reliability Failure</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Cloud swarms fail due to &quot;inter-agent misalignment.&quot; Hybrid agents (API + Browsing) increase success by 24%.
              </p>
              <div className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-2 rounded-lg inline-block">
                arXiv:2503.23350 &amp; ACL 2025
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <ListTodo className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold">Agentic Skills</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Research confirms that reusable &quot;agentic skills&quot; (procedural capabilities) are the key to reliable LLM agents.
              </p>
              <div className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-2 rounded-lg inline-block">
                arXiv:2602.20867 (SoK: Agentic Skills)
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          <Card className="bg-slate-50 border-slate-200 shadow-sm">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Google Chrome Team (Sept 2025)</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  <strong>&quot;Chrome DevTools (MCP) for your AI agent&quot;</strong> by Mathias Bynens &amp; Michael Hablich. Validates that AI agents need direct, local access to the browser&apos;s DOM and Network layers.
                </p>
                <Link href="https://developer.chrome.com/blog/chrome-devtools-mcp" target="_blank" className="text-[10px] text-blue-600 hover:underline">
                  Read Announcement →
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 border-slate-200 shadow-sm">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Microsoft Playwright Team</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  <strong>&quot;How to Integrate Playwright MCP&quot;</strong> confirms that semantic, accessibility-tree automation is superior to brittle vision-based cloud agents for reliability.
                </p>
                <Link href="https://techcommunity.microsoft.com/blog/azuredevcommunityblog/how-to-integrate-playwright-mcp-for-ai-driven-test-automation/4470372" target="_blank" className="text-[10px] text-blue-600 hover:underline">
                  Read Article →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>





    {/* Integrations & Agent Ecosystem */}
    <section className="w-full py-12 md:py-16 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Integrations & Agent Ecosystem
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Gmail + Calendar automation, MCP interoperability, reusable skills, and OpenClaw-inspired self-improving agents.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold mb-2">Google Workspace Native</h3>
              <p className="text-sm text-muted-foreground">
                Built-in Gmail and Calendar actions for search, draft, send, and event creation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Puzzle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">MCP Server for Agents</h3>
              <p className="text-sm text-muted-foreground">
                Use MCP tools inside Vibe agents, then expose Vibe browser sessions as MCP for other agents.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Self-Modifying Agent</h3>
              <p className="text-sm text-muted-foreground">
                OpenClaw-inspired execution loop where the agent can update its own workflow logic and skills.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <ListTodo className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Skills Library</h3>
              <p className="text-sm text-muted-foreground">
                Build reusable automation skills and let agents create new skills from successful runs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Key className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secrets Vault + Type-In</h3>
              <p className="text-sm text-muted-foreground">
                Internal password vault with a fill tool that never exposes secrets to the LLM.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">GitHub Copilot for People</h3>
              <p className="text-sm text-muted-foreground">
                Already have Copilot? Run it inside Vibe to automate routine browser tasks for non-engineering teams.
                <Link href="/copilot" className="text-indigo-700 hover:text-indigo-800 font-medium"> Learn more →</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container max-w-4xl px-4 md:px-6 mx-auto">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-3">
            Need architecture details?
          </h2>
          <p className="text-muted-foreground mb-6">
            Dive into deeper implementation details, architecture notes, and section-by-section guidance.
          </p>
          <Link href="/section">
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              Open architecture details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    {/* <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Meet the Team</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Experienced engineers and product leaders building the future of AI-native browsing
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                <img src="/images/dennis-vashchuk.jpg" alt="Dennis Vashchuk" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dzianis Vashchuk</h3>
              <p className="text-muted-foreground mb-4">Founder</p>
              <Link href="https://www.linkedin.com/in/dzianisv/" target="_blank"
                className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
              </Link>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                <img src="/images/dzmitry-dalenka.jpg" alt="Dzmitry Dalenka" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dzmitry Dalenka</h3>
              <p className="text-muted-foreground mb-4">ML Engineer</p>
              <Link href="https://www.linkedin.com/in/dzmitry-dalenka/" target="_blank"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                <img src="/images/dima-kostenich.jpg" alt="Dzmitry Kastsenich" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dzmitry Kastsenich</h3>
              <p className="text-muted-foreground mb-4 whitespace-nowrap">Software Engineer</p>
              <Link href="https://www.linkedin.com/in/dima-kostenich/" target="_blank"
                className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                <img src="/images/alexander-dzerakh.jpg" alt="Alexander Dzerakh"
                  className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Alexander Dzerakh</h3>
              <p className="text-muted-foreground mb-4">Product Consultant</p>
              <Link href="https://www.linkedin.com/in/alexander-dzerakh" target="_blank"
                className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section> */}

    {/* FAQ Section */}
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Common Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Is my data safe?
              </AccordionTrigger>
              <AccordionContent>
                You choose how data is processed. Local models run on your device. Cloud models send data to that provider&apos;s API.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                How much does Vibe Co-Pilot cost?
              </AccordionTrigger>
              <AccordionContent>
                Vibe is free to install. If you run cloud models, usage is billed by that provider, and paid Vibe plans are optional.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                How does Vibe compare to OpenClaw?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm text-muted-foreground">
                  OpenClaw is a self-hosted agent stack. Vibe is a browser co-pilot focused on completing overcomplicated web tasks in your existing browser sessions.
                </p>
                <Link href="/blog/vibe-copilot-vs-openclaw-claude-cowork-and-devtools-mcp#openclaw" className="text-sm font-medium text-primary hover:underline">
                  Explore full comparison →
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                How does Vibe compare to Claude Cowork?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm text-muted-foreground">
                  Claude browser workflows are Claude-first. Vibe is browser-first and model-flexible, so teams can choose how they run automations.
                </p>
                <Link href="/blog/vibe-copilot-vs-openclaw-claude-cowork-and-devtools-mcp#claude-cowork" className="text-sm font-medium text-primary hover:underline">
                  Explore full comparison →
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                How does Vibe compare to Chrome DevTools MCP?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm text-muted-foreground">
                  DevTools MCP is a browser debugging/control interface. Vibe packages browser task execution into a co-pilot experience for end-to-end workflows.
                </p>
                <Link href="/blog/vibe-copilot-vs-openclaw-claude-cowork-and-devtools-mcp#chrome-devtools-mcp" className="text-sm font-medium text-primary hover:underline">
                  Explore full comparison →
                </Link>
              </AccordionContent>
            </AccordionItem>
           </Accordion>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section id="pricing" className="w-full py-16 md:py-24 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center gap-8 text-center text-white">
          <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Turn browser-heavy work into reusable workflows
          </Badge>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl max-w-4xl">
            Move recurring browser work off your team’s plate
          </h2>
          
          <p className="max-w-2xl text-xl opacity-90 mb-4">
            Join early teams using Vibe to reduce repetitive work across websites, Gmail, and Calendar
          </p>

          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-slate-100 text-xl px-12 py-8 font-bold shadow-2xl"
            onClick={() => {
              trackCTAClick('install_extension', 'pricing_primary')
              window.open('https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado', '_blank')
            }}
          >
            Install Extension
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <Link href="https://billing.stripe.com/p/login/9B6bJ06iPcwL9VUa4yabK00" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/90 hover:text-white underline underline-offset-4">
            Already subscribed? Manage billing
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Free tier with cloud AI</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Setup in 60 seconds</span>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20 w-full max-w-6xl">
            <h3 className="text-2xl font-bold mb-6">Simple Pricing</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <h4 className="text-xl font-bold mb-2">Free</h4>
                <p className="text-sm opacity-90 mb-4">Perfect for getting started</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Unlimited local AI (Gemini Nano or BYOM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>GPT-5-mini (quick model)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>GPT-OSS-120B (quick model)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>All core features</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left border-2 border-white/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-bold">Pro</h4>
                  <Badge className="bg-white/20 text-white border-white/30">Popular</Badge>
                </div>
                <p className="text-sm opacity-90 mb-1"><span className="text-2xl font-bold">$25</span>/month</p>
                <p className="text-xs opacity-75 mb-4">Advanced AI models</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>GPT-5.1</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>GPT-5.2-codex (medium/high reasoning)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Grok-4-fast (non-reasoning)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>DeepSeek-V3.2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <h4 className="text-xl font-bold mb-2">Max</h4>
                <p className="text-sm opacity-90 mb-1"><span className="text-2xl font-bold">$99</span>/month</p>
                <p className="text-xs opacity-75 mb-4">Premium AI with reasoning</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>GPT-5.2 (latest)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>GPT-5.2-codex (xhigh reasoning)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Grok-4 (full reasoning)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Grok-4-fast-reasoning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>DeepSeek-R1</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  {/* Shared Footer */}
  <SiteFooter />
</div>
)
}
