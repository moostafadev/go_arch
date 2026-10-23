import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion", "react-icons"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },

  async headers() {
    const immutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];

    return [
      { source: "/logo.png", headers: immutable },
      { source: "/placeholder.svg", headers: immutable },
    ];
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
