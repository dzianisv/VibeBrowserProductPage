import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#202124',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vibebrowser.app'),
  title: 'Vibe AI Browser · Private Enterprise | Secure AI for Financial Professionals',
  description: 'Private AI browser automation for financial professionals. Supports local, self-hosted, and TEE-ready deployment paths with Google Workspace tools, MCP access, reusable skills, and a secrets vault.',
  keywords: [
    // Primary keywords - Financial AI
    'private AI for finance',
    'secure AI browser',
    'financial AI automation',
    
    'enterprise AI browser',
    
    // Compliance keywords
    'Privacy-focused AI',
    
    
    'regulated industry AI',
    'compliance AI automation',
    
    // Deployment keywords
    'on-premise AI',
    'self-hosted AI',
    'TEE AI inference',
    'private LLM deployment',
    'air-gapped AI',
    
    // Use case keywords
    'AI for traders',
    'AI for wealth management',
    'AI for RIA',
    'AI for hedge funds',
    'AI for tax professionals',
    'AI for accountants',
    'AI for attorneys',
    
    // Feature keywords
    'browser automation AI',
    'autonomous AI agent',
    'AI browser co-pilot',
    'private browser automation',
    'secure workflow automation',
    'Google Workspace automation',
    'MCP server',
    'skills library',
    'secrets vault',
    
    // Privacy keywords
    'zero data retention AI',
    'privacy-first AI',
    'confidential AI computing',
    'client data protection AI',
    
    // Brand keywords
    'Vibe Browser enterprise',
    'Vibe AI private',
  ],
  authors: [{ name: 'Vibe Technologies' }],
  creator: 'Vibe Technologies',
  publisher: 'Vibe Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vibebrowser.app/enterprise',
    siteName: 'Vibe Co-Pilot',
    title: 'Private AI for Financial Professionals | Vibe AI Browser',
    description: 'Private AI browser automation with local, self-hosted, and TEE-ready deployment paths plus Google Workspace tools, MCP access, reusable skills, and a secrets vault.',
    images: [
      {
        url: '/og/home',
        width: 1200,
        height: 630,
        alt: 'Vibe AI Browser - Private Enterprise Edition',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private AI for Financial Professionals | Vibe AI Browser',
    description: 'Private AI browser automation with local, self-hosted, and TEE-ready deployment paths plus Google Workspace tools, MCP access, reusable skills, and a secrets vault.',
    images: ['/og/home'],
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
    canonical: 'https://www.vibebrowser.app/enterprise',
  },
  category: 'technology',
  classification: 'Business Software',
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe AI Browser · Private Enterprise',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Chrome',
  description: 'Private AI browser automation for financial professionals with local, self-hosted, and TEE-ready deployment paths plus Google Workspace, MCP access, skills, and a secrets vault.',
  url: 'https://www.vibebrowser.app/enterprise',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://www.vibebrowser.app',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Starter',
      price: '0',
      priceCurrency: 'USD',
      description: 'Local AI only with Gemini Nano',
    },
    {
      '@type': 'Offer',
      name: 'Professional',
      price: '49',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '49',
        priceCurrency: 'USD',
        billingDuration: 'P1M',
      },
      description: 'Self-hosted models with full audit logging',
    },
    {
      '@type': 'Offer',
      name: 'Enterprise',
      description: 'Private deployment planning and enterprise onboarding support',
    },
  ],
  featureList: [
    
    'On-Premise Deployment',
    'TEE-Protected Inference',
    'Zero Data Retention',
    
    
    'Self-Hosted LLM Support',
    'Complete Audit Logging',
    'Google Workspace integration (Gmail, Calendar)',
    'MCP server access for other agents',
    'Skills library for reusable workflows',
    'Secrets vault with password fill tool',
  ],
  screenshot: 'https://www.vibebrowser.app/screenshot-enterprise.png',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vibe Technologies',
  url: 'https://www.vibebrowser.app',
  logo: 'https://www.vibebrowser.app/vibebrowser-logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'enterprise@vibebrowser.app',
    contactType: 'sales',
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
      name: 'How does local AI work without sending data to the cloud?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe uses Gemini Nano, a small language model that runs entirely in your Chrome browser. The model weights are downloaded once and all inference happens on your device. No prompts, documents, or responses ever leave your machine.',
      },
    },
    {
      '@type': 'Question',
      name: 'What models can I self-host?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any model that exposes an OpenAI-compatible API. Popular choices include DeepSeek, Llama 3, Mistral, and Qwen.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does TEE protect my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trusted Execution Environments (TEE) use hardware-level isolation to protect code and data in memory. Vibe supports TEE-oriented deployment paths for teams that need stronger infrastructure controls.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can this be used in regulated industries?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Teams can use local, self-hosted, or TEE-oriented deployment paths and pair them with audit logs and approval workflows that support their own compliance programs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does using AI waive attorney-client privilege?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Organizations with privilege or confidentiality concerns typically prefer local or self-hosted deployments so work stays inside their environment. Specific legal conclusions depend on your counsel and operating model.",
      },
    },
  ],
}

export default function EnterpriseLayout({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
