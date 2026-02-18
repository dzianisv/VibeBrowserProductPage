import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Researchers | AI Research Assistant',
  description: 'Accelerate research with Vibe Co-Pilot. Search academic databases, summarize papers, and synthesize findings.',
  openGraph: {
    title: 'Vibe Co-Pilot for Researchers',
    description: 'AI research assistant for academic and market research.',
    url: 'https://www.vibebrowser.app/researchers',
    siteName: 'Vibe Co-Pilot',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
