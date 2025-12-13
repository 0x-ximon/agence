import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      pino: "pino/browser",
      "pino/lib/transport": "pino/browser",
      "thread-stream": {},
    },
  },
};

export default nextConfig;
