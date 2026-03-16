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
    <div className="min-h-screen bg-[#202124] text-[#e8eaed] font-sans">
      <SiteNav />
      <main className="container mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8ab4f8]">Insights</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#e8eaed] md:text-6xl">
              Vibe Blog
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#9aa0a6]">
              Tactical playbooks and market analysis for teams using AI browser automation.
            </p>
          </div>

          <div className="flex-shrink-0 w-full lg:w-auto lg:min-w-[320px]">
            <div className="border border-[#3c4043] rounded-lg p-4 bg-[#3c4043]/20">
              <p className="text-sm font-semibold text-[#8ab4f8]">Newsletter</p>
              <p className="mt-1 text-sm text-[#9aa0a6]">
                Get updates on browser automation
              </p>
              <div className="mt-3">
                <MailingListSubscribe />
              </div>
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-[#3c4043] bg-[#3c4043]/30 p-6 text-[#9aa0a6]">
            No published posts yet.
          </div>
        ) : (
          <div className="divide-y divide-[#3c4043] border-t border-[#3c4043]">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="group py-7 md:py-9"
              >
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#9aa0a6]">
                  {index === 0 && (
                    <span className="inline-flex rounded-full bg-[#3c4043] px-2.5 py-1 text-xs font-semibold text-[#8ab4f8]">
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
                    className="font-medium text-[#e8eaed] underline decoration-[#5f6368] underline-offset-4 transition-colors hover:text-[#8ab4f8]"
                  >
                    {post.author}
                  </a>{' '}
                  • {post.readingTimeMinutes} min read
                </div>
                <h2 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-[#e8eaed] transition-colors group-hover:text-[#8ab4f8] md:text-[2rem]">
                  <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-[#8ab4f8]">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[#e8eaed]">{post.description}</p>

                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={`${post.slug}-${tag}`}
                        className="inline-flex rounded-full bg-[#3c4043] px-3 py-1 text-xs font-medium text-[#e8eaed]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-[#8ab4f8] transition-colors hover:text-[#aecbfa]"
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
