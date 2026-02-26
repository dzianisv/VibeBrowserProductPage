import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Developers | Browser Automation MCP',
  description: 'Build AI-powered browser automation with Vibe MCP. Expose your real browser to other agents with Google Workspace tools, skills, and a secrets vault.',
  keywords: [
    'MCP browser automation',
    'browser MCP server',
    'AI browser automation',
    'Playwright MCP',
    'remote browser API',
    'headless browser automation',
    'Google Workspace automation',
    'MCP skills library',
    'credential vault',
    'BYOK AI',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/developers',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Developers',
    description: 'Browser automation MCP with Google Workspace tools, skills, and a secrets vault.',
    url: 'https://www.vibebrowser.app/developers',
    siteName: 'Vibe Co-Pilot',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Co-Pilot for Developers',
    description: 'Browser automation MCP with Google Workspace tools, skills, and a secrets vault.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
