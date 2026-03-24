import type { Metadata } from 'next'
import { Newsreader } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { GoogleAnalytics } from '@/components/google-analytics'
import { ReferralTracker } from '@/components/referral-tracker'
import { WebVitals } from '@/components/web-vitals'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vibebrowser.app'),
  title: {
    default: 'Vibe Co-Pilot | AI Browser Automation for Real Browser Sessions',
    template: '%s | Vibe Co-Pilot',
  },
  description:
    'AI browser automation for real logged-in browser sessions. Operate websites, Gmail, and Google Calendar directly or via MCP from Claude Code, Codex, Gemini CLI, and other agents.',
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
    'Vibe browser',
    'Google Workspace automation',
    'Gmail automation',
    'Google Calendar automation',
    'MCP server',
    'Model Context Protocol',
    'skills library',
    'credential vault',
    'password vault',
    'BYOK AI',
    'Claude Max',
    'GitHub Copilot MCP'
  ],
  authors: [{ name: 'Vibe Co-Pilot Team' }],
  creator: 'Vibe Co-Pilot',
  publisher: 'Vibe Co-Pilot',
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
    title: 'Vibe Browser | Real Browser AI Automation',
    description:
      'AI browser automation for real logged-in browser sessions with MCP access, Google Workspace tools, and reusable skills.',
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
    title: 'Vibe Co-Pilot | Real Browser AI Automation',
    description:
      'AI browser automation for real logged-in browser sessions with MCP access, Google Workspace tools, and reusable skills.',
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


const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vibe Co-Pilot',
  url: 'https://www.vibebrowser.app',
  description:
    'AI browser automation for real logged-in browser sessions with MCP access, reusable skills, and model-flexible execution.',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vibe Technologies',
  url: 'https://www.vibebrowser.app',
  logo: 'https://www.vibebrowser.app/vibebrowser-logo.png',
  description: 'Building AI-powered browser automation tools that work inside your real browser sessions.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@vibebrowser.app',
    contactType: 'customer support',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://twitter.com/vibebrowserapp',
    'https://linkedin.com/company/vibebrowser',
    'https://github.com/VibeTechnologies',
  ],
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe Browser',
  applicationCategory: 'BrowserApplication',
  operatingSystem: 'Chrome',
  description:
    'AI browser automation that operates real logged-in browser sessions, Gmail, and Google Calendar with MCP access, reusable skills, and a secure secrets vault.',
  url: 'https://www.vibebrowser.app',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://www.vibebrowser.app',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier available, with paid plans for premium models and higher-volume workflows.',
  },
  featureList: [
    'Autonomous browser task execution',
    'Natural language task description',
    'Research automation',
    'Data entry automation',
    'Booking automation',
    'Human-in-the-loop approvals',
    'Privacy-first architecture',
    'Model-agnostic AI support',
    'MCP server integration',
    'Enterprise and team workflows',
    'Google Workspace integration (Gmail, Calendar)',
    'Skills library for reusable workflows',
    'Secrets vault with password fill tool',
    'Works with Vibe AI and BYOK providers',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable}`}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Vibe Blog RSS Feed"
          href="https://www.vibebrowser.app/rss.xml"
        />
      </head>
      <body>
        <GoogleAnalytics />
        <WebVitals />
        <ReferralTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
