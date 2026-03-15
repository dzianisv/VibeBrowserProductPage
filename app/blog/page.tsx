import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { MailingListSubscribe } from '@/components/mailing-list-subscribe'
import { getAllBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Vibe Blog | AI Browser Automation Insights',
  description:
    'Research, product updates, and practical automation playbooks for AI browser workflows.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/blog',
  },
  openGraph: {
    type: 'website',
    title: 'Vibe Blog | AI Browser Automation Insights',
    description:
      'Research, product updates, and practical automation playbooks for AI browser workflows.',
    url: 'https://www.vibebrowser.app/blog',
    siteName: 'Vibe Co-Pilot',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'Vibe Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Blog | AI Browser Automation Insights',
    description:
      'Research, product updates, and practical automation playbooks for AI browser workflows.',
    images: ['/og/home.svg'],
  },
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.10),transparent_30%),linear-gradient(to_bottom,#fafafa,#ffffff_16rem)] font-sans">
      <SiteNav />
      <main className="container mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-700">Insights</p>
            <h1 className="mt-3 font-serif text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              Vibe Blog
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Tactical playbooks and market analysis for teams using AI browser automation.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-purple-700">Newsletter</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950">
              Get product updates and browser automation notes
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Subscribe for new posts, model support announcements, and practical operator workflows.
            </p>
            <div className="mt-4">
              <MailingListSubscribe />
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Prefer a reader?{' '}
              <Link href="/rss.xml" className="font-medium text-purple-700 transition-colors hover:text-purple-800">
                Subscribe via RSS
              </Link>
              .
            </p>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-slate-600">
            No published posts yet.
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="group rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-lg md:p-8"
              >
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  {index === 0 && (
                    <span className="inline-flex rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700">
                      Latest post
                    </span>
                  )}
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'UTC',
                  })}{' '}
                  • {post.author} • {post.readingTimeMinutes} min read
                </div>
                <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-slate-950 md:text-[2rem]">
                  <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-purple-700">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">{post.description}</p>

                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={`${post.slug}-${tag}`}
                        className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-purple-700 transition-colors hover:text-purple-800"
                  >
                    Read article
                    <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
