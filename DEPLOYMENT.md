# GitHub Pages Deployment Guide

## Setup Instructions

### 1. Enable GitHub Pages
1. Go to your repository Settings → Pages
2. Under "Source", select "GitHub Actions" (not "Deploy from a branch")
3. Save the settings

### 2. Build and Deploy
The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build your Next.js app when you push to `main`
- Deploy the `out` folder to GitHub Pages

### 3. If Deploying to a Subdirectory
If your repository is NOT `username.github.io`, you need to set the basePath:

1. Update `next.config.ts`:
   ```typescript
   basePath: process.env.GITHUB_PAGES === 'true' ? '/your-repo-name' : '',
   assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/your-repo-name' : '',
   ```

2. Update `.github/workflows/deploy.yml` to set the environment variable:
   ```yaml
   - name: Build
     run: npm run build
     env:
       NODE_ENV: production
       GITHUB_PAGES: 'true'
       GITHUB_REPOSITORY_NAME: 'your-repo-name'
   ```

### 4. Manual Deployment (Alternative)
If you prefer to deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. The `out` folder contains your static site

3. If deploying to a subdirectory, you'll need to:
   - Copy the `out` folder contents to a `docs` folder, OR
   - Use GitHub Actions (recommended)

## Troubleshooting

### CSS Not Loading
- Ensure the GitHub Actions workflow is running successfully
- Check that CSS files exist in `out/_next/static/chunks/`
- Verify the basePath is set correctly if deploying to a subdirectory
- Check browser console for 404 errors on CSS files

### Build Errors
- Run `npm run build` locally to check for errors
- Ensure all dependencies are installed: `npm ci`
- Check Node.js version matches (should be 20+)

