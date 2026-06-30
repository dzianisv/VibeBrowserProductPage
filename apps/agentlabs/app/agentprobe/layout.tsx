import type { Metadata } from "next"

const CANONICAL = "https://agentlabs.cc/agentprobe"

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AgentProbe",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  url: CANONICAL,
  description:
    "Test Android apps and browser extensions with a computer-use agent. Vision-loop CUA framework for CI — drives real UI, judges results on screen.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Open source, MIT licensed. Available on PyPI.",
  },
  author: {
    "@type": "Organization",
    name: "Vibe Technologies LLC",
    url: "https://agentlabs.cc",
  },
  codeRepository: "https://github.com/dzianisv/agentprobe",
  license: "https://opensource.org/licenses/MIT",
  keywords:
    "computer-use testing, CUA test framework, Android UI testing, browser extension testing, LLM UI automation, CI testing agent, agentprobe",
}

export const metadata: Metadata = {
  title: {
    absolute: "AgentProbe — AI-Driven UI Testing for Android & Browser | AgentLabs",
  },
  description:
    "Test Android apps and browser extensions with a computer-use agent. Vision-loop CUA framework for CI — drives real UI, judges results on screen.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "AgentProbe — AI-Driven UI Testing for Android & Browser",
    description:
      "Vision-loop CUA test framework. Drives real Android and browser UI, judges results on screen. CI-ready in one GitHub Actions step.",
    url: CANONICAL,
    siteName: "Agent Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentProbe — AI-Driven UI Testing for Android & Browser",
    description:
      "Vision-loop CUA test framework. Drives real Android and browser UI, judges results on screen. CI-ready in one GitHub Actions step.",
    creator: "@vibebrowserapp",
  },
  keywords: [
    "computer-use testing",
    "CUA test framework",
    "Android UI testing",
    "browser extension testing",
    "LLM UI automation",
    "CI testing agent",
    "agentprobe",
  ],
}

export default function AgentProbeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      {children}
    </>
  )
}
