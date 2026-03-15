import { ImageResponse } from 'next/og'
import { getBlogPost } from '@/lib/blog'
import {
  BLOG_SOCIAL_IMAGE_CONTENT_TYPE,
  BLOG_SOCIAL_IMAGE_SIZE,
  renderBlogPostSocialImage,
} from '@/lib/blog-social-image'

export const alt = 'Vibe Blog article'
export const size = BLOG_SOCIAL_IMAGE_SIZE
export const contentType = BLOG_SOCIAL_IMAGE_CONTENT_TYPE

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)

  return new ImageResponse(renderBlogPostSocialImage(post), {
    ...size,
  })
}
