import { ImageResponse } from 'next/og'
import {
  BLOG_SOCIAL_IMAGE_CONTENT_TYPE,
  BLOG_SOCIAL_IMAGE_SIZE,
  renderBlogIndexSocialImage,
} from '@/lib/blog-social-image'

export const alt = 'Vibe Blog'
export const size = BLOG_SOCIAL_IMAGE_SIZE
export const contentType = BLOG_SOCIAL_IMAGE_CONTENT_TYPE

export default async function Image() {
  return new ImageResponse(renderBlogIndexSocialImage(), {
    ...size,
  })
}
