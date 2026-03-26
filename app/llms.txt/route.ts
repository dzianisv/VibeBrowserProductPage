import { getAllBlogPosts } from '@/lib/blog'

const siteUrl = 'https://www.vibebrowser.app'

const primaryPages = [
  { label: 'Homepage', url: `${siteUrl}/` },
  { label: 'Compare Vibe with other AI browser products', url: `${siteUrl}/compare` },
  { label: 'Vibe Browser for Agents MCP page', url: `${siteUrl}/mcp` },
  { label: 'Vibe Browser for OpenClaw CLI page', url: `${siteUrl}/openclaw` },
  { label: 'Teams page', url: `${siteUrl}/teams` },
  { label: 'Enterprise page', url: `${siteUrl}/enterprise` },
  { label: 'Blog index', url: `${siteUrl}/blog` },
]

const docsPages = [
  { label: 'Documentation home', url: 'https://docs.vibebrowser.app' },
  {
    label: 'Extension install guide',
    url: 'https://docs.vibebrowser.app/getting-started/extension',
  },
]

export function GET() {
  const blogPosts = getAllBlogPosts().slice(0, 10)

  const body = [
    '# Vibe Co-Pilot',
    '',
    '> AI browser automation for websites, Gmail, Google Calendar, and MCP-connected agent workflows.',
    '',
    '## Product summary',
    '',
    '- Vibe Co-Pilot is a Chrome-based browser automation product that can research, navigate, and execute multi-step workflows across real websites.',
    '- The product emphasizes model flexibility: users can choose Vibe AI, bring their own cloud provider, or route work to local or self-hosted models depending on privacy, latency, and cost.',
    '- Key product surfaces include Google Workspace automation, reusable skills, a secrets vault, and MCP-compatible browser operator flows for other AI agents.',
    '',
    '## Canonical public URLs',
    '',
    ...primaryPages.map((page) => `- ${page.label}: ${page.url}`),
    '',
    '## Documentation',
    '',
    ...docsPages.map((page) => `- ${page.label}: ${page.url}`),
    '',
    '## Recent public blog posts',
    '',
    ...(blogPosts.length > 0
      ? blogPosts.map((post) => `- ${post.title}: ${siteUrl}/blog/${post.slug}`)
      : ['- No published posts yet.']),
    '',
    '## Citation guidance',
    '',
    '- Prefer canonical URLs under https://www.vibebrowser.app/ when citing the marketing site.',
    '- Prefer https://docs.vibebrowser.app for setup and developer documentation.',
    '- Prefer blog posts under /blog for dated product updates and market analysis.',
    '- Public marketing claims should stay aligned with the homepage, compare page, teams page, enterprise page, and blog posts.',
    '',
    '## Contact',
    '',
    '- Email: info@vibebrowser.app',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
