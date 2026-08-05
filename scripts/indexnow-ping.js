const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

const defaultHosts = ["www.vibebrowser.app"]
const defaultPaths = [
  "/",
  "/teams",
  "/mcp",
  "/mcp-stdio",
  "/enterprise",
  "/compare",
  "/agentic-team",
  "/aboutus",
  "/privacy",
  "/terms",
]

function splitCsv(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function isProduction() {
  const vercelEnv = process.env.VERCEL_ENV
  if (vercelEnv) {
    return vercelEnv === "production"
  }
  return process.env.NODE_ENV === "production"
}

function buildUrls(host, paths) {
  return paths.map((path) => `https://${host}${path}`)
}

// Prefer the live sitemap as the URL source so newly shipped routes are
// submitted automatically. `defaultPaths` is only a fallback for when the
// sitemap is unreachable or unparseable.
async function fetchSitemapUrls(host) {
  const response = await fetch(`https://${host}/sitemap.xml`)
  if (!response.ok) {
    throw new Error(`sitemap.xml -> ${response.status}`)
  }
  const xml = await response.text()
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((match) => match[1])
    .filter((url) => url.startsWith(`https://${host}/`) || url === `https://${host}`)
  if (urls.length === 0) {
    throw new Error("sitemap.xml contained no usable <loc> entries")
  }
  return urls
}

async function resolveUrls(host, paths) {
  if (process.env.INDEXNOW_URL_PATHS) {
    return buildUrls(host, paths)
  }
  try {
    const urls = await fetchSitemapUrls(host)
    console.log(`IndexNow: ${host} using ${urls.length} URLs from sitemap.xml`)
    return urls
  } catch (error) {
    console.warn(`IndexNow: ${host} sitemap fallback (${error.message})`)
    return buildUrls(host, paths)
  }
}

async function pingIndexNow(host, key, urlList) {
  const payload = {
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList,
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const text = await response.text()
  return { status: response.status, body: text }
}

async function main() {
  if (!isProduction()) {
    console.log("IndexNow: skipping (not production)")
    return
  }

  const key = process.env.INDEXNOW_KEY
  if (!key) {
    // Silently skipping here is what hid a broken deploy pipeline for months:
    // the ping never ran and nothing was ever submitted to Bing/Yandex.
    // In CI (INDEXNOW_REQUIRED=1) a missing key is now a hard failure.
    const message = "IndexNow: missing INDEXNOW_KEY"
    if (process.env.INDEXNOW_REQUIRED === "1") {
      console.error(`${message} (required)`)
      process.exitCode = 1
      return
    }
    console.log(`${message}, skipping`)
    return
  }

  const hosts = process.env.INDEXNOW_HOSTS
    ? splitCsv(process.env.INDEXNOW_HOSTS)
    : defaultHosts

  const paths = process.env.INDEXNOW_URL_PATHS
    ? splitCsv(process.env.INDEXNOW_URL_PATHS)
    : defaultPaths

  let failed = false
  for (const host of hosts) {
    try {
      const urlList = await resolveUrls(host, paths)
      const result = await pingIndexNow(host, key, urlList)
      console.log(`IndexNow: ${host} -> ${result.status} (${urlList.length} URLs)`)
      if (result.body) {
        console.log(result.body.slice(0, 500))
      }
      // 200/202 = accepted. 403 = key file does not match the submitted key.
      if (result.status >= 300) {
        failed = true
      }
    } catch (error) {
      console.error(`IndexNow: ${host} failed`, error)
      failed = true
    }
  }

  if (failed && process.env.INDEXNOW_REQUIRED === "1") {
    process.exitCode = 1
  }
}

main()
