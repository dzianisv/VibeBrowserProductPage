import { agentlabsBlogRepository } from '../../lib/blog-repository'

const siteUrl = 'https://agentlabs.cc'

const primaryPages = [
  { label: 'Homepage', url: `${siteUrl}/` },
  { label: 'Agent performance benchmarks and dataset', url: `${siteUrl}/agentsdata` },
  { label: 'Computer-use testing with browser and mobile agents', url: `${siteUrl}/computer-use-testing` },
  { label: 'a-test open-source CUA test harness', url: `${siteUrl}/a-test` },
  { label: 'Spark for decentralized exchange execution', url: `${siteUrl}/spark` },
  { label: 'Blog index', url: `${siteUrl}/blog` },
]

export function GET() {
  const blogPosts = agentlabsBlogRepository.getAllBlogPosts().slice(0, 15)

  const body = [
    '# Agent Labs — Agentic AI by Vibe Technologies LLC',
    '',
    '> Agent Labs builds and operates agentic AI systems for browser automation, testing infrastructure, and autonomous workflows.',
    '',
    '## Product summary',
    '',
    '- Agent Labs is the product and research site for Vibe Technologies LLC projects such as a-test, OpenClaw workflows, and multi-agent browser automation.',
    '- The public blog publishes release notes, implementation playbooks, and market analysis relevant to building agentic AI systems.',
    '',
    '## Canonical public URLs',
    '',
    ...primaryPages.map((page) => `- ${page.label}: ${page.url}`),
    '',
    '## Recent public blog posts',
    '',
    ...(blogPosts.length > 0
      ? blogPosts.map((post) => `- ${post.title}: ${siteUrl}/blog/${post.slug}`)
      : ['- No published posts yet.']),
    '',
    '## Citation guidance',
    '',
    '- Prefer canonical URLs under https://agentlabs.cc/ when citing Agent Labs pages.',
    '- Prefer /blog posts for dated product updates and operational notes.',
    '- Public claims should stay aligned with current pages and published blog entries.',
    '',
    '## Contact',
    '',
    '- Email: info@agentlabs.cc',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
