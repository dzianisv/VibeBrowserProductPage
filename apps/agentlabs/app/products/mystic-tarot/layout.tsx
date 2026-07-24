import type { Metadata } from "next"

const title = "Mystic Tarot: AI Card Reader — Scan Tarot Cards on Android"
const description =
  "Mystic Tarot turns your phone into an AI-powered oracle. Scan your real tarot cards with AI, draw a digital deck for instant readings, and chat with your own AI Tarot Master. Daily guidance and a private, offline reading journal."

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "tarot reading",
    "ai tarot",
    "tarot card scanner",
    "daily tarot",
    "tarot cards",
    "free tarot reading",
    "AI tarot app Android",
    "Mystic Tarot",
  ],
  alternates: { canonical: "https://agentlabs.cc/products/mystic-tarot" },
  openGraph: {
    type: "website",
    url: "https://agentlabs.cc/products/mystic-tarot",
    siteName: "Agent Labs",
    title,
    description,
    images: [
      {
        url: "/vibebrowser-logo.png",
        width: 512,
        height: 512,
        alt: "Mystic Tarot: AI Card Reader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@vibebrowserapp",
  },
  robots: { index: true, follow: true },
}

export default function TarotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
