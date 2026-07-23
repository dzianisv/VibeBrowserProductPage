import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PricingSection } from '@/components/pricing-section'

export const metadata: Metadata = {
  title: 'Pricing — VibeBrowser Co-Pilot | Free, Pro $25/mo, Max $99/mo',
  description:
    'Simple VibeBrowser Co-Pilot pricing. Free tier with unlimited local AI and quick cloud models. Pro at $25/mo for advanced models. Max at $99/mo for premium reasoning models. No credit card required to start.',
  keywords: [
    'VibeBrowser pricing',
    'AI browser extension pricing',
    'browser co-pilot cost',
    'AI agent browser price',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/pricing',
  },
  openGraph: {
    title: 'Pricing — VibeBrowser Co-Pilot',
    description:
      'Free tier with unlimited local AI. Pro $25/mo. Max $99/mo. No credit card required to start.',
    url: 'https://www.vibebrowser.app/pricing',
    images: [
      {
        url: '/og/mcp',
        width: 1200,
        height: 630,
        alt: 'VibeBrowser Co-Pilot Pricing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — VibeBrowser Co-Pilot',
    description:
      'Free tier with unlimited local AI. Pro $25/mo. Max $99/mo. No credit card required to start.',
    images: ['/og/mcp'],
    creator: '@vibebrowserapp',
  },
}

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'VibeBrowser Co-Pilot',
  description:
    'AI browser co-pilot that automates web tasks inside your existing logged-in browser session.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '25',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'Max',
      price: '99',
      priceCurrency: 'USD',
    },
  ],
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <SiteNav />
      <main className="flex-1">
        <PricingSection />
      </main>
      <SiteFooter />
    </div>
  )
}
