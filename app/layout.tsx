import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vibebrowser.app'),
  title: {
    default: 'Vibe - AI-Native Browser for the Future | Control the Web with Natural Language',
    template: '%s | Vibe Browser',
  },
  description: 'Experience the revolutionary AI Web Agent. Control any website with natural language - just type or speak what you want. Navigate, click, fill forms, and complete tasks effortlessly. Download Vibe Browser today.',
  keywords: [
    'AI browser',
    'AI-native browser',
    'voice controlled browser',
    'natural language browser',
    'AI web automation',
    'browser automation',
    'intelligent browser',
    'voice browsing',
    'AI assistant browser',
    'Vibe browser',
    'future of browsing',
    'web automation tool',
    'AI-powered browser',
    'hands-free browsing',
    'accessibility browser'
  ],
  authors: [{ name: 'Vibe Browser Team' }],
  creator: 'Vibe Browser',
  publisher: 'Vibe Browser',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vibebrowser.app',
    siteName: 'Vibe Browser',
    title: 'Vibe Browser - The AI-Native Browser That Understands You',
    description: 'Control any website with natural language. Just tell Vibe what you want - navigate, click, fill forms, and complete tasks effortlessly.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vibe Browser - AI Web Agent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe - AI-Native Browser for Natural Language Control',
    description: 'The revolutionary browser that lets you control any website by typing or talking. Experience the future of web browsing.',
    images: ['/twitter-image.png'],
    creator: '@vibebrowser',
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
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    other: {
      'msvalidate.01': 'bing-verification-code',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
