import type { Metadata } from 'next'
import {
  SharedBlogPostPage,
  buildBlogPostMetadata,
  createBlogRepository,
  generateBlogStaticParams,
  vibebrowserBlogConfig,
} from '@/shared/blog'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { MailingListSubscribe } from '@/components/mailing-list-subscribe'

type Params = {
  slug: string
}

const repository = createBlogRepository()

export async function generateStaticParams(): Promise<Params[]> {
  return generateBlogStaticParams(repository)
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  return buildBlogPostMetadata(props.params, vibebrowserBlogConfig, repository)
}

export default function BlogPostPage(props: { params: Promise<Params> }) {
  return (
    <SharedBlogPostPage
      params={props.params}
      config={vibebrowserBlogConfig}
      repository={repository}
      nav={SiteNav}
      footer={SiteFooter}
      mailingListSubscribe={MailingListSubscribe}
    />
  )
}
