import fs from 'node:fs'
import path from 'node:path'
import { marked } from 'marked'

export interface BlogPost {
  slug: string
  aliases: string[]
  title: string
  description: string
  date: string
  author: string
  authorUrl: string
  tags: string[]
  published: boolean
  content: string
  html: string
  readingTimeMinutes: number
}

interface Frontmatter {
  title?: string
  description?: string
  date?: string
  author?: string
  authorUrl?: string
  tags?: string[]
  aliases?: string[]
  published?: boolean
}

const BLOG_DIR = path.join(process.cwd(), 'blog')
const DEFAULT_BLOG_AUTHOR = 'Dzianis Vashchuk'
const DEFAULT_BLOG_AUTHOR_URL = 'https://linkedin.com/in/dzianisv'

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

function stripWrappingQuotes(value: string): string {
  return value.replace(/^['\"]|['\"]$/g, '')
}

function parseScalar(value: string): string | boolean {
  const trimmed = value.trim()
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  return stripWrappingQuotes(trimmed)
}

function parseList(rawValue: string): string[] {
  return rawValue
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
    .map(stripWrappingQuotes)
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
  let activeListKey: 'tags' | 'aliases' | null = null

  for (const line of fmRaw.split('\n')) {
    const listItem = line.match(/^\s*-\s+(.*)$/)
    if (listItem && activeListKey) {
      const value = stripWrappingQuotes(listItem[1].trim())
      frontmatter[activeListKey] = [...(frontmatter[activeListKey] || []), value]
      continue
    }

    activeListKey = null

    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!pair) continue

    const key = pair[1]
    const rawValue = pair[2] || ''

    if (key === 'tags' || key === 'aliases') {
      if (rawValue.trim() === '') {
        frontmatter[key] = []
        activeListKey = key
      } else {
        frontmatter[key] = parseList(rawValue)
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
      if (key === 'authorUrl') frontmatter.authorUrl = parsed
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
    aliases: frontmatter.aliases || [],
    title: frontmatter.title || slug.replace(/[-_]/g, ' '),
    description: frontmatter.description || '',
    date: frontmatter.date || '1970-01-01',
    author: frontmatter.author || DEFAULT_BLOG_AUTHOR,
    authorUrl: frontmatter.authorUrl || DEFAULT_BLOG_AUTHOR_URL,
    tags: frontmatter.tags || [],
    published,
    content,
    html: markdownToHtml(content),
    readingTimeMinutes: estimateReadingTime(content),
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
  if (fs.existsSync(postPath)) {
    const post = toPost(`${slug}.md`)
    if (!post || !post.published) return null
    return post
  }

  return getAllBlogPosts().find((post) => post.aliases.includes(slug)) || null
}
