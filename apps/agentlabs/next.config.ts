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
      // The agentpod.agentlabs.cc subdomain is dedicated to AgentPod Mobile:
      // send its root straight to the product page.
      {
        source: "/",
        has: [{ type: "host", value: "agentpod.agentlabs.cc" }],
        destination: "/mobile",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
