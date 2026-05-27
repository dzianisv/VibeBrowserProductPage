import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentFile = fileURLToPath(import.meta.url)
const currentDir = path.dirname(currentFile)

export const AGENTLABS_BLOG_DIRECTORY = path.resolve(currentDir, '../../../blog')
