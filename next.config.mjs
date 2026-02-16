/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/': ['./public/**/*'],
  },
}

export default nextConfig
