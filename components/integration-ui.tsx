import Link from 'next/link'
import type { ConfigBlock, Faq } from '@/lib/integrations'

export function CodeBlock({ config }: { config: ConfigBlock }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/60">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-xs text-neutral-400">{config.location}</span>
        <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-neutral-500">
          {config.language}
        </span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed text-emerald-200">
        <code>{config.code}</code>
      </pre>
    </div>
  )
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <dl className="mt-6 space-y-6">
      {faqs.map((faq) => (
        <div key={faq.q} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <dt className="text-base font-semibold text-white">{faq.q}</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-neutral-300">{faq.a}</dd>
        </div>
      ))}
    </dl>
  )
}

export function SectionHeading({
  children,
  id,
}: {
  children: React.ReactNode
  id?: string
}) {
  return (
    <h2 id={id} className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
      {children}
    </h2>
  )
}

export function InternalLinks({
  links,
}: {
  links: { href: string; label: string }[]
}) {
  return (
    <nav aria-label="Related pages" className="mt-8 flex flex-wrap gap-3">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-neutral-200 transition-colors hover:border-white/40 hover:text-white"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  )
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function softwareApplicationLd(opts: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Windows, Linux',
    softwareRequirements: 'Chrome, Brave, Edge or another Chromium browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vibe Technologies',
      url: 'https://www.vibebrowser.app',
    },
  }
}

export function faqPageLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
