# GitHub Actions Workflows

This repository uses GitHub Actions for automated building, testing, and deployment of banner assets.

The active banner campaign lives in the `CGNH26237/` directory, and the workflows
build from there.

## 🔄 Workflows

### 1. **Deploy** (`deploy.yml`)

**Triggers**: Push to `main`/`master`, manual dispatch

- Builds banner project using Vite
- Generates review page
- Deploys to GitHub Pages
- Validates template build system

### 2. **PR Preview** (`pr-preview.yml`)

**Triggers**: Pull requests to `main`/`master`

- Builds banners for preview
- Creates deployment ZIP files
- Uploads artifacts for download
- Posts preview links in PR comments

### 3. **Release** (`release.yml`)

**Triggers**: Git tags (`v*`), manual dispatch

- Creates production-ready banner packages
- Generates comprehensive release archives
- Publishes GitHub releases with downloadable assets

## 📁 Artifacts Generated

### Development Artifacts (PR Preview)

- `pr-{number}-review` - Review site for banner preview
- `pr-{number}-deploy` - Individual banner ZIP files

### Release Artifacts

- `{project-name}-deployment.zip` - Ready-to-upload banner files
- `{project-name}-release.zip` - Complete release package

## 🚀 Setup Instructions

### 1. Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Set source to **GitHub Actions**
3. (Optional) Configure custom domain in repository variables as `CUSTOM_DOMAIN`

### 2. Repository Permissions

Ensure the repository has:

- **Actions**: Enabled
- **Pages**: Enabled
- **Workflow permissions**: Read and write permissions

### 3. Manual Deployment

You can manually trigger deployments:

```bash
# Via GitHub UI: Actions → Build and Deploy Banners → Run workflow
# Via GitHub CLI:
gh workflow run deploy.yml
```

### 4. Creating Releases

```bash
# Create and push a tag
git tag v1.0.0
git push origin v1.0.0

# Or manually via GitHub UI: Actions → Create Release → Run workflow
```

## 🔧 Workflow Configuration

### Repository Variables (Optional)

- `CUSTOM_DOMAIN` - Custom domain for GitHub Pages

### Secrets Used

- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

## 📊 Build Process

Each workflow follows this process:

1. **Checkout** code
2. **Setup** Node.js 18
3. **Install** dependencies (`npm install` in `CGNH26237/`)
4. **Process** banner templates (`npm run process-templates`)
5. **Build** using Vite (`npm run build`)
6. **Generate** review page (`npm run review`)
7. **Create** deployment assets (`npm run deploy`)
8. **Deploy** or upload artifacts

## 🛠 Troubleshooting

### Build Failures

- Check Node.js version compatibility
- Verify `package-lock.json` is committed
- Ensure all dependencies are listed in `package.json`

### Deployment Issues

- Verify GitHub Pages is enabled
- Check repository permissions
- Confirm workflow permissions are set to "Read and write"

### Missing Artifacts

- Check workflow run logs
- Verify artifact retention settings
- Ensure upload steps completed successfully
