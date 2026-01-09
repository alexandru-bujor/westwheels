import type { NextConfig } from "next";

// Determine basePath based on environment
// For GitHub Pages: if repo is not username.github.io, set basePath to repo name
// For local development: leave empty
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GITHUB_REPOSITORY_NAME || 'westwheels'; // Change this to your repo name if different

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
  // Set basePath only for GitHub Pages deployment (not for local builds)
  // Uncomment and set your repository name if deploying to a subdirectory:
  // basePath: isGitHubPages ? `/${repoName}` : '',
  // assetPrefix: isGitHubPages ? `/${repoName}` : '',
  trailingSlash: true, // Recommended for GitHub Pages
};

export default nextConfig;
