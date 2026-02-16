import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { GoogleAnalytics } from '@/components/google-analytics'
import { ReferralTracker } from '@/components/referral-tracker'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vibebrowser.app'),
  title: {
    default: 'Vibe AI Browser Co-Pilot - Automate Your Browsing',
    template: '%s | Vibe AI Browser Co-Pilot',
  },
  description: 'Vibe AI Browser Co-Pilot automates browsing tasks autonomously. Research, data entry, bookings, and more - just describe what you want done. The first truly agentic AI browser extension.',
  keywords: [
    'AI browser co-pilot',
    'AI browser auto-pilot',
    'agentic AI browser',
    'agentic browser',
    'AI browser copilot',
    'autonomous AI browser',
    'AI browser agent',
    'browser automation AI',
    'AI-powered browser',
    'AI web agent',
    'browser AI assistant',
    'AI browser',
    'intelligent browser',
    'autonomous web browsing',
    'AI task automation',
    'browser copilot',
    'web automation tool',
    'AI-native browser',
    'natural language browser',
    'Vibe browser'
  ],
  authors: [{ name: 'Vibe AI Browser Co-Pilot Team' }],
  creator: 'Vibe AI Browser Co-Pilot',
  publisher: 'Vibe AI Browser Co-Pilot',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vibebrowser.app',
    siteName: 'Vibe AI Browser Co-Pilot',
    title: 'Vibe AI Browser Co-Pilot',
    description: 'The first agentic AI browser extension that automates research, bookings, data entry, and more. Just describe what you want done.',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'Vibe Browser - AI Browser Co-Pilot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe AI Browser Co-Pilot',
    description: 'Your AI browser co-pilot that handles browsing tasks autonomously. Research, bookings, data entry - just describe what you want done.',
    images: ['/og/home.svg'],
    creator: '@vibebrowserapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.vibebrowser.app',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/icon-192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/icon-512.png',
      },
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <GoogleAnalytics />
        <ReferralTracker />
        {children}
      </body>
    </html>
  )
}
