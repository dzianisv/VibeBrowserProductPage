import type { ReactElement } from 'react'
import type { BlogPost } from '../shared/blog'

export const BLOG_SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
}

export const BLOG_SOCIAL_IMAGE_CONTENT_TYPE = 'image/png'

export interface BlogSocialImageOptions {
  eyebrow: string
  brandName: string
  indexTitle: string
  indexDescription: string
  indexFooter: string
  indexTags: string[]
  fallbackTag: string
  postFooterBasePath: string
}

const DEFAULT_BLOG_SOCIAL_IMAGE_OPTIONS: BlogSocialImageOptions = {
  eyebrow: 'Vibe Blog',
  brandName: 'Vibe Co-Pilot',
  indexTitle: 'AI browser automation insights, release notes, and practical playbooks',
  indexDescription:
    'Research, product updates, coding-tool experiments, and operator workflows from the team building Vibe Co-Pilot.',
  indexFooter: 'vibebrowser.app/blog',
  indexTags: ['AI browser automation', 'Release notes', 'Engineering'],
  fallbackTag: 'Vibe Blog',
  postFooterBasePath: 'vibebrowser.app/blog',
}

function resolveOptions(options?: Partial<BlogSocialImageOptions>): BlogSocialImageOptions {
  return {
    ...DEFAULT_BLOG_SOCIAL_IMAGE_OPTIONS,
    ...options,
  }
}

function clampText(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}...`
}

function renderTag(tag: string): ReactElement {
  return (
    <div
      key={tag}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 18px',
        borderRadius: '999px',
        border: '1px solid rgba(109, 40, 217, 0.16)',
        background: 'rgba(255, 255, 255, 0.75)',
        color: '#6d28d9',
        fontSize: '20px',
        fontWeight: 600,
      }}
    >
      {tag}
    </div>
  )
}

function renderCard({
  eyebrow,
  brandName,
  title,
  description,
  footer,
  tags,
}: {
  eyebrow: string
  brandName: string
  title: string
  description: string
  footer: string
  tags: string[]
}): ReactElement {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '54px',
        background:
          'radial-gradient(circle at top left, rgba(196, 181, 253, 0.65), transparent 28%), linear-gradient(135deg, #fcfcfd 0%, #faf5ff 48%, #eff6ff 100%)',
        color: '#0f172a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '-90px',
          top: '-120px',
          width: '320px',
          height: '320px',
          borderRadius: '999px',
          background: 'rgba(59, 130, 246, 0.10)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '-120px',
          bottom: '-140px',
          width: '360px',
          height: '360px',
          borderRadius: '999px',
          background: 'rgba(124, 58, 237, 0.10)',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 18px',
            borderRadius: '999px',
            border: '1px solid rgba(109, 40, 217, 0.14)',
            background: 'rgba(255, 255, 255, 0.78)',
            color: '#6d28d9',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#7c3aed',
            fontSize: '22px',
            fontWeight: 700,
          }}
        >
          {brandName}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
          maxWidth: '940px',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: '-0.04em',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: '28px',
            lineHeight: 1.35,
            color: '#475569',
            maxWidth: '920px',
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            maxWidth: '760px',
          }}
        >
          {tags.map(renderTag)}
        </div>
        <div
          style={{
            color: '#64748b',
            fontSize: '22px',
            fontWeight: 500,
          }}
        >
          {footer}
        </div>
      </div>
    </div>
  )
}

export function renderBlogIndexSocialImage(optionsOverride?: Partial<BlogSocialImageOptions>): ReactElement {
  const options = resolveOptions(optionsOverride)

  return renderCard({
    eyebrow: options.eyebrow,
    brandName: options.brandName,
    title: options.indexTitle,
    description: options.indexDescription,
    footer: options.indexFooter,
    tags: options.indexTags,
  })
}

export function renderBlogPostSocialImage(
  post: BlogPost | null,
  optionsOverride?: Partial<BlogSocialImageOptions>,
): ReactElement {
  const options = resolveOptions(optionsOverride)

  if (!post) {
    return renderBlogIndexSocialImage(options)
  }

  const tags = post.tags.length > 0 ? post.tags.slice(0, 3) : [options.fallbackTag]

  return renderCard({
    eyebrow: options.eyebrow,
    brandName: options.brandName,
    title: clampText(post.title, 96),
    description: clampText(post.description, 170),
    footer: `${options.postFooterBasePath}/${post.slug}`,
    tags,
  })
}
