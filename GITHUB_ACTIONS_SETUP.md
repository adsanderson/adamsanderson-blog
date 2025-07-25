# GitHub Actions Setup Guide

This guide explains how to configure GitHub Actions for continuous integration and deployment of your Astro blog to Cloudflare Workers.

## Overview

The workflow includes:
- **CI/CD Pipeline** (`ci-cd.yml`) - Main workflow for testing and deployment
- **Preview Deployment** (`preview.yml`) - Deploy PR previews
- **Cleanup** (`cleanup.yml`) - Clean up old artifacts and preview deployments
- **Security** (`security.yml`) - Security audits and vulnerability scanning

## Required Secrets

### 1. Cloudflare Configuration

You need to set up the following secrets in your GitHub repository:

#### Get Cloudflare API Token
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template or create custom token with:
   - Account: `Cloudflare Workers:Edit`
   - Zone: `Zone:Read` (if using custom domains)
   - Account Resources: `Include - All accounts`

#### Get Cloudflare Account ID
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your account
3. Copy the Account ID from the right sidebar

#### Set GitHub Secrets
Go to your repository → Settings → Secrets and variables → Actions → New repository secret:

```
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
```

### 2. Sentry Configuration (Optional)

```
SENTRY_DSN=https://your-sentry-dsn@sentry.io/your-project-id
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

## Workflow Details

### CI/CD Pipeline (`ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main`

**Jobs:**
1. **Unit & Component Tests** - Runs Vitest unit and component tests
2. **TypeScript & Linting** - Type checking and build verification
3. **E2E Tests** - Playwright end-to-end tests
4. **Deploy** - Deploy to Cloudflare Workers (main branch only)
5. **Notification** - Deployment status notification

**Features:**
- ✅ Parallel test execution
- ✅ Dependency caching
- ✅ Test result artifacts
- ✅ Production deployment only on main branch
- ✅ Environment-specific builds

### Preview Deployment (`preview.yml`)

**Triggers:**
- Pull requests to `main`

**Features:**
- ✅ Deploy PR previews to separate Cloudflare Workers
- ✅ Automatic PR comments with preview URLs
- ✅ Update comments on new commits

### Cleanup (`cleanup.yml`)

**Triggers:**
- PR closed events
- Weekly schedule (Sundays at 2 AM UTC)

**Features:**
- ✅ Remove preview deployments when PRs are closed
- ✅ Clean up old GitHub Actions artifacts

### Security (`security.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main`
- Weekly schedule (Mondays at 9 AM UTC)

**Features:**
- ✅ Dependency vulnerability scanning
- ✅ Security audit with `pnpm audit`
- ✅ CodeQL code analysis
- ✅ Trivy filesystem scanning

## Environment Configuration

### Production Environment

The workflow automatically sets these environment variables for production:

```yaml
NODE_ENV: production
SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
```

### Preview Environment

Preview deployments use:

```yaml
NODE_ENV: preview
SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
```

## Branch Protection

Recommended branch protection rules for `main`:

1. Go to Repository → Settings → Branches
2. Add rule for `main` branch:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Required status checks:
     - `Unit & Component Tests`
     - `TypeScript & Linting`
     - `E2E Tests`
     - `Security Audit`

## Deployment Environments

### 1. Production
- **URL:** `https://www.adamsanderson.co.uk`
- **Trigger:** Push to `main` branch
- **Environment:** `production`

### 2. Preview
- **URL:** `https://adamsanderson-blog-preview.your-subdomain.workers.dev`
- **Trigger:** Pull requests to `main`
- **Environment:** `preview`

## Customization

### Adding New Test Types

To add a new test job, add it to `.github/workflows/ci-cd.yml`:

```yaml
test-new:
  name: New Test Type
  runs-on: ubuntu-latest
  steps:
    # ... setup steps
    - name: Run new tests
      run: pnpm test:new
```

Then add it to the `needs` array in the `deploy` job:

```yaml
deploy:
  needs: [test-unit, test-lint, test-e2e, test-new]
```

### Custom Deployment Commands

Modify the deployment step in the `deploy` job:

```yaml
- name: Deploy to Cloudflare Workers
  run: |
    # Custom deployment commands
    pnpm build
    pnpm deploy --env production
```

### Notification Integration

Add Slack/Discord notifications:

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Monitoring

### Workflow Status

Monitor workflow runs:
- Repository → Actions tab
- Set up notifications for failed workflows
- Use GitHub status badges in README

### Deployment Status

Monitor deployments:
- Repository → Environments tab
- View deployment history and logs
- Set up environment protection rules

## Troubleshooting

### Common Issues

1. **Cloudflare API Token Issues**
   - Ensure token has correct permissions
   - Check Account ID is correct
   - Verify token isn't expired

2. **Test Failures**
   - Check test logs in Actions tab
   - Download test artifacts for debugging
   - Run tests locally to reproduce

3. **Build Failures**
   - Check environment variables are set
   - Verify dependencies are correct
   - Check for TypeScript errors

4. **Preview Deployment Issues**
   - Ensure preview worker name is unique
   - Check Cloudflare Workers limits
   - Verify PR permissions

### Debug Mode

Enable debug logging by adding this secret:

```
ACTIONS_STEP_DEBUG=true
```

## Security Considerations

- ✅ API tokens are stored as secrets
- ✅ Dependencies are audited regularly
- ✅ Code is scanned for vulnerabilities
- ✅ Preview deployments are cleaned up
- ✅ Artifacts are cleaned up regularly

## Performance

- ✅ Dependency caching reduces build times
- ✅ Parallel job execution
- ✅ Minimal Docker images
- ✅ Efficient artifact handling

## Next Steps

1. Set up required secrets in GitHub repository
2. Configure Cloudflare Workers for preview deployments
3. Set up branch protection rules
4. Configure notifications (Slack/Discord)
5. Monitor first deployment
6. Set up performance monitoring