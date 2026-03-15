import fs from 'node:fs'
import path from 'node:path'
import { marked } from 'marked'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  published: boolean
  content: string
  html: string
}

interface Frontmatter {
  title?: string
  description?: string
  date?: string
  author?: string
  tags?: string[]
  published?: boolean
}

const BLOG_DIR = path.join(process.cwd(), 'blog')

function parseScalar(value: string): string | boolean {
  const trimmed = value.trim()
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  return trimmed.replace(/^['\"]|['\"]$/g, '')
}

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; content: string } {
  if (!raw.startsWith('---\n')) {
    return { frontmatter: {}, content: raw }
  }

  const end = raw.indexOf('\n---\n', 4)
  if (end === -1) {
    return { frontmatter: {}, content: raw }
  }

  const fmRaw = raw.slice(4, end)
  const content = raw.slice(end + 5)

  const frontmatter: Frontmatter = {}
  let activeListKey: 'tags' | null = null

  for (const line of fmRaw.split('\n')) {
    const listItem = line.match(/^\s*-\s+(.*)$/)
    if (listItem && activeListKey) {
      const value = listItem[1].trim().replace(/^['\"]|['\"]$/g, '')
      frontmatter[activeListKey] = [...(frontmatter[activeListKey] || []), value]
      continue
    }

    activeListKey = null

    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!pair) continue

    const key = pair[1]
    const rawValue = pair[2] || ''

    if (key === 'tags') {
      if (rawValue.trim() === '') {
        frontmatter.tags = []
        activeListKey = 'tags'
      } else {
        frontmatter.tags = rawValue
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean)
          .map((v) => v.replace(/^['\"]|['\"]$/g, ''))
      }
      continue
    }

    const parsed = parseScalar(rawValue)
    if (key === 'published' && typeof parsed === 'boolean') {
      frontmatter.published = parsed
      continue
    }

    if (typeof parsed === 'string') {
      if (key === 'title') frontmatter.title = parsed
      if (key === 'description') frontmatter.description = parsed
      if (key === 'date') frontmatter.date = parsed
      if (key === 'author') frontmatter.author = parsed
    }
  }

  return { frontmatter, content }
}

function markdownToHtml(content: string): string {
  const rendered = marked.parse(content, {
    gfm: true,
    breaks: false,
  })

  return typeof rendered === 'string' ? rendered : ''
}

function toPost(fileName: string): BlogPost | null {
  if (!fileName.endsWith('.md')) return null

  const slug = fileName.replace(/\.md$/, '')
  const fullPath = path.join(BLOG_DIR, fileName)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { frontmatter, content } = parseFrontmatter(raw)

  const published = frontmatter.published === true

  return {
    slug,
    title: frontmatter.title || slug.replace(/[-_]/g, ' '),
    description: frontmatter.description || '',
    date: frontmatter.date || '1970-01-01',
    author: frontmatter.author || 'Vibe Team',
    tags: frontmatter.tags || [],
    published,
    content,
    html: markdownToHtml(content),
  }
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .map(toPost)
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): BlogPost | null {
  const postPath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(postPath)) return null

  const post = toPost(`${slug}.md`)
  if (!post || !post.published) return null
  return post
}
