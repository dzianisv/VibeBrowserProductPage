"use client"

import React, { useState } from "react"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import {
  Smartphone,
  Bot,
  Shield,
  Zap,
  Clock,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Globe,
  Lock,
  Mail,
  Calendar,
  ShoppingCart,
  Car,
  Home,
  CreditCard,
  MapPin,
  FileText,
  Send,
  ChevronRight,
  Play,
} from "lucide-react"

const USE_CASES = [
  {
    icon: <Calendar className="w-5 h-5" />,
    title: "Schedule Management",
    description: "Your AI reads your calendar, finds gaps, negotiates meeting times, and confirms events — while you sleep.",
    example: "AI: \"Found a 30-min gap Thursday 2-4pm. Email sent to Sarah to confirm the 2:30pm sync.\"",
    color: "#8ab4f8",
  },
  {
    icon: <ShoppingCart className="w-5 h-5" />,
    title: "Online Shopping",
    description: "AI researches products, compares prices, finds coupons, and completes purchases with your approval.",
    example: "AI: \"Found the same headphones for $40 less. Want me to order with your saved payment?\"",
    color: "#81c995",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email Triage",
    description: "AI sorts your inbox, drafts responses, handles scheduling requests, and escalates what needs your attention.",
    example: "AI: \"Auto-responded to 12 emails. Flagged 3 as important: vendor contract, recruiter, flight confirmation.\"",
    color: "#fdd663",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Travel & Logistics",
    description: "AI books rides, finds restaurant reservations, researches routes, and manages travel itineraries.",
    example: "AI: \"Flight delayed 2h. Rebooked you on the next available. New itinerary saved.\"",
    color: "#c58af9",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Bills & Finances",
    description: "AI tracks subscriptions, finds billing errors, negotiates fees, and optimizes your recurring payments.",
    example: "AI: \"Your streaming bundle is $18/mo. Found a promo rate at $12. Switch now?\"",
    color: "#f28b82",
  },
  {
    icon: <Home className="w-5 h-5" />,
    title: "Personal Admin",
    description: "AI fills forms, manages passwords, updates profiles, and handles life admin across services.",
    example: "AI: \"Insurance renewal form auto-filled. Review and sign the attached PDF.\"",
    color: "#81c995",
  },
]

const FEATURES = [
  {
    title: "Hosted AI Brain",
    description: "A cloud-based OpenClaw agent that runs 24/7. Doesn't drain your battery or require your phone to be on.",
    icon: <Bot className="w-5 h-5" />,
    color: "#8ab4f8",
  },
  {
    title: "Mobile-First Actions",
    description: "Built for the apps you use daily: Gmail, Calendar, Amazon, Uber, banking apps, and 50+ more.",
    icon: <Smartphone className="w-5 h-5" />,
    color: "#81c995",
  },
  {
    title: "Approval Workflows",
    description: "AI suggests actions, you approve. Full control over what it can do automatically vs. what needs your sign-off.",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "#fdd663",
  },
  {
    title: "Privacy-First Architecture",
    description: "Your data stays in your control. Optional local processing, encrypted storage, and no training on your data.",
    icon: <Shield className="w-5 h-5" />,
    color: "#c58af9",
  },
  {
    title: "Continuous Learning",
    description: "MobileClaw gets better over time. It learns your preferences, routines, and communication style.",
    icon: <Zap className="w-5 h-5" />,
    color: "#f28b82",
  },
  {
    title: "Works While You Sleep",
    description: "Your personal AI never rests. It handles tasks asynchronously across time zones while you're offline.",
    icon: <Clock className="w-5 h-5" />,
    color: "#8ab4f8",
  },
]

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect Your Accounts",
    description: "Link the services you want AI to manage: email, calendar, shopping, banking, and more. OAuth-based, read/write permissions you control.",
  },
  {
    step: "02",
    title: "Define Your Preferences",
    description: "Tell MobileClaw your priorities: \"Always book the cheapest flight under $500\" or \"Only auto-respond to newsletters.\" It learns from feedback.",
  },
  {
    step: "03",
    title: "AI Starts Working",
    description: "MobileClaw begins handling tasks proactively. It suggests actions, learns from your approvals, and grows more autonomous over time.",
  },
]

const FAQ_ITEMS = [
  {
    question: "Is this available now?",
    answer: "Not yet. MobileClaw is a concept/waitlist page. We're building it because mobile is the next frontier for autonomous AI assistants. Join the waitlist to be first in line.",
  },
  {
    question: "Why Android first?",
    answer: "Android's permission system and app ecosystem make it easier to build a deeply integrated AI assistant. We'll move to iOS once we've proven the model.",
  },
  {
    question: "How is this different from Siri, Google Assistant, or Alexa?",
    answer: "Traditional assistants are rule-based and reactive — they wait for commands. MobileClaw is proactive and autonomous. It takes initiative, learns your preferences, and completes multi-step tasks on your behalf.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes. We're building MobileClaw with a privacy-first architecture: encrypted storage, optional local processing, no training on your personal data, and granular permission controls. You own your data.",
  },
  {
    question: "How much will it cost?",
    answer: "Pricing hasn't been finalized. We're exploring a subscription model similar to GitHub Copilot — a monthly fee for unlimited AI actions. Early waitlist members will get preferential pricing.",
  },
  {
    question: "Can I use it with Vibe Browser?",
    answer: "Yes! MobileClaw is designed to work alongside Vibe Browser. Your cloud AI assistant can trigger browser workflows, and your desktop browser sessions can hand off to your mobile AI. They're part of the same ecosystem.",
  },
]

export default function MobileClawPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#e8eaed] overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b border-[#1e1e1e] bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/vibebrowser-logo.png" alt="Vibe AI Browser" className="w-9 h-9 object-contain" />
          <span className="text-lg font-medium text-[#e8eaed]">
            MobileClaw<span className="text-[#9aa0a6]"> · Mobile AI Assistant</span>
          </span>
        </div>
        <nav aria-label="Main navigation" className="hidden md:flex gap-6 items-center text-sm">
          <a href="#why-mobile" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">Why Mobile</a>
          <a href="#how-it-works" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">How It Works</a>
          <a href="#use-cases" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">Use Cases</a>
          <a href="#privacy" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">Privacy</a>
          <a href="#faq" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">FAQ</a>
        </nav>
        <div className="flex gap-3 items-center">
          <Link href="/" className="text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors hidden sm:block">
            Vibe Browser
          </Link>
          <WaitlistDialog>
            <Button size="sm" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium rounded-full">
              Join Waitlist
            </Button>
          </WaitlistDialog>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-[#8ab4f8]/10 text-[#8ab4f8] border-[#8ab4f8]/20">
                <Smartphone className="w-4 h-4 mr-2" />
                Coming to Android First
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl text-[#e8eaed]">
                  Your AI Personal Assistant
                  <br className="hidden sm:block" />
                  <span className="text-[#8ab4f8]"> now lives on your phone</span>
                </h1>
                <p className="text-xl text-[#9aa0a6] max-w-2xl mx-auto">
                  A hosted OpenClaw-style agent that works 24/7 on your mobile. It books, schedules, researches, and negotiates — so you don't have to.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <WaitlistDialog>
                  <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                    <Mail className="mr-2 h-5 w-5" />
                    Join the Waitlist
                  </Button>
                </WaitlistDialog>
                <Button asChild size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#8ab4f8]">
                  <a href="#use-cases">
                    <Play className="mr-2 h-5 w-5" />
                    See It In Action
                  </a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#9aa0a6] mt-8 pt-8 border-t border-[#1e1e1e]">
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#8ab4f8]" />
                  OpenClaw-powered
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy-first design
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  24/7 autonomous
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  You control permissions
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Works while you sleep
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Mobile Matters */}
        <section id="why-mobile" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Why a mobile AI assistant?
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Your phone is always with you. It's your connection to the world — banking, shopping, communication, travel. An AI that lives on your phone can actually get things done.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-[#0a0a0a] border-[#2a2a2a]">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-[#8ab4f8]/10 flex items-center justify-center mb-3">
                    <Smartphone className="w-5 h-5 text-[#8ab4f8]" />
                  </div>
                  <h3 className="font-medium text-[#e8eaed] mb-2">Always Connected</h3>
                  <p className="text-sm text-[#9aa0a6]">
                    Unlike desktop AI, mobile assistants can act in real-time. Flight changes, urgent emails, time-sensitive deals — handled instantly.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0a0a0a] border-[#2a2a2a]">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-[#81c995]/10 flex items-center justify-center mb-3">
                    <Globe className="w-5 h-5 text-[#81c995]" />
                  </div>
                  <h3 className="font-medium text-[#e8eaed] mb-2">Your Digital Life</h3>
                  <p className="text-sm text-[#9aa0a6]">
                    Mobile is where your accounts live: banking apps, shopping, travel bookings, messaging. A mobile AI has access to everything.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0a0a0a] border-[#2a2a2a]">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-[#fdd663]/10 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-[#fdd663]" />
                  </div>
                  <h3 className="font-medium text-[#e8eaed] mb-2">Works While You Sleep</h3>
                  <p className="text-sm text-[#9aa0a6]">
                    Hosted AI doesn't need your phone. It operates 24/7 across time zones, handling async tasks while you're offline.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                How MobileClaw works
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Built on the same OpenClaw framework that powers Vibe Browser's autonomous agents — now running in the cloud, accessible from your phone.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {HOW_IT_WORKS.map((item, index) => (
                <div key={item.step} className="relative">
                  {index < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] right-0 h-px bg-[#2a2a2a]" />
                  )}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl bg-[#8ab4f8]/10 border border-[#8ab4f8]/20 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-[#8ab4f8]">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-medium text-[#e8eaed] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#9aa0a6]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                What MobileClaw can do
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Real tasks, autonomously executed. Here are examples of what your AI assistant can handle today.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {USE_CASES.map((useCase) => (
                <Card key={useCase.title} className="bg-[#0a0a0a] border-[#2a2a2a]">
                  <CardContent className="p-6">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${useCase.color}15` }}
                    >
                      <div style={{ color: useCase.color }}>{useCase.icon}</div>
                    </div>
                    <h3 className="font-medium text-[#e8eaed] mb-2">{useCase.title}</h3>
                    <p className="text-sm text-[#9aa0a6] mb-4">{useCase.description}</p>
                    <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-3">
                      <p className="text-xs text-[#81c995] font-medium mb-1">Example:</p>
                      <p className="text-xs text-[#9aa0a6] italic">{useCase.example}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Built on OpenClaw, designed for mobile
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                MobileClaw brings the autonomous agent technology from Vibe Browser to your pocket.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature) => (
                <Card key={feature.title} className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <CardContent className="p-5">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <div style={{ color: feature.color }}>{feature.icon}</div>
                    </div>
                    <h3 className="font-medium text-[#e8eaed] mb-2">{feature.title}</h3>
                    <p className="text-sm text-[#9aa0a6]">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section id="privacy" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                  Privacy-first by design
                </h2>
                <p className="text-[#9aa0a6] mb-6">
                  We learned from building Vibe Browser: AI assistants need to earn trust. MobileClaw is built with privacy as a first principle, not an afterthought.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                    <Lock className="w-5 h-5 text-[#8ab4f8] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">You own your data</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        Your messages, calendar events, and preferences stay yours. We never train on your personal data.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                    <Shield className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">Encrypted storage</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        All data at rest is encrypted. We use industry-standard encryption for everything stored in our cloud.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                    <CheckCircle className="w-5 h-5 text-[#fdd663] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">Granular permissions</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        Control exactly what AI can access. Revoke permissions anytime. No hidden access.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] rounded-xl border border-[#2a2a2a] p-6">
                <h3 className="text-lg font-medium text-[#e8eaed] mb-4">Hosted vs. Self-Hosted</h3>
                <p className="text-sm text-[#9aa0a6] mb-6">
                  MobileClaw runs in our cloud by default — that's how it works 24/7 without draining your battery. If you prefer, we'll offer a self-hosted option for maximum control.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#81c995] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#9aa0a6]">Works 24/7 even when phone is off</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#81c995] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#9aa0a6]">No local processing required</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#81c995] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#9aa0a6]">Automatic updates & improvements</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#81c995] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#9aa0a6]">Self-hosted option coming later</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ecosystem - Vibe Connection */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Part of the Vibe ecosystem
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                MobileClaw works alongside Vibe Browser. Your AI assistant can trigger browser workflows, and your desktop can hand off tasks to mobile.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#8ab4f8]/10 flex items-center justify-center mx-auto mb-3">
                    <Smartphone className="w-6 h-6 text-[#8ab4f8]" />
                  </div>
                  <h3 className="font-medium text-[#e8eaed] mb-2">MobileClaw</h3>
                  <p className="text-sm text-[#9aa0a6]">
                    Your AI assistant on Android. Handles mobile tasks, notifications, and real-time actions.
                  </p>
                </CardContent>
              </Card>
              <div className="flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-[#5f6368]" />
              </div>
              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#81c995]/10 flex items-center justify-center mx-auto mb-3">
                    <Bot className="w-6 h-6 text-[#81c995]" />
                  </div>
                  <h3 className="font-medium text-[#e8eaed] mb-2">Vibe Browser</h3>
                  <p className="text-sm text-[#9aa0a6]">
                    Your AI co-pilot on desktop. Complex research, automation, and browser-based workflows.
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-sm text-[#5f6368] mt-8 max-w-xl mx-auto">
              Same AI brain, different interfaces. Start a task on your phone, continue it on your laptop. One assistant, unified context.
            </p>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Join the waitlist
              </h2>
              <p className="text-[#9aa0a6]">
                MobileClaw is coming. Be the first to know when Android early access opens — and get preferential pricing.
              </p>
            </div>

            <WaitlistDialog>
              <Button size="lg" className="w-full sm:w-auto bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                <Mail className="mr-2 h-5 w-5" />
                Get Early Access
              </Button>
            </WaitlistDialog>

            <p className="text-center text-xs text-[#5f6368] mt-6">
              No spam. Unsubscribe anytime. Early waitlist members get exclusive pricing.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Frequently asked questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-[#2a2a2a]">
                  <AccordionTrigger className="text-[#e8eaed] hover:text-[#8ab4f8] text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#9aa0a6]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
