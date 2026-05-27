import type { Metadata } from 'next'
import {
  SharedBlogIndexPage,
  buildBlogIndexMetadata,
  createBlogRepository,
  vibebrowserBlogConfig,
} from '@/shared/blog'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { MailingListSubscribe } from '@/components/mailing-list-subscribe'

const repository = createBlogRepository()

export const metadata: Metadata = buildBlogIndexMetadata(vibebrowserBlogConfig)

interface BlogIndexPageProps {
  searchParams: Promise<{ tag?: string | string[] }>
}

export default function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  return (
    <SharedBlogIndexPage
      searchParams={searchParams}
      config={vibebrowserBlogConfig}
      repository={repository}
      nav={SiteNav}
      footer={SiteFooter}
      mailingListSubscribe={MailingListSubscribe}
    />
  )
}
