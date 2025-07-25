# Sentry Setup Guide

This guide explains how to configure Sentry for error monitoring and performance tracking in your Astro blog deployed on Cloudflare Workers.

## Prerequisites

1. Create a Sentry account at [sentry.io](https://sentry.io)
2. Create a new project in Sentry (choose "JavaScript" or "Astro" if available)
3. Get your DSN from the project settings

## Environment Configuration

### 1. Local Development

Create a `.env` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env
```

Add your Sentry DSN:

```env
SENTRY_DSN=https://your-sentry-dsn@sentry.io/your-project-id
NODE_ENV=development
```

### 2. Cloudflare Workers Production

Set up environment variables in Cloudflare Workers:

```bash
# Set the DSN as a secret (recommended for production)
wrangler secret put SENTRY_DSN
# Enter your DSN when prompted

# Or set as regular environment variable
wrangler env set SENTRY_DSN "https://your-sentry-dsn@sentry.io/your-project-id"
```

## Sentry Auth Token (Optional)

For advanced features like source map uploads and releases:

1. Generate a Sentry auth token:
   - Go to Sentry → Settings → Auth Tokens
   - Create a new token with `project:releases` and `project:write` scopes

2. Set the auth token locally:
   ```bash
   export SENTRY_AUTH_TOKEN=your-auth-token
   ```

3. Set in Cloudflare Workers:
   ```bash
   wrangler secret put SENTRY_AUTH_TOKEN
   ```

## Configuration Files

### Client Configuration (`src/sentry.client.config.ts`)

Handles browser-side error reporting:
- JavaScript errors
- Unhandled promise rejections
- Performance monitoring
- Session replay (10% of sessions, 100% of error sessions)

### Server Configuration (`src/sentry.server.config.ts`)

Handles server-side error reporting:
- Cloudflare Workers runtime errors
- API endpoint errors
- Performance monitoring

### Astro Integration (`astro.config.mjs`)

Automatically configures Sentry for both client and server:
- Source map generation
- Build-time integration
- Development/production environment detection

## Usage Examples

### Manual Error Reporting

```typescript
import { captureException, captureMessage } from '../utils/sentry';

// Capture an exception
try {
  // Some code that might throw
} catch (error) {
  captureException(error, {
    context: 'blog-post-rendering',
    postId: 'some-post-id',
  });
}

// Capture a message
captureMessage('User performed action', 'info', {
  userId: 'user-123',
  action: 'view-post',
});
```

### Error Boundaries

The `ErrorBoundary` component automatically captures JavaScript errors:

```astro
---
import ErrorBoundary from '../components/ErrorBoundary.astro';
---

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Performance Monitoring

```typescript
import { startSpan } from '../utils/sentry';

// Monitor performance of operations
const span = startSpan('database-query', 'db');
// ... perform operation
span.finish();
```

## Features Configured

### Error Monitoring
- ✅ JavaScript errors (client-side)
- ✅ Unhandled promise rejections
- ✅ Server-side errors (Cloudflare Workers)
- ✅ RSS feed generation errors
- ✅ Component rendering errors

### Performance Monitoring
- ✅ Core Web Vitals
- ✅ Navigation timing
- ✅ Resource loading times
- ✅ API response times

### Session Replay
- ✅ 10% of normal sessions
- ✅ 100% of error sessions
- ✅ Privacy-focused (masks text/media)

### Development Experience
- ✅ Source maps for better debugging
- ✅ Development vs production environments
- ✅ Build-time integration

## Testing the Setup

### 1. Test Client-Side Error Reporting

Add this to any page temporarily:

```astro
<script>
  // This will trigger an error and send it to Sentry
  setTimeout(() => {
    throw new Error('Test client-side error');
  }, 1000);
</script>
```

### 2. Test Server-Side Error Reporting

Add this to any `.astro` file temporarily:

```astro
---
import { captureMessage } from '../utils/sentry';

// This will send a test message to Sentry
captureMessage('Test server-side message', 'info');
---
```

### 3. Check Sentry Dashboard

1. Go to your Sentry project dashboard
2. Navigate to "Issues" to see captured errors
3. Navigate to "Performance" to see performance data
4. Navigate to "Replays" to see session recordings

## Build and Deploy

```bash
# Build with Sentry integration
pnpm build

# Deploy to Cloudflare Workers
pnpm deploy
```

## Troubleshooting

### Common Issues

1. **No errors showing in Sentry**
   - Check that `SENTRY_DSN` is set correctly
   - Verify the DSN format is correct
   - Check browser console for Sentry initialization errors

2. **Source maps not uploading**
   - Set `SENTRY_AUTH_TOKEN` environment variable
   - Ensure token has correct permissions
   - Check build output for Sentry plugin warnings

3. **Performance data not appearing**
   - Ensure `tracesSampleRate` is set > 0
   - Check that performance monitoring is enabled in Sentry project

### Debug Mode

For development, errors and events are logged to console. Check browser/server console for Sentry debug information.

## Security Considerations

- ✅ DSN is safe to expose (it's public)
- ✅ Auth tokens are kept secret
- ✅ Session replay masks sensitive data
- ✅ Error context doesn't include sensitive information
- ✅ Development errors are filtered in production

## Next Steps

1. Set up alerts in Sentry for critical errors
2. Configure issue assignment and notifications
3. Set up performance budgets and alerts
4. Implement custom error boundaries for specific components
5. Add user context for better debugging