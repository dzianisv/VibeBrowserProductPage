import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Investors - Research & Portfolio Analysis',
  description: 'Your AI investment assistant. Research stocks, download Morningstar reports, analyze portfolios, and make better investment decisions.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
