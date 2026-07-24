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
    images: [
      {
        url: "/agentpod/demo-poster.jpg",
        width: 1080,
        height: 1920,
        alt: "AgentPod Mobile running on an Android phone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/agentpod/demo-poster.jpg"],
    creator: "@vibebrowserapp",
  },
  robots: { index: true, follow: true },
}

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
