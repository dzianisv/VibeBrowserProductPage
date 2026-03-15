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
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Vibe Blog</h1>
            <p className="mt-3 text-slate-600 text-lg">
              Tactical playbooks and market analysis for teams using AI browser automation.
            </p>
          </div>

          <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-purple-700">Newsletter</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Get product updates and browser automation notes
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Subscribe for new posts, model support announcements, and practical operator workflows.
            </p>
            <div className="mt-4">
              <MailingListSubscribe />
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-slate-600">
            No published posts yet.
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition-colors"
              >
                <div className="text-sm text-slate-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'UTC',
                  })}{' '}
                  • {post.author}
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-purple-700">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-slate-700">{post.description}</p>

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
              </article>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
