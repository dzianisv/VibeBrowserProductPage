/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  outputFileTracingIncludes: {
    '/': ['./public/**/*'],
  },
  async redirects() {
    // Demo video is served from dl.agentlabs.cc, a Cloudflare Worker in front of
    // this repo's `media-v1` GitHub Release (see workers/dl-agentlabs-cdn).
    //
    // It must NOT be media.githubusercontent.com: that is the Git LFS media
    // host, and its egress is billed against the account's LFS bandwidth quota.
    // Every visitor who played a demo burned that quota, and exhausting it
    // blocks `actions/checkout` and takes deploys down. Release-asset egress is
    // explicitly unmetered. See #203 / #207.
    const MEDIA = 'https://dl.agentlabs.cc/media'
    return [
      // Short, memorable agent-setup URLs. The canonical instructions live in
      // the integration catalog; these are the links we put in posts and docs.
      {
        source: '/Claude',
        destination: '/integrations/claude-connector',
        permanent: true,
      },
      {
        source: '/Dots',
        destination: '/integrations/dots',
        permanent: true,
      },
      {
        source: '/GrokBots',
        destination: '/integrations/grokbots',
        permanent: true,
      },
      {
        source: '/muse',
        destination: '/integrations/muse-connector',
        permanent: true,
      },
      {
        source: '/OpenClaw',
        destination: '/integrations/openclaw',
        permanent: true,
      },
      {
        source: '/Hermes',
        destination: '/integrations/hermes',
        permanent: true,
      },
      {
        source: '/hermes',
        destination: '/integrations/hermes',
        permanent: true,
      },
      {
        source: '/BrowserUseModelsBenchmark',
        destination: '/blog/BrowserUseModelsBenchmark',
        permanent: true,
      },
      {
        source: '/:filename(.*\\.mp4)',
        destination: `${MEDIA}/:filename`,
        permanent: false,
      },
      {
        source: '/:filename(.*\\.webm)',
        destination: `${MEDIA}/:filename`,
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ]
  },
}

export default nextConfig
