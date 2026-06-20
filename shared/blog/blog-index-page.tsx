import type { Metadata } from 'next'
import Link from 'next/link'
import type { ComponentType } from 'react'
import type { BlogRepository } from './repository'
import { buildSiteUrl, type BlogSiteConfig } from './site-config'

interface BlogIndexPageProps {
  searchParams: Promise<{ tag?: string | string[] }>
  config: BlogSiteConfig
  repository: BlogRepository
  nav: ComponentType
  footer: ComponentType
  mailingListSubscribe: ComponentType
}

export function buildBlogIndexMetadata(config: BlogSiteConfig): Metadata {
  const blogUrl = buildSiteUrl(config.siteUrl, `${config.basePath || ''}/blog`)
  const blogImageUrl = config.blogImagePath
    ? buildSiteUrl(config.siteUrl, config.blogImagePath)
    : buildSiteUrl(config.siteUrl, `${config.basePath || ''}/blog/opengraph-image`)

  return {
    title: config.blogTitle,
    description: config.blogDescription,
    keywords: config.defaultKeywords,
    authors: [{ name: config.publisherName }],
    creator: config.creatorName,
    publisher: config.publisherName,
    category: 'technology',
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      type: 'website',
      title: config.blogOpenGraphTitle,
      description: config.blogDescription,
      url: blogUrl,
      siteName: config.siteName,
      images: [
        {
          url: blogImageUrl,
          width: 1200,
          height: 630,
          alt: config.blogName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.blogOpenGraphTitle,
      description: config.blogDescription,
      images: [blogImageUrl],
      creator: config.twitterCreator,
    },
  }
}

export async function SharedBlogIndexPage({
  searchParams,
  config,
  repository,
  nav: Nav,
  footer: Footer,
  mailingListSubscribe: MailingListSubscribe,
}: BlogIndexPageProps) {
  const params = await searchParams
  const rawTag = Array.isArray(params.tag) ? params.tag[0] : params.tag
  const activeTag = rawTag?.trim() || null

  const allTags = repository.getAllBlogTags()
  const matchedTag = activeTag
    ? allTags.find((t) => t.tag.toLowerCase() === activeTag.toLowerCase())?.tag ?? null
    : null

  const tagLimit = 10
  const topTags = allTags.slice(0, tagLimit)
  const visibleTags =
    matchedTag && !topTags.some((t) => t.tag === matchedTag)
      ? [...topTags, allTags.find((t) => t.tag === matchedTag)!]
      : topTags

  const allPosts = repository.getAllBlogPosts()
  const posts = matchedTag ? repository.getBlogPostsByTag(matchedTag) : allPosts

  return (
    <div className="min-h-screen bg-[#202124] text-[#e8eaed] font-sans">
      <Nav />
      <main className="container mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8ab4f8]">
              {config.blogHeadingEyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#e8eaed] md:text-6xl">
              {config.blogName}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#9aa0a6]">
              {config.blogHeadingDescription}
            </p>
          </div>

          <div className="w-full flex-shrink-0 lg:min-w-[320px] lg:w-auto">
            <div className="rounded-lg border border-[#3c4043] bg-[#3c4043]/20 p-4">
              <p className="text-sm font-semibold text-[#8ab4f8]">Newsletter</p>
              <p className="mt-1 text-sm text-[#9aa0a6]">Get updates on browser automation</p>
              <div className="mt-3">
                <MailingListSubscribe />
              </div>
            </div>
          </div>
        </div>

        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9aa0a6]">
                Filter by tag
              </p>
              {matchedTag && (
                <Link href={`${config.basePath || ''}/blog`} className="text-xs font-medium text-[#8ab4f8] hover:text-[#aecbfa]">
                  Clear filter
                </Link>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`${config.basePath || ''}/blog`}
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  matchedTag
                    ? 'bg-[#3c4043] text-[#e8eaed] hover:bg-[#5f6368]'
                    : 'bg-[#8ab4f8] text-[#202124]'
                }`}
              >
                All <span className="ml-1.5 opacity-70">{allPosts.length}</span>
              </Link>
              {visibleTags.map(({ tag, count }) => {
                const isActive = matchedTag === tag
                return (
                  <Link
                    key={tag}
                    href={`${config.basePath || ''}/blog?tag=${encodeURIComponent(tag)}`}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#8ab4f8] text-[#202124]'
                        : 'bg-[#3c4043] text-[#e8eaed] hover:bg-[#5f6368]'
                    }`}
                  >
                    {tag} <span className="ml-1.5 opacity-70">{count}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {activeTag && !matchedTag && (
          <div className="mb-6 rounded-xl border border-[#3c4043] bg-[#3c4043]/30 p-4 text-sm text-[#9aa0a6]">
            No posts found for tag <span className="font-semibold text-[#e8eaed]">{activeTag}</span>.{' '}
            <Link href={`${config.basePath || ''}/blog`} className="text-[#8ab4f8] hover:text-[#aecbfa]">
              View all posts →
            </Link>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="rounded-xl border border-[#3c4043] bg-[#3c4043]/30 p-6 text-[#9aa0a6]">
            No published posts yet.
          </div>
        ) : (
          <div className="divide-y divide-[#3c4043] border-t border-[#3c4043]">
            {posts.map((post, index) => (
              <article key={post.slug} className="group py-7 md:py-9">
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#9aa0a6]">
                  {index === 0 && !matchedTag && (
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
                  <Link href={`${config.basePath || ''}/blog/${post.slug}`} className="transition-colors group-hover:text-[#8ab4f8]">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[#e8eaed]">{post.description}</p>

                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => {
                      const isActive = matchedTag === tag
                      return (
                        <Link
                          key={`${post.slug}-${tag}`}
                          href={`${config.basePath || ''}/blog?tag=${encodeURIComponent(tag)}`}
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                            isActive
                              ? 'bg-[#8ab4f8] text-[#202124]'
                              : 'bg-[#3c4043] text-[#e8eaed] hover:bg-[#5f6368]'
                          }`}
                        >
                          {tag}
                        </Link>
                      )
                    })}
                  </div>
                )}

                <div className="mt-5">
                  <Link
                    href={`${config.basePath || ''}/blog/${post.slug}`}
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
      <Footer />
    </div>
  )
}
