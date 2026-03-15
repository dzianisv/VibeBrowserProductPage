import type { Metadata } from 'next'
import Component from '../landing-page'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot | AI Browser Automation for Google Workspace and MCP',
  description:
    'AI browser automation that operates websites, Gmail, and Google Calendar with MCP access, model-flexible routing, reusable skills, and a secure secrets vault.',
  alternates: {
    canonical: 'https://www.vibebrowser.app',
  },
  openGraph: {
    title: 'Vibe Co-Pilot | AI Browser Automation',
    description:
      'AI browser automation for websites, Gmail, and Google Calendar with MCP access, reusable skills, and secure model-flexible execution.',
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
    title: 'Vibe Co-Pilot | AI Browser Automation',
    description:
      'AI browser automation for websites, Gmail, and Google Calendar with MCP access, reusable skills, and secure model-flexible execution.',
    images: ['/og/home.svg'],
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Vibe Co-Pilot | AI Browser Automation for Google Workspace and MCP',
  description:
    'AI browser automation for websites, Gmail, and Google Calendar with MCP access, reusable skills, and model-flexible execution.',
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
      name: 'Is my data safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Vibe supports local and self-hosted models for workflows that should stay on your device or infrastructure. If you choose a cloud model, task data is sent only to that provider for the run you initiate, and you stay in control of which model powers the browser agent.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe offers a free tier for local and bring-your-own-model workflows, plus paid Pro and Max plans for higher-end reasoning models and more demanding browser automation use cases.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Vibe different from OpenAI Atlas and other AI browsers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe focuses on model flexibility, local-first privacy options, and browser automation that works inside a standard Chrome extension. Teams can combine Vibe AI, BYOK cloud providers, and local models instead of being locked to a single browser or model vendor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are we locked into Vibe? Can we switch to other tools later?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Vibe is designed to avoid vendor lock-in. You can switch model providers over time, keep using your existing Chrome or Chromium setup, and keep your workflows portable instead of depending on a proprietary browser fork.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Vibe suitable for enterprises with strict privacy requirements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Vibe supports local processing, self-hosted deployments, and policy-friendly workflows for teams with strict privacy requirements. Organizations can keep sensitive work on their own infrastructure while still using browser automation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Vibe compare to Manus and other competitors on vendor lock-in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe is not tied to one model vendor, one browser surface, or one pricing path. Teams can choose local, self-hosted, or cloud models and keep operating inside familiar Chrome environments instead of migrating to a closed browser stack.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Component />
    </>
  )
}
