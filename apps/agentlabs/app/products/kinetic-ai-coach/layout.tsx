import type { Metadata } from "next"

const title = "Kinetic AI Fitness Coach — AI Personal Trainer for Android"
const description =
  "Kinetic is the AI personal trainer that watches your form, counts your reps, and coaches you out loud using just your phone's camera. Live on-device pose detection, AI form correction, and personalized workout plans."

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AI personal trainer",
    "rep counter",
    "form correction",
    "AI fitness coach",
    "pose detection",
    "home workout",
    "AI workout app Android",
    "Kinetic AI Coach",
  ],
  alternates: { canonical: "https://agentlabs.cc/products/kinetic-ai-coach" },
  openGraph: {
    type: "website",
    url: "https://agentlabs.cc/products/kinetic-ai-coach",
    siteName: "Agent Labs",
    title,
    description,
    images: [
      {
        url: "/vibebrowser-logo.png",
        width: 512,
        height: 512,
        alt: "Kinetic AI Fitness Coach",
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

export default function KineticLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
