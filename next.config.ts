import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Bypasses cloudflare:workers type checks during Next.js Vercel builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
