import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Crypto & DeFi - DeFi Portfolio Management',
  description: 'Your AI crypto assistant. Research DeFi pools, compare APY, rebalance portfolio, track yields across chains.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
