import { createBlogRepository } from '../../../shared/blog'
import { AGENTLABS_BLOG_DIRECTORY } from './blog-directory'

export const agentlabsBlogRepository = createBlogRepository({
  blogDirectory: AGENTLABS_BLOG_DIRECTORY,
})
