import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Lawyers | AI Legal Research with TEE Privacy',
  description: 'Automate legal research while keeping client data secure. Vibe Co-Pilot runs in TEE (Trusted Execution Environment) or on-premise, ensuring attorney-client privilege remains protected.',
  keywords: [
    'AI for lawyers',
    'legal research automation',
    'TEE legal',
    'trusted execution environment law',
    'attorney AI assistant',
    'legal tech privacy',
    'on-premise legal AI',
    'secure legal research',
    'law firm automation',
    'AI paralegal',
    'legal CRM automation',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/lawyers',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Lawyers',
    description: 'Automate legal research with TEE privacy protection for law firms.',
    url: 'https://www.vibebrowser.app/lawyers',
    siteName: 'Vibe Co-Pilot',
    type: 'website',
    images: [
      {
        url: '/og/lawyers.svg',
        width: 1200,
        height: 630,
        alt: 'Vibe Co-Pilot for Lawyers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Co-Pilot for Lawyers',
    description: 'AI legal research with TEE privacy protection.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
