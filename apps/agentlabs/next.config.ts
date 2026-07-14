import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(import.meta.dirname, "../.."),
  outputFileTracingIncludes: {
    '/*': ['../../blog/**/*.md'],
  },
  experimental: {
    externalDir: true,
  },
  async redirects() {
    return [
      {
        source: "/opencode",
        destination: "https://opencode.agentlabs.cc",
        permanent: true,
      },
      {
        source: "/agentprobe",
        destination: "/a-test",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
