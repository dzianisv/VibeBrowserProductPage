/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  outputFileTracingIncludes: {
    '/': ['./public/**/*'],
  },
  async redirects() {
    const GH_MEDIA = 'https://media.githubusercontent.com/media/dzianisv/VibeBrowserProductPage/main/public'
    return [
      {
        source: '/BrowserUseModelsBenchmark',
        destination: '/blog/BrowserUseModelsBenchmark',
        permanent: true,
      },
      {
        source: '/:filename(.*\\.mp4)',
        destination: `${GH_MEDIA}/:filename`,
        permanent: false,
      },
      {
        source: '/:filename(.*\\.webm)',
        destination: `${GH_MEDIA}/:filename`,
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
