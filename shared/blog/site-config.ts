export interface BlogSiteConfig {
  siteUrl: string
  siteName: string
  blogName: string
  blogTitle: string
  blogDescription: string
  blogHeadingEyebrow: string
  blogHeadingDescription: string
  blogOpenGraphTitle: string
  blogImagePath?: string
  publisherName: string
  creatorName: string
  twitterCreator: string
  organizationName: string
  organizationLogoPath: string
  basePath?: string
  defaultKeywords: string[]
}

export function withLeadingSlash(pathname: string): string {
  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

export function buildSiteUrl(siteUrl: string, pathname: string): string {
  const normalizedPath = withLeadingSlash(pathname)
  return new URL(normalizedPath, siteUrl).toString()
}
