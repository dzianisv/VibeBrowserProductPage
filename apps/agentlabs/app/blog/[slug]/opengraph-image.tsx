import { ImageResponse } from 'next/og'
import {
  BLOG_SOCIAL_IMAGE_CONTENT_TYPE,
  BLOG_SOCIAL_IMAGE_SIZE,
  renderBlogPostSocialImage,
} from '../../../../../lib/blog-social-image'
import { agentlabsBlogRepository } from '../../../lib/blog-repository'
import { agentlabsBlogSocialImageOptions } from '../../../lib/blog-social-image-options'

export const alt = 'Agent Labs Blog article'
export const size = BLOG_SOCIAL_IMAGE_SIZE
export const contentType = BLOG_SOCIAL_IMAGE_CONTENT_TYPE

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = agentlabsBlogRepository.getBlogPost(slug)

  return new ImageResponse(renderBlogPostSocialImage(post, agentlabsBlogSocialImageOptions), {
    ...size,
  })
}
