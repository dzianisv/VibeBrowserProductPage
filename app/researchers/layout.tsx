import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Researchers | AI Research Assistant',
  description: 'Accelerate research with Vibe Co-Pilot. Includes Google Workspace (Gmail + Calendar), MCP agent access, reusable skills, and a secrets vault.',
  keywords: [
    'AI research assistant',
    'research automation',
    'academic research AI',
    'paper summarization',
    'market research AI',
    'research synthesis',
    'google workspace automation',
    'mcp server',
    'skills library',
    'secrets vault',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/researchers',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Researchers',
    description: 'AI research assistant with Google Workspace, MCP agent access, skills, and a secrets vault.',
    url: 'https://www.vibebrowser.app/researchers',
    siteName: 'Vibe Co-Pilot',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
