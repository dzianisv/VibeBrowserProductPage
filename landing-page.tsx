"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WaitlistDialog } from "./components/waitlist-dialog"
import { TypewriterEffect } from "./components/typewriter-effect"
import { SiteFooter } from '@/components/site-footer'
import { HorizontalRoadmap } from "./components/horizontal-roadmap"
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
Eye,
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
Store,
ArrowRight,
RefreshCw,
Target,
Lightbulb,
ChevronLeft,
ChevronRight,
ChevronDown,
BookOpen,
TrendingUp,
Moon,
Palette,
Cloud,
Info,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

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
        <div className="flex items-center gap-2">
          <img src="/vibebrowser-logo.png" alt="Vibe Co-Pilot" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hidden sm:inline">
            Vibe Co-Pilot
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent sm:hidden">
            Vibe
          </span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/teams" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Co-Pilot for Teams
          </Link>
          <Link href="/enterprise" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Co-Pilot for Enterprise
          </Link>
          <Link href="/mcp" className="text-sm font-medium hover:text-purple-600 transition-colors">
            MCP
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="#pricing" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Pricing
          </Link>
          <Link href="https://docs.vibebrowser.app" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Docs
          </Link>
          <Link href="/aboutus" className="text-sm font-medium hover:text-purple-600 transition-colors">
            About Us
          </Link>
        </nav>
        {/* Mobile navigation */}
        <nav className="flex md:hidden flex-wrap items-center justify-end gap-x-3 gap-y-1 text-[11px]">
   
          <Link href="/teams" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Co-Pilot for Teams
          </Link>
          <Link href="/enterprise" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Co-Pilot for Enterprise
          </Link>
          <Link href="/mcp" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            MCP
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="#pricing" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Pricing
          </Link>
          <Link href="/aboutus" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            About Us
          </Link>
        </nav>
      </header>

  <main className="flex-1">
    {/* Hero Section with Hook */}
    <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center gap-6 text-center max-w-5xl mx-auto">
          <Badge variant="secondary"
            className="px-4 py-2 text-sm font-medium bg-purple-100 text-purple-700 border-purple-200">
            <Sparkles className="w-4 h-4 mr-2" />
            Agentic Browser
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            The Web Agent That
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> <TypewriterEffect words={["Acts", "Researches", "Automates", "Invests", "Recruits", "Outreaches"]} typingSpeed={90} deletingSpeed={50} pauseDuration={2200} /></span>
            <br />
            <span className="text-muted-foreground text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-normal">Not Just Answers</span>
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground md:text-xl leading-relaxed mb-8">
            Autonomous browser automation that works with <strong>any AI model</strong>, runs <strong>fully private</strong> on your device, and breaks free from vendor lock-in. Tell Vibe what you need—it researches, compares, and executes complex workflows across multiple sites.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
            <div className="relative" ref={dropdownRef}>
              <div className="flex">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 h-auto rounded-r-none" 
                  onClick={() => window.open('https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado', '_blank')}
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
            <WaitlistDialog>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-2 h-auto w-64 bg-white hover:bg-slate-50 text-gray-900">
                Subscribe!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </WaitlistDialog>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6 justify-center items-center text-sm text-muted-foreground mb-12">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>No APIs needed</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-600" />
              <span>Runs locally</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <span>You stay in control</span>
            </div>
          </div>

            {/* Use Cases - inline */}
            <div className="w-full max-w-5xl mx-auto mb-12">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
                  Use Cases: real workflows in production
                </h2>
                <p className="text-muted-foreground">
                  Financial advisors, legal teams, and recruiters rely on Vibe every day
                </p>
              </div>

            <div className="grid gap-4 md:grid-cols-3">
              {/* Primary Use Case: Outreach */}
              <Card className="border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Badge className="bg-purple-600 text-white text-xs">Most Popular</Badge>
                </div>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Recruiter Automation</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Skills-based LinkedIn outreach you approve
                  </p>
                  <ul className="text-xs text-left space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Skill-matched candidate sourcing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Personalized messages with context</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>CRM updates and follow-ups</span>
                    </li>
                  </ul>
                  <Link
                    href="/lawyers"
                    className="mt-4 inline-flex text-xs font-semibold text-purple-700 hover:text-purple-800"
                  >
                    Read recruiter story →
                  </Link>
                </CardContent>
              </Card>

              {/* Use Case 2: Research */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Advisor Research</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Morningstar data inside Schwab, summarized
                  </p>
                  <ul className="text-xs text-left space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Morningstar fee + risk extraction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Comparison tables for clients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Advisor-ready recommendation memos</span>
                    </li>
                  </ul>
                  <Link
                    href="/people"
                    className="mt-4 inline-flex text-xs font-semibold text-green-700 hover:text-green-800"
                  >
                    Read advisor story →
                  </Link>
                </CardContent>
              </Card>

              {/* Use Case 3: Transactions */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Private Legal Research</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    On-prem CRM workflows with redaction
                  </p>
                  <ul className="text-xs text-left space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Search self-hosted case databases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Summarize precedent with citations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Keep data private and auditable</span>
                    </li>
                  </ul>
                  <Link
                    href="/recruiters"
                    className="mt-4 inline-flex text-xs font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Read legal story →
                  </Link>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 text-center">
              <Link href="/lawyers" className="text-sm font-semibold text-purple-700 hover:text-purple-800">
                Explore all use cases →
              </Link>
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

          <div className="text-xs text-muted-foreground mt-8 max-w-2xl mx-auto space-y-1">
            <p>Works on any website — LinkedIn, Twitter, Reddit, Gmail, and more. No APIs needed.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Why Vibe - Comparison CTA */}
    <section className="w-full py-12 md:py-16 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Why Vibe?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            See how Vibe stacks up on privacy, model choice, and agentic browser workflows.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-purple-100 bg-white shadow-lg p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-purple-700">
                <Badge className="bg-purple-600 text-white">Updated</Badge>
                <span>Full competitive analysis</span>
              </div>
              <p className="mt-3 text-base text-muted-foreground">
                Compare Vibe against Atlas, Comet, Composite, Strawberry, and more on the features teams care about.
              </p>
            </div>
            <Link href="/compare" className="w-full md:w-auto">
              <Button size="lg" className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white">
                View comparison
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Core Features */}
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Features That Work
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Built for power users who want leverage, not magic tricks
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Autonomous Decision Making</h3>
              <p className="text-sm text-muted-foreground">
                Plans, executes, and adjusts. Makes smart decisions without your input
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Works on Any Site</h3>
              <p className="text-sm text-muted-foreground">
                LinkedIn, Twitter, Reddit, Gmail — anywhere you browse. No APIs needed, no brittle automations
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                100% local with Gemini Nano. Your data never leaves your device.{' '}
                <Link href="/tee" className="text-green-600 hover:text-green-700 underline">
                  TEE research
                </Link>{' '}
                for enterprise security
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Natural Language</h3>
              <p className="text-sm text-muted-foreground">
                Just describe what you need in plain English. No scripts or commands required
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">You Stay in Control</h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step visibility into every action. Nothing happens without your approval. AI amplifies your expertise, not replaces it
              </p>
            </CardContent>
          </Card>

           <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-white">
             <CardContent className="p-6">
               <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                 <Code className="w-6 h-6 text-indigo-600" />
               </div>
               <h3 className="text-xl font-bold mb-2">Any LLM, No Lock-in</h3>
               <p className="text-sm text-muted-foreground">
                 Use GPT, Claude, Gemini, Grok, DeepSeek. Switch anytime. Works with any Chrome browser
               </p>
             </CardContent>
           </Card>
        </div>
      </div>
    </section>

    {/* Power User Philosophy Callout */}
    <section className="w-full py-12 md:py-16 bg-gradient-to-br from-purple-900 to-slate-900">
      <div className="container max-w-5xl px-4 md:px-6 mx-auto">
        <div className="text-center text-white">
          <Badge className="bg-white/20 text-white border-white/30 mb-6">
            <Lightbulb className="w-4 h-4 mr-2" />
            Our Philosophy
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
            "AI doesn't replace power users—it amplifies them"
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            The main bottleneck for power users has always been time. Vibe Browser extends your reach without taking away your judgment. You bring the taste and expertise. We give you leverage.
          </p>
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Built by power users, for power users</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Control over magic</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Repeatable workflows you can trust</span>
            </div>
          </div>
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
                Yes. When using Gemini Nano (Chrome's built-in AI) or local models, everything runs on your device. Your data never leaves your computer. When using cloud models (GPT-4, Claude), data is sent to their respective APIs. You control which model to use.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                How much does it cost?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2"><strong>Free forever</strong> with Gemini Nano, BYOM, GPT-5-mini, or GPT-OSS-120B.</p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Pro ($25/month):</strong> GPT-5.1, Grok-4-fast (non-reasoning), DeepSeek-V3.2
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Max ($99/month):</strong> GPT-5.2, Grok-4, Grok-4-fast-reasoning, DeepSeek-R1
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                What makes Vibe different from OpenAI Atlas and other AI browsers?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">Vibe focuses on key differentiators in the evolving AI browser space:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Privacy Options:</strong> Choice to run 100% locally with Gemini Nano, or use cloud models when needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Model Flexibility:</strong> Bring your own model (BYOM) or switch between GPT, Claude, Gemini, and local models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>True Free Tier:</strong> Unlimited usage with local models, no subscription required</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">Note: AI browser capabilities are rapidly evolving. We recommend testing with your specific workflows to determine the best fit.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                Are we locked into Vibe? Can we switch to other tools later?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">No, you're never locked into Vibe. We believe in true independence:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Switch LLM Providers Anytime:</strong> Use Gemini Nano today, GPT-5 tomorrow, Claude next month. You control which AI powers your agent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Export Workflows:</strong> Your automation scripts and workflows are yours to keep and use elsewhere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Works with Any Chrome:</strong> Not a fork—just a standard Chrome extension that works on vanilla Chrome, Chromium, and Edge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>No Data Lock-in:</strong> Your task history and results are accessible; we don't hold your data hostage</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">This philosophy sets us apart from platforms like Manus that lock you into their proprietary AI and payment model.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                Is Vibe suitable for enterprises with strict privacy requirements?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">Yes. Vibe is built for enterprise privacy from the ground up:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>100% Local Processing:</strong> Use Gemini Nano to run AI agents entirely on your device—zero data leaves your network</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>No Telemetry:</strong> We don't log, track, or analyze your web browsing or task execution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Self-Hosted Options:</strong> Deploy on your own infrastructure if needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Compliance Ready:</strong> Built to support enterprise security policies and data governance requirements</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">For enterprises handling sensitive data, Vibe's local-first architecture provides the privacy guarantees you need without relying on external cloud services.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">
                How does Vibe compare to Manus and other competitors on vendor lock-in?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">Key differences on independence and flexibility:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Manus:</strong> Proprietary AI provider, Chrome extension + web platform, vendor lock-in by design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>OpenAI Atlas:</strong> Locked to OpenAI models, requires fork of Chromium, subscription-only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Vibe:</strong> Any LLM provider, native Chrome extension, free tier with local AI, true model independence</span>
                  </li>
                </ul>
                <p className="mt-3 mb-2 text-sm"><strong>The difference matters:</strong></p>
                <p className="text-xs text-muted-foreground">With Vibe, if a cheaper or better AI model launches, you can switch immediately. You're not locked into expensive subscription tiers or proprietary AI that doesn't improve. Your workflows stay with you, regardless of where you host the AI.</p>
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
            Replace 5 Tools with One Browser
          </Badge>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl max-w-4xl">
            Stop Clicking. Start Automating.
          </h2>
          
          <p className="max-w-2xl text-xl opacity-90 mb-4">
            Join thousands using Vibe to automate their web workflows
          </p>

          <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100 text-xl px-12 py-8 font-bold shadow-2xl" onClick={() => window.open('https://billing.stripe.com/p/login/9B6bJ06iPcwL9VUa4yabK00', '_blank')}>
            Manage Subscription
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>

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
