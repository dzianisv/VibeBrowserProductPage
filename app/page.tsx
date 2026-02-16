import type { Metadata } from 'next'
import Component from '../landing-page'

export const metadata: Metadata = {
  title: 'Vibe AI Browser Co-Pilot - Automate Your Browsing',
  description:
    'Vibe AI Browser Co-Pilot automates browsing tasks autonomously. Research, data entry, bookings, and more - just describe what you want done. The first truly agentic AI browser extension.',
  alternates: {
    canonical: 'https://www.vibebrowser.app',
  },
  openGraph: {
    title: 'Vibe AI Browser Co-Pilot',
    description:
      'The first agentic AI browser extension that automates research, bookings, data entry, and more. Just describe what you want done.',
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
    title: 'Vibe AI Browser Co-Pilot',
    description:
      'Your AI browser co-pilot that handles browsing tasks autonomously. Research, bookings, data entry - just describe what you want done.',
    images: ['/og/home.svg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe AI Browser Co-Pilot',
  applicationCategory: 'BrowserApplication',
  operatingSystem: 'Windows, macOS, Linux',
  description:
    'AI browser co-pilot extension that completes entire tasks autonomously. Agentic AI browser for research, bookings, data entry, and complex workflows across multiple websites.',
  url: 'https://www.vibebrowser.app',
  author: {
    '@type': 'Organization',
    name: 'Vibe AI Browser Co-Pilot',
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
  ],
  screenshot: 'https://www.vibebrowser.app/og/home.svg',
  softwareVersion: '1.0',
  datePublished: '2025-01-01',
  dateModified: '2026-02-15',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vibe AI Browser Co-Pilot',
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
  name: 'Vibe AI Browser Co-Pilot - Automate Your Browsing',
  description:
    'Experience the revolutionary AI Browser Co-Pilot. Automate any web task with natural language.',
  url: 'https://www.vibebrowser.app',
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Vibe AI Browser Co-Pilot',
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
      name: 'What is Vibe AI Browser Co-Pilot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe AI Browser Co-Pilot is an autonomous browser extension that completes entire tasks for you. Unlike AI chatbots or assistants, Vibe takes full control - researching across multiple sites, making decisions, and executing complete workflows without you clicking a single button.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Vibe AI Browser Co-Pilot work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vibe uses an autonomous AI agent with Plan-Execute-Reflect architecture. You give it a goal like 'book the cheapest flight to Paris next month' and it autonomously researches options, compares prices across airlines, and completes the booking - all without your intervention.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Vibe AI Browser Co-Pilot free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vibe AI Browser Co-Pilot is free during beta. After launch, it's $20/month. Join our waitlist to be notified when it becomes available.",
      },
    },
    {
      '@type': 'Question',
      name: 'What platforms does Vibe AI Browser Co-Pilot support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe AI Browser Co-Pilot works as a Chrome extension on Windows, macOS, and Linux.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data safe with Vibe AI Browser Co-Pilot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, Vibe AI Browser Co-Pilot prioritizes user privacy and security. All processing happens locally using Chrome's built-in AI (Gemini Nano), and we never sell your data to third parties.",
      },
    },
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vibe AI Browser Co-Pilot',
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
