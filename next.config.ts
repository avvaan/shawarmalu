import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the whole site is files on a CDN, no Node process at runtime.
  output: "export",
  images: {
    // No server to optimize on request — scripts/build-images.mjs pre-renders
    // the ladder and lib/imageLoader.ts points at it.
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    imageSizes: [192, 384],
    deviceSizes: [640, 960, 1440, 1920],
  },
};

export default nextConfig;
