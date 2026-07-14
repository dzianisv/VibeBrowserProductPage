import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
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
    ];
  },
};

export default nextConfig;
