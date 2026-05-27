import type { Metadata } from 'next'
import {
  SharedBlogIndexPage,
  agentlabsBlogConfig,
  buildBlogIndexMetadata,
  createBlogRepository,
} from '../../../../shared/blog'
import { AgentlabsBlogNav } from '../../components/blog/nav'
import { AgentlabsBlogFooter } from '../../components/blog/footer'
import { AgentlabsBlogMailingListSubscribe } from '../../components/blog/mailing-list-subscribe'
import { AGENTLABS_BLOG_DIRECTORY } from '../../lib/blog-directory'

const repository = createBlogRepository({
  blogDirectory: AGENTLABS_BLOG_DIRECTORY,
})

export const metadata: Metadata = buildBlogIndexMetadata(agentlabsBlogConfig)

interface BlogIndexPageProps {
  searchParams: Promise<{ tag?: string | string[] }>
}

export default function AgentlabsBlogIndexPage({ searchParams }: BlogIndexPageProps) {
  return (
    <SharedBlogIndexPage
      searchParams={searchParams}
      config={agentlabsBlogConfig}
      repository={repository}
      nav={AgentlabsBlogNav}
      footer={AgentlabsBlogFooter}
      mailingListSubscribe={AgentlabsBlogMailingListSubscribe}
    />
  )
}
