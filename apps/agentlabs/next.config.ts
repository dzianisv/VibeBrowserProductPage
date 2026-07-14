import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
  outputFileTracingIncludes: {
    '/*': ['../../blog/**/*.md'],
  },
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
