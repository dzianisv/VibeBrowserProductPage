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

export interface BlogTagSummary {
  tag: string
  count: number
}

export interface BlogRepository {
  getAllBlogPosts(): BlogPost[]
  getAllBlogTags(): BlogTagSummary[]
  getBlogPostsByTag(tag: string): BlogPost[]
  getBlogPost(slug: string): BlogPost | null
  getRelatedBlogPosts(slug: string, limit?: number): BlogPost[]
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

interface CreateBlogRepositoryOptions {
  blogDirectory?: string
  defaultAuthor?: string
  defaultAuthorUrl?: string
}

const DEFAULT_BLOG_AUTHOR = 'Dzianis Vashchuk'
const DEFAULT_BLOG_AUTHOR_URL = 'https://linkedin.com/in/dzianisv'

function slugifyHeading(raw: string): string {
  return raw
    .replace(/^#{1,6}\s+/, '')
    .replace(/\s+$/, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

marked.use({
  renderer: {
    heading({ text, depth, raw }: { text: string; depth: number; raw: string }) {
      const id = slugifyHeading(raw)
      return `<h${depth} id="${id}">${text}</h${depth}>\n`
    },
  },
})

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

function resolveBlogDirectory(customDirectory?: string): string {
  if (customDirectory) {
    return path.isAbsolute(customDirectory)
      ? customDirectory
      : path.resolve(process.cwd(), customDirectory)
  }
  return path.join(process.cwd(), 'blog')
}

export function createBlogRepository(options: CreateBlogRepositoryOptions = {}): BlogRepository {
  const blogDirectory = resolveBlogDirectory(options.blogDirectory)
  const defaultAuthor = options.defaultAuthor || DEFAULT_BLOG_AUTHOR
  const defaultAuthorUrl = options.defaultAuthorUrl || DEFAULT_BLOG_AUTHOR_URL

  function toPost(fileName: string): BlogPost | null {
    if (!fileName.endsWith('.md')) return null

    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(blogDirectory, fileName)
    const raw = fs.readFileSync(fullPath, 'utf8')
    const { frontmatter, content } = parseFrontmatter(raw)

    const published = frontmatter.published !== false

    return {
      slug,
      aliases: frontmatter.aliases || [],
      title: frontmatter.title || slug.replace(/[-_]/g, ' '),
      description: frontmatter.description || '',
      date: frontmatter.date || '1970-01-01',
      author: frontmatter.author || defaultAuthor,
      authorUrl: frontmatter.authorUrl || defaultAuthorUrl,
      tags: frontmatter.tags || [],
      published,
      content,
      html: markdownToHtml(content),
      readingTimeMinutes: estimateReadingTime(content),
    }
  }

  function getAllBlogPosts(): BlogPost[] {
    if (!fs.existsSync(blogDirectory)) return []

    return fs
      .readdirSync(blogDirectory)
      .map(toPost)
      .filter((post): post is BlogPost => post !== null)
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  function getAllBlogTags(): BlogTagSummary[] {
    const counts = new Map<string, number>()
    for (const post of getAllBlogPosts()) {
      for (const tag of post.tags) {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      }
    }
    return Array.from(counts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
  }

  function getBlogPostsByTag(tag: string): BlogPost[] {
    const normalized = tag.toLowerCase()
    return getAllBlogPosts().filter((post) => post.tags.some((t) => t.toLowerCase() === normalized))
  }

  function getBlogPost(slug: string): BlogPost | null {
    const postPath = path.join(blogDirectory, `${slug}.md`)
    if (fs.existsSync(postPath)) {
      const post = toPost(`${slug}.md`)
      if (!post || !post.published) return null
      return post
    }

    return getAllBlogPosts().find((post) => post.aliases.includes(slug)) || null
  }

  function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
    const currentPost = getBlogPost(slug)
    if (!currentPost) return []

    const currentTags = new Set(currentPost.tags)
    const otherPosts = getAllBlogPosts().filter((post) => post.slug !== currentPost.slug)

    const scoredPosts = otherPosts
      .map((post) => ({
        post,
        sharedTags: post.tags.filter((tag) => currentTags.has(tag)).length,
      }))
      .sort((a, b) => {
        if (b.sharedTags !== a.sharedTags) {
          return b.sharedTags - a.sharedTags
        }

        return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
      })

    const related = scoredPosts
      .filter((entry) => entry.sharedTags > 0)
      .slice(0, limit)
      .map((entry) => entry.post)

    if (related.length >= limit) {
      return related
    }

    const seenSlugs = new Set(related.map((post) => post.slug))
    const fallbackPosts = otherPosts
      .filter((post) => !seenSlugs.has(post.slug))
      .slice(0, limit - related.length)

    return [...related, ...fallbackPosts]
  }

  return {
    getAllBlogPosts,
    getAllBlogTags,
    getBlogPostsByTag,
    getBlogPost,
    getRelatedBlogPosts,
  }
}

const defaultBlogRepository = createBlogRepository()

export function getAllBlogPosts(): BlogPost[] {
  return defaultBlogRepository.getAllBlogPosts()
}

export function getAllBlogTags(): BlogTagSummary[] {
  return defaultBlogRepository.getAllBlogTags()
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return defaultBlogRepository.getBlogPostsByTag(tag)
}

export function getBlogPost(slug: string): BlogPost | null {
  return defaultBlogRepository.getBlogPost(slug)
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  return defaultBlogRepository.getRelatedBlogPosts(slug, limit)
}
