import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Investors - Research & Portfolio Analysis',
  description: 'Your AI investment assistant. Research stocks, download Morningstar reports, analyze portfolios, and make better investment decisions.',
  keywords: [
    'AI investor',
    'stock research AI',
    'portfolio analysis AI',
    'Morningstar automation',
    'investment research automation',
    'AI financial analysis',
    'stock screening',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/investors',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Investors',
    description: 'Your AI investment assistant. Research stocks, analyze portfolios.',
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
