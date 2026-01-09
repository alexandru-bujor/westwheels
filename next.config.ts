import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export', // Enable static export for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // If deploying to a subdirectory (e.g., username.github.io/repo-name)
  // Uncomment and set your repository name:
  // basePath: '/frontwest',
  // assetPrefix: '/frontwest',
  trailingSlash: true, // Recommended for GitHub Pages
};

export default nextConfig;
