import type { Metadata } from 'next'
import {
  SharedBlogIndexPage,
  agentlabsBlogConfig,
  buildBlogIndexMetadata,
} from '../../../../shared/blog'
import { AgentlabsBlogNav } from '../../components/blog/nav'
import { AgentlabsBlogFooter } from '../../components/blog/footer'
import { AgentlabsBlogMailingListSubscribe } from '../../components/blog/mailing-list-subscribe'
import { agentlabsBlogRepository } from '../../lib/blog-repository'

export const metadata: Metadata = buildBlogIndexMetadata(agentlabsBlogConfig)

interface BlogIndexPageProps {
  searchParams: Promise<{ tag?: string | string[] }>
}

export default function AgentlabsBlogIndexPage({ searchParams }: BlogIndexPageProps) {
  return (
    <SharedBlogIndexPage
      searchParams={searchParams}
      config={agentlabsBlogConfig}
      repository={agentlabsBlogRepository}
      nav={AgentlabsBlogNav}
      footer={AgentlabsBlogFooter}
      mailingListSubscribe={AgentlabsBlogMailingListSubscribe}
    />
  )
}
