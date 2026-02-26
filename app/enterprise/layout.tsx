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
  description: 'Private AI browser automation for financial professionals. SOC2 compliant, on-premise deployment, TEE-ready. Includes Google Workspace (Gmail + Calendar), MCP agent access, skills, and a secrets vault. Built for regulated industries.',
  keywords: [
    // Primary keywords - Financial AI
    'private AI for finance',
    'secure AI browser',
    'financial AI automation',
    'compliant AI browser',
    'enterprise AI browser',
    
    // Compliance keywords
    'SOC2 compliant AI',
    'FINRA compliant AI',
    'SEC compliant AI tool',
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
    description: 'AI browser automation that never sees your client data. SOC2 compliant, on-premise, TEE-ready, with Google Workspace tools, MCP agent access, skills, and a secrets vault.',
    images: [
      {
        url: '/og/enterprise.svg',
        width: 1200,
        height: 630,
        alt: 'Vibe AI Browser - Private Enterprise Edition',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private AI for Financial Professionals | Vibe AI Browser',
    description: 'AI browser automation that never sees your client data. SOC2 compliant, on-premise, TEE-ready, with Google Workspace tools, MCP agent access, skills, and a secrets vault.',
    images: ['/og/enterprise.svg'],
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
  description: 'Private AI browser automation for financial professionals. SOC2 compliant, on-premise deployment, TEE-ready, with Google Workspace, MCP access, skills, and a secrets vault.',
  url: 'https://www.vibebrowser.app/enterprise',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://vibebrowser.app',
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
      description: 'TEE-protected inference with dedicated support',
    },
  ],
  featureList: [
    'SOC2 Type II Compliant',
    'On-Premise Deployment',
    'TEE-Protected Inference',
    'Zero Data Retention',
    'FINRA Compliant',
    'SEC Rule 17a-4 Compatible',
    'Self-Hosted LLM Support',
    'Complete Audit Logging',
    'Google Workspace integration (Gmail, Calendar)',
    'MCP server access for other agents',
    'Skills library for reusable workflows',
    'Secrets vault with password fill tool',
  ],
  screenshot: 'https://www.vibebrowser.app/screenshot-enterprise.png',
  softwareHelp: {
    '@type': 'CreativeWork',
    url: 'https://www.vibebrowser.app/tee',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vibe Technologies',
  url: 'https://vibebrowser.app',
  logo: 'https://vibebrowser.app/logo.png',
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
        text: 'Any model that exposes an OpenAI-compatible API. Popular choices include DeepSeek, Llama 3, Mistral, and Qwen. We provide Docker images and deployment guides for AWS, GCP, Azure, and on-premise servers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does TEE protect my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trusted Execution Environments (TEE) use hardware-level encryption to create isolated memory regions. Even the cloud provider cannot access data inside a TEE. We use Intel TDX and provide cryptographic attestation so you can verify the code running on your data.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this compliant with SEC/FINRA regulations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. With self-hosted or TEE deployment, all data remains under your control. We provide complete audit logs for regulatory examinations. Our architecture is designed to meet SEC Rule 17a-4, FINRA 4511, and similar recordkeeping requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does using AI waive attorney-client privilege?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "With traditional cloud AI, sharing privileged information with a third party can potentially waive privilege. Vibe's local and self-hosted modes process everything within your own environment, avoiding third-party disclosure. For cloud TEE, the cryptographic isolation means no third party can access the data.",
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
