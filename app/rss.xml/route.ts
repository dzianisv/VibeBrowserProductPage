import { getAllBlogPosts } from '@/lib/blog'

const siteUrl = 'https://www.vibebrowser.app'
const blogUrl = `${siteUrl}/blog`

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function wrapCdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`
}

export function GET() {
  const posts = getAllBlogPosts()
  const lastBuildDate = posts[0] ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()

  const items = posts
    .map((post) => {
      const url = `${blogUrl}/${post.slug}`
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join('')

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description>${wrapCdata(post.description)}</description>
          <content:encoded>${wrapCdata(post.html)}</content:encoded>
          <author>info@vibebrowser.app (${escapeXml(post.author)})</author>
          ${categories}
        </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Vibe Blog</title>
    <link>${blogUrl}</link>
    <description>Research, product updates, and practical automation playbooks for AI browser workflows.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
