import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Crypto & DeFi - DeFi Portfolio Management',
  description: 'Your AI crypto assistant. Research DeFi pools, compare APY, rebalance portfolio, track yields across chains.',
  keywords: [
    'AI crypto',
    'DeFi portfolio management',
    'crypto AI assistant',
    'DeFi research automation',
    'yield tracking',
    'crypto portfolio rebalancing',
    'blockchain AI',
    'Web3 automation',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/crypto',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Crypto & DeFi',
    description: 'Your AI crypto assistant. Research DeFi pools, compare APY, rebalance portfolio.',
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
