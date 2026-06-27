import type { Metadata } from "next"
import Link from "next/link"
import {
  Terminal,
  Smartphone,
  Globe,
  Github,
  ArrowRight,
  CheckCircle,
  Code2,
  Cpu,
  Shield,
  PlayCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Computer-Use Testing — agentprobe",
  description:
    "Test Android apps and browser extensions with a computer-use agent — it drives the real UI like a user and checks the result. Open source, MIT licensed, runs on your own CI.",
  alternates: {
    canonical: "https://agentlabs.cc/computer-use-testing",
  },
  openGraph: {
    type: "website",
    url: "https://agentlabs.cc/computer-use-testing",
    siteName: "Agent Labs",
    title: "Computer-Use Testing — agentprobe",
    description:
      "Test Android apps and browser extensions with a computer-use agent — it drives the real UI like a user and checks the result.",
    images: [
      {
        url: "/images/agentprobe/og.png",
        width: 1200,
        height: 630,
        alt: "agentprobe — Computer-Use Testing for Android Apps and Browser Extensions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Computer-Use Testing — agentprobe",
    description:
      "Test Android apps and browser extensions with a computer-use agent. MIT licensed, self-hostable.",
    images: ["/images/agentprobe/og.png"],
    creator: "@vibebrowserapp",
  },
}

const GITHUB_URL = "https://github.com/dzianisv/agentprobe"

const features = [
  {
    icon: Smartphone,
    color: "#81c995",
    title: "Drives the real UI",
    description:
      "No mocks, no test doubles. Interacts like a human user via adb input or xdotool. Catches regressions test doubles miss.",
  },
  {
    icon: Shield,
    color: "#c58af9",
    title: "BYOK, no vendor lock-in",
    description:
      "Supports Azure, OpenAI, Gemini, xAI. MIT licensed, self-hosted on your CI, no call home.",
  },
  {
    icon: PlayCircle,
    color: "#fdd663",
    title: "GIF artifacts + CI reports",
    description:
      "Every run records a screen GIF via ffmpeg and emits JUnit XML. Pass the GIF URL in the PR comment.",
  },
]

export default function ComputerUseTestingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8eaed]">
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
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#8ab4f8] hover:text-[#aecbfa] transition-colors"
            >
              <Github size={15} />
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#3c4043]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#81c995]/5 via-transparent to-[#c58af9]/5 pointer-events-none" />
          <div className="mx-auto max-w-5xl px-5 py-20 md:px-6 md:py-28">
            <div className="flex flex-col items-center text-center">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <span className="rounded-full bg-[#81c995]/10 px-3 py-1 text-xs font-medium text-[#81c995] border border-[#81c995]/20">
                  Open Source · MIT
                </span>
                <span className="rounded-full bg-[#3c4043]/60 px-3 py-1 text-xs font-medium text-[#9aa0a6]">
                  Android + Browser
                </span>
                <span className="rounded-full bg-[#c58af9]/10 px-3 py-1 text-xs font-medium text-[#c58af9] border border-[#c58af9]/20">
                  Self-Hostable
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-[#e8eaed] md:text-5xl lg:text-6xl max-w-3xl">
                Computer-Use Testing for{" "}
                <span className="text-[#81c995]">Android Apps and Browser Extensions</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-[#9aa0a6] leading-relaxed">
                Test Android apps and browser extensions with a computer-use agent — it drives the
                real UI like a user and checks the result. Open source and MIT licensed — no vendor
                lock-in, no agent infra in the middle, runs entirely on your own CI.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#81c995] px-6 py-3 text-sm font-semibold text-[#0a0a0a] hover:bg-[#a8d5b5] transition-colors"
                >
                  <Github size={16} />
                  View on GitHub
                  <ArrowRight size={15} />
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#3c4043] px-6 py-3 text-sm font-semibold text-[#e8eaed] hover:border-[#81c995]/40 hover:bg-[#81c995]/5 transition-colors"
                >
                  Read the Blog
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#9aa0a6]">
                <span className="font-mono bg-[#1a1a1a] border border-[#3c4043] rounded px-3 py-1.5 text-[#81c995]">
                  pip install agentprobe
                </span>
                <span className="font-mono bg-[#1a1a1a] border border-[#3c4043] rounded px-3 py-1.5 text-[#9aa0a6]">
                  agentprobe run --target android|browser --case &lt;path&gt;
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-[#3c4043]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-6">
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={16} className="text-[#81c995]" />
              <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
                How it works
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#e8eaed] md:text-3xl mb-3">
              Two backends. One CLI.
            </h2>
            <p className="text-[#9aa0a6] mb-10">
              agentprobe ships an Android backend driven by adb and a browser backend driven by
              Chrome CDP. Both feed screenshots to a vision model and translate its decisions into
              real UI actions.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Android backend */}
              <div className="rounded-xl border border-[#3c4043] bg-[#1a1a1a] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone size={16} className="text-[#81c995]" />
                  <span className="text-sm font-semibold text-[#e8eaed]">Android backend</span>
                </div>
                <pre className="font-mono text-sm text-[#9aa0a6] leading-loose overflow-x-auto">{`adb screencap → base64 PNG
       ↓
  vision model (GPT-4o / Gemini / Claude)
       ↓
  adb shell input (tap / type / swipe / key)
       ↓
  ui_dump assertions + NL verification`}</pre>
              </div>

              {/* Browser backend */}
              <div className="rounded-xl border border-[#3c4043] bg-[#1a1a1a] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe size={16} className="text-[#8ab4f8]" />
                  <span className="text-sm font-semibold text-[#e8eaed]">Browser backend</span>
                </div>
                <pre className="font-mono text-sm text-[#9aa0a6] leading-loose overflow-x-auto">{`Chrome CDP → scrot screenshot
       ↓
  vision model
       ↓
  xdotool click / type
       ↓
  CDP assertion + NL verification`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-[#3c4043] bg-[#111111]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-6">
            <h2 className="text-2xl font-bold text-[#e8eaed] md:text-3xl mb-2">Features</h2>
            <p className="text-[#9aa0a6] mb-12">
              Everything you need to run real-device UI tests in CI.
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

        {/* CI Usage */}
        <section className="border-b border-[#3c4043]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-6">
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={16} className="text-[#8ab4f8]" />
              <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
                CI Usage
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#e8eaed] md:text-3xl mb-3">
              GitHub Actions integration
            </h2>
            <p className="text-[#9aa0a6] mb-8">
              Android tests run inside{" "}
              <code className="text-[#81c995] font-mono text-sm">android-emulator-runner</code>{" "}
              (API 28). Browser tests run in a containerized Chrome instance. Both targets emit JUnit
              XML and a screen GIF.
            </p>

            <div className="rounded-xl border border-[#3c4043] bg-[#111111] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#3c4043] bg-[#1a1a1a]">
                <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
                <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
                <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
                <span className="ml-2 text-xs text-[#9aa0a6] font-mono">
                  .github/workflows/android-cua.yml
                </span>
              </div>
              <pre className="p-6 font-mono text-sm text-[#9aa0a6] leading-relaxed overflow-x-auto">{`# .github/workflows/android-cua.yml
- uses: reactivecircus/android-emulator-runner@v2
  with:
    api-level: 28
    script: agentprobe run --target android --case cases/onboarding.yaml

# For browser extensions:
- run: |
    agentprobe run --target browser \\
      --extension ./my-extension.crx \\
      --case cases/sidepanel.yaml`}</pre>
            </div>
          </div>
        </section>

        {/* Test case schema */}
        <section className="border-b border-[#3c4043] bg-[#111111]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-6">
            <div className="flex items-center gap-2 mb-4">
              <Cpu size={16} className="text-[#c58af9]" />
              <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
                Test case schema
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#e8eaed] md:text-3xl mb-3">
              Minimal YAML — no code required
            </h2>
            <p className="text-[#9aa0a6] mb-8">
              Test cases are plain YAML files. Describe the goal and success criteria in natural
              language; the vision model handles the rest.
            </p>

            <div className="rounded-xl border border-[#3c4043] bg-[#0a0a0a] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#3c4043] bg-[#1a1a1a]">
                <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
                <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
                <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
                <span className="ml-2 text-xs text-[#9aa0a6] font-mono">
                  cases/onboarding.yaml
                </span>
              </div>
              <pre className="p-6 font-mono text-sm text-[#9aa0a6] leading-relaxed overflow-x-auto">{`name: onboarding-flow
instruction: "Open the app and complete onboarding until you see the dashboard"
successCriteria: "Dashboard screen is visible"
failureCriteria: "App crashes or shows error dialog"
maxSteps: 30
verification:
  prompt: "Is the dashboard visible and functional?"`}</pre>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "instruction", desc: "Natural language goal for the agent" },
                { label: "successCriteria", desc: "NL condition checked after completion" },
                { label: "failureCriteria", desc: "Abort condition detected mid-run" },
                { label: "maxSteps", desc: "Hard cap on agent action steps" },
                { label: "verification.prompt", desc: "Final NL assertion sent to vision model" },
              ].map((field) => (
                <div
                  key={field.label}
                  className="rounded-lg border border-[#3c4043] bg-[#1a1a1a] px-4 py-3"
                >
                  <code className="text-xs font-mono text-[#c58af9]">{field.label}</code>
                  <p className="mt-1 text-xs text-[#9aa0a6]">{field.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open source section */}
        <section className="border-b border-[#3c4043]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={16} className="text-[#81c995]" />
              <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
                Open source
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#e8eaed] md:text-3xl mb-4">
              MIT licensed. No agent infra in the middle.
            </h2>
            <p className="text-[#9aa0a6] leading-relaxed max-w-2xl mb-6">
              agentprobe is MIT licensed and entirely self-hostable. It runs on your own GitHub
              Actions runner — there is no Agent Labs infrastructure between your test runner and
              your app. Your screenshots, your API keys, and your source code stay on your machines.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#81c995] px-6 py-3 text-sm font-semibold text-[#0a0a0a] hover:bg-[#a8d5b5] transition-colors"
              >
                <Github size={16} />
                View on GitHub
                <ArrowRight size={15} />
              </a>
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#3c4043] px-6 py-3 text-sm text-[#9aa0a6]">
                <code className="font-mono text-[#81c995]">pip install agentprobe</code>
              </div>
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
