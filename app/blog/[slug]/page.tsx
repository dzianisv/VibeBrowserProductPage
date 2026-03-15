import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
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
    <div className="min-h-screen bg-white">
      <SiteNav />
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <Link href="/blog" className="text-sm text-purple-700 hover:text-purple-800">
          ← Back to blog
        </Link>

        <header className="mt-5 border-b border-slate-200 pb-6">
          <div className="text-sm text-slate-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            })}{' '}
            • {post.author}
          </div>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-slate-900">{post.title}</h1>
          <p className="mt-4 text-lg text-slate-700">{post.description}</p>
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
        </header>

        <article
          className="prose prose-slate max-w-none mt-8 [&_h2]:text-slate-900 [&_h3]:text-slate-900 [&_a]:text-purple-700 [&_a]:underline hover:[&_a]:text-purple-800"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
