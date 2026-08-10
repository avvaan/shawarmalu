import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
  },
  async redirects() {
    return [{ source: "/", destination: "/ru", permanent: false }];
  },
};

export default nextConfig;
