import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OpenClaw Mobile | Your Personal OpenClaw in Your Pocket',
  description:
    'OpenClaw Mobile is the phone-native way to launch, chat with, and control your own managed OpenClaw instance — without a Mac mini, a home server, or a remote-desktop ritual.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/mobile',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vibebrowser.app/mobile',
    siteName: 'Vibe Browser',
    title: 'OpenClaw Mobile | Your Personal OpenClaw in Your Pocket',
    description:
      'The phone-native way to launch, chat with, and control your own managed OpenClaw instance — no Mac mini, no home server, no remote-desktop ritual.',
    images: [
      {
        url: '/og/mcp',
        width: 1200,
        height: 630,
        alt: 'OpenClaw Mobile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenClaw Mobile | Your Personal OpenClaw in Your Pocket',
    description:
      'Launch, chat with, and control your own managed OpenClaw instance from your phone — no Mac mini, no home server required.',
    images: ['/og/mcp'],
    creator: '@vibebrowserapp',
  },
}

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
