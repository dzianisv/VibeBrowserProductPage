import type { Metadata } from 'next'
import {
  SharedBlogPostPage,
  agentlabsBlogConfig,
  buildBlogPostMetadata,
  createBlogRepository,
  generateBlogStaticParams,
} from '../../../../../shared/blog'
import { AgentlabsBlogNav } from '../../../components/blog/nav'
import { AgentlabsBlogFooter } from '../../../components/blog/footer'
import { AgentlabsBlogMailingListSubscribe } from '../../../components/blog/mailing-list-subscribe'
import { AGENTLABS_BLOG_DIRECTORY } from '../../../lib/blog-directory'

type Params = {
  slug: string
}

const repository = createBlogRepository({
  blogDirectory: AGENTLABS_BLOG_DIRECTORY,
})

export async function generateStaticParams(): Promise<Params[]> {
  return generateBlogStaticParams(repository)
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  return buildBlogPostMetadata(props.params, agentlabsBlogConfig, repository)
}

export default function AgentlabsBlogPostPage(props: { params: Promise<Params> }) {
  return (
    <SharedBlogPostPage
      params={props.params}
      config={agentlabsBlogConfig}
      repository={repository}
      nav={AgentlabsBlogNav}
      footer={AgentlabsBlogFooter}
      mailingListSubscribe={AgentlabsBlogMailingListSubscribe}
    />
  )
}
