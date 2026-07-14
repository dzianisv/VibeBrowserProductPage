import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://opencode.agentlabs.cc'),
  title: {
    default: 'OpenCode Mobile — Android App, iOS Coming Soon',
    template: '%s | OpenCode Mobile',
  },
  description:
    'OpenCode Mobile is the free, open-source Android client for the opencode AI coding agent. The iOS app is in development — join the waitlist for release updates.',
  keywords: [
    'opencode mobile',
    'AI coding agent',
    'mobile coding',
    'self-hosted AI',
    'opencode client',
    'open source',
    'Android AI coding',
    'opencode iOS',
    'iOS waitlist',
  ],
  authors: [{ name: 'Vibe Technologies' }],
  creator: 'Vibe Technologies',
  publisher: 'Vibe Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://opencode.agentlabs.cc',
    siteName: 'OpenCode Mobile',
    title: 'OpenCode Mobile — Android App, iOS Coming Soon',
    description:
      'The open-source opencode client is available for Android. Join the waitlist for the upcoming iOS release.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenCode Mobile — Android App, iOS Coming Soon',
    description:
      'The open-source opencode client is available for Android. Join the waitlist for the upcoming iOS release.',
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
    canonical: 'https://opencode.agentlabs.cc',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
        <Nav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
