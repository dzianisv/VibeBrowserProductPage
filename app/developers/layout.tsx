import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Developers | Browser Automation MCP',
  description: 'Build AI-powered browser automation with Vibe MCP. Access your browser from anywhere via relay.api.vibebrowser.app.',
  openGraph: {
    title: 'Vibe Co-Pilot for Developers',
    description: 'Browser automation MCP with remote access.',
    url: 'https://www.vibebrowser.app/developers',
    siteName: 'Vibe Co-Pilot',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Co-Pilot for Developers',
    description: 'Browser automation MCP with remote access.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
