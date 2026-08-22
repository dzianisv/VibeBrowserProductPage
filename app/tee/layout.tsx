import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TEE Research Archive — Privacy-Preserving LLM Inference (Not Currently Available)',
  description:
    'Archived open-source research on deploying LLM inference within Trusted Execution Environments (TEEs) with Intel TDX and cryptographic remote attestation. This infrastructure is not currently available as a Vibe product or service.',
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
    // that do not align with the core AI Browser/MCP product wedge. Also unavailable today
    // (AGE-1053): the backend behind this research is offline and there is no purchase path.
  },
  openGraph: {
    title: 'TEE Research Archive — Not Currently Available',
    description:
      'Archived open-source research on hardware-attested TEE inference with Intel TDX and remote attestation. Not a live or purchasable Vibe product today.',
    url: 'https://www.vibebrowser.app/tee',
    siteName: 'Vibe Co-Pilot',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og/home',
        width: 1200,
        height: 630,
        alt: 'Privacy-Preserving LLM Inference with Hardware-Attested TEEs — Vibe Technologies Research Archive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEE Research Archive — Not Currently Available',
    description:
      'Archived open-source research on LLM inference in Intel TDX TEEs with remote attestation. Not a live or purchasable Vibe product today.',
    images: ['/og/home'],
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
      url: 'https://www.vibebrowser.app/og/home',
    },
  },
  image: 'https://www.vibebrowser.app/og/home',
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
