"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SiteFooter } from '@/components/site-footer'
import {
  Chrome,
  CreditCard,
  CheckCircle,
  Lock,
  Calendar,
  Globe,
  MousePointer,
  Key,
  ListTodo,
  Puzzle,
  ArrowRight,
  ChevronDown,
  Cloud,
  Cpu,
  WifiOff,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { trackCTAClick } from "@/components/google-analytics"

export default function Component() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white overflow-x-hidden">
      {/* Header */}
      <header className="relative w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 min-w-0 shrink-0 lg:shrink">
          <img src="/vibebrowser-logo.png" alt="VibeBrowser Co-Pilot" className="w-10 h-10 object-contain shrink-0 lg:shrink" />
          <div className="hidden sm:flex flex-col leading-tight min-w-0">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
              VibeBrowser Co-Pilot
            </span>
            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              for founders & operators
            </span>
          </div>
          <div className="sm:hidden flex flex-col leading-tight shrink-0">
            <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
              VibeBrowser
            </span>
            <span className="text-[10px] font-semibold text-slate-600 whitespace-nowrap">
              for founders & operators
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex gap-6">
          <Link href="/mcp" className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            MCP
          </Link>
          <Link href="/integrations" className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Integrations
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Pricing
          </Link>
          <Link href="https://docs.vibebrowser.app" className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Docs
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            Blog
          </Link>
          <Link href="/aboutus" className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
            About Us
          </Link>
        </nav>
        <div className="flex items-center shrink-0">
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-header-nav"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        {/* Install CTA */}
        <a
          href="/install?utm_source=homepage_sticky_header"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTAClick('install_extension', 'sticky_header')}
        >
          <Button
            size="sm"
            className="ml-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white whitespace-nowrap"
          >
            <Chrome className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Install Free</span>
          </Button>
        </a>
        </div>
        <nav
          id="mobile-header-nav"
          hidden={!mobileMenuOpen}
          className="lg:hidden absolute top-full left-0 right-0 w-full bg-white border-b shadow-md"
          aria-label="Mobile navigation"
        >
            <div className="flex flex-col px-4 py-2">
              <Link href="/mcp" className="py-2 text-sm font-medium hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                MCP
              </Link>
              <Link href="/integrations" className="py-2 text-sm font-medium hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Integrations
              </Link>
              <Link href="/pricing" className="py-2 text-sm font-medium hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="https://docs.vibebrowser.app" className="py-2 text-sm font-medium hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Docs
              </Link>
              <Link href="/blog" className="py-2 text-sm font-medium hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/aboutus" className="py-2 text-sm font-medium hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>
          </div>
        </nav>
      </header>

  <main className="flex-1">
    {/* Hero Section with Hook */}
    <section id="demo" className="w-full py-10 md:py-16 lg:py-20">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="flex flex-col gap-5 text-center lg:text-left">
          <a
            href="#on-device"
            className="inline-flex items-center gap-2 self-center lg:self-start rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 hover:bg-purple-100 transition-colors"
          >
            <Cpu className="w-3.5 h-3.5" />
            Coming in 1.1.42: runs offline with Gemma 4 — private, free, no account
          </a>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
            Your AI assistant for repetitive browser work
          </h1>

          <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
            For founders and solo operators: Vibe works through your inbox, CRM and web forms in your own Chrome, with your logins, while you watch.
          </p>

          <div className="flex flex-col items-center lg:items-start gap-2">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              onClick={() => {
                trackCTAClick('install_extension', 'hero_primary')
                window.open('/install?utm_source=homepage_hero_primary', '_blank')
              }}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Install Extension
            </Button>
            <button
              type="button"
              className="text-xs text-muted-foreground underline hover:text-purple-600"
              onClick={() => {
                trackCTAClick('install_extension_developer_version', 'hero_secondary')
                window.open('https://vibeextensioncdn.blob.core.windows.net/extensions/vibe-ai-copilot-latest.zip', '_blank')
              }}
            >
              Developer version (manual install)
            </button>
          </div>

          <div className="text-xs text-muted-foreground flex flex-col sm:flex-row items-center lg:items-start sm:justify-center lg:justify-start gap-1 sm:gap-3">
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> No credit card required</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Installs in 60 seconds</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Free tier included</span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center lg:justify-start items-center text-sm text-muted-foreground">
            {[
              "Works in your logged-in session",
              "Gmail + Calendar built in",
              "Use your own API key or our cloud",
            ].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-2">
                {item}
                {i < arr.length - 1 && <span className="text-gray-300 select-none">·</span>}
              </span>
            ))}
          </div>
          </div>

          <div className="w-full">
            <div className="relative w-full overflow-hidden rounded-xl shadow-2xl border border-slate-200 bg-black" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube-nocookie.com/embed/Cz6Qkskhpxk"
                title="Vibe Browser — 58 second demo"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="mt-3 flex justify-center">
              <a
                href="https://youtube.com/shorts/XEWpqHpsYGs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-purple-700 underline-offset-4 hover:text-purple-800 hover:underline"
                onClick={() => trackCTAClick('watch_engineering_demo', 'hero')}
              >
                Watch the full demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="w-full max-w-5xl mx-auto mt-10 mb-10 lg:col-span-2">
            <div className="flex justify-center mb-8">
              <a href="#use-cases" className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-purple-600 transition-colors group">
                <span>See what Vibe solves</span>
                <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-purple-600" />
              </a>
            </div>
            <div id="use-cases" className="text-center mb-5">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
                What Vibe actually solves
              </h2>
              <p className="text-muted-foreground">
                If work happens in your logged-in browser, Vibe can run it for you.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Repetitive web work</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Offload repetitive browser tasks while staying in control.
                  </p>
                  <ul className="text-xs text-left space-y-1 text-muted-foreground">
                    <li>• Find records across dashboards</li>
                    <li>• Fill forms without manual retyping</li>
                    <li>• Update tools and statuses</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-orange-50 to-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Overcomplicated account flows</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Let Vibe handle confusing navigation paths and setup steps.
                  </p>
                  <ul className="text-xs text-left space-y-1 text-muted-foreground">
                    <li>• Supabase API keys</li>
                    <li>• Capital One virtual cards</li>
                    <li>• Other nested settings / multi-step flows</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Repeatable team workflows</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Turn successful runs into consistent, reviewable team processes.
                  </p>
                  <ul className="text-xs text-left space-y-1 text-muted-foreground">
                    <li>• Save successful runs</li>
                    <li>• Reuse them across teammates</li>
                    <li>• Keep human approvals before final actions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-3">
                Outcome proof from real workflows
              </h3>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900 mb-1">Supabase API key setup flow</p>
                  <p className="text-xs text-slate-600">Navigates project settings, finds keys, and completes setup without manual digging.</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900 mb-1">Capital One virtual card flow</p>
                  <p className="text-xs text-slate-600">Handles nested account screens to create a virtual card through the full flow.</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900 mb-1">GitHub issue form completion</p>
                  <p className="text-xs text-slate-600">Fills issue fields, adds context, and submits from the live repository form.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/compare" className="text-sm font-semibold text-purple-700 hover:text-purple-800">
                Explore full comparison →
              </Link>
            </div>

            <div className="mt-6 rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50/70 to-pink-50/70 p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">#ainativecompany</p>
                  <h3 className="text-lg font-bold tracking-tight text-slate-900">From the AI-native company playbook</h3>
                </div>
                <Link href="/blog?tag=ainativecompany" className="text-sm font-semibold text-purple-700 hover:text-purple-800">
                  View all posts →
                </Link>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Link href="/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework" className="rounded-lg border border-purple-100 bg-white/90 px-3 py-2 text-sm text-slate-700 hover:border-purple-200 hover:text-purple-700">
                  Nine Agents, One Framework
                </Link>
                <Link href="/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot" className="rounded-lg border border-purple-100 bg-white/90 px-3 py-2 text-sm text-slate-700 hover:border-purple-200 hover:text-purple-700">
                  Linear Customer Support Pipeline
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Runs offline with Gemma 4 */}
    <section id="on-device" className="w-full py-14 md:py-20 bg-gradient-to-br from-purple-50 via-white to-white border-y border-slate-100">
      <div className="container max-w-6xl px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="flex flex-col gap-5 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 self-center lg:self-start rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 border border-purple-200">
              <Cpu className="w-4 h-4" /> Coming in 1.1.42
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Runs offline with Gemma 4: private, free, no account
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Install the extension, open the side panel, and start without signing in. On WebGPU-capable
              computers Vibe downloads Google&apos;s Gemma 4 E2B once (3.13 GB) and runs it on your own
              hardware. Your chats and page content stay on this device. Anonymous usage stats are still sent.
            </p>
            <div className="grid gap-4 sm:grid-cols-3 text-left">
              <div>
                <div className="w-9 h-9 rounded-lg bg-white border border-purple-100 flex items-center justify-center mb-2">
                  <Lock className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="text-sm font-bold mb-1">Private by default</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Signed out, the model runs in your browser — no chat content goes to our cloud.
                </p>
              </div>
              <div>
                <div className="w-9 h-9 rounded-lg bg-white border border-purple-100 flex items-center justify-center mb-2">
                  <CreditCard className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="text-sm font-bold mb-1">Free, no account needed</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No sign-up, no API key, no card. One download and the model is yours.
                </p>
              </div>
              <div>
                <div className="w-9 h-9 rounded-lg bg-white border border-purple-100 flex items-center justify-center mb-2">
                  <WifiOff className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-sm font-bold mb-1">Works on your device</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Gemma 4 E2B for Auto, or pick the larger E4B (4.92 GB) yourself in Settings.
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Available on WebGPU-capable computers. If your device can&apos;t run the model, Vibe asks you to
              sign in and use a cloud model instead. Signed-in users keep today&apos;s cloud routing unless they
              turn on Private mode.
            </p>
          </div>
          <div className="mx-auto w-full">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900">
              {/* Owner screen recording of the 1.1.42 first-run card. preload="none" plus the
                  poster keeps this off the critical path: nothing but the JPEG is fetched
                  until Chrome starts the (muted, offscreen-deferred) autoplay. */}
              <video
                className="w-full h-auto block"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster="/images/gemma4-on-device-demo-poster.jpg"
                aria-label="Vibe side panel offering to run Gemma 4 on this device as a 3.13 GB one-time download, then starting the download"
              >
                <source src="/gemma4-on-device-demo.webm" type="video/webm" />
                <source src="/gemma4-on-device-demo.mp4" type="video/mp4" />
                <img
                  src="/images/gemma4-on-device-1.1.42.jpg"
                  alt="Vibe settings showing Gemma 4 E2B (3.13 GB) and E4B (4.92 GB) on-device models, with the side panel downloading Gemma 4 at 52%"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </video>
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-center">
              The side panel one-time download, recorded on the 1.1.42 build.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Your data and your control */}
    <section className="w-full py-14 md:py-20 bg-white border-y border-slate-100">
      <div className="container max-w-6xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your data and your control
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Stays in your browser</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The agent runs as a Chrome extension in your own browser and acts in your tabs, with your existing sessions.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Saved passwords are filled from an encrypted local vault straight into the form — the AI model never sees them.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Sent to the model you choose</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your prompt and the page content the agent reads (text, page structure, screenshots when vision is used) go to the model provider you picked: Vibe cloud, your own API key, or a local model via Ollama. With a local Ollama model on its default localhost endpoint, model prompts and page content stay on your machine; error reports may still be sent.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-4">
                <MousePointer className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">You stay in control</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Vibe acts on your behalf without asking before each click, so start with low-risk tasks. Watch it work in the side panel and press Stop at any time. If it hits a CAPTCHA it tries another route, and stops the task if it stays blocked. Don&apos;t give it tasks you wouldn&apos;t let an assistant do unsupervised, like payments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* Why Vibe */}
    <section className="w-full py-14 md:py-20 bg-white">
      <div className="container max-w-5xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
            Why Vibe feels native
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Vibe stays close to how people already work in Chrome: same session, same tabs, clearer control.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              icon: "🪟",
              title: "Uses your current browser session",
              copy: "Run workflows in the tabs, logins, and cookies you already have.",
            },
            {
              icon: "🔒",
              title: "Local-first execution",
              copy: "Browser actions run on your device, with optional self-hosted models for stricter data control.",
            },
            {
              icon: "🔓",
              title: "Model flexibility",
              copy: "Choose cloud or local models and switch as quality, cost, or policy needs change.",
            },
            {
              icon: "🌐",
              title: "Works across real websites",
              copy: "Automate multi-step flows on dashboards, portals, and internal tools without site-specific APIs.",
            },
          ].map(({ icon, title, copy }) => (
            <article key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{icon}</span>
                <h3 className="text-sm font-bold text-slate-900">{title}</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{copy}</p>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/compare">
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              Explore full comparison →
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* What Vibe does for you — end-user features */}
    <section className="w-full py-12 md:py-16 bg-slate-50">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            What Vibe does for you
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Gmail, Calendar and Drive built in, a password vault, reusable skills, and an offline model that runs on your own computer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold mb-2">Google Workspace Native</h3>
              <p className="text-sm text-muted-foreground">
                Built-in Gmail and Calendar actions for search, draft, send, and event creation, plus read access to your Google Drive files.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Key className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secrets Vault + Type-In</h3>
              <p className="text-sm text-muted-foreground">
                Save passwords in the extension&apos;s own vault. A dedicated tool types them into the page, so they are not sent to the AI model.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <ListTodo className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Skills Library</h3>
              <p className="text-sm text-muted-foreground">
                Save a task once and reuse it. Write a skill in Settings → Skills and Vibe loads it whenever a task matches.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">GitHub Copilot for People</h3>
              <p className="text-sm text-muted-foreground">
                Already have Copilot? Run it inside Vibe to automate routine browser tasks for non-engineering teams.
                <Link href="/copilot" className="text-indigo-700 hover:text-indigo-800 font-medium"> Learn more →</Link>
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gemma 4 offline</h3>
              <p className="text-sm text-muted-foreground">
                Coming in 1.1.42: Gemma 4 runs on your device via WebGPU after a one-time 3.13 GB download. No account and no API key. Anonymous usage stats are still sent.
                <a href="#on-device" className="text-purple-700 hover:text-purple-800 font-medium"> How it works →</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* For developers — MCP relay */}
    <section className="w-full py-10 md:py-12 bg-white">
      <div className="container max-w-3xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-3">
            For developers
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {["MCP", "Claude Code", "Hermes", "Remote Control", "Skills"].map((badge) => (
              <span key={badge} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                <Puzzle className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold">MCP server / relay</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Point Claude Code, Cursor, Codex, Hermes, or OpenClaw at your real browser with one relay URL. Nothing to install, no local server.
            </p>
          </CardContent>
        </Card>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 text-left">
          <Link href="/blog/2026-05-28-why-opencode-not-claude-code" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-purple-200 hover:text-purple-700">
            Why OpenCode, not Claude Code
          </Link>
          <Link href="/blog/2026-05-27-claude-code-mobile-remote-control" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-purple-200 hover:text-purple-700">
            Claude Code Mobile Remote Control
          </Link>
        </div>
      </div>
    </section>

    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container max-w-4xl px-4 md:px-6 mx-auto">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-3">
            Need architecture details?
          </h2>
          <p className="text-muted-foreground mb-6">
            Dive into deeper implementation details, architecture notes, and section-by-section guidance.
          </p>
          <Link href="/section">
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              Open architecture details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
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
                You choose how data is processed. Local models run on your device. Cloud models send data to that provider&apos;s API.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                How much does Vibe Co-Pilot cost?
              </AccordionTrigger>
              <AccordionContent>
                Vibe is free to install. If you run cloud models, usage is billed by that provider, and paid Vibe plans are optional.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                How does Vibe compare to OpenClaw?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm text-muted-foreground">
                  OpenClaw is a self-hosted agent stack. Vibe is a browser co-pilot focused on completing overcomplicated web tasks in your existing browser sessions.
                </p>
                <Link href="/blog/vibe-copilot-vs-openclaw-claude-cowork-and-devtools-mcp#openclaw" className="text-sm font-medium text-primary hover:underline">
                  Explore full comparison →
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                How does Vibe compare to Claude Cowork?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm text-muted-foreground">
                  Claude browser workflows are Claude-first. Vibe is browser-first and model-flexible, so teams can choose how they run automations.
                </p>
                <Link href="/blog/vibe-copilot-vs-openclaw-claude-cowork-and-devtools-mcp#claude-cowork" className="text-sm font-medium text-primary hover:underline">
                  Explore full comparison →
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                How does Vibe compare to Chrome DevTools MCP?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm text-muted-foreground">
                  DevTools MCP is a browser debugging/control interface. Vibe packages browser task execution into a co-pilot experience for end-to-end workflows.
                </p>
                <Link href="/blog/vibe-copilot-vs-openclaw-claude-cowork-and-devtools-mcp#chrome-devtools-mcp" className="text-sm font-medium text-primary hover:underline">
                  Explore full comparison →
                </Link>
              </AccordionContent>
            </AccordionItem>
           </Accordion>
        </div>
      </div>
    </section>

    {/* Pricing — one line; full plans live on /pricing */}
    <section className="w-full py-10 bg-slate-50 border-t border-slate-100">
      <div className="container max-w-4xl px-4 md:px-6 mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <p className="text-base font-medium text-slate-800">
          Free with Gemma 4 on your device from 1.1.42. Pro and Max for cloud models.
        </p>
        <Link href="/pricing" onClick={() => trackCTAClick('view_pricing', 'landing_pricing_line')}>
          <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            See pricing
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  </main>

  {/* Shared Footer */}
  <SiteFooter />
</div>
)
}
