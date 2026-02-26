import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Investors - Research & Portfolio Analysis',
  description: 'Your AI investment assistant with Google Workspace tools, MCP agent access, reusable skills, and a secrets vault for secure research.',
  keywords: [
    'AI investor',
    'stock research AI',
    'portfolio analysis AI',
    'Morningstar automation',
    'investment research automation',
    'AI financial analysis',
    'stock screening',
    'google workspace automation',
    'mcp server',
    'skills library',
    'secrets vault',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/investors',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Investors',
    description: 'AI investment assistant with Google Workspace, MCP agent access, skills, and a secrets vault.',
    url: 'https://www.vibebrowser.app/investors',
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
