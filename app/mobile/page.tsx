"use client"

import React, { useState } from "react"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  ArrowRight,
  Smartphone,
  Cloud,
  Zap,
  Shield,
  MessageSquare,
  Bell,
  Mic,
  Camera,
  Share2,
  RefreshCw,
  Server,
  CheckCircle,
  Clock,
  Users,
  Star,
  ChevronRight,
} from "lucide-react"

const HERO_FEATURES = [
  "Deploy a managed OpenClaw instance in minutes",
  "Chat, push, voice, camera — phone-native UX",
  "No Mac mini. No home server. No remote-desktop ritual",
  "Separate sessions for inbox, travel, errands, approvals",
]

const V1_FEATURES = [
  {
    icon: Cloud,
    title: "Managed instance, not a box",
    description:
      "Your OpenClaw runs on managed cloud infrastructure. No hardware to buy, no uptime to manage, no place at home to keep it alive.",
  },
  {
    icon: MessageSquare,
    title: "Real phone-native chat",
    description:
      "A proper chat interface built for a phone screen — not a Telegram thread stretched thin across five workstreams.",
  },
  {
    icon: Bell,
    title: "Push approvals while moving",
    description:
      "Get notified when your assistant needs a decision. Approve or reject from a notification without opening the full app.",
  },
  {
    icon: Mic,
    title: "Voice in, voice out",
    description:
      "Speak a thought, a photo, or a screenshot. Let the assistant do the organizing work while you stay in motion.",
  },
  {
    icon: Camera,
    title: "Camera and share sheet input",
    description:
      "Hand a receipt, a product, a form, or a link directly to your assistant from wherever you already are.",
  },
  {
    icon: RefreshCw,
    title: "Instance controls on the phone",
    description:
      "Restart, reconnect, check status — simple controls that keep your assistant running without opening a terminal.",
  },
]

const V2_FEATURES = [
  {
    icon: Smartphone,
    title: "Local Android runtime",
    description:
      "A future optional path to run OpenClaw directly on your Android phone. Stronger privacy story, no cloud dependency.",
  },
  {
    icon: Shield,
    title: "Your data stays on your device",
    description:
      "Local execution means your messages, files, and context never leave your phone unless you explicitly choose to.",
  },
  {
    icon: Zap,
    title: "Works offline, more or less",
    description:
      "Basic tasks continue without a connection. Cloud sync when you're back online.",
  },
]

const USE_CASES = [
  {
    step: "01",
    title: "Inbox without the drag",
    description:
      "Triage newsletters, draft replies, chase the right thread, and keep approval-worthy messages visible — without living in email all day.",
  },
  {
    step: "02",
    title: "Calendar that moves itself",
    description:
      "Coordinate availability, suggest times, reschedule conflicts, and handle the back-and-forth while you stay focused on the actual meeting.",
  },
  {
    step: "03",
    title: "Errands handled in motion",
    description:
      "Compare products, follow up with support, manage returns, book a table, or sort out a bill while you're standing in line or walking outside.",
  },
  {
    step: "04",
    title: "Travel that stays under control",
    description:
      "Track delays, find alternatives, monitor prices, and keep the approval step tight when a real decision needs your judgment.",
  },
]

const TELEGRAM_COMPARE = [
  {
    dimension: "Context structure",
    telegram: "One endless thread for everything",
    mobile: "Dedicated sessions for inbox, travel, shopping, approvals",
  },
  {
    dimension: "Re-entry",
    telegram: "Scroll back to find where you left off",
    mobile: "Jump into the exact session and decision from a notification",
  },
  {
    dimension: "Input types",
    telegram: "Text, voice, photos — mixed in chat",
    mobile: "Voice-first, camera, share sheet, push approvals — structured",
  },
  {
    dimension: "Multi-domain",
    telegram: "Messages from all channels mixed together",
    mobile: "Session separation keeps workstreams from burying each other",
  },
  {
    dimension: "UX surface",
    telegram: "Chat app repurposed as a product",
    mobile: "Product built for the phone, not squeezed onto it",
  },
]

const MAC_MINI_COMPARE = [
  {
    dimension: "Setup",
    mac: "Buy and place hardware, keep it powered and online",
    mobile: "Install the app and connect your instance in minutes",
  },
  {
    dimension: "Availability",
    mac: "The assistant is somewhere else — remote in when you need it",
    mobile: "Already in your hand when a delay, message, or approval shows up",
  },
  {
    dimension: "Inputs",
    mac: "Mostly chat or remote computer — phone-native surfaces excluded",
    mobile: "Voice notes, camera, screenshots, links, push actions, share sheet",
  },
  {
    dimension: "Sessions",
    mac: "Context collapses into one terminal, one browser, or one chat thread",
    mobile: "Dedicated lanes for inbox, travel, shopping, bills with fast switching",
  },
  {
    dimension: "Who it's for",
    mac: "Power users willing to maintain hardware",
    mobile: "Anyone who wants a personal AI assistant without the setup ceremony",
  },
]

export default function MobilePage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "openclaw-mobile" }),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8eaed]">
      {/* Nav */}
      <header className="border-b border-[#1e1e1e] bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 font-semibold text-[#e8eaed]">
              <div className="w-8 h-8 rounded-lg bg-[#8ab4f8] flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-[#0a0a0a]" />
              </div>
              <span>OpenClaw Mobile</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://openclaw.vibebrowser.app" target="_blank" rel="noopener noreferrer" className="text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              OpenClaw Home
            </Link>
            <Link href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              Docs
            </Link>
            <Link href="#waitlist">
              <Button size="sm" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium rounded-full px-5">
                Join Waitlist
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#8ab4f8]/5 via-transparent to-transparent" />
          <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-1.5 text-sm text-[#9aa0a6] mb-8">
              <Star className="w-3.5 h-3.5 text-[#8ab4f8]" />
              Coming soon — managed mobile first
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight text-[#e8eaed] leading-tight">
              Your personal OpenClaw,<br className="hidden md:block" /> in your pocket.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[#9aa0a6] max-w-2xl mx-auto leading-relaxed">
              OpenClaw Mobile is the phone-native way to launch, chat with, and control your own managed OpenClaw instance — without a Mac mini, a home server, or a remote-desktop ritual.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#waitlist">
                <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full text-base">
                  Join the Waitlist
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="https://openclaw.vibebrowser.app" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full text-base border-[#2a2a2a] bg-transparent hover:bg-[#111111] text-[#e8eaed]">
                  See AgiHouse
                </Button>
              </Link>
            </div>
            <ul className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#9aa0a6]">
              {HERO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#8ab4f8] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why phone */}
        <section className="border-t border-[#1e1e1e] py-20 md:py-28">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <div className="max-w-2xl mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#8ab4f8] mb-3">Why phone wins</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#e8eaed]">
                The strongest personal AI is not a box on a shelf.
              </h2>
              <p className="mt-4 text-[#9aa0a6] leading-relaxed">
                The receipt, the delay, the message, the calendar conflict, and the shopping decision all happen while you are moving through the day. The assistant should already be in your hand when that happens — not waiting on a remote desktop connection.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-[#1e1e1e] rounded-xl p-6 bg-[#111111]">
                <div className="w-10 h-10 rounded-lg bg-[#8ab4f8]/10 flex items-center justify-center mb-4">
                  <Server className="w-5 h-5 text-[#8ab4f8]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] text-lg mb-2">No hardware to babysit</h3>
                <p className="text-sm text-[#9aa0a6] leading-relaxed">
                  A personal AI assistant should not require a spare computer, a free shelf, power cables, and uptime anxiety. Install the app, connect your instance, and go.
                </p>
              </div>
              <div className="border border-[#1e1e1e] rounded-xl p-6 bg-[#111111]">
                <div className="w-10 h-10 rounded-lg bg-[#8ab4f8]/10 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-[#8ab4f8]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] text-lg mb-2">Always there when life happens</h3>
                <p className="text-sm text-[#9aa0a6] leading-relaxed">
                  The assistant is in your pocket when a delay, a message, a receipt, or an approval shows up — not somewhere else, waiting for you to remote in.
                </p>
              </div>
              <div className="border border-[#1e1e1e] rounded-xl p-6 bg-[#111111]">
                <div className="w-10 h-10 rounded-lg bg-[#8ab4f8]/10 flex items-center justify-center mb-4">
                  <MessageSquare className="w-5 h-5 text-[#8ab4f8]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] text-lg mb-2">Sessions, not one long thread</h3>
                <p className="text-sm text-[#9aa0a6] leading-relaxed">
                  Phone-native sessions let inbox, travel, errands, and approvals live in separate lanes — so your context does not collapse into one chat scroll that buries everything.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Telegram proved it */}
        <section className="border-t border-[#1e1e1e] py-20 md:py-28 bg-[#0d0d0d]">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#8ab4f8] mb-3">Telegram proof layer</p>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#e8eaed] mb-6">
                  One Telegram thread is not the product.
                </h2>
                <p className="text-[#9aa0a6] leading-relaxed mb-4">
                  Telegram is great as a transport layer — it works everywhere and users are already on it. And AgiHouse proved that people want a personal AI assistant they can reach from their phone.
                </p>
                <p className="text-[#9aa0a6] leading-relaxed">
                  But one endless chat thread is not a product. It is a workaround. When you are juggling inbox, travel, errands, and approvals at the same time, everything gets mixed together — context collapses, approvals disappear into scrollback, and re-entry means scrolling to find where you left off.
                </p>
                <p className="mt-4 text-[#9aa0a6] leading-relaxed">
                  OpenClaw Mobile is the real product surface: dedicated sessions, a structured approval inbox, push notifications that take you to the right decision, and phone-native inputs that Telegram cannot offer.
                </p>
              </div>
              <div>
                <div className="border border-[#1e1e1e] rounded-xl overflow-hidden">
                  <div className="border-b border-[#1e1e1e] bg-[#1a1a1a] px-4 py-3">
                    <p className="text-xs font-medium text-[#9aa0a6] uppercase tracking-wider">Telegram today</p>
                  </div>
                  <div className="p-4 space-y-3 bg-[#111111]">
                    {[
                      "Hey can you check my calendar?",
                      "Already checked — 2pm looks free",
                      "Great, book the flight",
                      "Wait, don't book yet — need to check prices",
                      "Also this email from Acme needs a reply",
                      "Should I send the proposal doc?",
                      "Let's wait until the call tomorrow",
                    ].map((msg, i) => (
                      <div key={i} className={`rounded-lg px-3 py-2 text-sm ${i % 2 === 0 ? "bg-[#1a1a1a] text-[#9aa0a6]" : "bg-[#8ab4f8]/10 text-[#e8eaed]"}`}>
                        {msg}
                      </div>
                    ))}
                    <div className="border border-dashed border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#5f6368] italic">
                      + 6 months of similar messages, all mixed together
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison: Mobile vs Mac mini */}
        <section className="border-t border-[#1e1e1e] py-20 md:py-28">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#8ab4f8] mb-3">Direct comparison</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#e8eaed]">
                Mobile beats a box at home.
              </h2>
              <p className="mt-4 text-[#9aa0a6] max-w-xl mx-auto">
                A Mac mini running OpenClaw at home is a clever workaround. OpenClaw Mobile is the actual consumer product.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e1e1e]">
                    <th className="text-left py-4 pr-4 text-[#5f6368] font-medium w-32">Dimension</th>
                    <th className="text-left py-4 px-4 text-[#8ab4f8] font-semibold bg-[#8ab4f8]/5 rounded-t-lg">OpenClaw Mobile</th>
                    <th className="text-left py-4 pl-4 text-[#5f6368] font-medium bg-[#111111] rounded-t-lg">OpenClaw on a Mac mini</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e1e]">
                  {MAC_MINI_COMPARE.map((row) => (
                    <tr key={row.dimension} className="border-b border-[#1e1e1e]/50">
                      <td className="py-4 pr-4 text-[#9aa0a6] align-top font-medium">{row.dimension}</td>
                      <td className="py-4 px-4 text-[#e8eaed] align-top bg-[#8ab4f8]/5">{row.mobile}</td>
                      <td className="py-4 pl-4 text-[#9aa0a6] align-top bg-[#111111]">{row.mac}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* V1 features */}
        <section className="border-t border-[#1e1e1e] py-20 md:py-28 bg-[#0d0d0d]">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <div className="max-w-2xl mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1 text-xs text-[#9aa0a6] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8ab4f8]" />
                Available first — managed mobile
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#e8eaed]">
                What you get in v1
              </h2>
              <p className="mt-4 text-[#9aa0a6] leading-relaxed">
                OpenClaw Mobile v1 is a phone-native control plane and chat surface for a managed OpenClaw instance. No hardware required. Deploy your instance in minutes and use it from the app.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {V1_FEATURES.map((f) => (
                <div key={f.title} className="border border-[#1e1e1e] rounded-xl p-6 bg-[#111111]">
                  <div className="w-10 h-10 rounded-lg bg-[#8ab4f8]/10 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-[#8ab4f8]" />
                  </div>
                  <h3 className="font-semibold text-[#e8eaed] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#9aa0a6] leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* V2 story */}
        <section className="border-t border-[#1e1e1e] py-20 md:py-28">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <div className="max-w-2xl mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1 text-xs text-[#9aa0a6] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9aa0a6]" />
                Coming later — local Android
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#e8eaed]">
                OpenClaw Local for Android
              </h2>
              <p className="mt-4 text-[#9aa0a6] leading-relaxed">
                After v1 proves demand, a local Android runtime path is the natural second act. Stronger privacy story, no cloud dependency, and deeper ownership — but only after the managed path has validated real user demand.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {V2_FEATURES.map((f) => (
                <div key={f.title} className="border border-[#1e1e1e] rounded-xl p-6 bg-[#111111]">
                  <div className="w-10 h-10 rounded-lg bg-[#9aa0a6]/10 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-[#9aa0a6]" />
                  </div>
                  <h3 className="font-semibold text-[#e8eaed] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#9aa0a6] leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]">
              <p className="text-sm text-[#9aa0a6]">
                <strong className="text-[#e8eaed]">Important:</strong> OpenClaw Local for Android is a future roadmap item, not a current feature. It will only be pursued after managed mobile has validated real demand.
              </p>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="border-t border-[#1e1e1e] py-20 md:py-28 bg-[#0d0d0d]">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#8ab4f8] mb-3">What it handles</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#e8eaed]">
                Start with what already happens on the phone
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {USE_CASES.map((uc) => (
                <div key={uc.step} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-[#8ab4f8]">{uc.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#e8eaed] mb-2">{uc.title}</h3>
                    <p className="text-sm text-[#9aa0a6] leading-relaxed">{uc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="border-t border-[#1e1e1e] py-20 md:py-28">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] mb-6">
              <Shield className="w-5 h-5 text-[#8ab4f8]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#e8eaed] mb-4">
              Useful only if it stays controllable
            </h2>
            <p className="text-[#9aa0a6] max-w-xl mx-auto leading-relaxed mb-12">
              Personal AI should not mean blind autonomy. OpenClaw Mobile earns trust by doing the prep work, asking clearly, and leaving a visible trail.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { label: "Approval gates", desc: "Sends, bookings, purchases, and account changes require your sign-off." },
                { label: "Visible activity logs", desc: "Every action and suggested next step stays traceable." },
                { label: "Permission-driven", desc: "Integrations ask for access explicitly — no hidden background magic." },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="font-semibold text-[#e8eaed] mb-2">{item.label}</p>
                  <p className="text-sm text-[#9aa0a6]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-[#1e1e1e] py-20 md:py-28 bg-[#0d0d0d]">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#e8eaed] mb-10 text-center">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-3">
              <AccordionItem value="what" className="border border-[#1e1e1e] bg-[#111111] rounded-lg px-5">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline py-5">
                  What is OpenClaw Mobile?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6] pb-5 leading-relaxed">
                  OpenClaw Mobile is the phone-native version of OpenClaw — a personal AI assistant you can launch and use from your phone without buying hardware or managing a home server. It connects to a managed OpenClaw instance deployed on AgiHouse infrastructure.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="vs-telegram" className="border border-[#1e1e1e] bg-[#111111] rounded-lg px-5">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline py-5">
                  Why not just use the Telegram bot?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6] pb-5 leading-relaxed">
                  Telegram proved that people want to reach their personal AI from their phone — and it works well as a transport layer. But one endless chat thread is not a product surface. Mobile gives you dedicated sessions, an approval inbox, push notifications that jump to the right decision, and phone-native inputs that Telegram cannot offer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="vs-macmini" className="border border-[#1e1e1e] bg-[#111111] rounded-lg px-5">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline py-5">
                  Why is this better than running OpenClaw on a Mac mini at home?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6] pb-5 leading-relaxed">
                  Most people do not want to buy hardware, find a place to host it, keep it online, and remote into it from a phone. A phone-native product is simpler to adopt, always available when life happens, and gives you better inputs (voice, camera, share sheet) and better session UX than a remote desktop connection.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="managed" className="border border-[#1e1e1e] bg-[#111111] rounded-lg px-5">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline py-5">
                  What does &quot;managed&quot; mean?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6] pb-5 leading-relaxed">
                  Your OpenClaw instance runs on cloud infrastructure managed by AgiHouse — the same managed hosting service that already handles Telegram-based deployments. You do not buy or maintain any hardware. The instance is always on, auto-updated, and monitored.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="local" className="border border-[#1e1e1e] bg-[#111111] rounded-lg px-5">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline py-5">
                  What about local Android? Is that real?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6] pb-5 leading-relaxed">
                  OpenClaw Local for Android is a future roadmap item, not a current feature. After the managed mobile product proves real demand, we may pursue a local Android runtime path — stronger privacy, no cloud dependency, deeper ownership. We will not announce it as a feature until we are committed to building it.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="control" className="border border-[#1e1e1e] bg-[#111111] rounded-lg px-5">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline py-5">
                  How much control do I keep?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6] pb-5 leading-relaxed">
                  A lot. The operating model is approvals first — the assistant prepares the work, recommends the next move, and asks for permission before high-impact actions like sends, bookings, purchases, or account changes. Nothing happens without your sign-off.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="availability" className="border border-[#1e1e1e] bg-[#111111] rounded-lg px-5">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline py-5">
                  When will this be available?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6] pb-5 leading-relaxed">
                  We are validating demand before committing to the first release. Join the waitlist and you will be among the first to know when we open early access — and you will get a chance to shape what v1 looks like.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section id="waitlist" className="border-t border-[#1e1e1e] py-20 md:py-28">
          <div className="container mx-auto max-w-2xl px-4 md:px-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] mb-6">
              <Users className="w-5 h-5 text-[#8ab4f8]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#e8eaed] mb-4">
              Join the waitlist
            </h2>
            <p className="text-[#9aa0a6] mb-10 leading-relaxed">
              We are validating whether people want a phone-native personal AI assistant — simpler to adopt, always with them, and better structured than a chat-only interface. Sign up to get early access and a chance to shape the first version.
            </p>
            {submitted ? (
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]">
                <CheckCircle className="w-8 h-8 text-[#8ab4f8]" />
                <p className="font-semibold text-[#e8eaed]">You&apos;re on the list.</p>
                <p className="text-sm text-[#9aa0a6]">We&apos;ll reach out when early access opens.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#e8eaed] placeholder-[#5f6368] text-sm focus:outline-none focus:border-[#8ab4f8] transition-colors"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium rounded-full px-6 py-3 h-auto whitespace-nowrap disabled:opacity-50"
                >
                  {submitting ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>
            )}
            <p className="mt-4 text-xs text-[#5f6368]">No spam. Just launch notes and early access.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[#5f6368]">
              <Link href="https://openclaw.vibebrowser.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#9aa0a6] transition-colors">
                AgiHouse →
              </Link>
              <Link href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer" className="hover:text-[#9aa0a6] transition-colors">
                Documentation →
              </Link>
              <Link href="https://t.me/OpenClawBoxBot" target="_blank" rel="noopener noreferrer" className="hover:text-[#9aa0a6] transition-colors">
                Telegram Bot →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
