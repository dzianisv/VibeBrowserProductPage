import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VibeBrowser -- So Simple, Even Your Mom Can Use It',
  description:
    'AI agents are everywhere, but they all need a developer to set up. VibeBrowser is different. Install from Chrome Web Store. Type what you want. It works. No API keys, no coding, no strings attached.',
  keywords: [
    'AI browser extension',
    'easy AI assistant',
    'Chrome AI extension',
    'simple AI browser',
    'browser automation for everyone',
    'AI for non-technical users',
    'no API key AI',
    'private AI browser',
    'free AI Chrome extension',
    'VibeBrowser',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/mom',
  },
  openGraph: {
    title: 'VibeBrowser -- So Simple, Even Your Mom Can Use It',
    description:
      'Dozens of AI agents exist. They all need a developer to set up. VibeBrowser doesn\'t. Install from Chrome Web Store. Type what you want. It works.',
    url: 'https://www.vibebrowser.app/mom',
    siteName: 'VibeBrowser',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeBrowser -- So Simple, Even Your Mom Can Use It',
    description:
      'AI agents are everywhere, but they all need a developer. VibeBrowser doesn\'t. One-click install. Type what you want. It works.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function MomLayout({ children }: { children: React.ReactNode }) {
  return children
}
