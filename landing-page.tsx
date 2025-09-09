"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WaitlistDialog, ComingSoonDialog } from "./components/waitlist-dialog"
import { CredentialManagement } from "./components/credential-management"
import { AIReasoningEngine } from "./components/ai-reasoning-engine"
import { ChatGPTInterface } from "./components/chatgpt-interface"
import { AIFirstHomepage } from "./components/ai-first-homepage"
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
Cloud,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeDemo, setActiveDemo] = useState<'homepage' | 'chat' | 'reasoning' | 'credentials' | null>(null)
  
  const screenshots = [
    {
      src: "/images/linkedin-automation-3.webp",
      alt: "AI agent processing LinkedIn data through multiple iterations",
      title: "Workflow Automation",
      description: "Automate any workflow, for example, answer to everyone on LinkedIn"
    },
    {
      src: "/images/vibe-ai-configuration.png",
      alt: "Vibe Browser AI Configuration showing multiple LLM providers including OpenAI, Anthropic Claude, and Google Gemini with API key management",
      title: "Multi-LLM Configuration",
      description: "Configure multiple AI providers with secure API key management"
    },
    {
      src: "/images/vibe-chat-interface.png",
      alt: "Vibe Browser ChatGPT-like AI interface with clean chat design and 'What is on your mind?' prompt",
      title: "ChatGPT-like Interface",
      description: "Modern conversational AI interface integrated into the browser"
    },
    {
      src: "/images/vibe-flight-booking-analysis.png",
      alt: "Vibe Browser AI Agent analyzing Google Flights page and providing intelligent recovery strategies",
      title: "Intelligent Flight Booking",
      description: "AI agent analyzes booking challenges and provides smart recovery strategies"
    },
    {
      src: "/images/vibe-browser-demo-elements.webp",
      alt: "LinkedIn page with all interactive HTML elements highlighted and indexed for AI navigation",
      title: "Intelligent Element Detection",
      description: "AI identifies and indexes all interactive elements for smart navigation"
    },
    {
      src: "/images/vibe-browser-demo-linkedin-login.webp",
      alt: "Vibe Browser automatically filling LinkedIn login form with provided credentials",
      title: "Automatic Authentication",
      description: "AI securely handles logins and authentication"
    }
  ]
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % screenshots.length)
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Chrome className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vibe Browser
          </span>
        </div>
    <nav className="flex gap-4 sm:gap-6">
      <Link href="#features" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Features
      </Link>
      <Link href="#how-it-works" className="text-sm font-medium hover:text-purple-600 transition-colors">
      How It Works
      </Link>
      <Link href="#roadmap" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Roadmap
      </Link>
      <Link href="#security" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Security
      </Link>
      <Link href="#demo" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Demo
      </Link>
      <Link href="#pricing" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Download
      </Link>
    </nav>
  </header>

  <main className="flex-1">
    {/* Hero Section */}
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center gap-6 text-center max-w-5xl mx-auto">
          <Badge variant="secondary"
            className="px-4 py-2 text-sm font-medium bg-purple-100 text-purple-700 border-purple-200">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Native Browser • Built on Chromium
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Control Your Browser
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
              With Natural Language
            </span>
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground md:text-xl leading-relaxed">
            The first AI-native web browser that you control entirely by typing or talking. 
            Simply tell Vibe what you want—book flights, fill forms, respond to messages—and 
            watch as it navigates, clicks, and completes tasks across any website.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <WaitlistDialog>
              <Button size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Join Waitlist
              </Button>
            </WaitlistDialog>
            <ComingSoonDialog>
              <Button variant="outline" size="lg"
                className="px-8 py-3 text-lg border-purple-200 hover:bg-purple-50 bg-transparent">
                <Play className="w-5 h-5 mr-2" />
                See It In Action
              </Button>
            </ComingSoonDialog>
          </div>

          {/* Interactive Demo */}

          {/* Browser Screenshot Demo */}
          <div className="mt-12 max-w-6xl w-full">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-4">See Vibe Browser in Action</h3>
              <p className="text-muted-foreground text-lg">
                Real screenshots showing AI-powered browsing, intelligent automation, and seamless integration
              </p>
            </div>

            {/* Screenshot Carousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {screenshots.map((screenshot, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="relative group">
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-200 transition-transform group-hover:scale-[1.02]">
                          <img 
                            src={screenshot.src} 
                            alt={screenshot.alt}
                            className="w-full h-auto" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl pointer-events-none" />
                        </div>
                        <div className="mt-4 text-center">
                          <h4 className="font-semibold text-lg mb-2">{screenshot.title}</h4>
                          <p className="text-sm text-muted-foreground">{screenshot.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Real-time AI Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Multi-Provider Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Intelligent Automation</span>
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

    {/* Live Feature Demos */}
    <section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Experience Vibe Features</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore our implemented features with interactive demos
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              onClick={() => setActiveDemo('homepage')}
              variant={activeDemo === 'homepage' ? 'default' : 'outline'}
              className={activeDemo === 'homepage' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            >
              <Home className="w-4 h-4 mr-2" />
              AI Homepage
            </Button>
            <Button
              onClick={() => setActiveDemo('chat')}
              variant={activeDemo === 'chat' ? 'default' : 'outline'}
              className={activeDemo === 'chat' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat Interface
            </Button>
            <Button
              onClick={() => setActiveDemo('reasoning')}
              variant={activeDemo === 'reasoning' ? 'default' : 'outline'}
              className={activeDemo === 'reasoning' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Reasoning
            </Button>
            <Button
              onClick={() => setActiveDemo('credentials')}
              variant={activeDemo === 'credentials' ? 'default' : 'outline'}
              className={activeDemo === 'credentials' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            >
              <Key className="w-4 h-4 mr-2" />
              Credentials
            </Button>
          </div>

          {activeDemo === 'homepage' && (
            <div className="rounded-2xl overflow-hidden shadow-2xl border">
              <AIFirstHomepage />
            </div>
          )}

          {activeDemo === 'chat' && (
            <div className="rounded-2xl overflow-hidden shadow-2xl border bg-white">
              <ChatGPTInterface />
            </div>
          )}

          {activeDemo === 'reasoning' && (
            <div className="rounded-2xl overflow-hidden shadow-2xl border bg-white">
              <AIReasoningEngine />
            </div>
          )}

          {activeDemo === 'credentials' && (
            <div className="rounded-2xl overflow-hidden shadow-2xl border bg-white">
              <CredentialManagement />
            </div>
          )}

          {!activeDemo && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-semibold mb-2">Select a Demo</h3>
                <p className="text-muted-foreground">
                  Click on any button above to explore our implemented features
                </p>
              </CardContent>
            </Card>
          )}
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

    {/* Team Section */}
    <section className="w-full py-12 md:py-24 lg:py-32">
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
    </section>

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
                Why not OpenAI?
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm"> Runs locally — full access to your cookies, credentials, and
                      sessions.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm"> Supports Chrome extensions — even the ones cloud agents can’t run.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm"> Real-time translation — pages, videos, and audio.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm"> Smart context — ask, summarize, automate anything on any page.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm"> Automates real work — fills forms, replies in Slack, books
                      tickets.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm"> Works on mobile and desktop — your agent, always with you.</span>
                  </li>
                  <li className="flex items-center gap-2"><span>Unlike cloud agents, Vibe is your browser — fully private, fully capable.</span></li>
                </ul>
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
            Be Among the First to Browse Smarter
          </h2>
          <p className="max-w-2xl text-lg opacity-90">
            Vibe Browser is launching soon. Join our waitlist to get early access and exclusive launch pricing when
            we go live.
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
