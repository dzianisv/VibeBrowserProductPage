import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://agentlabs.cc'),
  title: {
    default: 'Agent Labs — Agentic AI by Vibe Technologies',
    template: '%s | Agent Labs',
  },
  description:
    'Agent Labs is where Vibe Technologies LLC builds agentic AI products: OpenClaw infra, agentic hedge funds, and multi-agent browser automation.',
  keywords: [
    'agentic AI',
    'AI agents',
    'OpenClaw',
    'agentic hedge fund',
    'multi-agent AI',
    'browser automation AI',
    'Vibe Technologies',
    'AI infrastructure',
    'agent labs',
  ],
  authors: [{ name: 'Vibe Technologies LLC' }],
  creator: 'Vibe Technologies LLC',
  publisher: 'Vibe Technologies LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agentlabs.cc',
    siteName: 'Agent Labs',
    title: 'Agent Labs — Agentic AI by Vibe Technologies',
    description:
      'Building the next generation of agentic AI: OpenClaw infra, agentic hedge funds, and multi-agent browser automation.',
    images: [
      {
        url: '/vibebrowser-logo.png',
        width: 512,
        height: 512,
        alt: 'Agent Labs — Vibe Technologies LLC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Labs — Agentic AI by Vibe Technologies',
    description:
      'Building the next generation of agentic AI: OpenClaw infra, agentic hedge funds, and multi-agent browser automation.',
    images: ['/vibebrowser-logo.png'],
    creator: '@vibebrowserapp',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://agentlabs.cc',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vibe Technologies LLC',
  url: 'https://agentlabs.cc',
  logo: 'https://agentlabs.cc/vibebrowser-logo.png',
  description: 'Building agentic AI products: OpenClaw infra, AI hedge funds, and multi-agent browser automation.',
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
    'https://www.vibebrowser.app',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
