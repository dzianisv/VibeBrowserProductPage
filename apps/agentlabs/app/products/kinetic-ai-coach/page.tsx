"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Activity,
  Camera,
  MessageSquare,
  Volume2,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
  Download,
  Play,
} from "lucide-react"

const APK_URL =
  "https://github.com/dzianisv/KineticAiCoach/releases/latest/download/kinetic-ai-coach.apk"
// Placeholder — Kinetic is in closed testing on Google Play; public listing not live yet.
const PLAY_URL = "#"

const FEATURES = [
  {
    icon: Camera,
    title: "Live pose detection",
    body: "On-device machine learning tracks your joints and overlays a red skeleton on your camera feed, so you see exactly how your body moves — no wearables, no gym check-in.",
  },
  {
    icon: Activity,
    title: "AI form correction & rep counter",
    body: "Your annotated set is analyzed by Google Gemini through the app's own secure backend, which counts your sets and reps and critiques your technique.",
  },
  {
    icon: Volume2,
    title: "Coaching out loud",
    body: "Text-to-speech reads your form tips and rep counts aloud mid-set, so you never break form to check your screen.",
  },
  {
    icon: ClipboardList,
    title: "AI-generated workout plans",
    body: "Tell the coach your goals and get a personalized program built for you, not a generic template.",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI coach",
    body: "Ask anything and send photos, video, or files for feedback — a multimodal coach, not just a text chatbot.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    body: "Pose detection runs on-device. Camera frames leave your device only to analyze a set for rep counting and coaching, over an encrypted connection. Use it as an anonymous guest with no account at all.",
  },
]

const STEPS = [
  {
    n: "01",
    title: "Point your camera",
    body: "Prop up your phone and point the camera at yourself. Kinetic runs pose detection directly on your device and draws a live skeleton overlay so you always see what the app sees.",
  },
  {
    n: "02",
    title: "Train your set",
    body: "The annotated video is sent over an encrypted connection to the app's own Cloud Function proxy, which forwards it to Google Gemini for one purpose: counting your reps and generating specific, real-time form feedback.",
  },
  {
    n: "03",
    title: "Hear your coach",
    body: "Rep counts and form tips are spoken aloud as you move. Every session is logged so you can watch your reps, sets, and form improve over time.",
  },
]

const FAQ = [
  {
    q: "What is Kinetic AI Fitness Coach?",
    a: "Kinetic is an AI personal trainer for Android that watches your form, counts your reps, and coaches you out loud using nothing but your phone's camera. It combines on-device pose detection with a multimodal AI that analyzes your annotated set for rep counting and form correction.",
  },
  {
    q: "How does the rep counter and form correction work?",
    a: "On-device machine learning tracks your joints and overlays a live red skeleton on your camera feed. That annotated set is sent over an encrypted connection to the app's own secure backend, which forwards it to Google Gemini to count your reps and critique your technique.",
  },
  {
    q: "Do I need any special equipment?",
    a: "No. You only need your Android phone's camera. There are no wearables to buy, no gym check-in, and no session booking.",
  },
  {
    q: "Is my camera data private?",
    a: "Pose detection runs on-device. Camera frames leave your device only to analyze a set for rep counting and coaching, over an encrypted (HTTPS) connection to the backend, which forwards them to Google's Gemini model for that single purpose. You can also use the app as an anonymous guest with no account.",
  },
  {
    q: "How much does Kinetic cost?",
    a: "Kinetic includes a 3-day free trial. After the trial, continued access to Kinetic Pro coaching is a recurring subscription billed through Google Play. You can manage or cancel anytime in your Google Play account settings.",
  },
  {
    q: "Is Kinetic a medical device?",
    a: "No. Kinetic is a training and form-feedback tool, not a medical device. It does not diagnose injuries, replace a physical therapist or certified trainer, or give medical advice. If you have a pre-existing condition or injury, talk to a qualified professional before starting a new exercise program.",
  },
]

export default function KineticProductPage() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Kinetic AI Fitness Coach",
    applicationCategory: "HealthApplication",
    operatingSystem: "Android",
    url: "https://agentlabs.cc/products/kinetic-ai-coach",
    downloadUrl: APK_URL,
    description:
      "Kinetic is the AI personal trainer that watches your form, counts your reps, and coaches you out loud using just your phone's camera. Live on-device pose detection, AI form correction, and personalized workout plans.",
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
            Kinetic <span className="text-[#fdd663]">AI Coach</span>
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
              Android · Health &amp; Fitness
            </span>
            <span className="rounded-full bg-[#fdd663]/10 px-3 py-1 text-xs font-medium text-[#fdd663] border border-[#fdd663]/20">
              On-device pose detection
            </span>
            <span className="rounded-full bg-[#3c4043]/60 px-3 py-1 text-xs font-medium text-[#9aa0a6]">
              3-day free trial
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[#e8eaed] md:text-5xl lg:text-6xl mb-5">
            AI personal trainer that counts your reps and{" "}
            <span className="text-[#fdd663]">fixes your form</span>
          </h1>
          <p className="text-lg text-[#9aa0a6] max-w-2xl mx-auto mb-8 leading-relaxed">
            Kinetic watches your form, counts your reps, and talks you through every set — using nothing but your
            phone&apos;s camera. No wearables. No gym check-in. Point your camera at yourself and train.
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
              {/* Placeholder: Kinetic is in closed testing; public Play listing coming soon. */}
              <a href={PLAY_URL} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Get it on Google Play (soon)
              </a>
            </Button>
          </div>
          <p className="text-sm text-[#9aa0a6]">
            Live pose detection, AI form correction &amp; a spoken rep counter. Android.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 bg-[#0d0d0d] border-y border-[#3c4043]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#e8eaed]">Key features</h2>
          <p className="text-[#9aa0a6] mb-10 text-sm max-w-2xl">
            A live skeleton overlay plus a multimodal AI that actually watches your set to count reps and critique form
            — not a heuristic counter or an ungrounded chatbot.
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
            <Camera size={16} className="text-[#fdd663]" />
            <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
              Point → Train → Improve
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#e8eaed]">How it works</h2>
          <p className="text-[#9aa0a6] mb-10 text-sm max-w-2xl">
            Three steps from setup to a working spotter for your form.
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#e8eaed]">Turn your camera into your coach</h2>
          <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
            Start your 3-day free trial and train smarter with an AI personal trainer that counts every rep and watches
            your form.
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
