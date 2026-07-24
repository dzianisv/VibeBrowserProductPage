"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Camera,
  MessageSquare,
  Sparkles,
  Sun,
  LayoutGrid,
  BookOpen,
  ArrowRight,
  Download,
  Play,
} from "lucide-react"

const APK_URL =
  "https://github.com/dzianisv/TaroAiScanner/releases/latest/download/mystic-tarot.apk"
// Placeholder — Mystic Tarot is in closed testing on Google Play; public listing not live yet.
const PLAY_URL = "#"

const FEATURES = [
  {
    icon: Camera,
    title: "AI card scanner",
    body: "Aim your camera at a real tarot card and let the Gemini Vision AI read it. The only tarot app that interprets your physical deck.",
  },
  {
    icon: MessageSquare,
    title: "AI Tarot Master chat",
    body: "Ask anything. Chat in real time with a wise AI reader, upload photos of your spreads, and get detailed, context-aware guidance.",
  },
  {
    icon: Sparkles,
    title: "Virtual card draw",
    body: "No cards? Focus your energy and pull an interactive, flipped card from the digital deck for instant clarity.",
  },
  {
    icon: Sun,
    title: "Daily guidance",
    body: "Start each day with an instant reading on your current cosmic energy and the advice you need most.",
  },
  {
    icon: LayoutGrid,
    title: "Choose your spread",
    body: "Select a spread pattern before you scan, from a single-card pull to a full layout, plus full upright & reversed meanings for the complete Major and Minor Arcana.",
  },
  {
    icon: BookOpen,
    title: "Your private journal",
    body: "Every reading is saved securely on your device so you can revisit your journey any time, even offline.",
  },
]

const STEPS = [
  {
    n: "01",
    title: "Pick your spread",
    body: "Choose a spread pattern and open the camera — or tap to draw a virtual card from the digital deck.",
  },
  {
    n: "02",
    title: "Let the AI read",
    body: "The AI recognizes each card and interprets it for your question, with full upright and reversed meanings.",
  },
  {
    n: "03",
    title: "Go deeper",
    body: "Save the reading and chat with your AI Tarot Master to explore love, career, growth, and intuition.",
  },
]

const FAQ = [
  {
    q: "What is Mystic Tarot?",
    a: "Mystic Tarot is an AI-powered tarot reading app for Android. Point your camera at a physical tarot card and Gemini Vision AI recognizes it and delivers a personalized interpretation, or draw a card from the animated digital deck. You can then chat with your own AI Tarot Master to go deeper.",
  },
  {
    q: "Can it really scan my physical tarot cards?",
    a: "Yes. Aim your camera at a real tarot card and the AI reads it. Mystic Tarot is the only tarot app that interprets your physical deck with camera scanning, powered by Gemini Vision.",
  },
  {
    q: "Do I need a physical deck to use it?",
    a: "No. If you don't have cards handy, focus your energy and pull an interactive, flipped card from the digital Major Arcana deck for an instant reading.",
  },
  {
    q: "Is there a free tarot reading?",
    a: "Yes. You can begin with free readings and daily guidance. Upgrade to Mystic Premium for unlimited AI interpretations, unlimited scans, and the full Tarot Master chat experience.",
  },
  {
    q: "Are my readings saved and private?",
    a: "Every reading is saved securely on your device in a private journal so you can revisit your journey any time, even offline.",
  },
  {
    q: "Is Mystic Tarot for entertainment?",
    a: "Yes. Mystic Tarot is for entertainment and self-reflection.",
  },
]

export default function TarotProductPage() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mystic Tarot: AI Card Reader",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Android",
    url: "https://agentlabs.cc/products/mystic-tarot",
    downloadUrl: APK_URL,
    description:
      "Mystic Tarot turns your phone into an AI-powered oracle. Scan your real tarot cards with AI, draw a digital deck for instant readings, and chat with your own AI Tarot Master.",
    featureList: FEATURES.map((f) => f.title),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Organization",
      name: "Vibe Technologies LLC",
      url: "https://agentlabs.cc",
    },
    publisher: {
      "@type": "Organization",
      name: "Vibe Technologies LLC",
      url: "https://agentlabs.cc",
    },
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#e8eaed]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-[#3c4043] bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/products"
            className="font-semibold text-lg tracking-tight text-[#e8eaed] hover:text-white transition-colors"
          >
            Mystic <span className="text-[#fdd663]">Tarot</span>
          </Link>
          <div className="flex items-center gap-3">
            <a href="#features" className="hidden sm:inline text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              Features
            </a>
            <a href="#how" className="hidden sm:inline text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              How it works
            </a>
            <a href="#faq" className="hidden sm:inline text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              FAQ
            </a>
            <Button asChild className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] text-sm font-medium" size="sm">
              <a href={APK_URL}>Download APK</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="rounded-full bg-[#81c995]/10 px-3 py-1 text-xs font-medium text-[#81c995] border border-[#81c995]/20">
              Android · Lifestyle
            </span>
            <span className="rounded-full bg-[#fdd663]/10 px-3 py-1 text-xs font-medium text-[#fdd663] border border-[#fdd663]/20">
              AI card scanner
            </span>
            <span className="rounded-full bg-[#3c4043]/60 px-3 py-1 text-xs font-medium text-[#9aa0a6]">
              Free readings to start
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[#e8eaed] md:text-5xl lg:text-6xl mb-5">
            AI tarot reading — scan your real cards or{" "}
            <span className="text-[#fdd663]">draw a digital deck</span>
          </h1>
          <p className="text-lg text-[#9aa0a6] max-w-2xl mx-auto mb-8 leading-relaxed">
            Mystic Tarot turns your phone into an AI-powered oracle. Point your camera at a physical tarot card and
            Gemini Vision AI recognizes it and delivers a deep, personalized interpretation in seconds — or draw a card
            from the animated digital deck.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <Button asChild className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium" size="lg">
              <a href={APK_URL} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download APK
              </a>
            </Button>
            <Button
              asChild
              className="border border-[#3c4043] bg-transparent text-[#e8eaed] hover:border-[#fdd663]/40 hover:bg-[#fdd663]/5"
              size="lg"
            >
              {/* Placeholder: Mystic Tarot is in closed testing; public Play listing coming soon. */}
              <a href={PLAY_URL} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Get it on Google Play (soon)
              </a>
            </Button>
          </div>
          <p className="text-sm text-[#9aa0a6]">
            AI card scanner, AI Tarot Master chat, daily guidance &amp; a private offline journal. Android.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 bg-[#0d0d0d] border-y border-[#3c4043]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#e8eaed]">Key features</h2>
          <p className="text-[#9aa0a6] mb-10 text-sm max-w-2xl">
            The only tarot app that reads your physical deck with your camera — plus a real-time AI Tarot Master and a
            private reading journal.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <Card key={f.title} className="border border-[#3c4043] bg-[#141414] shadow-none transition-colors hover:border-[#fdd663]/40">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-[#fdd663]/10 flex items-center justify-center mb-4">
                    <f.icon className="h-5 w-5 text-[#fdd663]" />
                  </div>
                  <h3 className="font-semibold text-base mb-2 text-[#e8eaed]">{f.title}</h3>
                  <p className="text-sm text-[#9aa0a6] leading-relaxed">{f.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-[#fdd663]" />
            <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
              Spread → Read → Go deeper
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#e8eaed]">How it works</h2>
          <p className="text-[#9aa0a6] mb-10 text-sm max-w-2xl">
            Three steps from your question to a personalized AI tarot reading.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-sm text-[#fdd663]">{s.n}</span>
                  <h3 className="font-semibold text-base text-[#e8eaed]">{s.title}</h3>
                </div>
                <p className="text-sm text-[#9aa0a6] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-[#0d0d0d] border-y border-[#3c4043]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-[#e8eaed]">Frequently asked questions</h2>
          <div className="divide-y divide-[#3c4043] border-y border-[#3c4043]">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between text-[#e8eaed] font-medium text-base list-none">
                  {item.q}
                  <ArrowRight className="h-4 w-4 text-[#9aa0a6] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-[#9aa0a6] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#e8eaed]">Your cards are waiting</h2>
          <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
            Download Mystic Tarot and get your first AI tarot reading now — scan a real card or draw the digital deck.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium" size="lg">
              <a href={APK_URL} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download APK
              </a>
            </Button>
            <Button asChild className="border border-[#3c4043] bg-transparent text-[#e8eaed] hover:border-[#fdd663]/40 hover:bg-[#fdd663]/5" size="lg">
              <Link href="/products" className="flex items-center gap-2">
                All products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#3c4043] py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9aa0a6]">
          <span>© 2026 Agent Labs · Vibe Technologies LLC</span>
          <div className="flex items-center gap-4">
            <Link href="/products" className="hover:text-[#e8eaed] transition-colors">Products</Link>
            <Link href="/privacy" className="hover:text-[#e8eaed] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#e8eaed] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
