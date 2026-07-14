import type { Metadata } from "next"

const CANONICAL = "https://agentlabs.cc/a-test"

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "a-test",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  url: CANONICAL,
  description:
    "Test mobile apps and browser apps with a computer-use agent. Vision-loop CUA framework for CI — drives real UI, judges results on screen.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Open source and MIT licensed. Install from GitHub until the first PyPI release.",
  },
  author: {
    "@type": "Organization",
    name: "Vibe Technologies LLC",
    url: "https://agentlabs.cc",
  },
  codeRepository: "https://github.com/dzianisv/a-test",
  license: "https://opensource.org/licenses/MIT",
  keywords:
    "computer-use testing, CUA test framework, Android UI testing, browser extension testing, LLM UI automation, CI testing agent, a-test",
}

export const metadata: Metadata = {
  title: {
    absolute: "a-test — AI-Driven UI Testing for Mobile & Browser Apps | AgentLabs",
  },
  description:
    "Test mobile apps and browser apps with a computer-use agent. Vision-loop CUA framework for CI — drives real UI, judges results on screen.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "a-test — AI-Driven UI Testing for Mobile & Browser Apps",
    description:
      "Vision-loop CUA test framework. Drives real mobile and browser app UI, judges results on screen. CI-ready in one GitHub Actions step.",
    url: CANONICAL,
    siteName: "Agent Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "a-test — AI-Driven UI Testing for Mobile & Browser Apps",
    description:
      "Vision-loop CUA test framework. Drives real mobile and browser app UI, judges results on screen. CI-ready in one GitHub Actions step.",
    creator: "@vibebrowserapp",
  },
  keywords: [
    "computer-use testing",
    "CUA test framework",
    "Android UI testing",
    "browser extension testing",
    "LLM UI automation",
    "CI testing agent",
    "a-test",
  ],
}

export default function ATestLayout({ children }: { children: React.ReactNode }) {
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
