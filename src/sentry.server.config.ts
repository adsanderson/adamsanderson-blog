import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  
  // Performance monitoring
  tracesSampleRate: 1.0,
  
  // Server-side configuration
  beforeSend(event, hint) {
    // Filter out development errors or add custom logic
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry event:', event);
      console.log('Sentry hint:', hint);
    }
    return event;
  },
  
  // Set server context
  initialScope: {
    tags: {
      component: "astro-server",
      runtime: "cloudflare-workers"
    }
  },
  
  // Cloudflare Workers specific configuration
  integrations: [
    // Add Cloudflare Workers specific integrations if needed
  ],
});