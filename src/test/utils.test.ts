import { expect, test } from 'vitest';

// Example utility functions for testing
function formatSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function parseDate(dateString: string): Date | null {
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

// Unit tests for utility functions
test('formatSlug formats text correctly', () => {
  expect(formatSlug('Hello World')).toBe('hello-world');
  expect(formatSlug('Test Post! #1')).toBe('test-post-1');
  expect(formatSlug('Multiple   Spaces')).toBe('multiple-spaces');
});

test('parseDate handles valid and invalid dates', () => {
  expect(parseDate('2023-01-01')).toBeInstanceOf(Date);
  expect(parseDate('invalid-date')).toBeNull();
  expect(parseDate('2023-12-31T23:59:59Z')).toBeInstanceOf(Date);
});

test('basic math operations', () => {
  expect(2 + 2).toBe(4);
  expect(10 - 5).toBe(5);
  expect(3 * 4).toBe(12);
});