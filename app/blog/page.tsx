import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { MailingListSubscribe } from '@/components/mailing-list-subscribe'
import { getAllBlogPosts } from '@/lib/blog'

const blogTitle = 'AI Browser Automation Blog'
const blogDescription =
  'Research, release notes, and practical playbooks for AI browser automation, browser agents, MCP workflows, and coding tools.'
const blogImageUrl = 'https://www.vibebrowser.app/blog/opengraph-image'

export const metadata: Metadata = {
  title: blogTitle,
  description: blogDescription,
  keywords: [
    'Vibe Blog',
    'AI browser automation',
    'browser agents',
    'MCP workflows',
    'coding tools',
    'browser automation playbooks',
    'AI automation research',
    'Vibe Co-Pilot',
  ],
  authors: [{ name: 'Vibe Co-Pilot Team' }],
  creator: 'Vibe Co-Pilot',
  publisher: 'Vibe Co-Pilot',
  category: 'technology',
  alternates: {
    canonical: 'https://www.vibebrowser.app/blog',
  },
  openGraph: {
    type: 'website',
    title: 'Vibe Blog | AI Browser Automation Insights',
    description: blogDescription,
    url: 'https://www.vibebrowser.app/blog',
    siteName: 'Vibe Co-Pilot',
    images: [
      {
        url: blogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Vibe Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Blog | AI Browser Automation Insights',
    description: blogDescription,
    images: [blogImageUrl],
    creator: '@vibebrowserapp',
  },
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.10),transparent_30%),linear-gradient(to_bottom,#fafafa,#ffffff_16rem)] dark:bg-none dark:bg-[#202124] font-sans">
      <SiteNav />
      <main className="container mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-700">Insights</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-slate-950 dark:text-[#e8eaed] md:text-6xl">
              Vibe Blog
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-[#9aa0a6]">
              Tactical playbooks and market analysis for teams using AI browser automation.
            </p>
          </div>

          <div className="mt-6 border-t border-slate-200 dark:border-[#3c4043] pt-6">
            <p className="text-sm font-semibold text-purple-700 dark:text-[#8ab4f8]">Newsletter</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950 dark:text-[#e8eaed]">
              Get product updates and browser automation notes
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-[#9aa0a6]">
              Subscribe for new posts, model support announcements, and practical operator workflows.
            </p>
            <div className="mt-4">
              <MailingListSubscribe />
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-[#9aa0a6]">
              Prefer a reader?{' '}
              <Link href="/rss.xml" className="font-medium text-purple-700 transition-colors hover:text-purple-800 dark:text-[#8ab4f8] dark:hover:text-[#aecbfa]">
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
          <div className="divide-y divide-slate-200 dark:divide-[#3c4043] border-t border-slate-200 dark:border-[#3c4043]">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="group py-7 md:py-9"
              >
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-[#9aa0a6]">
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
                  •{' '}
                  <a
                    href={post.authorUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-purple-700 dark:text-[#e8eaed] dark:decoration-[#5f6368] dark:hover:text-[#8ab4f8]"
                  >
                    {post.author}
                  </a>{' '}
                  • {post.readingTimeMinutes} min read
                </div>
                <h2 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-slate-950 transition-colors group-hover:text-purple-700 dark:text-[#e8eaed] dark:group-hover:text-[#8ab4f8] md:text-[2rem]">
                  <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-purple-700 dark:group-hover:text-[#8ab4f8]">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-[#e8eaed]">{post.description}</p>

                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={`${post.slug}-${tag}`}
                        className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-[#3c4043] dark:text-[#e8eaed]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-purple-700 transition-colors hover:text-purple-800 dark:text-[#8ab4f8] dark:hover:text-[#aecbfa]"
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
