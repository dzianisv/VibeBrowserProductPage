import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TEE Security Whitepaper - Privacy-Preserving AI Inference',
  description:
    'Read the Vibe AI Browser security whitepaper on privacy-preserving LLM inference with hardware-attested TEEs and remote attestation.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/tee',
  },
  openGraph: {
    title: 'TEE Security Whitepaper',
    description:
      'Privacy-preserving LLM inference with hardware-attested TEEs and remote attestation.',
    url: 'https://www.vibebrowser.app/tee',
    images: [
      {
        url: '/og/tee.svg',
        width: 1200,
        height: 630,
        alt: 'Vibe TEE Security Whitepaper',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEE Security Whitepaper',
    description:
      'Privacy-preserving LLM inference with hardware-attested TEEs and remote attestation.',
    images: ['/og/tee.svg'],
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Privacy-Preserving LLM Inference with Hardware-Attested TEEs',
  description:
    'Research on deploying LLM inference within Trusted Execution Environments with cryptographic remote attestation.',
  url: 'https://www.vibebrowser.app/tee',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://vibebrowser.app',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://vibebrowser.app',
  },
}

export default function TeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {children}
    </>
  )
}
