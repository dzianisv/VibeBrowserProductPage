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
Info,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Component() {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  // Add structured data for SEO
  React.useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Vibe AI Browser Co-Pilot",
      "applicationCategory": "BrowserApplication",
      "operatingSystem": "Windows, macOS, Linux",
      "description": "AI browser co-pilot extension that completes entire tasks autonomously. Agentic AI browser for research, bookings, data entry, and complex workflows across multiple websites.",
      "url": "https://www.vibebrowser.app",
      "author": {
        "@type": "Organization",
        "name": "Vibe AI Browser Co-Pilot",
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
      "name": "Vibe AI Browser Co-Pilot",
      "url": "https://www.vibebrowser.app",
      "logo": "https://www.vibebrowser.app/logo.png",
      "description": "Creators of the revolutionary AI Browser Co-Pilot",
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
      "name": "Vibe AI Browser Co-Pilot - Automate Your Browsing",
      "description": "Experience the revolutionary AI Browser Co-Pilot. Automate any web task with natural language.",
      "url": "https://www.vibebrowser.app",
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Vibe AI Browser Co-Pilot",
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
          "name": "What is Vibe AI Browser Co-Pilot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vibe AI Browser Co-Pilot is an autonomous browser extension that completes entire tasks for you. Unlike AI chatbots or assistants, Vibe takes full control - researching across multiple sites, making decisions, and executing complete workflows without you clicking a single button."
          }
        },
        {
          "@type": "Question",
          "name": "How does Vibe AI Browser Co-Pilot work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vibe uses an autonomous AI agent with Plan-Execute-Reflect architecture. You give it a goal like 'book the cheapest flight to Paris next month' and it autonomously researches options, compares prices across airlines, and completes the booking - all without your intervention."
          }
        },
        {
          "@type": "Question",
          "name": "Is Vibe AI Browser Co-Pilot free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vibe AI Browser Co-Pilot is free during beta. After launch, it's $20/month. Join our waitlist to be notified when it becomes available."
          }
        },
        {
          "@type": "Question",
          "name": "What platforms does Vibe AI Browser Co-Pilot support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vibe AI Browser Co-Pilot works as a Chrome extension on Windows, macOS, and Linux."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data safe with Vibe AI Browser Co-Pilot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Vibe AI Browser Co-Pilot prioritizes user privacy and security. All processing happens locally using Chrome's built-in AI (Gemini Nano), and we never sell your data to third parties."
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
          <img src="/vibebrowser-logo.png" alt="Vibe AI Browser Co-Pilot" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vibe AI Browser Co-Pilot
          </span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#demo" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Demo
          </Link>
          <Link href="#use-cases" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Use Cases
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Pricing
          </Link>
          <Link href="https://docs.vibebrowser.app" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Docs
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
            AI Browser That Acts
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            The AI Browser That
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Acts, Not Just Answers</span>
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground md:text-xl leading-relaxed mb-8">
            Tell Vibe what you need. It researches, compares, and executes tasks across multiple sites - automating workflows that typically require manual effort.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
            <WaitlistDialog>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 h-auto">
                Get Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </WaitlistDialog>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-2 h-auto" onClick={() => window.open('https://vibeextensioncdn.blob.core.windows.net/extensions/vibe-ai-copilot-latest.zip', '_blank')}>
              <Download className="mr-2 h-5 w-5" />
              Download Chrome Extension
            </Button>
          </div>

          <div className="flex gap-6 justify-center items-center text-sm text-muted-foreground mb-12">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-600" />
              <span>Private*</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Faster**</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <span>Minimal Clicks</span>
            </div>
          </div>

          {/* Use Cases - inline */}
          <div className="w-full max-w-5xl mx-auto mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
                Works for Every Role
              </h2>
              <p className="text-muted-foreground">
                One AI browser, infinite workflows
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-5 text-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-2 mx-auto">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-1">Sales Teams</h3>
                  <p className="text-xs text-muted-foreground">
                    Lead research, CRM updates, prospect analysis
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="p-5 text-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-2 mx-auto">
                    <Search className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-bold mb-1">Recruiters</h3>
                  <p className="text-xs text-muted-foreground">
                    Candidate sourcing, screening, outreach automation
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-white">
                <CardContent className="p-5 text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-2 mx-auto">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-1">Researchers</h3>
                  <p className="text-xs text-muted-foreground">
                    Market analysis, competitor tracking, data collection
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-orange-50 to-white">
                <CardContent className="p-5 text-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-2 mx-auto">
                    <Database className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-bold mb-1">Data Teams</h3>
                  <p className="text-xs text-muted-foreground">
                    Web scraping, data enrichment, validation
                  </p>
                </CardContent>
              </Card>
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
            <p>*Private when using local models (Gemini Nano, BYOM). Cloud models send data to their respective APIs.</p>
            <p>**Performance varies by task complexity and website structure. Times shown are example scenarios.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Why Vibe - Comparison Table */}
    <section className="w-full py-12 md:py-16 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Why Vibe?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Privacy-first, model-agnostic autonomous browser with local AI support
          </p>
        </div>

        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">
                    <div className="flex items-center justify-center gap-2">
                      <span>Vibe</span>
                      <Badge className="bg-purple-600 text-white">You</Badge>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">OpenAI Atlas</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Strawberry</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Comet</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">BrowserOS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Autonomous Tasks</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs text-gray-500">Limited</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 bg-purple-50/30">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Local/Private AI</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-xs text-gray-600 mt-1">Gemini Nano</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-red-600 text-xl">×</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-red-600 text-xl">×</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-red-600 text-xl">×</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs text-gray-500">Broken</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Model Choice</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-xs text-gray-600 mt-1">Any model</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs text-gray-500">OpenAI only</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs text-gray-500">Limited</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-red-600 text-xl">×</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 bg-purple-50/30">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Multi-Tab Agent</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-xs text-gray-600 mt-1">Full support</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-red-600 text-xl">×</span>
                      <span className="text-xs text-gray-500 mt-1">Single browser</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-red-600 text-xl">×</span>
                      <span className="text-xs text-gray-500 mt-1">Single browser</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs text-gray-500">Unknown</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Free Tier</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-xs text-gray-600 mt-1">Unlimited</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-red-600 text-xl">×</span>
                      <span className="text-xs text-gray-500 mt-1">$20/mo req.</span>
                      <span className="text-xs text-red-600 mt-1">Agent quota may be limited: users may see "You've reached your monthly limit for agent mode".</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs text-gray-500">Limited credits</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs text-gray-500">Ad-supported</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-red-600 text-xl">×</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Available Now</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs text-gray-500">Waitlist</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 bg-purple-50/30">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Works as Extension</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-xs text-gray-600 mt-1">In any Chrome</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-red-600 text-xl">×</span>
                      <span className="text-xs text-gray-500 mt-1">Fork only</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-red-600 text-xl">×</span>
                      <span className="text-xs text-gray-500 mt-1">Fork only</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-red-600 text-xl">×</span>
                      <span className="text-xs text-gray-500 mt-1">Fork only</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-red-600 text-xl">×</span>
                      <span className="text-xs text-gray-500 mt-1">Fork only</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Own Browser Available</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-xs text-gray-600 mt-1">Both options</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              * Comparison based on publicly available information as of November 2025
            </p>
            <p className="text-xs text-muted-foreground">
              ** AI browser capabilities evolve rapidly. Features and performance may vary based on specific use cases. We recommend testing multiple options for your workflow.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Inspirational Quote */}
    <section className="w-full py-12 md:py-16 bg-gradient-to-r from-slate-900 to-purple-900">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-6">
            "The future is already here — it's just not evenly distributed."
          </blockquote>
          <p className="text-white/80 text-lg">
            William Gibson, Cyberpunk Philosopher & Author
          </p>
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
            Everything you need for autonomous web automation
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
              <h3 className="text-xl font-bold mb-2">Multi-Site Navigation</h3>
              <p className="text-sm text-muted-foreground">
                Seamlessly works across any website—no API limits or restrictions
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
                100% local processing with Gemini Nano. Your data never leaves your device
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
                Just describe what you need in plain English. No scripts or commands.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Background Execution</h3>
              <p className="text-sm text-muted-foreground">
                Runs tasks while you work on something else. Come back to results
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Verification</h3>
              <p className="text-sm text-muted-foreground">
                Reviews and confirms actions before critical tasks like purchases
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* How It Works - Simplified */}
    <section id="how-it-works" className="w-full py-12 md:py-16 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How It Works</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Three steps. Zero clicks.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-white relative">
              <div className="absolute -top-3 left-6">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <CardContent className="p-6 pt-8">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Describe Your Task</h3>
                <p className="text-sm text-muted-foreground">
                  "Find 10 SaaS companies hiring engineers" or "Book cheapest flight to NYC"
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white relative">
              <div className="absolute -top-3 left-6">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <CardContent className="p-6 pt-8">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Vibe Executes</h3>
                <p className="text-sm text-muted-foreground">
                  Autonomously navigates, researches, compares, and completes your task
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white relative">
              <div className="absolute -top-3 left-6">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <CardContent className="p-6 pt-8">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Review Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get complete research, bookings, or data. Ready when you are
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center p-6 bg-white rounded-xl shadow-md">
            <p className="text-muted-foreground">
              <strong className="text-purple-600">That's it.</strong> One command → Complete results.
            </p>
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
                    <span><strong>Multi-Tab Coordination:</strong> Agent can manage multiple tabs in a single task (unlike some competitors)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>True Free Tier:</strong> Unlimited usage with local models, no subscription required</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">Note: AI browser capabilities are rapidly evolving. We recommend testing with your specific workflows to determine the best fit.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>

    {/* Team Section */}
    <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Meet the Team</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Experienced engineers building the future of AI-native browsing
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                <img src="/images/dennis-vashchuk.jpg" alt="Dzianis Vashchuk" className="w-full h-full object-cover" />
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
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section id="pricing" className="w-full py-16 md:py-24 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center gap-8 text-center text-white">
          <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Available Now
          </Badge>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl max-w-4xl">
            Stop Clicking. Start Automating.
          </h2>
          
          <p className="max-w-2xl text-xl opacity-90 mb-4">
            Join thousands using Vibe to automate their web workflows
          </p>

          <WaitlistDialog>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100 text-xl px-12 py-8 font-bold shadow-2xl">
              Get Early Access
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </WaitlistDialog>

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

  {/* Footer */}
  <footer className="w-full border-t bg-white">
    <div className="container max-w-7xl px-4 md:px-6 py-12 mx-auto">
      <div className="grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src="/vibebrowser-logo.png" alt="Vibe AI Browser Co-Pilot" className="w-8 h-8 object-contain" />
            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Vibe AI Browser Co-Pilot
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            The AI browser co-pilot that turns your words into actions. Autonomous automation for the modern web.
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
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
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
          © 2025 Vibe AI Browser Co-Pilot. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</div>
)
}
