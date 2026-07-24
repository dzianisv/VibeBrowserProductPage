"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Sparkles, ArrowRight } from "lucide-react"

const PRODUCTS = [
  {
    href: "/products/kinetic-ai-coach",
    icon: Activity,
    name: "Kinetic AI Fitness Coach",
    tagline: "AI personal trainer for Android",
    body: "Watches your form, counts your reps, and coaches you out loud using just your phone's camera. Live on-device pose detection, AI form correction, and personalized workout plans.",
    tags: ["Health & Fitness", "Pose detection", "Rep counter"],
  },
  {
    href: "/products/mystic-tarot",
    icon: Sparkles,
    name: "Mystic Tarot: AI Card Reader",
    tagline: "AI tarot reading & card scanner",
    body: "Scan your real tarot cards with Gemini Vision AI or draw a digital deck for instant readings. Chat with your own AI Tarot Master, get daily guidance, and keep a private offline journal.",
    tags: ["Lifestyle", "AI card scanner", "Daily tarot"],
  },
]

export default function ProductsIndexPage() {
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `https://agentlabs.cc${p.href}`,
    })),
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#e8eaed]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-[#3c4043] bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-semibold text-lg tracking-tight text-[#e8eaed] hover:text-white transition-colors"
          >
            Agent <span className="text-[#fdd663]">Labs</span>
          </Link>
          <Button asChild className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] text-sm font-medium" size="sm">
            <Link href="/">Home</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#e8eaed] md:text-5xl lg:text-6xl mb-5">
            Android AI apps by <span className="text-[#fdd663]">Agent Labs</span>
          </h1>
          <p className="text-lg text-[#9aa0a6] max-w-2xl mx-auto leading-relaxed">
            Practical, on-device AI apps built by Vibe Technologies LLC. Each one puts a frontier AI model to work on a
            real task — from your workout form to your tarot deck.
          </p>
        </div>
      </section>

      {/* Product cards */}
      <section className="pb-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          {PRODUCTS.map((p) => (
            <Card key={p.href} className="border border-[#3c4043] bg-[#141414] shadow-none transition-colors hover:border-[#fdd663]/40">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="w-11 h-11 rounded-lg bg-[#fdd663]/10 flex items-center justify-center mb-4">
                  <p.icon className="h-5 w-5 text-[#fdd663]" />
                </div>
                <h2 className="font-semibold text-xl mb-1 text-[#e8eaed]">{p.name}</h2>
                <p className="text-sm text-[#fdd663] mb-3">{p.tagline}</p>
                <p className="text-sm text-[#9aa0a6] leading-relaxed mb-5">{p.body}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-[#3c4043]/60 px-3 py-1 text-xs font-medium text-[#9aa0a6]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  <Button asChild className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium w-full">
                    <Link href={p.href} className="flex items-center justify-center gap-2">
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#3c4043] py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9aa0a6]">
          <span>© 2026 Agent Labs · Vibe Technologies LLC</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#e8eaed] transition-colors">Home</Link>
            <Link href="/privacy" className="hover:text-[#e8eaed] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#e8eaed] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
