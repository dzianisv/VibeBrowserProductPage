"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SiteFooter } from '@/components/site-footer'
import {
Chrome,
Zap,
MessageSquare,
Plane,
CreditCard,
FileText,
Youtube,
Download,
  CheckCircle,
  Lock,
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
  Menu,
  X,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { trackCTAClick } from "@/components/google-analytics"
import { PricingSection } from "@/components/pricing-section"

export default function Component() {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const demos: Array<{
    id: string
    title: string
    subtitle: string
    description: string
    task: { label: string; description: string }
    badges: string[]
    videoSrc?: string
    posterSrc?: string
    imageSrc?: string
    icon: LucideIcon
    iconColor: string
    highlights: Array<{ icon: LucideIcon; title: string; description: string }>
  }> = [
    {
      id: 'product-demo',
      title: 'Vibe Browser in 16 Seconds',
      subtitle: 'An AI agent that works inside your real browser',
      description: 'Describe the task in plain English and Vibe drives your existing logged-in browser — navigating, reading, clicking, and filling forms — while you watch every step.',
      task: {
        label: 'Product Demo:',
        description: 'Vibe AI Agent completes a real web task end to end.'
      },
      badges: ['AI Agent', 'Browser Automation', 'Chrome Extension'],
      videoSrc: '/ph-demo-1.1.39',
      posterSrc: '/images/ph-demo-1.1.39-poster.jpg',
      icon: Zap,
      iconColor: 'text-purple-600',
      highlights: [
        { icon: Zap, title: 'One Prompt', description: 'Plain-English tasks, no scripting' },
        { icon: Brain, title: 'Real Browser', description: 'Uses your existing logged-in session' },
        { icon: Target, title: 'Visible Steps', description: 'Watch the agent work in real time' }
      ]
    },
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
      id: 'notion-api-key',
      title: 'Notion API Key in 34 Seconds',
      subtitle: 'One prompt, zero clicks, a real API key',
      description: 'Ask for a Notion API token and Vibe does the rest — opens Notion Developer Tools, switches to Personal access tokens, names the token, submits the form, and hands back a live key. No API wiring, no scraping, no separate automation tool.',
      task: {
        label: 'Developer Setup:',
        description: 'Vibe AI Agent generates a Notion personal access token end to end.'
      },
      badges: ['API Keys', 'Notion', 'Developer Tools', 'Form Filling'],
      videoSrc: '/notion-api-key-demo',
      icon: Key,
      iconColor: 'text-emerald-600',
      highlights: [
        { icon: Key, title: 'Credentials On Demand', description: 'Generates real API keys inside your own session' },
        { icon: MousePointer, title: 'Zero Clicks After The Prompt', description: 'Navigates, clicks and fills forms on its own' },
        { icon: Clock, title: 'Done In 34 Seconds', description: 'Multi-step developer setup, start to finish' }
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
      <header className="relative w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 min-w-0 shrink-0 lg:shrink">
          <img src="/vibebrowser-logo.png" alt="VibeBrowser Co-Pilot" className="w-10 h-10 object-contain shrink-0 lg:shrink" />
          <div className="hidden sm:flex flex-col leading-tight min-w-0">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
              VibeBrowser Co-Pilot
            </span>
            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              for founders & operators
            </span>
          </div>
          <div className="sm:hidden flex flex-col leading-tight shrink-0">
            <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
              VibeBrowser
            </span>
            <span className="text-[10px] font-semibold text-slate-600 whitespace-nowrap">
              for founders & operators
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex gap-6">
          <Link href="/mcp" className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            MCP
          </Link>
          <Link href="/integrations" className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Integrations
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Pricing
          </Link>
          <Link href="https://docs.vibebrowser.app" className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Docs
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Blog
          </Link>
          <Link href="/aboutus" className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            About Us
          </Link>
        </nav>
        <div className="flex items-center shrink-0">
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-header-nav"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        {/* Install CTA */}
        <a
          href="/install?utm_source=homepage_sticky_header"
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
        </div>
        <nav
          id="mobile-header-nav"
          hidden={!mobileMenuOpen}
          className="lg:hidden absolute top-full left-0 right-0 w-full bg-white border-b shadow-md"
          aria-label="Mobile navigation"
        >
            <div className="flex flex-col px-4 py-2">
              <Link href="/mcp" className="py-2 text-sm font-medium hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                MCP
              </Link>
              <Link href="/integrations" className="py-2 text-sm font-medium hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Integrations
              </Link>
              <Link href="/pricing" className="py-2 text-sm font-medium hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="https://docs.vibebrowser.app" className="py-2 text-sm font-medium hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Docs
              </Link>
              <Link href="/blog" className="py-2 text-sm font-medium hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/aboutus" className="py-2 text-sm font-medium hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>
          </div>
        </nav>
      </header>

  <main className="flex-1">
    {/* Hero Section with Hook */}
    <section id="demo" className="w-full py-10 md:py-16 lg:py-20">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="flex flex-col gap-5 text-center lg:text-left">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
            Your AI assistant for repetitive browser work
          </h1>

          <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
            For founders and solo operators: Vibe works through your inbox, CRM and web forms in your own Chrome, with your logins, while you watch.
          </p>

          <div className="flex flex-col items-center lg:items-start gap-2">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              onClick={() => {
                trackCTAClick('install_extension', 'hero_primary')
                window.open('/install?utm_source=homepage_hero_primary', '_blank')
              }}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Install Extension
            </Button>
            <button
              type="button"
              className="text-xs text-muted-foreground underline hover:text-purple-600"
              onClick={() => {
                trackCTAClick('install_extension_developer_version', 'hero_secondary')
                window.open('https://vibeextensioncdn.blob.core.windows.net/extensions/vibe-ai-copilot-latest.zip', '_blank')
              }}
            >
              Developer version (manual install)
            </button>
          </div>

          <div className="text-xs text-muted-foreground flex flex-col sm:flex-row items-center lg:items-start sm:justify-center lg:justify-start gap-1 sm:gap-3">
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> No credit card required</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Installs in 60 seconds</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Free tier included</span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center lg:justify-start items-center text-sm text-muted-foreground">
            {[
              "Works in your logged-in session",
              "Gmail + Calendar built in",
              "Use your own API key or our cloud",
            ].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-2">
                {item}
                {i < arr.length - 1 && <span className="text-gray-300 select-none">·</span>}
              </span>
            ))}
          </div>
          </div>

          <div className="w-full">
            <div className="relative w-full overflow-hidden rounded-xl shadow-2xl border border-slate-200 bg-black" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube-nocookie.com/embed/Cz6Qkskhpxk"
                title="Vibe Browser — 58 second demo"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Demo Carousel */}
          <div className="w-full lg:col-span-2">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative" style={{ paddingBottom: '62.5%' }}>
                  {demos[currentDemo].imageSrc ? (
                    <img
                      key={currentDemo}
                      className="absolute inset-0 w-full h-full object-cover"
                      src={demos[currentDemo].imageSrc}
                      alt={`Vibe AI browser automation — ${demos[currentDemo].title}`}
                    />
                  ) : (
                  <video
                    ref={videoRef}
                    key={currentDemo}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    title={`Vibe AI browser automation — ${demos[currentDemo].title}`}
                    src={`${demos[currentDemo].videoSrc}.mp4`}
                    poster={demos[currentDemo].posterSrc}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    Your browser does not support the video tag.
                  </video>
                  )}

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

          <div className="w-full max-w-5xl mx-auto mt-10 mb-10 lg:col-span-2">
            <div className="flex justify-center mb-8">
              <a href="#use-cases" className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-purple-600 transition-colors group">
                <span>See what Vibe solves</span>
                <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-purple-600" />
              </a>
            </div>
            <div id="use-cases" className="text-center mb-5">
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

            <div className="mt-6 rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50/70 to-pink-50/70 p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">#ainativecompany</p>
                  <h3 className="text-lg font-bold tracking-tight text-slate-900">From the AI-native company playbook</h3>
                </div>
                <Link href="/blog?tag=ainativecompany" className="text-sm font-semibold text-purple-700 hover:text-purple-800">
                  View all posts →
                </Link>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Link href="/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework" className="rounded-lg border border-purple-100 bg-white/90 px-3 py-2 text-sm text-slate-700 hover:border-purple-200 hover:text-purple-700">
                  Nine Agents, One Framework
                </Link>
                <Link href="/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot" className="rounded-lg border border-purple-100 bg-white/90 px-3 py-2 text-sm text-slate-700 hover:border-purple-200 hover:text-purple-700">
                  Linear Customer Support Pipeline
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Your data and your control */}
    <section className="w-full py-14 md:py-20 bg-white border-y border-slate-100">
      <div className="container max-w-6xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your data and your control
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Stays in your browser</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The agent runs as a Chrome extension in your own browser and acts in your tabs, with your existing sessions.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Saved passwords are filled from an encrypted local vault straight into the form — the AI model never sees them.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Sent to the model you choose</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your prompt and the page content the agent reads (text, page structure, screenshots when vision is used) go to the model provider you picked: Vibe cloud, your own API key, or a local model via Ollama. With a local Ollama model on its default localhost endpoint, model prompts and page content stay on your machine; error reports may still be sent.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-4">
                <MousePointer className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">You stay in control</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Vibe acts on your behalf without asking before each click, so start with low-risk tasks. Watch it work in the side panel and press Stop at any time. If it hits a CAPTCHA it tries another route, and stops the task if it stays blocked. Don&apos;t give it tasks you wouldn&apos;t let an assistant do unsupervised, like payments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* See It In Action — real engineering demo, not a scripted reel */}
    <section className="w-full py-14 md:py-20 bg-gradient-to-br from-slate-50 to-white border-y border-slate-100">
      <div className="container max-w-5xl px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="mx-auto w-full max-w-[280px] sm:max-w-xs">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-black" style={{ paddingBottom: '177.78%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/XEWpqHpsYGs"
                title="Vibe Browser Co-Pilot — real engineering demo"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 self-center lg:self-start rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-100">
              <Youtube className="w-4 h-4" /> Real engineering demo
            </span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              See it in action — no script, no cuts
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A real Vibe AI Browser Co-Pilot run, recorded end to end in a live browser session — the same agent you get after install, not a marketing mockup.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => {
                  trackCTAClick('watch_engineering_demo', 'see_it_in_action')
                  window.open('https://youtube.com/shorts/XEWpqHpsYGs', '_blank')
                }}
              >
                <Youtube className="mr-2 h-4 w-4" />
                Watch on YouTube
              </Button>
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

    {/* Integrations & Agent Ecosystem */}
    <section className="w-full py-12 md:py-16 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            For builders: MCP, skills and agent integrations
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Gmail + Calendar automation, MCP interoperability, reusable skills, and OpenClaw-inspired self-improving agents.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {["MCP", "Claude Code", "Hermes", "Remote Control", "Skills", "Self-modifying"].map((badge) => (
              <span key={badge} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                {badge}
              </span>
            ))}
          </div>
          <p className="max-w-2xl mx-auto mt-4 text-sm text-muted-foreground">
            Point Claude Code, Hermes, Cursor, Codex, or OpenClaw at your real browser with one relay URL. MCP relay for remote agents — nothing to install, no local server.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 max-w-2xl mx-auto text-left">
            <Link href="/blog/2026-05-28-why-opencode-not-claude-code" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-purple-200 hover:text-purple-700">
              Why OpenCode, not Claude Code
            </Link>
            <Link href="/blog/2026-05-27-claude-code-mobile-remote-control" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-purple-200 hover:text-purple-700">
              Claude Code Mobile Remote Control
            </Link>
          </div>
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

    {/* Final CTA / Pricing — shared with the standalone /pricing route */}
    <PricingSection />
  </main>

  {/* Shared Footer */}
  <SiteFooter />
</div>
)
}
