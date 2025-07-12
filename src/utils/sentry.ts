import * as Sentry from "@sentry/astro";

/**
 * Utility functions for Sentry error reporting
 */

/**
 * Capture an exception with additional context
 */
export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: {
      ...context,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Capture a message with level and context
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: Record<string, any>) {
  Sentry.captureMessage(message, {
    level,
    extra: context,
  });
}

/**
 * Set user context for subsequent error reports
 */
export function setUser(user: { id?: string; email?: string; username?: string }) {
  Sentry.setUser(user);
}

/**
 * Set tags for subsequent error reports
 */
export function setTags(tags: Record<string, string>) {
  Sentry.setTags(tags);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, category?: string, level?: 'info' | 'warning' | 'error') {
  Sentry.addBreadcrumb({
    message,
    category: category || 'custom',
    level: level || 'info',
    timestamp: Date.now() / 1000,
  });
}

/**
 * Start a new span for performance monitoring
 */
export function startSpan(name: string, op: string) {
  return Sentry.startSpan({
    name,
    op,
  }, () => {
    // Span implementation
  });
}

/**
 * Wrapper for async functions to capture errors
 */
export async function withErrorCapture<T>(
  fn: () => Promise<T>,
  context?: Record<string, any>
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    captureException(error as Error, context);
    throw error;
  }
}

/**
 * Wrapper for sync functions to capture errors
 */
export function withErrorCaptureSync<T>(
  fn: () => T,
  context?: Record<string, any>
): T {
  try {
    return fn();
  } catch (error) {
    captureException(error as Error, context);
    throw error;
  }
}