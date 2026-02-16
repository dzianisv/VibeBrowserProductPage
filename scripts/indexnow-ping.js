const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

const defaultHosts = ["vibebrowser.app", "enterprise.vibebrowser.app"]
const defaultPaths = [
  "/",
  "/teams",
  "/mcp",
  "/v2",
  "/tee",
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

async function pingIndexNow(host, key, paths) {
  const urlList = buildUrls(host, paths)
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
    console.log("IndexNow: missing INDEXNOW_KEY, skipping")
    return
  }

  const hosts = process.env.INDEXNOW_HOSTS
    ? splitCsv(process.env.INDEXNOW_HOSTS)
    : defaultHosts

  const paths = process.env.INDEXNOW_URL_PATHS
    ? splitCsv(process.env.INDEXNOW_URL_PATHS)
    : defaultPaths

  for (const host of hosts) {
    try {
      const result = await pingIndexNow(host, key, paths)
      console.log(`IndexNow: ${host} -> ${result.status}`)
      if (result.body) {
        console.log(result.body.slice(0, 500))
      }
    } catch (error) {
      console.error(`IndexNow: ${host} failed`, error)
    }
  }
}

main()
