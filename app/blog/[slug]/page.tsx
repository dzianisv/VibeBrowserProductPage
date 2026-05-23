import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { MailingListSubscribe } from '@/components/mailing-list-subscribe'
import { getAllBlogPosts, getBlogPost, getRelatedBlogPosts } from '@/lib/blog'

type Params = {
  slug: string
}

function getBlogPostImageUrl(slug: string): string {
  return `https://www.vibebrowser.app/blog/${slug}/opengraph-image`
}

function buildBlogPostKeywords(post: NonNullable<ReturnType<typeof getBlogPost>>): string[] {
  return Array.from(
    new Set([
      ...post.tags,
      'Vibe Blog',
      'Vibe Co-Pilot',
      'Vibe Browser',
      'AI browser automation',
      'browser automation',
      'agentic browser',
    ])
  )
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
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const url = `https://www.vibebrowser.app/blog/${post.slug}`
  const imageUrl = getBlogPostImageUrl(post.slug)

  return {
    title: post.title,
    description: post.description,
    keywords: buildBlogPostKeywords(post),
    authors: [{ name: post.author, url: post.authorUrl }],
    creator: 'Vibe Co-Pilot',
    publisher: 'Vibe Co-Pilot',
    category: post.tags[0] || 'technology',
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
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
      creator: '@vibebrowserapp',
    },
  }
}

export default async function BlogPostPage(props: { params: Promise<Params> }) {
  const { slug } = await props.params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  if (post.slug !== slug) {
    redirect(`/blog/${post.slug}`)
  }

  const postUrl = `https://www.vibebrowser.app/blog/${post.slug}`
  const postImageUrl = getBlogPostImageUrl(post.slug)
  const publishedTime = new Date(post.date).toISOString()
  const wordCount = post.content.trim().split(/\s+/).filter(Boolean).length
  const relatedPosts = getRelatedBlogPosts(post.slug, 3)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      '@type': 'Person',
      name: post.author,
      url: post.authorUrl,
      sameAs: [post.authorUrl],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vibe Technologies',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vibebrowser.app/vibebrowser-logo.png',
      },
    },
    mainEntityOfPage: postUrl,
    url: postUrl,
    image: postImageUrl,
    keywords: post.tags.join(', '),
    timeRequired: `PT${post.readingTimeMinutes}M`,
    wordCount,
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.vibebrowser.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.vibebrowser.app/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#202124] font-sans">
      <SiteNav />
      <main className="container mx-auto max-w-4xl px-5 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-3xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          />
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-[#8ab4f8] transition-colors hover:text-[#aecbfa]">
            ← Back to blog
          </Link>

          <article className="mt-5">
            <header className="pb-8">
              <div className="flex flex-wrap items-center gap-2 text-sm text-[#9aa0a6]">
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'UTC',
                  })}
                </span>
                <span>•</span>
                <a href={post.authorUrl} className="font-medium text-[#8ab4f8] transition-colors hover:text-[#aecbfa]">
                  {post.author}
                </a>
                <span>•</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>
              <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#e8eaed] md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#9aa0a6] md:text-lg md:leading-8">{post.description}</p>
              {post.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={`${post.slug}-${tag}`}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex rounded-full bg-[#3c4043] px-3 py-1 text-xs font-medium text-[#e8eaed] transition-colors hover:bg-[#5f6368]"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            <div className="border-t border-[#3c4043] pt-8">
              <div
                className="prose prose-invert max-w-none font-serif prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-[#e8eaed] prose-p:text-[1.05rem] prose-p:leading-8 prose-p:text-[#e8eaed] prose-li:text-[1.02rem] prose-li:leading-8 prose-li:text-[#e8eaed] prose-strong:text-[#e8eaed] prose-a:font-medium prose-a:text-[#8ab4f8] prose-a:decoration-[#5f6368] prose-a:underline-offset-4 prose-blockquote:border-l-[#5f6368] prose-blockquote:bg-[#3c4043]/30 prose-blockquote:px-5 prose-blockquote:py-4 prose-blockquote:font-medium prose-blockquote:text-[#9aa0a6] prose-pre:rounded-xl prose-pre:bg-slate-950 prose-img:rounded-xl prose-img:shadow-none prose-hr:border-[#3c4043] md:prose-lg [&_a:hover]:text-[#aecbfa] [&_code]:rounded-md [&_code]:bg-[#3c4043] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.95em] [&_code]:text-[#e8eaed] [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-slate-100"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <section className="mt-12 border-t border-[#3c4043] pt-8">
              <p className="text-sm font-semibold text-[#8ab4f8]">Read next</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#e8eaed]">Related posts</h2>
              <div className="mt-6 space-y-6">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.slug}
                    className="border-b border-[#3c4043] pb-6 last:border-b-0 last:pb-0"
                  >
                      <div className="flex flex-wrap items-center gap-2 text-sm text-[#9aa0a6]">
                      <span>
                        {new Date(relatedPost.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          timeZone: 'UTC',
                        })}
                      </span>
                      <span>•</span>
                      <span>{relatedPost.readingTimeMinutes} min read</span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-[#e8eaed]">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="transition-colors hover:text-[#8ab4f8]"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-base leading-7 text-[#9aa0a6]">
                      {relatedPost.description}
                    </p>
                    <div className="mt-4">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-[#8ab4f8] transition-colors hover:text-[#aecbfa]"
                      >
                        Read article
                        <span className="ml-2">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <aside className="mt-12 border-t border-[#3c4043] pt-8">
            <p className="text-sm font-semibold text-[#8ab4f8]">Stay in the loop</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#e8eaed]">
              Get the next product update in your inbox
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#9aa0a6]">
              We publish product launches, browser automation benchmarks, and practical operator playbooks.
            </p>
            <div className="mt-4">
              <MailingListSubscribe />
            </div>
            <p className="mt-4 text-sm text-[#9aa0a6]">
              Prefer a reader?{' '}
              <Link href="/rss.xml" className="font-medium text-[#8ab4f8] transition-colors hover:text-[#aecbfa]">
                Subscribe via RSS
              </Link>
              .
            </p>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
