import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vibe Technologies - AI Agents for the Web",
  description: "Vibe Technologies builds AI agents that operate the web. Products include Vibe AI Browser Co-Pilot, Vibe Agentic Team, Vibe for Enterprise, and OClawBox Telegram bot.",
  openGraph: {
    title: "Vibe Technologies - AI Agents for the Web",
    description: "Building AI agents that act, not just answer. Web agents, agentic teams, and enterprise automation.",
    url: "https://www.vibebrowser.app/vibetechnologies",
    siteName: "Vibe Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Technologies - AI Agents for the Web",
    description: "Building AI agents that act, not just answer. Web agents, agentic teams, and enterprise automation.",
  },
}

export default function VibeTechnologiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
