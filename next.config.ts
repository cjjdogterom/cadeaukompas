import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Het dashboard leest ops-bestanden van schijf; neem ze mee in de serverbundel.
  outputFileTracingIncludes: {
    "/admin": ["./ops/**/*", "./.claude/agents/*.md", "./data/products.json"],
  },
  partialPrefetching: true,
  // Productfoto's uit de bol Marketing Catalog API.
  images: { remotePatterns: [{ protocol: "https", hostname: "media.s-bol.com" }] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
