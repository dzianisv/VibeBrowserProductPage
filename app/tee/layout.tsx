import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TEE Security Whitepaper — Privacy-Preserving LLM Inference with Intel TDX',
  description:
    'Open-source research on deploying LLM inference within Trusted Execution Environments (TEEs) with Intel TDX and cryptographic remote attestation. 12 tok/s CPU TEE, 150+ tok/s GPU TEE projected.',
  keywords: [
    'trusted execution environment',
    'TEE',
    'confidential computing',
    'Intel TDX',
    'privacy-preserving AI',
    'LLM inference security',
    'remote attestation',
    'Azure Confidential VMs',
    'hardware-attested AI',
    'DeepSeek TEE',
    'NVIDIA H100 confidential computing',
    'secure AI inference',
    'zero trust AI',
    'private AI infrastructure',
    'attested AI infrastructure',
    'encrypted LLM inference',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/tee',
  },
  robots: {
    index: false,
    follow: false,
    // Noindexing TEE whitepaper as it attracts tangential backend/inference impressions
    // that do not align with the core AI Browser/MCP product wedge.
  },
  openGraph: {
    title: 'TEE Security Whitepaper — Privacy-Preserving LLM Inference',
    description:
      'Open-source infrastructure for deploying LLM inference in hardware-attested TEEs with Intel TDX and cryptographic remote attestation.',
    url: 'https://www.vibebrowser.app/tee',
    siteName: 'Vibe Co-Pilot',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og/tee.svg',
        width: 1200,
        height: 630,
        alt: 'Privacy-Preserving LLM Inference with Hardware-Attested TEEs — Vibe Technologies Whitepaper',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEE Security Whitepaper — Privacy-Preserving LLM Inference',
    description:
      'Open-source infrastructure for LLM inference in Intel TDX TEEs with remote attestation. 12 tok/s CPU, 150+ tok/s GPU projected.',
    images: ['/og/tee.svg'],
    creator: '@vibebrowserapp',
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Privacy-Preserving LLM Inference with Hardware-Attested TEEs',
  alternativeHeadline: 'Deploying DeepSeek Models on Azure Confidential VMs with Intel TDX',
  description:
    'An open-source infrastructure for deploying Large Language Model inference within Trusted Execution Environments with cryptographic remote attestation. Running DeepSeek models on Azure Confidential VMs with Intel TDX.',
  url: 'https://www.vibebrowser.app/tee',
  datePublished: '2026-01-15',
  dateModified: '2026-02-16',
  inLanguage: 'en',
  proficiencyLevel: 'Expert',
  keywords: 'TEE, trusted execution environment, Intel TDX, confidential computing, LLM inference, remote attestation, Azure Confidential VMs, DeepSeek, NVIDIA H100',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://www.vibebrowser.app',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://www.vibebrowser.app',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.vibebrowser.app/og/home.svg',
    },
  },
  image: 'https://www.vibebrowser.app/og/tee.svg',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.vibebrowser.app/tee',
  },
  about: [
    { '@type': 'Thing', name: 'Trusted Execution Environments' },
    { '@type': 'Thing', name: 'Confidential Computing' },
    { '@type': 'Thing', name: 'Large Language Model Inference' },
  ],
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
