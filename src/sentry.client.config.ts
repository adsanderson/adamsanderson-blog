import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  environment: import.meta.env.NODE_ENV || 'development',
  
  // Performance monitoring
  tracesSampleRate: 1.0,
  
  // Session replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Additional client-side configuration
  beforeSend(event, hint) {
    // Filter out development errors or add custom logic
    if (import.meta.env.DEV) {
      console.log('Sentry event:', event);
      console.log('Sentry hint:', hint);
    }
    return event;
  },
  
  // Capture unhandled promise rejections
  captureUnhandledRejections: true,
  
  // Set user context
  initialScope: {
    tags: {
      component: "astro-client"
    }
  },
  
  integrations: [
    Sentry.replayIntegration({
      // Capture 10% of all sessions,
      // plus 100% of sessions with an error
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});