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
      id: 'forbes-stock-pick',
      title: 'Stock Investment Research Demo',
      subtitle: 'Multi-page control and step-by-step reasoning',
      description: 'Watch our AI agent perform comprehensive stock research across multiple pages',
      task: {
        label: 'Research Task:',
        description: 'I ran a Vibe Browser research task: "Pick the best stock for me to invest in today." This demonstrates multi-page control and step-by-step reasoning — all using an affordable OpenAI model (GPT-5 Mini). Surprised by how well it reasons!'
      },
      badges: ['Stock Analysis', 'Multi-page Control', 'Step-by-step Reasoning', 'GPT-5-mini Powered'],
      videoSrc: '/forbes-pick-a-stock-demo',
      icon: TrendingUp,
      iconColor: 'text-blue-600',
      highlights: [
        { icon: TrendingUp, title: 'Market Research', description: 'Analyze multiple sources for investment insights' },
        { icon: Brain, title: 'Step-by-step Reasoning', description: 'Logical decision-making process' },
        { icon: Target, title: 'Optimal Selection', description: 'Identify the best investment opportunity' }
      ]
    },
    {
      id: 'morningstar',
      title: 'Article Summarization Demo',
      subtitle: 'AI-powered content analysis and summarization',
      description: 'Watch our AI agent analyze and summarize a Morningstar article about "33 Undervalued Stocks to Buy in Q3 2025"',
      task: {
        label: 'Content Analysis Task:',
        description: 'Summarize the key insights from Morningstar\'s article on undervalued stocks, extracting investment opportunities and market analysis.'
      },
      badges: ['Article Analysis', 'Content Extraction', 'Smart Summarization', 'Financial Insights'],
      videoSrc: '/morningstar-summarization-demo',
      icon: BookOpen,
      iconColor: 'text-blue-600',
      highlights: [
        { icon: TrendingUp, title: 'Market Analysis', description: 'Extract key market trends and opportunities' },
        { icon: FileText, title: 'Smart Summarization', description: 'Condense complex financial articles instantly' },
        { icon: Target, title: 'Key Insights', description: 'Identify the most important investment ideas' }
      ]
    },
    {
      id: 'nightmode',
      title: 'Night Mode Browser Demo',
      subtitle: 'Enhanced dark theme for comfortable nighttime browsing',
      description: 'Experience our intelligent night mode that automatically adapts websites for optimal viewing in low-light conditions',
      task: {
        label: 'Feature Demonstration:',
        description: 'Showcase the browser\'s night mode capabilities including automatic color inversion, blue light reduction, and contrast optimization for better readability in dark environments.'
      },
      badges: ['Dark Theme', 'Eye Protection', 'Smart Adaptation', 'UI Enhancement'],
      videoSrc: '/night-mode-demo',
      icon: Moon,
      iconColor: 'text-indigo-600',
      highlights: [
        { icon: Palette, title: 'Smart Color Inversion', description: 'Intelligently inverts colors while preserving images' },
        { icon: Eye, title: 'Eye Protection', description: 'Reduces blue light for comfortable night browsing' },
        { icon: Sparkles, title: 'Adaptive Contrast', description: 'Automatically optimizes contrast for readability' }
      ]
    },
    {
      id: 'defi',
      title: 'DeFi Investment Research Demo',
      subtitle: 'Complex financial analysis with risk assessment',
      description: 'Our AI agent (powered by OpenAI GPT-5-mini) performs complex DeFi investment research',
      task: {
        label: 'Research Assignment:',
        description: 'Assess risks of different pools on app.morpho.org/ethereum/earn. Pick one pool where I can invest USDC with less risk, with supply APY around 10%. I need pools with reliable collateral like ETH, BTC, USDC, USDe, USDT or wrappers. No shitcoins or risky assets.'
      },
      badges: ['DeFi Analysis', 'Risk Assessment', 'Real-time Research', 'GPT-5-mini Powered'],
      videoSrc: '/vibe-extension-demo',
      icon: Shield,
      iconColor: 'text-green-600',
      highlights: [
        { icon: Search, title: 'Intelligent Navigation', description: 'Navigate complex DeFi interfaces autonomously' },
        { icon: Shield, title: 'Risk Analysis', description: 'Evaluate collateral types and pool safety metrics' },
        { icon: Target, title: 'Decision Making', description: 'Filter and select optimal investment options' }
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
            Autonomous Web Agent • Not Just Another AI Tool
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            The Agentic Browser That Works
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
              For You, Not With You
            </span>
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground md:text-xl leading-relaxed mb-12">
            Unlike AI chatbots that assist browsing, Vibe is an autonomous web agent that takes full control.
            Just say "book my flight to NYC" or "find me the cheapest insurance" and watch as it researches,
            compares, navigates multiple sites, and completes entire workflows—all on its own.
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
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={`${demos[currentDemo].videoSrc}.webm`} type="video/webm" />
                    <source src={`${demos[currentDemo].videoSrc}.mp4`} type="video/mp4" />
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

    {/* The Difference - Clear Value Proposition */}
    <section className="w-full py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Stop clicking. Start commanding.
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional AI Tools */}
            <Card className="border-2 border-gray-200 bg-white/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-600">Traditional "AI Browsers"</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">❌</span>
                    <span>You browse, AI suggests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">❌</span>
                    <span>Summarize what you're already looking at</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">❌</span>
                    <span>Answer questions about current page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">❌</span>
                    <span>You still do all the work</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Vibe Browser */}
            <Card className="border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Vibe: True Autonomous Agent
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="font-medium">AI drives, you relax</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="font-medium">Completes entire multi-step tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="font-medium">Navigates across multiple sites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="font-medium">Makes decisions and takes action</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg font-medium">
              One command. Complete execution. Zero manual work.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              "Find me the best mortgage rate" → Vibe visits 10+ lenders, compares rates, fills applications
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Real Examples Section */}
    <section className="w-full py-12 md:py-16">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Real Tasks. Zero Clicks. Full Automation.
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Here's what happens when you give Vibe a command
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Example 1 */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4">
                <Badge className="bg-blue-100 text-blue-700">You say:</Badge>
                <p className="font-semibold mt-2">"Find me the best credit card for travel rewards"</p>
              </div>
              <div>
                <Badge className="bg-purple-100 text-purple-700">Vibe does:</Badge>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>→ Visits 15+ bank websites</li>
                  <li>→ Analyzes reward programs</li>
                  <li>→ Compares annual fees vs benefits</li>
                  <li>→ Creates comparison spreadsheet</li>
                  <li>→ Fills pre-qualification forms</li>
                  <li>→ Presents top 3 recommendations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Example 2 */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4">
                <Badge className="bg-blue-100 text-blue-700">You say:</Badge>
                <p className="font-semibold mt-2">"Book a rental car for my Miami trip"</p>
              </div>
              <div>
                <Badge className="bg-purple-100 text-purple-700">Vibe does:</Badge>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>→ Checks your calendar for dates</li>
                  <li>→ Searches all major rental sites</li>
                  <li>→ Applies discount codes</li>
                  <li>→ Compares insurance options</li>
                  <li>→ Selects best value deal</li>
                  <li>→ Completes booking with your info</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Example 3 */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4">
                <Badge className="bg-blue-100 text-blue-700">You say:</Badge>
                <p className="font-semibold mt-2">"Research and buy a good air purifier under $300"</p>
              </div>
              <div>
                <Badge className="bg-purple-100 text-purple-700">Vibe does:</Badge>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>→ Reads expert review sites</li>
                  <li>→ Checks Reddit recommendations</li>
                  <li>→ Compares specs & room coverage</li>
                  <li>→ Finds best prices across stores</li>
                  <li>→ Checks for coupons & deals</li>
                  <li>→ Adds to cart & initiates checkout</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl max-w-3xl mx-auto">
          <p className="text-lg font-semibold mb-2">
            🎯 The Key Difference:
          </p>
          <p className="text-muted-foreground">
            You don't watch Vibe work. You don't click "next" buttons. You don't copy-paste between tabs.
            <br/>
            <strong className="text-purple-600">You give one command and come back to completed results.</strong>
          </p>
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Stop Being Your Own Assistant
          </h2>
          <p className="max-w-2xl text-lg opacity-90">
            Join thousands who are tired of clicking through endless tabs. Get early access to the first browser
            that actually does the work for you.
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
  <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
    <p className="text-xs text-muted-foreground">© 2025 Vibe Browser. All rights reserved.</p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
      Privacy Policy
      </Link>
      <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
      Terms of Service
      </Link>
      <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
      Support
      </Link>
      <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
      Blog
      </Link>
    </nav>
  </footer>
</div>
)
}
