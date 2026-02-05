import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/server/:path*",
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: ["**/node_modules/**", "**/.next/**", "**/.git/**"],
    };
    return config;
  },
};

export default nextConfig;
