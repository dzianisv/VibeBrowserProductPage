"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WaitlistDialog } from "./components/waitlist-dialog"
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
BookOpen,
TrendingUp,
Moon,
Palette,
Cloud,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Component() {
  const [currentDemo, setCurrentDemo] = useState(0)

  // Add structured data for SEO
  React.useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Vibe Browser",
      "applicationCategory": "BrowserApplication",
      "operatingSystem": "Windows, macOS, Linux",
      "description": "Autonomous web agent that completes entire tasks for you. Unlike AI assistants, Vibe takes full control - researching, navigating, and executing complex workflows across multiple websites automatically.",
      "url": "https://www.vibebrowser.app",
      "author": {
        "@type": "Organization",
        "name": "Vibe Browser",
        "url": "https://www.vibebrowser.app"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/PreOrder"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "ratingCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      },
      "featureList": [
        "Autonomous task completion",
        "Multi-site navigation",
        "Decision-making AI agent",
        "Complete workflow automation",
        "Zero-click task execution",
        "Self-directed research",
        "Hands-free operation"
      ],
      "screenshot": "https://www.vibebrowser.app/og-image.png",
      "softwareVersion": "1.0",
      "datePublished": "2025-01-01",
      "dateModified": "2025-09-25"
    })
    document.head.appendChild(script)

    // Organization schema
    const orgScript = document.createElement('script')
    orgScript.type = 'application/ld+json'
    orgScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Vibe Browser",
      "url": "https://www.vibebrowser.app",
      "logo": "https://www.vibebrowser.app/logo.png",
      "description": "Creators of the revolutionary AI Web Agent",
      "sameAs": [
        "https://twitter.com/vibebrowser",
        "https://github.com/vibebrowser",
        "https://www.linkedin.com/company/vibebrowser"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "support@vibebrowser.app"
      }
    })
    document.head.appendChild(orgScript)

    // WebPage schema
    const pageScript = document.createElement('script')
    pageScript.type = 'application/ld+json'
    pageScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Vibe Browser - AI Web Aegnt for the Future",
      "description": "Experience the revolutionary AI Web Agent. Control any website with natural language.",
      "url": "https://www.vibebrowser.app",
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Vibe Browser",
        "url": "https://www.vibebrowser.app"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.vibebrowser.app"
        }]
      }
    })
    document.head.appendChild(pageScript)

    // FAQPage schema
    const faqScript = document.createElement('script')
    faqScript.type = 'application/ld+json'
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Vibe Browser?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vibe is an autonomous web agent that completes entire tasks for you. Unlike AI chatbots or assistants, Vibe takes full control of the browser - researching across multiple sites, making decisions, and executing complete workflows without you clicking a single button."
          }
        },
        {
          "@type": "Question",
          "name": "How does Vibe Browser work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vibe uses an autonomous AI agent with Plan-Execute-Reflect architecture. You give it a goal like 'book the cheapest flight to Paris next month' and it autonomously researches options, compares prices across airlines, and completes the booking - all without your intervention."
          }
        },
        {
          "@type": "Question",
          "name": "Is Vibe Browser free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vibe Browser is currently in development. Join our waitlist to be notified when it becomes available and learn about pricing options."
          }
        },
        {
          "@type": "Question",
          "name": "What platforms does Vibe Browser support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vibe Browser will be available for Windows, macOS, and Linux operating systems."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data safe with Vibe Browser?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Vibe Browser prioritizes user privacy and security. All processing happens locally when possible, and we never sell your data to third parties."
          }
        }
      ]
    })
    document.head.appendChild(faqScript)

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
      if (orgScript.parentNode) orgScript.parentNode.removeChild(orgScript)
      if (pageScript.parentNode) pageScript.parentNode.removeChild(pageScript)
      if (faqScript.parentNode) faqScript.parentNode.removeChild(faqScript)
    }
  }, [])

  const demos = [
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
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/vibebrowser-logo.png" alt="Vibe Browser" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vibe Browser
          </span>
        </div>
    <nav className="flex gap-4 sm:gap-6">
      <Link href="#demo" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Demo
      </Link>
      <Link href="#features" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Features
      </Link>
      <Link href="#how-it-works" className="text-sm font-medium hover:text-purple-600 transition-colors">
      How It Works
      </Link>
      <Link href="#roadmap" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Roadmap
      </Link>
    </nav>
  </header>

  <main className="flex-1">
    {/* Hero Section with Integrated Demo */}
    <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center gap-6 text-center max-w-5xl mx-auto">
          <Badge variant="secondary"
            className="px-4 py-2 text-sm font-medium bg-purple-100 text-purple-700 border-purple-200">
            <Sparkles className="w-4 h-4 mr-2" />
            Autonomous Web Agent • AI-Powered Browser
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            The
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Agentic Browser </span>
            That Actually Does Your Work
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground md:text-xl leading-relaxed mb-8">
            Vibe is an AI-powered browser that turns your words into actions. Just describe your task in plain language—it handles all the clicking, typing, and navigating for you. A privacy-focused alternative to traditional browsers, reimagined for the AI era.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
            <WaitlistDialog>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6">
                Get Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </WaitlistDialog>
          </div>

          <p className="text-sm text-muted-foreground italic mb-12">
            "Like having a personal assistant who never sleeps" — Sarah K., Product Manager
          </p>

          {/* Demo Carousel directly after text */}
          <div className="w-full max-w-5xl mx-auto">
          {/* Carousel Navigation Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 mb-8">
            {demos.map((demo, index) => (
              <button
                key={demo.id}
                onClick={() => setCurrentDemo(index)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentDemo === index
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border'
                }`}
              >
                <span className="text-sm font-medium">{demo.title}</span>
              </button>
            ))}
          </div>

          {/* Demo Content */}
          <div className="relative">
            {/* Video Player with Navigation Arrows */}
            <div className="relative">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border bg-slate-900">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <video
                    key={currentDemo}
                    className="absolute inset-0 w-full h-full object-contain"
                    controls
                    loop
                    muted
                    playsInline
                    preload="auto"
                    src={`${demos[currentDemo].videoSrc}.mp4`}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevDemo}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow z-10"
                aria-label="Previous demo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextDemo}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow z-10"
                aria-label="Next demo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Task Description - Simple text below video */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground italic max-w-3xl mx-auto">
                {demos[currentDemo].task.description}
              </p>
            </div>

            {/* Demo Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {demos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDemo(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentDemo === index ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to demo ${index + 1}`}
                />
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    {/* The Problem Section */}
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            The Modern Web is Exhausting
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every day, you waste hours on tasks that should take minutes
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto mb-12">
          <Card className="border-0 shadow-md text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ListTodo className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">23 Tabs Open</h3>
            <p className="text-sm text-muted-foreground">
              Comparing prices, reading reviews, checking availability
            </p>
          </Card>

          <Card className="border-0 shadow-md text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">2.5 Hours Daily</h3>
            <p className="text-sm text-muted-foreground">
              Wasted on repetitive clicking, copying, pasting
            </p>
          </Card>

          <Card className="border-0 shadow-md text-center p-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Decision Fatigue</h3>
            <p className="text-sm text-muted-foreground">
              Overwhelmed by choices, paralyzed by options
            </p>
          </Card>

          <Card className="border-0 shadow-md text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MousePointer className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Still Clicking</h3>
            <p className="text-sm text-muted-foreground">
              Like it's 1995. There has to be a better way
            </p>
          </Card>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            You Deserve Better
          </h3>
          <p className="text-lg text-muted-foreground">
            Your browser should work for you, not the other way around
          </p>
        </div>
      </div>
    </section>

    {/* The Difference - Clear Value Proposition */}
    <section className="w-full py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What Makes Vibe an Agentic Browser?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlike traditional browsers with AI assistants, Vibe has a built-in autonomous agent that acts independently
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional AI Tools */}
            <Card className="border-2 border-gray-200 bg-white/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-600">Traditional "AI Browsers"</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">❌</span>
                    <span>You browse, AI suggests next steps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">❌</span>
                    <span>Summarize what you're already viewing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">❌</span>
                    <span>Answer questions about current page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">❌</span>
                    <span>You click, scroll, and navigate everything</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">❌</span>
                    <span>You make every decision manually</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Vibe Browser */}
            <Card className="border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Vibe: Autonomous AI Agent
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="font-medium">Understands complex natural language commands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="font-medium">Plans multi-step workflows autonomously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="font-medium">Navigates across multiple websites automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="font-medium">Makes intelligent decisions on your behalf</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="font-medium">Executes complete tasks from start to finish</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg font-medium">
              One natural language command. Complete autonomous execution. Zero manual work.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Say: "Find me the best mortgage rate" → Vibe autonomously visits 10+ lenders, compares rates, analyzes terms, and presents recommendations
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Real Examples Section - Quick Wins */}
    <section className="w-full py-12 md:py-16">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Real Tasks. Real Results.
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            One command. Complete execution. Zero manual work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Plane className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">"Book flight to NYC"</p>
                  <p className="text-sm text-muted-foreground">Compared 8 airlines → Booked cheapest</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-purple-600">3 min</span>
                <p className="text-xs text-muted-foreground">vs 45 min manually</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">"Find best mortgage rate"</p>
                  <p className="text-sm text-muted-foreground">Checked 15 lenders → Full comparison</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-600">8 min</span>
                <p className="text-xs text-muted-foreground">vs 3 hours manually</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">"Research competitors"</p>
                  <p className="text-sm text-muted-foreground">Analyzed 20 companies → Full report</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-600">12 min</span>
                <p className="text-xs text-muted-foreground">vs 4 hours manually</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold">"Buy air purifier under $300"</p>
                  <p className="text-sm text-muted-foreground">Found best deal → Cart ready</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-orange-600">5 min</span>
                <p className="text-xs text-muted-foreground">vs 90 min manually</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold">"Find apartment in Brooklyn"</p>
                  <p className="text-sm text-muted-foreground">Searched 5 sites → Top 10 matches</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-red-600">10 min</span>
                <p className="text-xs text-muted-foreground">vs 2 hours manually</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-semibold">"Summarize quarterly earnings"</p>
                  <p className="text-sm text-muted-foreground">Read 50 pages → Key insights</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-pink-600">4 min</span>
                <p className="text-xs text-muted-foreground">vs 60 min manually</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold text-purple-600">Zero</div>
              <p className="text-sm text-muted-foreground">Manual clicking required</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">10x</div>
              <p className="text-sm text-muted-foreground">Faster task completion</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <p className="text-sm text-muted-foreground">Autonomous execution</p>
            </div>
          </div>
          <p className="text-lg font-semibold mb-2">
            🎯 The Key Difference:
          </p>
          <p className="text-muted-foreground">
            You give one command and come back to completed results.
            <strong className="text-purple-600"> No watching. No clicking. No waiting.</strong>
          </p>
        </div>
      </div>
    </section>

    {/* How We Compare - Simplified */}
    <section className="w-full py-12 md:py-16 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Why Vibe?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Built different because browsers deserve better
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {/* vs Chrome */}
          <Card className="border-l-4 border-l-purple-600 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Chrome className="w-8 h-8 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">vs Chrome</h3>
                  <p className="text-sm text-muted-foreground">AI built-in, not bolted on</p>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-700">AI-First</Badge>
            </CardContent>
          </Card>

          {/* vs Brave */}
          <Card className="border-l-4 border-l-blue-600 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">vs Brave</h3>
                  <p className="text-sm text-muted-foreground">Focused on AI, not crypto</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-700">Laser-Focused</Badge>
            </CardContent>
          </Card>

          {/* vs Arc/Dia */}
          <Card className="border-l-4 border-l-green-600 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Target className="w-8 h-8 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">vs Arc/Dia</h3>
                  <p className="text-sm text-muted-foreground">Committed to users, not pivots</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Stable</Badge>
            </CardContent>
          </Card>

          {/* vs Perplexity Comet */}
          <Card className="border-l-4 border-l-orange-600 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Lock className="w-8 h-8 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">vs Perplexity Comet</h3>
                  <p className="text-sm text-muted-foreground">Your data stays yours, configure your own AI provider</p>
                </div>
              </div>
              <Badge className="bg-orange-100 text-orange-700">Private</Badge>
            </CardContent>
          </Card>

          {/* vs BrowserOS */}
          <Card className="border-l-4 border-l-pink-600 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">vs BrowserOS</h3>
                  <p className="text-sm text-muted-foreground">Production-ready builds that actually work</p>
                </div>
              </div>
              <Badge className="bg-pink-100 text-pink-700">Ready Now</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <strong className="text-purple-600">Vibe is AI-first, privacy-focused, and puts you in control.</strong>
          </p>
        </div>
      </div>
    </section>

    {/* What is Agentic Browsing */}
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium mb-4">
              <Brain className="w-4 h-4 mr-2" />
              Agentic AI Technology
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Build Agents with Natural Language
            </h2>
            <p className="text-lg text-muted-foreground">
              Automate any task—from scraping websites to filling out forms—just by describing what you want to do in plain language. Vibe translates your words into a repeatable agent that runs locally, giving you custom automation without code.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Natural Language Control</h3>
                <p className="text-sm text-muted-foreground">
                  No coding required. Just tell Vibe what you need in plain English, and it figures out how to do it.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Autonomous Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Vibe's AI agent creates a step-by-step plan, makes decisions, and adapts to changes on the fly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <RefreshCw className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Self-Correcting</h3>
                <p className="text-sm text-muted-foreground">
                  If something doesn't work, Vibe reflects on the problem and tries a different approach automatically.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">How It Works</h3>
                <p className="text-sm text-muted-foreground">
                  Traditional browsers require you to click, type, and navigate manually. Agentic browsers like Vibe understand your goal and autonomously execute all the steps to achieve it. You describe the task once, and Vibe handles everything—from researching options across multiple sites to making comparisons and completing forms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Deployment Modes */}
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Three Ways to Experience Vibe
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the deployment mode that fits your needs - from full browser to lightweight extension
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {/* VibeBrowser - Standalone */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1">
                Most Powerful
              </Badge>
            </div>
            <CardContent className="p-8 pt-10">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Chrome className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">VibeBrowser</h3>
              <p className="text-muted-foreground mb-6">
                Full standalone browser with AI deeply integrated. Download and run locally for maximum control, privacy, and capabilities.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Complete browser replacement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Full access to all features</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Works offline with local LLMs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Maximum privacy & security</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm font-medium mb-2">Best for:</p>
                <p className="text-sm text-muted-foreground">Power users who want full control and all features</p>
              </div>
            </CardContent>
          </Card>

          {/* VibeAgent Cloud */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">VibeAgent Cloud</h3>
              <p className="text-muted-foreground mb-6">
                Runs in the cloud like OpenAI Agent. Access from anywhere, no installation required. Perfect for automation and background tasks.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Access from any device</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">24/7 background automation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">No local resources needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Scales to multiple tasks</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm font-medium mb-2">Best for:</p>
                <p className="text-sm text-muted-foreground">Teams and users who need always-on automation</p>
              </div>
            </CardContent>
          </Card>

          {/* Extension */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <Puzzle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Extension</h3>
              <p className="text-muted-foreground mb-6">
                Lightweight browser extension that adds AI capabilities to your existing browser. Quick to install with essential features.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Works with Chrome/Edge</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Easy one-click install</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Core AI features included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Minimal resource usage</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm font-medium mb-2">Best for:</p>
                <p className="text-sm text-muted-foreground">Casual users who want to try AI browsing features</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All modes are powered by the same AI engine - choose based on your needs for control, convenience, and capabilities
          </p>
        </div>
      </div>
    </section>

    {/* How It Works - AI Agent Architecture */}
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">How Our AI Agent Works</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Built on the LangGraph reflection pattern, our AI agent uses self-reflective reasoning
            for intelligent task execution
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Research Foundation */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium mb-4">
              <Brain className="w-4 h-4 mr-2" />
              Research-Backed Architecture
            </Badge>
            <p className="text-muted-foreground">
              Based on{" "}
              <Link href="https://langchain-ai.github.io/langgraph/tutorials/reflection/reflection/" target="_blank"
                className="text-purple-600 hover:text-purple-700 underline">
              LangGraph Reflection Pattern
              </Link>{" "}
              for building reliable, self-correcting AI agents with robust error recovery
            </p>
          </div>

          {/* Core Loop Visualization */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
            <h3 className="text-xl font-semibold text-center mb-8">The Plan-Execute-Reflect Loop</h3>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Step 1: Think */}
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Plan</h4>
                <p className="text-sm text-muted-foreground">
                  AI creates a comprehensive strategy, breaking down complex tasks into actionable steps
                </p>
              </div>

              <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />

              {/* Step 2: Act */}
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Execute</h4>
                <p className="text-sm text-muted-foreground">
                  Carries out the plan using 28+ specialized tools for web interaction and automation
                </p>
              </div>

              <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />

              {/* Step 3: Observe */}
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Reflect</h4>
                <p className="text-sm text-muted-foreground">
                  Self-evaluates performance, identifies improvements, and refines approach for better results
                </p>
              </div>

              <div className="flex items-center justify-center md:hidden mt-4">
                <RefreshCw className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="w-4 h-4" />
                <span>Continuous loop until task completion</span>
              </div>
            </div>
          </div>

          {/* Key Capabilities */}

          {/* Research Validation */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">LangGraph-Based Architecture</h3>
              <p className="text-muted-foreground">
                Our implementation uses reflection patterns for building reliable, self-improving AI agents
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">
                  <strong>Reflection Pattern:</strong> Self-evaluating agents with continuous improvement
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">
                  <strong>Self-Correction:</strong> Memory system enables plan adjustment
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">
                  <strong>Interpretability:</strong> Clear reasoning traces for debugging
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">
                  <strong>Robust Design:</strong> Elegant solution prevents failure modes
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/50 rounded-lg border border-purple-200">
              <p className="text-sm text-muted-foreground italic">
                "Successful goal execution by agents is contingent upon proper planning and self-correction. Without
                the ability to self-evaluate and create effective plans, single agents may get stuck in an endless
                execution loop."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                — Research finding directly addressed by our architecture
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Development Roadmap */}
    <section id="roadmap" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Development Roadmap</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Track our progress as we build the future of AI-native browsing
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4">
          <HorizontalRoadmap />
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Want to stay updated on our progress? Join our waitlist for development updates.
            </p>
            <WaitlistDialog>
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Get Development Updates
              </Button>
            </WaitlistDialog>
          </div>
        </div>
      </div>
    </section>

    {/* AI Features */}
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Built-in AI Assistant</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Every page, video, and document becomes interactive with embedded AI capabilities
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow group">
            <CardContent className="p-6 text-center">
              <MessageSquare
                className="h-8 w-8 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Ask Page</h3>
              <p className="text-sm text-muted-foreground">
                Get instant answers about any webpage content without reading everything
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow group">
            <CardContent className="p-6 text-center">
              <Youtube className="h-8 w-8 mx-auto mb-4 text-red-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Ask Video</h3>
              <p className="text-sm text-muted-foreground">
                Query YouTube videos and get timestamped answers without watching
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow group">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Smart Summarize</h3>
              <p className="text-sm text-muted-foreground">
                Get concise summaries of articles, documents, and research papers
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow group">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 mx-auto mb-4 text-orange-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Real-time Translation</h3>
              <p className="text-sm text-muted-foreground">
                Translate and explain complex content in any language instantly
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* Security & Privacy */}

    {/* Team Section - temporarily commented out */}
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
              <p className="text-muted-foreground mb-4 whitespace-nowrap">Chromium Consultant</p>
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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Everything you need to know about Vibe Browser
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                How is this different from ChatGPT, Claude, or "AI browsers"?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="font-medium">The fundamental difference: Vibe is an autonomous agent, not an assistant.</p>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">ChatGPT/Claude:</p>
                    <ul className="space-y-1">
                      <li className="text-sm">• Answer questions, give advice</li>
                      <li className="text-sm">• You still do all the actual work</li>
                      <li className="text-sm">• Can't interact with websites</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">AI Browsers (Arc, Brave, etc):</p>
                    <ul className="space-y-1">
                      <li className="text-sm">• Summarize current page</li>
                      <li className="text-sm">• Answer questions about what you're viewing</li>
                      <li className="text-sm">• You still navigate and click everything</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-purple-600">Vibe (Autonomous Agent):</p>
                    <ul className="space-y-1">
                      <li className="text-sm">✓ Completes entire multi-step tasks independently</li>
                      <li className="text-sm">✓ Navigates across multiple websites automatically</li>
                      <li className="text-sm">✓ Makes decisions and takes actions for you</li>
                      <li className="text-sm">✓ Works while you're away from computer</li>
                    </ul>
                  </div>

                  <p className="text-sm font-medium mt-4">
                    Think of it this way: ChatGPT tells you how to book a flight.
                    Vibe actually books it for you.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Can I use Vibe Browser with my existing bookmarks and extensions?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Since Vibe is built on Chromium, you can easily import your bookmarks, passwords, and most
                Chrome extensions. The transition is seamless and takes just a few minutes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                What happens if the AI makes a mistake during automation?
              </AccordionTrigger>
              <AccordionContent>
                Vibe always asks for confirmation before completing any purchase or important action. You can review
                all details before proceeding, and you can cancel or modify any automated task at any time. We also
                provide detailed logs of all actions taken.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                What are the pricing plans for Vibe Browser?
              </AccordionTrigger>
              <AccordionContent>
                Vibe Browser offers a free tier with 30 AI queries per day and basic automation features. Our Pro
                plan ($20/month) includes unlimited AI queries, advanced automation, and priority support. We're
                currently in private beta - join our waitlist for early access and launch pricing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                How does AI processing work in Vibe Browser?
              </AccordionTrigger>
              <AccordionContent>
                Vibe Browser connects to leading LLM providers like OpenAI, Anthropic, and Google Gemini to deliver
                powerful AI capabilities. For users who prefer complete privacy, we also support locally-hosted LLM
                models that run entirely on your device without any external connections.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center gap-6 text-center text-white">
          <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Early Access Now Available
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Don't Let Another Day Go to Manual Work
          </h2>
          <p className="max-w-2xl text-lg opacity-90">
            Join the waitlist for early access. Be among the first to experience a browser that actually works for you.
          </p>

          <div className="grid gap-6 md:grid-cols-2 max-w-2xl w-full mt-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Free</h3>
                <p className="text-3xl font-bold mb-4">
                  $0<span className="text-lg font-normal">/month</span>
                </p>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    30 AI queries per day
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Basic automation features
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Community support
                  </li>
                </ul>
                <WaitlistDialog tier="free">
                  <Button variant="secondary" className="w-full bg-white text-purple-600 hover:bg-slate-100">
                    Join Free Waitlist
                  </Button>
                </WaitlistDialog>
              </CardContent>
            </Card>

            <Card className="bg-white text-purple-600 border-2 border-white">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">Pro</h3>
                  <Badge className="bg-purple-600 text-white">Popular</Badge>
                </div>
                <p className="text-3xl font-bold mb-4">
                  $100<span className="text-lg font-normal">/month</span>
                </p>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Unlimited AI queries
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Advanced automation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Priority support
                  </li>
                </ul>
                <WaitlistDialog tier="pro">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Join Pro Waitlist</Button>
                </WaitlistDialog>
              </CardContent>
            </Card>
            
          </div>

          <p className="text-sm opacity-70 mt-4">
            Early access • Launch discount • Be first to experience AI browsing
          </p>
        </div>
      </div>
    </section>
  </main>

  {/* Footer */}
  <footer className="w-full border-t bg-white">
    <div className="container max-w-7xl px-4 md:px-6 py-12 mx-auto">
      <div className="grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src="/vibebrowser-logo.png" alt="Vibe Browser" className="w-8 h-8 object-contain" />
            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Vibe Browser
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            The agentic browser that turns your words into actions. AI-powered automation for the modern web.
          </p>
        </div>

        {/* Product */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm">Product</h3>
          <nav className="flex flex-col gap-2">
            <Link href="#demo" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
              Demo
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
              Features
            </Link>
            <Link href="#roadmap" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
              Roadmap
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
              Pricing
            </Link>
          </nav>
        </div>

        {/* Legal */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm">Legal</h3>
          <nav className="flex flex-col gap-2">
            <Link href="#" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm">Contact</h3>
          <div className="flex flex-col gap-3">
            <Link href="mailto:info@vibebrowser.app" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              info@vibebrowser.app
            </Link>
            <Link href="https://linkedin.com/company/vibebrowser" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </Link>
            <Link href="https://x.com/vibebrowserapp" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X (Twitter)
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t">
        <p className="text-xs text-center text-muted-foreground">
          © 2025 Vibe Browser. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</div>
)
}
