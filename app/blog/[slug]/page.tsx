import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { MailingListSubscribe } from '@/components/mailing-list-subscribe'
import { getAllBlogPosts, getBlogPost } from '@/lib/blog'

type Params = {
  slug: string
}

export async function generateStaticParams(): Promise<Params[]> {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(
  props: {
    params: Promise<Params>
  }
): Promise<Metadata> {
  const { slug } = await props.params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  const url = `https://www.vibebrowser.app/blog/${post.slug}`

  return {
    title: `${post.title} | Vibe Blog`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      siteName: 'Vibe Co-Pilot',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage(props: { params: Promise<Params> }) {
  const { slug } = await props.params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.10),transparent_30%),linear-gradient(to_bottom,#fafafa,#ffffff_16rem)] font-sans">
      <SiteNav />
      <main className="container mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-purple-700 transition-colors hover:text-purple-800">
            ← Back to blog
          </Link>

          <article className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)]">
            <header className="border-b border-slate-200 px-6 py-8 md:px-10 md:py-10">
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'UTC',
                  })}
                </span>
                <span>•</span>
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>
              <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{post.description}</p>
              {post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
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
            </header>

            <div className="px-6 pb-10 pt-8 md:px-10 md:pb-12 md:pt-10">
              <div
                className="prose prose-slate prose-lg max-w-none font-serif prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-950 prose-p:text-[1.12rem] prose-p:leading-8 prose-li:text-[1.05rem] prose-li:leading-8 prose-strong:text-slate-950 prose-a:font-medium prose-a:text-purple-700 prose-a:decoration-purple-300 prose-a:underline-offset-4 prose-blockquote:border-l-purple-300 prose-blockquote:bg-purple-50/70 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:font-medium prose-blockquote:text-slate-700 prose-pre:rounded-2xl prose-pre:bg-slate-950 prose-pre:shadow-lg prose-img:rounded-2xl prose-img:shadow-sm prose-hr:border-slate-200 [&_a:hover]:text-purple-800 [&_code]:rounded-md [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.95em] [&_code]:text-slate-900 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-slate-100"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </article>

          <aside className="mt-8 rounded-[1.75rem] border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-purple-700">Stay in the loop</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950">
              Get the next product update in your inbox
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              We publish product launches, browser automation benchmarks, and practical operator playbooks.
            </p>
            <div className="mt-4">
              <MailingListSubscribe />
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
