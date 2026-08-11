import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import {
  CodeBlock,
  FaqList,
  JsonLd,
  SectionHeading,
  breadcrumbLd,
  faqPageLd,
  softwareApplicationLd,
} from '@/components/integration-ui'
import { COMPARISON, INTEGRATIONS, MCP_TOOLS, RELAY_NOTE, getIntegration } from '@/lib/integrations'

const BASE = 'https://www.vibebrowser.app'

export function generateStaticParams() {
  return INTEGRATIONS.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const integration = getIntegration(slug)
  if (!integration) return {}

  const url = `${BASE}/integrations/${integration.slug}`
  return {
    metadataBase: new URL(BASE),
    title: integration.title,
    description: integration.description,
    keywords: integration.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: integration.title,
      description: integration.description,
      siteName: 'Vibe Browser',
    },
    twitter: {
      card: 'summary_large_image',
      title: integration.title,
      description: integration.description,
    },
  }
}

export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const integration = getIntegration(slug)
  if (!integration) notFound()

  const url = `${BASE}/integrations/${integration.slug}`
  const others = INTEGRATIONS.filter((i) => i.slug !== integration.slug).slice(0, 6)

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <JsonLd
        data={[
          softwareApplicationLd({
            name: `Vibe MCP for ${integration.name}`,
            description: integration.description,
            url,
          }),
          faqPageLd(integration.faqs),
          breadcrumbLd([
            { name: 'Home', url: BASE },
            { name: 'Integrations', url: `${BASE}/integrations` },
            { name: integration.name, url },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: `How to give ${integration.name} control of your browser`,
            description: integration.answerBlock,
            step: [
              ...integration.steps.map((s, i) => ({
                '@type': 'HowToStep',
                position: i + 1,
                name: s.title,
                text: s.body,
              })),
              // The verification prompt is a real, ordered step: without it a
              // reader has no way to tell a working connector from one that
              // saved cleanly and routes nowhere.
              ...(integration.verify
                ? [
                    {
                      '@type': 'HowToStep',
                      position: integration.steps.length + 1,
                      name: 'Verify the connection',
                      text: `Ask: "${integration.verify.prompt}" The expected answer is ${integration.verify.expect}, and your own browser should visibly navigate while the assistant works.`,
                    },
                  ]
                : []),
            ],
          },
        ]}
      />
      <SiteNav />

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-14">
        <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link href="/integrations" className="hover:text-white">
            Integrations
          </Link>
          <span className="px-2">/</span>
          <span className="text-neutral-300">{integration.name}</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{integration.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-300">{integration.tagline}</p>
          <p className="mt-3 text-sm text-neutral-500">
            {integration.verifiedOn
              ? `Click path walked end to end and verified: ${integration.verifiedOn}`
              : 'Last updated: August 2026'}
          </p>
          {integration.connectorStatus ? (
            <p
              className={`mt-4 rounded-xl border p-4 text-sm leading-relaxed ${
                integration.connectorStatus.oauthVerified
                  ? 'border-emerald-400/30 bg-emerald-400/[0.05] text-emerald-100'
                  : 'border-amber-400/30 bg-amber-400/[0.05] text-amber-100'
              }`}
            >
              <strong>{integration.connectorStatus.badge}.</strong>{' '}
              {integration.connectorStatus.summary}
            </p>
          ) : null}
        </header>

        <section aria-labelledby="answer" className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 id="answer" className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
            In short
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-neutral-100">
            {integration.answerBlock}
          </p>
        </section>

        <section aria-labelledby="problem" className="mt-14">
          <SectionHeading id="problem">The problem</SectionHeading>
          <ul className="mt-5 space-y-3">
            {integration.problem.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-neutral-300">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="solution" className="mt-14">
          <SectionHeading id="solution">What Vibe MCP changes</SectionHeading>
          <ul className="mt-5 space-y-3">
            {integration.solution.map((s) => (
              <li key={s} className="flex gap-3 text-[15px] leading-relaxed text-neutral-300">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="install" className="mt-14">
          <SectionHeading id="install">
            {integration.oauth
              ? `Set it up in ${integration.steps.length} steps (OAuth — recommended)`
              : `Install in ${integration.steps.length} steps`}
          </SectionHeading>
          <ol className="mt-6 space-y-8">
            {integration.steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-lg font-semibold text-white">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20 text-sm text-emerald-300">
                    {i + 1}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-300">{step.body}</p>
                {step.config ? <CodeBlock config={step.config} /> : null}
              </li>
            ))}
          </ol>
          {integration.oauth ? (
            <p className="mt-6 text-sm leading-relaxed text-neutral-400">
              This URL is the same for every user and carries no credential — the grant lives in the
              token your assistant receives after you approve consent.
            </p>
          ) : (
            <p className="mt-6 text-sm leading-relaxed text-neutral-400">{RELAY_NOTE}</p>
          )}
        </section>

        {integration.oauth ? (
          <section aria-labelledby="scopes" className="mt-14">
            <SectionHeading id="scopes">What you are approving, and how to revoke it</SectionHeading>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-300">
              The consent screen asks for two scopes. Here is what each one actually grants.
            </p>
            <dl className="mt-6 space-y-4">
              {integration.oauth.scopes.map((s) => (
                <div key={s.name} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <dt className="font-mono text-[13px] font-semibold text-emerald-200">{s.name}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-neutral-300">{s.grants}</dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-8 text-lg font-semibold text-white">Revoking access</h3>
            <ul className="mt-4 space-y-3">
              {integration.oauth.revoke.map((r) => (
                <li key={r} className="flex gap-3 text-[15px] leading-relaxed text-neutral-300">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {integration.alternatePath ? (
          <section aria-labelledby="alternate" className="mt-14">
            <SectionHeading id="alternate">{integration.alternatePath.heading}</SectionHeading>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-300">
              {integration.alternatePath.body}
            </p>
            {integration.alternatePath.config ? (
              <CodeBlock config={integration.alternatePath.config} />
            ) : null}
            {integration.alternatePath.bullets ? (
              <ul className="mt-5 space-y-3">
                {integration.alternatePath.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-neutral-300">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ) : null}

        {integration.security ? (
          <section aria-labelledby="security" className="mt-14">
            <div className="rounded-2xl border border-amber-400/40 bg-amber-400/[0.07] p-6">
              <h2 id="security" className="text-xl font-bold tracking-tight text-amber-200 sm:text-2xl">
                {integration.security.heading}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-amber-50/90">
                {integration.security.body}
              </p>
              <ul className="mt-5 space-y-3">
                {integration.security.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-amber-50/80">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {integration.connectedLooksLike ? (
          <section aria-labelledby="connected" className="mt-14">
            <SectionHeading id="connected">What &ldquo;connected&rdquo; looks like</SectionHeading>
            <ul className="mt-5 space-y-3">
              {integration.connectedLooksLike.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-neutral-300">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {integration.verify ? (
          <section aria-labelledby="verify" className="mt-14">
            <SectionHeading id="verify">Verify it actually works</SectionHeading>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-300">
              Do not trust a green checkmark. Run this prompt in a conversation with the connector
              enabled and check the answer yourself.
            </p>
            <CodeBlock
              config={{
                location: `Ask ${integration.name}`,
                language: 'bash',
                code: integration.verify.prompt,
              }}
            />
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-200">
              Expected answer:{' '}
              <strong className="font-semibold text-emerald-300">{integration.verify.expect}</strong>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">
              {integration.verify.note}
            </p>
          </section>
        ) : null}

        {integration.troubleshooting ? (
          <section aria-labelledby="troubleshooting" className="mt-14">
            <SectionHeading id="troubleshooting">Troubleshooting</SectionHeading>
            <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-neutral-300">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Symptom
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Likely cause
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Fix
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  {integration.troubleshooting.map((t) => (
                    <tr key={t.symptom}>
                      <td className="px-4 py-3 align-top">{t.symptom}</td>
                      <td className="px-4 py-3 align-top text-neutral-400">{t.cause}</td>
                      <td className="px-4 py-3 align-top">{t.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <section aria-labelledby="tools" className="mt-14">
          <SectionHeading id="tools">Tools {integration.name} gets</SectionHeading>
          <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-neutral-300">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Tool
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {MCP_TOOLS.map((t) => (
                  <tr key={t.tool}>
                    <td className="px-4 py-3 font-mono text-[13px] text-emerald-200">{t.tool}</td>
                    <td className="px-4 py-3">{t.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="compare" className="mt-14">
          <SectionHeading id="compare">How it compares</SectionHeading>
          <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-neutral-300">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Feature
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Vibe MCP
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Playwright MCP
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    BrowserMCP
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-3">{row.feature}</td>
                    <td className="px-4 py-3 text-emerald-300">{row.vibe}</td>
                    <td className="px-4 py-3">{row.playwright}</td>
                    <td className="px-4 py-3">{row.browsermcp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="faq" className="mt-14">
          <SectionHeading id="faq">
            {integration.name} browser control — FAQ
          </SectionHeading>
          <FaqList faqs={integration.faqs} />
        </section>

        <section aria-labelledby="others" className="mt-14">
          <SectionHeading id="others">Works with your other agents too</SectionHeading>
          <p className="mt-3 text-[15px] text-neutral-400">
            The same MCP server powers every client. Multiple agents can drive the same browser at once.
          </p>
          <nav aria-label="Other integrations" className="mt-6 flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/integrations/${o.slug}`}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-neutral-200 transition-colors hover:border-white/40 hover:text-white"
              >
                {o.name}
              </Link>
            ))}
            <Link
              href="/integrations"
              className="rounded-full border border-emerald-400/40 px-4 py-2 text-sm text-emerald-200 transition-colors hover:border-emerald-300"
            >
              All integrations
            </Link>
          </nav>
        </section>

        <section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-2xl font-bold">Ready to connect {integration.name}?</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/install"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200"
            >
              Install the extension
            </Link>
            <Link
              href="/integrations"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/50"
            >
              All integrations
            </Link>
          </div>
          <p className="mt-5 text-sm text-neutral-400">
            Connecting an agent to your logged-in browser has real privacy consequences. Read what is transmitted,
            logged and retained in the{' '}
            <Link href="/privacy" className="underline decoration-white/40 underline-offset-4 hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
