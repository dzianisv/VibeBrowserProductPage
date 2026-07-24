import type { Metadata } from "next"

const title = "Products — Android AI Apps by Agent Labs"
const description =
  "Explore Android AI apps built by Agent Labs (Vibe Technologies LLC): Kinetic AI Fitness Coach — an AI personal trainer that counts reps and corrects form — and Mystic Tarot, an AI tarot card reader and scanner."

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Agent Labs products",
    "Android AI apps",
    "AI personal trainer",
    "AI tarot app",
    "Kinetic AI Coach",
    "Mystic Tarot",
    "Vibe Technologies apps",
  ],
  alternates: { canonical: "https://agentlabs.cc/products" },
  openGraph: {
    type: "website",
    url: "https://agentlabs.cc/products",
    siteName: "Agent Labs",
    title,
    description,
    images: [
      {
        url: "/vibebrowser-logo.png",
        width: 512,
        height: 512,
        alt: "Agent Labs Products",
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

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
