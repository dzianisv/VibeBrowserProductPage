"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Smartphone,
  KeyRound,
  ShieldCheck,
  TerminalSquare,
  Cpu,
  Github,
  ArrowRight,
  Download,
  Check,
  Sparkles,
  Server,
  Lock,
  Wifi,
} from "lucide-react"

const PLAY_OPT_IN_URL = "https://play.google.com/apps/internaltest/4701574809387172305"
const GITHUB_URL = "https://github.com/VibeTechnologies/AgentPodMobile"

const PROVIDERS = [
  "Azure OpenAI",
  "OpenAI",
  "Anthropic Claude",
  "OpenAI-compatible",
  "OpenRouter",
  "GitHub Copilot",
]

const FEATURES = [
  {
    icon: KeyRound,
    title: "Bring your own key (BYOK)",
    body: "Plug in your existing Azure OpenAI, OpenAI, Anthropic, OpenAI-compatible, OpenRouter, or GitHub Copilot key. No subscription, no account — you pay your provider directly, at cost.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    body: "Requests go straight from your device to the provider you chose. No AgentPod server in the middle, no prompt logging, no analytics on your conversations.",
  },
  {
    icon: TerminalSquare,
    title: "A real Linux runtime on your phone",
    body: "AgentPod bundles a genuine Termux Linux environment plus a Node.js gateway. A lightweight one-time bootstrap runs on first launch, then you are chatting in minutes.",
  },
  {
    icon: Cpu,
    title: "Multi-provider, one app",
    body: "Switch between frontier models from different providers without changing apps. Point it at your own OpenAI-compatible or OpenRouter base URL when you need to.",
  },
  {
    icon: Sparkles,
    title: "Real agent work",
    body: "Multi-turn conversations that keep context, tool use for live web and Wikipedia research, and clean, copy-ready code output for coding on the road.",
  },
  {
    icon: Smartphone,
    title: "On-device convenience",
    body: "Everything runs on your Android device. Ideal for developers who code away from a laptop and privacy-first users who want their prompts to stay theirs.",
  },
]

const STEPS = [
  {
    n: "01",
    title: "Install & bootstrap",
    body: "Install AgentPod and let the quick one-time on-device setup finish (about 1–3 minutes). It provisions a Termux Linux runtime and a Node.js gateway right on your phone.",
    shot: "/agentpod/screenshots/cua_step_002.png",
  },
  {
    n: "02",
    title: "Bring your own key",
    body: "Tap “Bring Your Own Key.” In Settings, pick your provider — Azure OpenAI, OpenAI, Anthropic, OpenRouter, an OpenAI-compatible endpoint, or GitHub Copilot — and paste your API key.",
    shot: "/agentpod/screenshots/cua_step_005.png",
  },
  {
    n: "03",
    title: "Chat with your model",
    body: "Open Chat and ask a real question. Here it answers when the first GPT model was released with a sourced, bullet-point summary — the reply goes straight from your phone to your own model, and follow-ups keep context across turns.",
    shot: "/agentpod/chat-real.png",
  },
]

const SCREENSHOTS = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(3, "0")
  return `/agentpod/screenshots/cua_step_${n}.png`
})

const PRIVACY_POINTS = [
  {
    icon: Wifi,
    title: "Device → provider, direct",
    body: "Every prompt goes straight from your phone to the provider you configured. There is no AgentPod proxy reading or storing your traffic.",
  },
  {
    icon: Lock,
    title: "Your key stays on your device",
    body: "Your API key is stored locally and used only to authenticate your own calls. We never see it.",
  },
  {
    icon: Server,
    title: "No account, no middleman",
    body: "AgentPod requires no sign-up and runs no server that sits between you and your model. You own the relationship with your provider.",
  },
]

const FAQ = [
  {
    q: "Do I need an AgentPod subscription?",
    a: "No. AgentPod is bring-your-own-key. You supply an API key from a provider you already use and pay that provider directly. AgentPod itself charges you nothing and requires no account.",
  },
  {
    q: "Which providers are supported?",
    a: "Azure OpenAI, OpenAI, Anthropic Claude, any OpenAI-compatible endpoint, OpenRouter, and GitHub Copilot. You can switch between them in Settings.",
  },
  {
    q: "Where do my prompts go?",
    a: "Directly from your device to the provider you configured. AgentPod does not route your prompts through its own servers, and it does not log or analyze your conversations.",
  },
  {
    q: "What is the on-device runtime?",
    a: "AgentPod bundles a real Termux Linux environment and a Node.js gateway that run locally on your phone. A one-time bootstrap on first launch sets this up in a couple of minutes.",
  },
  {
    q: "What do I need to run it?",
    a: "An Android device and an API key from any supported provider. That is it.",
  },
]

type FormState = "idle" | "loading" | "ok" | "error"

function useEmailForm(endpoint: string) {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<FormState>("idle")
  const [message, setMessage] = useState<string>("")
  const [optInUrl, setOptInUrl] = useState<string>("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (state === "loading") return
    setState("loading")
    setMessage("")
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
        optInUrl?: string
      }
      if (res.ok && data.ok) {
        setState("ok")
        if (data.optInUrl) setOptInUrl(data.optInUrl)
      } else {
        setState("error")
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setState("error")
      setMessage("Network error. Please try again.")
    }
  }

  return { email, setEmail, state, message, optInUrl, submit }
}

export default function AgentPodMobilePage() {
  const waitlist = useEmailForm("/api/waitlist")
  const tester = useEmailForm("/api/play-tester")

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-[#3c4043] bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/mobile"
            className="font-semibold text-lg tracking-tight text-[#e8eaed] hover:text-white transition-colors"
          >
            AgentPod <span className="text-[#fdd663]">Mobile</span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="#features"
              className="hidden sm:inline text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
            >
              Features
            </a>
            <a
              href="#how"
              className="hidden sm:inline text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
            >
              How it works
            </a>
            <a
              href="#faq"
              className="hidden sm:inline text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
            >
              FAQ
            </a>
            <Button
              asChild
              className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] text-sm font-medium"
              size="sm"
            >
              <a href="/mobile/download">Download</a>
            </Button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="rounded-full bg-[#81c995]/10 px-3 py-1 text-xs font-medium text-[#81c995] border border-[#81c995]/20">
                Android · BYOK
              </span>
              <span className="rounded-full bg-[#fdd663]/10 px-3 py-1 text-xs font-medium text-[#fdd663] border border-[#fdd663]/20">
                On-device runtime
              </span>
              <span className="rounded-full bg-[#3c4043]/60 px-3 py-1 text-xs font-medium text-[#9aa0a6]">
                No subscription
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[#e8eaed] md:text-5xl lg:text-6xl mb-5">
              Your own AI coding agent,{" "}
              <span className="text-[#fdd663]">on your phone</span>
            </h1>
            <p className="text-lg text-[#9aa0a6] max-w-xl mb-8 leading-relaxed">
              AgentPod Mobile is an on-device, bring-your-own-key AI coding and research agent for
              Android. It bundles a real Termux Linux runtime and a Node.js gateway on your device —
              your key, your provider, no middleman.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Button
                asChild
                className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium"
                size="lg"
              >
                <a href="/mobile/download" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </Button>
              <Button
                asChild
                className="border border-[#3c4043] bg-transparent text-[#e8eaed] hover:border-[#fdd663]/40 hover:bg-[#fdd663]/5"
                size="lg"
              >
                <a href="#early-tester" className="flex items-center gap-2">
                  Become an early tester
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="text-sm text-[#9aa0a6]">
              Works with{" "}
              <span className="text-[#e8eaed]">
                Azure OpenAI, OpenAI, Anthropic, OpenAI-compatible, OpenRouter &amp; GitHub Copilot
              </span>
              . Android 5.0+.
            </p>
          </div>

          {/* Hero demo video */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] rounded-[2rem] border border-[#3c4043] bg-[#111111] p-2 shadow-2xl">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                className="w-full rounded-[1.6rem] block"
                src="/agentpod/demo-10x.mp4"
                poster="/agentpod/demo-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#fdd663] px-3 py-1 text-[11px] font-semibold text-[#0a0a0a] shadow-lg">
                Real end-to-end demo · 10× speed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Providers strip */}
      <section className="py-10 bg-[#0d0d0d] border-y border-[#3c4043]">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-wider text-[#9aa0a6] mb-5">
            Bring a key from any of these providers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PROVIDERS.map((p) => (
              <span key={p} className="text-sm font-medium text-[#e8eaed]/80">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#e8eaed]">Key features</h2>
          <p className="text-[#9aa0a6] mb-10 text-sm max-w-2xl">
            A private, no-subscription way to use frontier AI models on Android — with a genuine
            Linux runtime doing real work on your device.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <Card
                key={f.title}
                className="border border-[#3c4043] bg-[#141414] shadow-none transition-colors hover:border-[#fdd663]/40"
              >
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
      <section id="how" className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <TerminalSquare size={16} className="text-[#fdd663]" />
            <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
              Bootstrap → BYOK → Chat
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#e8eaed]">How it works</h2>
          <p className="text-[#9aa0a6] mb-10 text-sm max-w-2xl">
            Three steps from install to a working agent — shown here as real screenshots from the
            app.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="flex flex-col">
                <div className="rounded-2xl border border-[#3c4043] bg-[#111111] p-2 mb-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.shot}
                    alt={`AgentPod Mobile — ${s.title}`}
                    width={1080}
                    height={1920}
                    loading="lazy"
                    className="w-full rounded-xl"
                  />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-sm text-[#fdd663]">{s.n}</span>
                  <h3 className="font-semibold text-base text-[#e8eaed]">{s.title}</h3>
                </div>
                <p className="text-sm text-[#9aa0a6] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot gallery */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#e8eaed]">See it in action</h2>
          <p className="text-[#9aa0a6] mb-10 text-sm max-w-2xl">
            From onboarding and on-device bootstrap to entering your key and chatting — real screens
            from AgentPod Mobile.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {SCREENSHOTS.map((src, i) => (
              <div
                key={src}
                className="rounded-xl border border-[#3c4043] bg-[#111111] p-1.5 transition-colors hover:border-[#fdd663]/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`AgentPod Mobile screenshot ${i + 1}`}
                  width={1080}
                  height={1920}
                  loading="lazy"
                  className="w-full rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={16} className="text-[#fdd663]" />
            <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
              Privacy-first
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#e8eaed]">
            Your prompts. Your key. Your provider.
          </h2>
          <p className="text-[#9aa0a6] mb-10 text-sm max-w-2xl leading-relaxed">
            AgentPod is private by design. Calls go device → provider with nothing in between — no
            telemetry, no analytics, no prompt logging by us.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PRIVACY_POINTS.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-[#3c4043] bg-[#141414] px-5 py-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <p.icon size={16} className="text-[#81c995]" />
                  <span className="text-sm font-semibold text-[#e8eaed]">{p.title}</span>
                </div>
                <p className="text-sm text-[#9aa0a6] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist + Early tester */}
      <section id="early-tester" className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          {/* Early tester */}
          <Card className="border border-[#3c4043] bg-[#141414] shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone size={16} className="text-[#fdd663]" />
                <h3 className="font-semibold text-base text-[#e8eaed]">Become an early tester</h3>
              </div>
              <p className="text-sm text-[#9aa0a6] mb-5 leading-relaxed">
                Join the Android internal test track. Enter your Google account email — we add you
                to the tester list, then you finish installing from Google Play.
              </p>
              {tester.state === "ok" ? (
                <div className="rounded-lg border border-[#81c995]/30 bg-[#81c995]/5 p-4">
                  <div className="flex items-center gap-2 text-[#81c995] mb-2">
                    <Check size={16} />
                    <span className="text-sm font-medium">You&apos;re on the tester list.</span>
                  </div>
                  <p className="text-sm text-[#9aa0a6] mb-3">
                    Final step: open the Play opt-in link on the same Google account to install.
                  </p>
                  <Button
                    asChild
                    className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium w-full"
                  >
                    <a
                      href={tester.optInUrl || PLAY_OPT_IN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Google Play opt-in
                    </a>
                  </Button>
                </div>
              ) : (
                <form onSubmit={tester.submit} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={tester.email}
                    onChange={(e) => tester.setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    className="w-full rounded-md border border-[#3c4043] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#e8eaed] placeholder:text-[#5f6368] focus:border-[#fdd663]/50 focus:outline-none focus:ring-1 focus:ring-[#fdd663]/30"
                  />
                  <Button
                    type="submit"
                    disabled={tester.state === "loading"}
                    className="bg-[#fdd663] hover:bg-[#ffe28a] text-[#0a0a0a] font-medium w-full"
                  >
                    {tester.state === "loading" ? "Adding you…" : "Join the test track"}
                  </Button>
                  {tester.state === "error" && (
                    <p className="text-sm text-[#f28b82]">{tester.message}</p>
                  )}
                  <p className="text-xs text-[#5f6368]">
                    Use a Google account email — the Play test track is tied to your Google login.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Waitlist */}
          <Card className="border border-[#3c4043] bg-[#141414] shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-[#fdd663]" />
                <h3 className="font-semibold text-base text-[#e8eaed]">Join the waitlist</h3>
              </div>
              <p className="text-sm text-[#9aa0a6] mb-5 leading-relaxed">
                Not ready to test yet? Get an email when AgentPod Mobile hits general availability
                and when new providers land.
              </p>
              {waitlist.state === "ok" ? (
                <div className="rounded-lg border border-[#81c995]/30 bg-[#81c995]/5 p-4 flex items-center gap-2 text-[#81c995]">
                  <Check size={16} />
                  <span className="text-sm font-medium">
                    You&apos;re on the list. We&apos;ll be in touch.
                  </span>
                </div>
              ) : (
                <form onSubmit={waitlist.submit} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={waitlist.email}
                    onChange={(e) => waitlist.setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-[#3c4043] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#e8eaed] placeholder:text-[#5f6368] focus:border-[#fdd663]/50 focus:outline-none focus:ring-1 focus:ring-[#fdd663]/30"
                  />
                  <Button
                    type="submit"
                    disabled={waitlist.state === "loading"}
                    className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium w-full"
                  >
                    {waitlist.state === "loading" ? "Joining…" : "Notify me"}
                  </Button>
                  {waitlist.state === "error" && (
                    <p className="text-sm text-[#f28b82]">{waitlist.message}</p>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-[#e8eaed]">
            Frequently asked questions
          </h2>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#e8eaed]">
            Bring your key. Keep your privacy.
          </h2>
          <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
            AgentPod Mobile puts a real AI coding and research agent on your Android phone — powered
            by your own API key, running on-device.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              asChild
              className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium"
              size="lg"
            >
              <a href="/mobile/download" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download
              </a>
            </Button>
            <Button
              asChild
              className="border border-[#3c4043] bg-transparent text-[#e8eaed] hover:border-[#fdd663]/40 hover:bg-[#fdd663]/5"
              size="lg"
            >
              <a href="#early-tester" className="flex items-center gap-2">
                Become an early tester
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#3c4043] py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9aa0a6]">
          <span>© 2026 Agent Labs · Vibe Technologies LLC</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#e8eaed] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#e8eaed] transition-colors">
              Terms
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e8eaed] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
