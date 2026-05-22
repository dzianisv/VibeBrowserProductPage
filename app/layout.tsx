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
    default: 'AI Browser Co-Pilot for Chrome | Vibe',
    template: '%s | Vibe Co-Pilot',
  },
  description:
    'Automate repetitive web tasks inside your real Chrome session — Gmail, calendars, and any website. Free to install. No API hacks needed.',
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'OxGqPS7cJdS3ROdqQPhFwr-TqUnml2XvThfxOPC5beo',
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

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is my data safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You choose how data is processed. Local models run on your device. Cloud models send data to that provider\'s API.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Vibe Co-Pilot cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe is free to install. If you run cloud models, usage is billed by that provider, and paid Vibe plans are optional.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Vibe compare to OpenClaw?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OpenClaw is a self-hosted agent stack. Vibe is a browser co-pilot focused on completing overcomplicated web tasks in your existing browser sessions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Vibe compare to Claude Cowork?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Claude browser workflows are Claude-first. Vibe is browser-first and model-flexible, so teams can choose how they run automations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Vibe compare to Chrome DevTools MCP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DevTools MCP is a browser debugging/control interface. Vibe packages browser task execution into a co-pilot experience for end-to-end workflows.',
      },
    },
  ],
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe Browser',
  applicationCategory: 'WebApplication',
  browserRequirements: 'Chrome',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
