import type { ReactElement } from 'react'
import type { BlogPost } from '@/lib/blog'

export const BLOG_SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
}

export const BLOG_SOCIAL_IMAGE_CONTENT_TYPE = 'image/png'

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
  title,
  description,
  footer,
  tags,
}: {
  eyebrow: string
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
          Vibe Co-Pilot
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

export function renderBlogIndexSocialImage(): ReactElement {
  return renderCard({
    eyebrow: 'Vibe Blog',
    title: 'AI browser automation insights, release notes, and practical playbooks',
    description:
      'Research, product updates, coding-tool experiments, and operator workflows from the team building Vibe Co-Pilot.',
    footer: 'vibebrowser.app/blog',
    tags: ['AI browser automation', 'Release notes', 'Engineering'],
  })
}

export function renderBlogPostSocialImage(post: BlogPost | null): ReactElement {
  if (!post) {
    return renderBlogIndexSocialImage()
  }

  const tags = post.tags.length > 0 ? post.tags.slice(0, 3) : ['Vibe Blog']

  return renderCard({
    eyebrow: 'Vibe Blog',
    title: clampText(post.title, 96),
    description: clampText(post.description, 170),
    footer: `vibebrowser.app/blog/${post.slug}`,
    tags,
  })
}
