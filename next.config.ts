import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['react-scroll-parallax', '@fortawesome/react-fontawesome']
  }
};

export default nextConfig;
