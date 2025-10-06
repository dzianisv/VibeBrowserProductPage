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
          <Link href="#pricing" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Pricing
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
            AI Browser Co-Pilot
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            The
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Agentic Browser </span>
            That Actually Does Your Work
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground md:text-xl leading-relaxed mb-4">
            Stop wasting 2+ hours daily on repetitive web tasks. Vibe automates research, bookings, data entry, and more—just describe what you want done in plain language.
          </p>

          <div className="flex gap-6 justify-center items-center text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-600" />
              <span>100% Private*</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>10x Faster</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <span>Zero Manual Work</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mb-6 max-w-2xl mx-auto">
            *When using embedded Gemini Nano AI
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

          {/* Demo Carousel - Composite Style */}
          <div className="w-full max-w-4xl mx-auto">
            {/* Demo Content */}
            <div className="relative">
              {/* Full-screen Video with Overlay */}
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

                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Natural Language Prompt Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="max-w-3xl w-full">
                      <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                        <p className="text-white text-2xl md:text-3xl font-medium leading-relaxed">
                          {demos[currentDemo].task.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                          <button
                            onClick={togglePlayPause}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
                          >
                            {isPlaying ? (
                              <>
                                <div className="w-4 h-4 flex items-center justify-center">
                                  <div className="flex gap-1">
                                    <div className="w-1 h-4 bg-white rounded-sm"></div>
                                    <div className="w-1 h-4 bg-white rounded-sm"></div>
                                  </div>
                                </div>
                                <span className="text-sm font-medium">Pause</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                <span className="text-sm font-medium">Play</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={restartVideo}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span className="text-sm font-medium">Restart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
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

              {/* Demo Tabs Below Video */}
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

              {/* Demo Indicators */}
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
        </div>
      </div>
    </section>

    {/* Why Vibe - Simplified Comparison */}
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Why Vibe?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            The only truly agentic AI browser built for autonomous task completion
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {/* vs Traditional AI Tools */}
          <Card className="border-l-4 border-l-purple-600 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Brain className="w-8 h-8 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">vs ChatGPT/AI Assistants</h3>
                  <p className="text-sm text-muted-foreground">Completes tasks, not just answers questions</p>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-700">Autonomous</Badge>
            </CardContent>
          </Card>

          {/* vs Perplexity Comet */}
          <Card className="border-l-4 border-l-orange-600 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Lock className="w-8 h-8 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">vs Perplexity Comet</h3>
                  <p className="text-sm text-muted-foreground">Commercial product that monetizes your browsing data through ads and partnerships</p>
                </div>
              </div>
              <Badge className="bg-orange-100 text-orange-700">Privacy-Focused</Badge>
            </CardContent>
          </Card>

          {/* vs BrowserOS */}
          <Card className="border-l-4 border-l-blue-600 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Zap className="w-8 h-8 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">vs BrowserOS</h3>
                  <p className="text-sm text-muted-foreground">BrowserOS still doesn't work reliably—it depends on Moonbeam API for image processing, making it slower, cloud-dependent, and unable to run with locally hosted Gemini Nano.</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-700">Actually Works</Badge>
            </CardContent>
          </Card>

          {/* vs Other Browsers */}
          <Card className="border-l-4 border-l-green-600 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Target className="w-8 h-8 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">vs Arc/Brave/Chrome</h3>
                  <p className="text-sm text-muted-foreground">AI-first architecture, not bolted-on assistant features</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Purpose-Built</Badge>
            </CardContent>
          </Card>

          {/* Vision Model Support */}
          <Card className="border-l-4 border-l-purple-600 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Eye className="w-8 h-8 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Vision Model Support</h3>
                  <p className="text-sm text-muted-foreground">AI sees and understands page layouts, images, and UI elements for higher quality automation</p>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-700">Advanced AI</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center max-w-3xl mx-auto">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-purple-900 mb-1">Vision Models: Higher Quality, Additional Cost</p>
                <p className="text-xs text-purple-700">
                  Vision-enabled AI provides superior accuracy by understanding visual context, but may increase processing time and API costs. Choose based on your task complexity needs.
                </p>
              </div>
            </div>
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

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
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

    {/* How It Works - Simplified */}
    <section id="how-it-works" className="w-full py-12 md:py-16 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How It Works</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Three simple steps. Complete automation.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="border-0 shadow-lg bg-white relative">
              <div className="absolute -top-4 left-6">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <CardContent className="p-8 pt-10">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Tell Vibe What You Want</h3>
                <p className="text-sm text-muted-foreground">
                  Describe your task in plain language. No coding, no complex commands—just natural conversation.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-0 shadow-lg bg-white relative">
              <div className="absolute -top-4 left-6">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <CardContent className="p-8 pt-10">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">AI Auto-Pilot Takes Over</h3>
                <p className="text-sm text-muted-foreground">
                  Vibe breaks down your task, navigates websites, compares options, and makes intelligent decisions autonomously.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-0 shadow-lg bg-white relative">
              <div className="absolute -top-4 left-6">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <CardContent className="p-8 pt-10">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Get Results</h3>
                <p className="text-sm text-muted-foreground">
                  Review completed tasks, summarized research, or ready-to-submit forms—all done while you focused on what matters.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center p-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto">
            <p className="text-muted-foreground">
              <strong className="text-purple-600">That's it.</strong> One command, zero clicks, complete results.
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
    <section className="w-full py-12 md:py-16 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            FAQ
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Common questions about Vibe Browser
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                How is this different from ChatGPT or other AI browsers?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">Vibe is an <strong>autonomous agent</strong>, not an assistant. ChatGPT and other AI browsers answer questions and give advice—you still do all the work.</p>
                <p className="font-medium text-purple-600">Vibe completes entire tasks for you:</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>✓ Navigates across multiple websites automatically</li>
                  <li>✓ Makes decisions on your behalf</li>
                  <li>✓ Executes complete multi-step workflows</li>
                  <li>✓ Works while you're away from your computer</li>
                </ul>
                <p className="text-sm mt-3 text-muted-foreground italic">Think: ChatGPT tells you how to book a flight. Vibe actually books it.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Is my data safe?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Vibe uses Chrome's built-in AI (Gemini Nano) which runs 100% locally on your device. Your browsing data never leaves your computer. For tasks that need confirmation (like purchases), Vibe always asks before proceeding.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                How much does it cost?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3"><strong>Vibe is free forever</strong> when using:</p>
                <ul className="space-y-1 text-sm ml-4 mb-3">
                  <li>• <strong>Gemini Nano</strong> (Chrome's built-in AI)</li>
                  <li>• <strong>Bring Your Own Model</strong> (BYOM)</li>
                </ul>
                <p className="mb-2">For cloud AI models (GPT-4, Claude, Gemini):</p>
                <ul className="space-y-1 text-sm ml-4">
                  <li>• <strong>$20/month</strong> includes 1,000 queries</li>
                  <li>• Additional usage: $3 per 1M tokens</li>
                </ul>
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
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-2xl text-lg opacity-90 mb-2">
            Pay only for what you use. Or use it completely free.
          </p>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full mt-8 mb-6">
            {/* Free Tier */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-8 text-left">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Free Forever</h3>
                <p className="text-sm opacity-90">No credit card required</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>Gemini Nano</strong> (Chrome built-in AI)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>Bring Your Own Model</strong> (BYOM)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    100% local processing
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    All core features
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-xs opacity-75">
                  💡 Perfect for privacy-conscious users
                </p>
              </div>
            </div>

            {/* Paid Tier */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-8 text-left">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">$20/month</h3>
                <p className="text-sm opacity-90">Cloud AI models included</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>1,000 queries included</strong> monthly
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>Additional usage:</strong> $3 per 1M tokens
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    GPT-5, Claude, Gemini, and other OpenRouter-hosted models access
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    Priority support
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-xs opacity-75">
                  💡 Average: ~500 queries/month
                </p>
              </div>
            </div>
          </div>

          <WaitlistDialog>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100 text-lg px-12 py-6 font-semibold">
              Join Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </WaitlistDialog>

          <p className="text-sm opacity-70 mt-6">
            Early access available now • Free with Gemini Nano or BYOM forever
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
          © 2025 Vibe AI Browser Co-Pilot. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</div>
)
}
