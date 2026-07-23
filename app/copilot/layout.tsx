import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for GitHub Copilot Users | Browser Automation for Non-Engineers',
  description: 'Use your GitHub Copilot subscription inside Vibe to automate browser workflows for recruiting, sales, operations, finance, and support teams.',
  keywords: [
    'github copilot automation',
    'github copilot for business users',
    'browser automation for non-engineers',
    'copilot browser control',
    'recruiting automation',
    'sales operations automation',
    'gmail workflow automation',
    'calendar workflow automation',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/copilot',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for GitHub Copilot Users',
    description: 'Bring your Copilot subscription and automate real browser workflows for non-software teams.',
    url: 'https://www.vibebrowser.app/copilot',
    siteName: 'Vibe Co-Pilot',
    type: 'website',
    images: [
      {
        url: '/og/home',
        width: 1200,
        height: 630,
        alt: 'Vibe Co-Pilot for GitHub Copilot Users',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Co-Pilot for GitHub Copilot Users',
    description: 'Use your Copilot subscription to automate real web workflows for non-engineering teams.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white">{children}</div>
}
