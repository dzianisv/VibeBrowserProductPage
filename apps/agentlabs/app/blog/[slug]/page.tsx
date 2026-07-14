import type { Metadata } from 'next'
import {
  SharedBlogPostPage,
  agentlabsBlogConfig,
  buildBlogPostMetadata,
  generateBlogStaticParams,
} from '../../../../../shared/blog'
import { AgentlabsBlogNav } from '../../../components/blog/nav'
import { AgentlabsBlogFooter } from '../../../components/blog/footer'
import { AgentlabsBlogMailingListSubscribe } from '../../../components/blog/mailing-list-subscribe'
import { agentlabsBlogRepository } from '../../../lib/blog-repository'

type Params = {
  slug: string
}

export async function generateStaticParams(): Promise<Params[]> {
  return generateBlogStaticParams(agentlabsBlogRepository)
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  return buildBlogPostMetadata(props.params, agentlabsBlogConfig, agentlabsBlogRepository)
}

export default function AgentlabsBlogPostPage(props: { params: Promise<Params> }) {
  return (
    <SharedBlogPostPage
      params={props.params}
      config={agentlabsBlogConfig}
      repository={agentlabsBlogRepository}
      nav={AgentlabsBlogNav}
      footer={AgentlabsBlogFooter}
      mailingListSubscribe={AgentlabsBlogMailingListSubscribe}
    />
  )
}
