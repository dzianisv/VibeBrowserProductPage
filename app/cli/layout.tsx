import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050810',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vibebrowser.app'),
  title: 'Vibe Browser CLI | Real Browser Terminal Control',
  description: 'Use @vibebrowser/cli to control your real logged-in browser from the terminal. Supports local commands plus --remote <uuid> and --remote <full-ws-url>.',
  keywords: [
    'vibebrowser-cli',
    'vibe browser cli',
    'browser cli',
    'real browser terminal control',
    'remote browser relay cli',
    '@vibebrowser/cli',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vibebrowser.app/cli',
    siteName: 'Vibe Browser',
    title: 'Vibe Browser CLI | Real Browser Terminal Control',
    description: 'Control your real browser from the terminal with @vibebrowser/cli, local commands, and remote relay support.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Browser CLI | Real Browser Terminal Control',
    description: 'Control your real browser from the terminal with @vibebrowser/cli and remote relay support.',
    creator: '@vibebrowserapp',
  },
  alternates: {
    canonical: 'https://www.vibebrowser.app/cli',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe Browser CLI',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Chrome, macOS, Windows, Linux',
  description: 'Terminal command interface for controlling a real Vibe Browser session locally or through a remote relay.',
  url: 'https://www.vibebrowser.app/cli',
  downloadUrl: 'https://www.npmjs.com/package/@vibebrowser/cli',
  featureList: [
    'vibebrowser-cli terminal commands',
    'Real logged-in browser session control',
    'Local and remote relay support',
    '--remote <uuid> and --remote <full-ws-url> forms',
    'JSON status and snapshot output for scripts',
  ],
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://www.vibebrowser.app',
  },
}

export default function CliLayout({
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
