import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vibebrowser.app'),
  title: 'Vibe Browser for OpenClaw | Real Browser CLI',
  description: 'Use OpenClaw with your real browser through @vibebrowser/cli. Command-oriented browser control with --remote <uuid> or --remote <full-ws-url>, and the same logged-in Vibe Browser session.',
  keywords: [
    'openclaw browser cli',
    'vibebrowser-cli',
    'vibe browser for openclaw',
    'real browser cli for ai agents',
    'openclaw browser control',
    'browser cli relay',
    'remote browser relay',
    '@vibebrowser/cli',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vibebrowser.app/openclaw',
    siteName: 'Vibe Browser',
    title: 'Vibe Browser for OpenClaw | Real Browser CLI',
    description: 'Command-oriented browser control for OpenClaw-style workflows using @vibebrowser/cli and your real logged-in browser session.',
    images: [
      {
        url: '/openclaw/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Vibe Browser for OpenClaw',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Browser for OpenClaw | Real Browser CLI',
    description: 'Command-oriented browser control for OpenClaw-style workflows using @vibebrowser/cli.',
    images: ['/openclaw/twitter-image'],
    creator: '@vibebrowserapp',
  },
  alternates: {
    canonical: 'https://www.vibebrowser.app/openclaw',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe Browser for OpenClaw',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Chrome, macOS, Windows, Linux',
  description: 'Command-oriented browser CLI for OpenClaw-style workflows, backed by the real Vibe Browser session and relay.',
  url: 'https://www.vibebrowser.app/openclaw',
  downloadUrl: 'https://www.npmjs.com/package/@vibebrowser/cli',
  featureList: [
    'OpenClaw-compatible browser CLI',
    'Uses your real logged-in browser session',
    'Local and remote relay support',
    'Command-oriented status, open, snapshot, click, and type flows',
    'Companion MCP package for Codex, Cursor, Claude Code, and other agents',
  ],
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://www.vibebrowser.app',
  },
}

export default function OpenClawLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
