import type { Metadata } from "next"

const CANONICAL = "https://agentlabs.cc/spark"

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Spark",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  url: CANONICAL,
  description:
    "Spark is a single-file AI coding agent. One TypeScript file — every tool needed to read, write, search, run code, and fan out parallel subagents. No frameworks, no magic. Just bun spark.ts.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Open source, MIT licensed.",
  },
  author: {
    "@type": "Person",
    name: "Dzianis Vasilenka",
    url: "https://github.com/dzianisv",
  },
  codeRepository: "https://github.com/dzianisv/spark",
  license: "https://opensource.org/licenses/MIT",
  programmingLanguage: "TypeScript",
  keywords:
    "AI coding agent, single-file agent, Ollama agent, local LLM coding, autonomous coding agent, bun AI agent, TypeScript coding agent, spark agent",
}

export const metadata: Metadata = {
  title: {
    absolute: "Spark — Single-File AI Coding Agent | AgentLabs",
  },
  description:
    "Spark is a single-file AI coding agent. One TypeScript file you can read and trust — every tool needed to get shit done, parallel subagents, skills, and autopilot mode.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Spark — Single-File AI Coding Agent",
    description:
      "One file. All tools. Runs on local LLMs. Spark is the coding agent you can actually audit — no framework magic, no hidden runtime.",
    url: CANONICAL,
    siteName: "Agent Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spark — Single-File AI Coding Agent",
    description:
      "One file. All tools. Runs on local LLMs. Spark is the coding agent you can actually audit.",
    creator: "@vibebrowserapp",
  },
  keywords: [
    "AI coding agent",
    "single-file AI agent",
    "Ollama coding agent",
    "local LLM coding",
    "autonomous coding agent",
    "bun AI agent",
    "TypeScript coding agent",
    "spark coding agent",
    "coding agent one file",
  ],
}

export default function SparkLayout({ children }: { children: React.ReactNode }) {
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
