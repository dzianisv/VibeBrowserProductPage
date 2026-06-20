import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import type { ComponentType } from 'react'
import type { BlogPost, BlogRepository } from './repository'
import { buildSiteUrl, type BlogSiteConfig } from './site-config'

interface SharedBlogPostPageProps {
  params: Promise<{ slug: string }>
  config: BlogSiteConfig
  repository: BlogRepository
  nav: ComponentType
  footer: ComponentType
  mailingListSubscribe: ComponentType
}

export function generateBlogStaticParams(repository: BlogRepository): Array<{ slug: string }> {
  return repository.getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

function getBlogPostImageUrl(config: BlogSiteConfig, slug: string): string {
  return buildSiteUrl(config.siteUrl, `${config.basePath || ''}/blog/${slug}/opengraph-image`)
}

function buildBlogPostKeywords(config: BlogSiteConfig, post: BlogPost): string[] {
  return Array.from(new Set([...post.tags, ...config.defaultKeywords]))
}

export async function buildBlogPostMetadata(
  paramsPromise: Promise<{ slug: string }>,
  config: BlogSiteConfig,
  repository: BlogRepository,
): Promise<Metadata> {
  const { slug } = await paramsPromise
  const post = repository.getBlogPost(slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const url = buildSiteUrl(config.siteUrl, `${config.basePath || ''}/blog/${post.slug}`)
  const imageUrl = getBlogPostImageUrl(config, post.slug)

  return {
    title: post.title,
    description: post.description,
    keywords: buildBlogPostKeywords(config, post),
    authors: [{ name: post.author, url: post.authorUrl }],
    creator: config.creatorName,
    publisher: config.publisherName,
    category: post.tags[0] || 'technology',
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      siteName: config.siteName,
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
      creator: config.twitterCreator,
    },
  }
}

export async function SharedBlogPostPage({
  params,
  config,
  repository,
  nav: Nav,
  footer: Footer,
  mailingListSubscribe: MailingListSubscribe,
}: SharedBlogPostPageProps) {
  const { slug } = await params
  const post = repository.getBlogPost(slug)

  if (!post) {
    notFound()
  }

  if (post.slug !== slug) {
    redirect(`${config.basePath || ''}/blog/${post.slug}`)
  }

  const postUrl = buildSiteUrl(config.siteUrl, `${config.basePath || ''}/blog/${post.slug}`)
  const postImageUrl = getBlogPostImageUrl(config, post.slug)
  const publishedTime = new Date(post.date).toISOString()
  const wordCount = post.wordCount
  const relatedPosts = repository.getRelatedBlogPosts(post.slug, 3)
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
      name: config.organizationName,
      logo: {
        '@type': 'ImageObject',
        url: buildSiteUrl(config.siteUrl, config.organizationLogoPath),
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
        item: buildSiteUrl(config.siteUrl, config.basePath || '/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: buildSiteUrl(config.siteUrl, `${config.basePath || ''}/blog`),
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
      <Nav />
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
          <Link
            href={`${config.basePath || ''}/blog`}
            className="inline-flex items-center text-sm font-medium text-[#8ab4f8] transition-colors hover:text-[#aecbfa]"
          >
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
                <a
                  href={post.authorUrl}
                  className="font-medium text-[#8ab4f8] transition-colors hover:text-[#aecbfa]"
                >
                  {post.author}
                </a>
                <span>•</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>
              <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#e8eaed] md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#9aa0a6] md:text-lg md:leading-8">
                {post.description}
              </p>
              {post.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={`${post.slug}-${tag}`}
                      href={`${config.basePath || ''}/blog?tag=${encodeURIComponent(tag)}`}
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
                        href={`${config.basePath || ''}/blog/${relatedPost.slug}`}
                        className="transition-colors hover:text-[#8ab4f8]"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-base leading-7 text-[#9aa0a6]">{relatedPost.description}</p>
                    <div className="mt-4">
                      <Link
                        href={`${config.basePath || ''}/blog/${relatedPost.slug}`}
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
      <Footer />
    </div>
  )
}
