import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentFile = fileURLToPath(import.meta.url)
const currentDir = path.dirname(currentFile)

// The shared blog directory lives at the monorepo root. Source-relative
// resolution breaks after bundling (import.meta.url then points at the
// compiled chunk, e.g. .next/server/..., so ../../../blog misses), which made
// the deployed index render empty while prerendered [slug] pages still worked.
// Probe the known locations and take the first that exists.
const candidates = [
  path.resolve(currentDir, '../../../blog'), // source layout: apps/agentlabs/lib -> repo root
  path.resolve(process.cwd(), '../../blog'), // runtime cwd = apps/agentlabs
  path.resolve(process.cwd(), 'blog'), // runtime cwd = monorepo root
]

export const AGENTLABS_BLOG_DIRECTORY =
  candidates.find((p) => fs.existsSync(p)) ?? candidates[0]
