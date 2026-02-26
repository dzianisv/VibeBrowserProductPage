import type { Metadata } from 'next'
import Component from '../landing-page'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot - Automate Your Browsing',
  description:
    'Vibe Co-Pilot automates browsing tasks with Google Workspace (Gmail + Calendar), MCP agent access, reusable skills, and a secrets vault. Works with Vibe AI, Anthropic Claude Max, GitHub Copilot, and BYOK providers.',
  alternates: {
    canonical: 'https://www.vibebrowser.app',
  },
  openGraph: {
    title: 'Vibe Co-Pilot',
    description:
      'Agentic AI browser extension with Google Workspace (Gmail + Calendar), MCP agent access, skills, and a secrets vault. Works with Vibe AI, Anthropic Claude Max, GitHub Copilot, and BYOK providers.',
    url: 'https://www.vibebrowser.app',
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
    title: 'Vibe Co-Pilot',
    description:
      'AI browser co-pilot with Google Workspace, MCP agent access, skills, and a secrets vault. Works with Vibe AI, Anthropic Claude Max, GitHub Copilot, and BYOK providers.',
    images: ['/og/home.svg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe Co-Pilot',
  applicationCategory: 'BrowserApplication',
  operatingSystem: 'Windows, macOS, Linux',
  description:
    'AI browser co-pilot extension that completes tasks autonomously with Google Workspace (Gmail + Calendar), MCP agent access, reusable skills, and a secrets vault.',
  url: 'https://www.vibebrowser.app',
  author: {
    '@type': 'Organization',
    name: 'Vibe Co-Pilot',
    url: 'https://www.vibebrowser.app',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder',
  },
  featureList: [
    'Autonomous task completion',
    'Multi-site navigation',
    'Decision-making AI agent',
    'Complete workflow automation',
    'Zero-click task execution',
    'Self-directed research',
    'Hands-free operation',
    'Google Workspace integration (Gmail, Calendar)',
    'MCP server access for other agents',
    'Skills library for reusable workflows',
    'Secrets vault with password fill tool',
    'Works with Vibe AI and BYOK providers',
  ],
  screenshot: 'https://www.vibebrowser.app/og/home.svg',
  softwareVersion: '1.0',
  datePublished: '2025-01-01',
  dateModified: '2026-02-15',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vibe Co-Pilot',
  url: 'https://www.vibebrowser.app',
  logo: 'https://www.vibebrowser.app/logo.png',
  description: 'Creators of the revolutionary AI Browser Co-Pilot',
  sameAs: [
    'https://x.com/vibebrowserapp',
    'https://github.com/vibebrowser',
    'https://www.linkedin.com/company/vibebrowser',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@vibebrowser.app',
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Vibe Co-Pilot - Automate Your Browsing',
  description:
    'Experience the AI Browser Co-Pilot with Google Workspace (Gmail + Calendar), MCP access for other agents, skills, and a secrets vault.',
  url: 'https://www.vibebrowser.app',
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Vibe Co-Pilot',
    url: 'https://www.vibebrowser.app',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.vibebrowser.app',
      },
    ],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Vibe Co-Pilot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe Co-Pilot is an autonomous browser extension that completes entire tasks for you. Unlike AI chatbots or assistants, Vibe takes full control - researching across multiple sites, making decisions, and executing complete workflows without you clicking a single button.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Vibe Co-Pilot work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vibe uses an autonomous AI agent with Plan-Execute-Reflect architecture. You give it a goal like 'book the cheapest flight to Paris next month' and it autonomously researches options, compares prices across airlines, and completes the booking - all without your intervention.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Vibe Co-Pilot free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vibe Co-Pilot is free during beta. After launch, it's $20/month. Join our waitlist to be notified when it becomes available.",
      },
    },
    {
      '@type': 'Question',
      name: 'What platforms does Vibe Co-Pilot support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe Co-Pilot works as a Chrome extension on Windows, macOS, and Linux.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Vibe integrate with Google Workspace and MCP agents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Vibe includes native Gmail and Calendar tools for Google Workspace, and it can be exposed as an MCP server so other AI agents can drive your real browser sessions securely.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data safe with Vibe Co-Pilot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, Vibe Co-Pilot prioritizes user privacy and security. All processing happens locally using Chrome's built-in AI (Gemini Nano), and we never sell your data to third parties.",
      },
    },
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vibe Co-Pilot',
  url: 'https://www.vibebrowser.app',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.vibebrowser.app/use-cases?query={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function Page() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Component />
    </>
  )
}
