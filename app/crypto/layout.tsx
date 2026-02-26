import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Crypto & DeFi - DeFi Portfolio Management',
  description: 'Your AI crypto assistant with Google Workspace tools, MCP agent access, skills, and a secrets vault for secure DeFi workflows.',
  keywords: [
    'AI crypto',
    'DeFi portfolio management',
    'crypto AI assistant',
    'DeFi research automation',
    'yield tracking',
    'crypto portfolio rebalancing',
    'blockchain AI',
    'Web3 automation',
    'google workspace automation',
    'mcp server',
    'skills library',
    'secrets vault',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/crypto',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Crypto & DeFi',
    description: 'AI crypto assistant with Google Workspace, MCP agent access, skills, and a secrets vault.',
    url: 'https://www.vibebrowser.app/crypto',
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
