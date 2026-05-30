import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  Smartphone,
  Wifi,
  MessageSquare,
  GitBranch,
  ShieldCheck,
  Fingerprint,
  Lock,
  Server,
  ArrowRight,
  Github,
  ChevronRight,
  Download,
  Star,
  Terminal,
} from "lucide-react"

export const metadata: Metadata = {
  title: "OpenCode — AI Coding Agent on Your Phone",
  description:
    "Control your self-hosted opencode AI coding agent from Android. Real-time streaming chat, file diff viewer, tool call approval, biometric unlock. Free and open source.",
  keywords: [
    "opencode mobile",
    "AI coding agent",
    "android AI coding",
    "self-hosted AI",
    "coding assistant android",
    "opencode android",
    "remote development",
    "AI code review",
    "LLM client android",
    "open source AI mobile",
    "developer tools android",
  ],
  alternates: {
    canonical: "https://agentlabs.cc/opencode",
  },
  openGraph: {
    type: "website",
    url: "https://agentlabs.cc/opencode",
    siteName: "Agent Labs",
    title: "OpenCode — AI Coding Agent on Your Phone",
    description:
      "Control your self-hosted opencode AI coding agent from Android. Real-time streaming chat, file diff viewer, tool call approval. Free and open source.",
    images: [
      {
        url: "/images/opencode/feature-graphic.png",
        width: 1024,
        height: 500,
        alt: "OpenCode Mobile — AI Coding Agent on Android",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenCode — AI Coding Agent on Your Phone",
    description:
      "Control your self-hosted opencode AI coding agent from Android. Free and open source.",
    images: ["/images/opencode/feature-graphic.png"],
    creator: "@vibebrowserapp",
  },
}

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=cc.agentlabs.opencode"
const GITHUB_URL = "https://github.com/dzianisv/opencode-mobile"
const OPENCODE_URL = "https://github.com/sst/opencode"

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OpenCode: AI Coding Agent",
  alternateName: "OpenCode Mobile",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Android",
  description:
    "Free, open-source Android client for self-hosted opencode AI coding agents. Connect over LAN, Cloudflare Tunnel, ngrok, or Tailscale. Real-time streaming chat, file diff viewer, tool call approval, biometric unlock.",
  url: "https://agentlabs.cc/opencode",
  downloadUrl: "https://play.google.com/store/apps/details?id=cc.agentlabs.opencode",
  installUrl: "https://play.google.com/store/apps/details?id=cc.agentlabs.opencode",
  identifier: "cc.agentlabs.opencode",
  author: {
    "@type": "Organization",
    name: "Vibe Technologies LLC",
    url: "https://agentlabs.cc",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Real-time streaming chat",
    "File diff viewer",
    "Tool call approval",
    "Multi-session management",
    "Biometric unlock (fingerprint / Face ID)",
    "Secure credential storage",
    "LAN, Cloudflare Tunnel, ngrok, Tailscale connectivity",
    "Self-hosted — your keys, your code, your server",
    "Free and open source (MIT license)",
  ],
  screenshot: [
    "https://agentlabs.cc/images/opencode/phone-01.png",
    "https://agentlabs.cc/images/opencode/phone-02.png",
    "https://agentlabs.cc/images/opencode/phone-03.png",
  ],
  softwareVersion: "1.0",
  datePublished: "2026-05-24",
  license: "https://opensource.org/licenses/MIT",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does OpenCode Mobile need a subscription?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. OpenCode Mobile is completely free, open source, and MIT licensed. There are no subscriptions, no ads, and no feature gates. You bring your own opencode server and your own AI API keys.",
      },
    },
    {
      "@type": "Question",
      name: "Is my code sent to your servers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The app is a thin client — all AI inference runs on your own opencode server. Your code, prompts, and AI responses go directly from your phone to your server, never through Agent Labs infrastructure.",
      },
    },
    {
      "@type": "Question",
      name: "What AI models does it support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OpenCode Mobile connects to your opencode server, which supports Claude, GPT-4, Gemini, and local LLMs (Ollama, etc.). Model choice is configured on your server — the app works with whatever your server provides.",
      },
    },
    {
      "@type": "Question",
      name: "How do I connect remotely when away from home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use Cloudflare Tunnel (zero-config, free), ngrok, or Tailscale VPN. All three let you reach your opencode server securely from anywhere without opening firewall ports.",
      },
    },
    {
      "@type": "Question",
      name: "Is iOS supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Android app is available now on Google Play (internal testing track). iOS support is on the roadmap. In the meantime you can build from source on GitHub.",
      },
    },
  ],
}

const features = [
  {
    icon: MessageSquare,
    color: "#81c995",
    title: "Real-Time Streaming Chat",
    description:
      "Token-by-token streaming from your self-hosted opencode server. Watch Claude, GPT-4, or Gemini think and respond in real time — no polling, no waiting.",
  },
  {
    icon: GitBranch,
    color: "#c58af9",
    title: "File Diff Viewer",
    description:
      "Inline side-by-side diffs for every code change the agent proposes. Review exactly what will change before approving the write.",
  },
  {
    icon: ShieldCheck,
    color: "#fdd663",
    title: "Tool Call Approval",
    description:
      "Review and approve — or reject — every tool call (file writes, shell commands) before the agent executes it. You stay in control.",
  },
  {
    icon: Wifi,
    color: "#8ab4f8",
    title: "Multi-Connection",
    description:
      "Connect over your local network, a Cloudflare Tunnel, ngrok, or Tailscale VPN. Manage multiple servers at once. opencode Cloud coming soon.",
  },
  {
    icon: Fingerprint,
    color: "#f6aea9",
    title: "Biometric Unlock",
    description:
      "Face ID or Android fingerprint protects the app and individual message sends. Nothing leaves the device without your biometric confirmation.",
  },
  {
    icon: Lock,
    color: "#81c995",
    title: "Secure Credential Storage",
    description:
      "Server credentials are stored in the Android Keystore — never in plain-text files or shared preferences.",
  },
]

const connectionOptions = [
  {
    label: "Local Network",
    example: "http://192.168.1.100:4096",
    description: "Direct LAN connection — fastest option when you're on the same Wi-Fi.",
  },
  {
    label: "Cloudflare Tunnel",
    example: "https://my-opencode.trycloudflare.com",
    description: "Zero-config public HTTPS tunnel. Works through firewalls and NAT. Free.",
  },
  {
    label: "ngrok",
    example: "https://abc123.ngrok.io",
    description: "Battle-tested tunnel. Free tier covers development usage.",
  },
  {
    label: "Tailscale",
    example: "http://100.x.x.x:4096",
    description: "End-to-end encrypted mesh VPN. Best for permanent remote access.",
  },
  {
    label: "opencode Cloud",
    example: "coming soon",
    description: "One-tap managed hosting — no server to run. On the roadmap.",
    comingSoon: true,
  },
]

const screenshots = [
  { src: "/images/opencode/phone-01.png", alt: "OpenCode Mobile — streaming chat session with AI coding agent" },
  { src: "/images/opencode/phone-02.png", alt: "OpenCode Mobile — file diff viewer showing code changes" },
  { src: "/images/opencode/phone-03.png", alt: "OpenCode Mobile — tool call approval and session management" },
]

const faqs = [
  {
    q: "Does OpenCode Mobile need a subscription?",
    a: "No. It's completely free, open source (MIT), no ads, no feature gates. Bring your own opencode server and API keys.",
  },
  {
    q: "Is my code sent to your servers?",
    a: "No. The app is a thin client — all AI inference runs on your own opencode server. Your code, prompts, and responses never touch Agent Labs infrastructure.",
  },
  {
    q: "What AI models does it support?",
    a: "OpenCode Mobile connects to your opencode server, which supports Claude, GPT-4, Gemini, and local LLMs via Ollama. Model choice is configured on your server.",
  },
  {
    q: "How do I connect when I'm away from home?",
    a: "Use Cloudflare Tunnel (zero-config, free), ngrok, or Tailscale VPN. All three let you reach your server securely from anywhere without opening firewall ports.",
  },
  {
    q: "Is iOS supported?",
    a: "The Android app is available now. iOS is on the roadmap. You can also build from source on GitHub.",
  },
]

export default function OpenCodePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8eaed]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Nav */}
      <header className="border-b border-[#3c4043] bg-[#202124]/95 backdrop-blur supports-[backdrop-filter]:bg-[#202124]/80 sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 md:px-6">
          <Link href="/" className="font-semibold tracking-tight text-[#e8eaed] hover:text-white">
            Agent Labs
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              Products
            </Link>
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#8ab4f8] hover:text-[#aecbfa] transition-colors"
            >
              <Github size={15} />
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#3c4043]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#81c995]/5 via-transparent to-[#8ab4f8]/5 pointer-events-none" />
          <div className="mx-auto max-w-5xl px-5 py-20 md:px-6 md:py-28">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Text */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
                  <span className="rounded-full bg-[#81c995]/10 px-3 py-1 text-xs font-medium text-[#81c995] border border-[#81c995]/20">
                    Open Source · MIT
                  </span>
                  <span className="rounded-full bg-[#3c4043]/60 px-3 py-1 text-xs font-medium text-[#9aa0a6]">
                    Android · Internal Testing
                  </span>
                  <span className="rounded-full bg-[#8ab4f8]/10 px-3 py-1 text-xs font-medium text-[#8ab4f8] border border-[#8ab4f8]/20">
                    Free
                  </span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-[#e8eaed] md:text-5xl lg:text-6xl max-w-3xl">
                  Your AI coding agent,{" "}
                  <span className="text-[#81c995]">now in your pocket</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-[#9aa0a6] leading-relaxed">
                  OpenCode is a free, open-source Android app that puts your{" "}
                  <a
                    href={OPENCODE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ab4f8] hover:text-[#aecbfa] underline underline-offset-2"
                  >
                    opencode
                  </a>{" "}
                  AI coding sessions in your hand. Connect to your own server over LAN, Cloudflare
                  Tunnel, ngrok, or Tailscale. Review diffs, approve tool calls, and guide Claude or
                  GPT-4 from anywhere. Your keys, your server, your code.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#81c995] px-6 py-3 text-sm font-semibold text-[#0a0a0a] hover:bg-[#a8d5b5] transition-colors"
                  >
                    <Download size={16} />
                    Get on Google Play
                    <ArrowRight size={15} />
                  </a>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#3c4043] px-6 py-3 text-sm font-semibold text-[#e8eaed] hover:border-[#81c995]/40 hover:bg-[#81c995]/5 transition-colors"
                  >
                    <Github size={16} />
                    View on GitHub
                  </a>
                </div>

                <p className="mt-4 text-xs text-[#9aa0a6] text-center lg:text-left">
                  Currently in internal testing on Google Play. Join the tester program or build
                  from source.
                </p>
              </div>

              {/* App icon */}
              <div className="shrink-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-[#81c995]/10 blur-2xl scale-110" />
                  <Image
                    src="/images/opencode/icon-512.png"
                    alt="OpenCode Mobile app icon"
                    width={160}
                    height={160}
                    className="relative rounded-3xl shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature graphic */}
        <section className="border-b border-[#3c4043] bg-[#111111]">
          <div className="mx-auto max-w-5xl px-5 py-12 md:px-6">
            <div className="overflow-hidden rounded-xl border border-[#3c4043]">
              <Image
                src="/images/opencode/feature-graphic.png"
                alt="OpenCode Mobile — AI coding agent companion for Android developers"
                width={1024}
                height={500}
                className="w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Architecture callout */}
        <section className="border-b border-[#3c4043]">
          <div className="mx-auto max-w-5xl px-5 py-10 md:px-6">
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={16} className="text-[#81c995]" />
              <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">How it works</span>
            </div>
            <div className="rounded-xl border border-[#3c4043] bg-[#1a1a1a] p-6 font-mono text-sm text-[#9aa0a6] leading-relaxed overflow-x-auto">
              <pre>{`┌──────────────────────────────┐
│       OpenCode Mobile        │   ← this app (Android)
│      cc.agentlabs.opencode   │
└──────────────┬───────────────┘
               │  HTTP + SSE
               │  LAN / Tunnel / Tailscale
               ▼
┌──────────────────────────────┐
│     opencode server          │   ← your laptop / VPS
│  github.com/sst/opencode     │
└──────────────┬───────────────┘
               │  API calls (your keys)
               ▼
┌──────────────────────────────┐
│   Your AI provider           │
│  Claude / GPT-4 / Gemini     │
└──────────────────────────────┘`}</pre>
            </div>
            <p className="mt-4 text-sm text-[#9aa0a6]">
              The app is a thin client. All AI inference runs on your server. Your API keys and source
              code never touch Agent Labs infrastructure.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-[#3c4043] bg-[#111111]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-6">
            <h2 className="text-2xl font-bold text-[#e8eaed] md:text-3xl mb-2">Features</h2>
            <p className="text-[#9aa0a6] mb-12">
              Everything you need to control your AI coding agent remotely.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-[#3c4043] bg-[#0a0a0a] p-6 transition-colors hover:border-[#81c995]/30"
                  >
                    <div
                      className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${feature.color}18` }}
                    >
                      <Icon size={20} style={{ color: feature.color }} />
                    </div>
                    <h3 className="mb-2 font-semibold text-[#e8eaed]">{feature.title}</h3>
                    <p className="text-sm text-[#9aa0a6] leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section className="border-b border-[#3c4043]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-6">
            <h2 className="text-2xl font-bold text-[#e8eaed] md:text-3xl mb-2">Screenshots</h2>
            <p className="text-[#9aa0a6] mb-10">See it in action.</p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {screenshots.map((shot, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-[#3c4043] bg-[#111111]"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1080}
                    height={2400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connection options */}
        <section className="border-b border-[#3c4043] bg-[#111111]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-6">
            <div className="flex items-center gap-3 mb-2">
              <Server size={20} className="text-[#8ab4f8]" />
              <h2 className="text-2xl font-bold text-[#e8eaed] md:text-3xl">
                Connectivity Options
              </h2>
            </div>
            <p className="text-[#9aa0a6] mb-10">
              Add a connection in the app, pick the type that fits your setup, and you're in.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {connectionOptions.map((option) => (
                <div
                  key={option.label}
                  className={`rounded-xl border p-5 ${
                    option.comingSoon
                      ? "border-[#3c4043]/50 bg-[#1a1a1a]/60 opacity-70"
                      : "border-[#3c4043] bg-[#1a1a1a]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#e8eaed] text-sm">{option.label}</span>
                    {option.comingSoon && (
                      <span className="rounded-full bg-[#fdd663]/10 px-2 py-0.5 text-xs font-medium text-[#fdd663] border border-[#fdd663]/20">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <code className="text-xs text-[#81c995] font-mono">{option.example}</code>
                  <p className="mt-2 text-xs text-[#9aa0a6] leading-relaxed">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick start */}
        <section id="quick-start" className="border-b border-[#3c4043]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-6">
            <h2 className="text-2xl font-bold text-[#e8eaed] md:text-3xl mb-2">Quick Start</h2>
            <p className="text-[#9aa0a6] mb-10">Up and running in three steps.</p>

            <ol className="space-y-8">
              <li className="flex gap-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#81c995]/10 border border-[#81c995]/20 text-[#81c995] font-bold text-sm">
                  1
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-[#e8eaed] mb-3">
                    Start opencode in server mode on your machine
                  </p>
                  <pre className="rounded-lg border border-[#3c4043] bg-[#111111] px-5 py-4 text-sm font-mono text-[#81c995] overflow-x-auto">{`# Install opencode
npm install -g opencode-ai

# Run in server mode
opencode serve`}</pre>
                </div>
              </li>

              <li className="flex gap-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#81c995]/10 border border-[#81c995]/20 text-[#81c995] font-bold text-sm">
                  2
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-[#e8eaed] mb-3">
                    Install OpenCode on your Android phone
                  </p>
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#81c995] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] hover:bg-[#a8d5b5] transition-colors"
                  >
                    <Download size={15} />
                    Get on Google Play
                  </a>
                  <p className="mt-2 text-xs text-[#9aa0a6]">
                    Currently in internal testing. Or{" "}
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8ab4f8] hover:text-[#aecbfa]"
                    >
                      build from source
                    </a>
                    .
                  </p>
                </div>
              </li>

              <li className="flex gap-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#81c995]/10 border border-[#81c995]/20 text-[#81c995] font-bold text-sm">
                  3
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-[#e8eaed] mb-2">
                    Add a connection in the app
                  </p>
                  <p className="text-sm text-[#9aa0a6]">
                    Tap <strong className="text-[#e8eaed]">Add Connection</strong>, choose your
                    connection type (LAN, tunnel, or Tailscale), enter the server URL, and tap{" "}
                    <strong className="text-[#e8eaed]">Connect</strong>.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-[#3c4043] bg-[#111111]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-6">
            <h2 className="text-2xl font-bold text-[#e8eaed] md:text-3xl mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-[#3c4043] bg-[#0a0a0a] p-6">
                  <h3 className="font-semibold text-[#e8eaed] mb-2">{faq.q}</h3>
                  <p className="text-sm text-[#9aa0a6] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#111111]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-6 text-center">
            <Image
              src="/images/opencode/icon-512.png"
              alt="OpenCode Mobile app icon"
              width={64}
              height={64}
              className="rounded-2xl mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-[#e8eaed] md:text-3xl mb-3">
              Free and open source
            </h2>
            <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
              MIT licensed. No telemetry you didn't opt into. No ad network. No subscriptions.
              Your server, your keys, your code. Contributions welcome.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#81c995] px-6 py-3 text-sm font-semibold text-[#0a0a0a] hover:bg-[#a8d5b5] transition-colors"
              >
                <Download size={16} />
                Get on Google Play
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#3c4043] px-6 py-3 text-sm font-semibold text-[#e8eaed] hover:border-[#81c995]/40 hover:bg-[#81c995]/5 transition-colors"
              >
                <Star size={16} />
                Star on GitHub
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-[#3c4043] px-6 py-3 text-sm font-semibold text-[#e8eaed] hover:border-[#81c995]/40 hover:bg-[#81c995]/5 transition-colors"
              >
                More Agent Labs Products
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#3c4043] bg-[#202124]">
        <div className="mx-auto w-full max-w-5xl px-5 py-8 text-sm text-[#9aa0a6] md:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p>
            Built by{" "}
            <Link href="/" className="font-medium text-[#8ab4f8] hover:text-[#aecbfa]">
              Agent Labs
            </Link>{" "}
            · Vibe Technologies LLC
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/opencode/privacy"
              className="hover:text-[#e8eaed] transition-colors"
            >
              Privacy Policy
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e8eaed] transition-colors flex items-center gap-1.5"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href="mailto:support@vibebrowser.app"
              className="hover:text-[#e8eaed] transition-colors"
            >
              support@vibebrowser.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
