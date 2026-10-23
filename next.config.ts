import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion", "react-icons"],
  },

  turbopack: {
    resolveAlias: {
      "@next/polyfill-module": "./src/lib/empty.ts",
      "@next/polyfill-nomodule": "./src/lib/empty.ts",
    },
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
