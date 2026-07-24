import type { Metadata } from "next"

const title = "AgentPod Mobile — On-device, BYOK AI coding agent for Android"
const description =
  "AgentPod Mobile is a private, bring-your-own-key AI coding and research agent for Android. It bundles a real Termux Linux runtime and a Node.js gateway on your phone — your API key, your provider, no middleman."

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AgentPod Mobile",
    "Android AI agent",
    "BYOK AI",
    "on-device AI",
    "AI coding assistant Android",
    "Termux AI",
    "private AI assistant",
    "Azure OpenAI Android",
    "Anthropic Claude Android",
    "OpenRouter",
    "GitHub Copilot mobile",
  ],
  alternates: { canonical: "https://agentpod.agentlabs.cc/mobile" },
  openGraph: {
    type: "website",
    url: "https://agentpod.agentlabs.cc/mobile",
    siteName: "Agent Labs",
    title,
    description,
    // OG/Twitter images are supplied by the file-based `opengraph-image.tsx`
    // and `twitter-image.tsx` in this route (a proper 1200×630 social card).
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@vibebrowserapp",
  },
  robots: { index: true, follow: true },
}

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
