import { expect, test, describe } from 'vitest';

// Utility functions extracted from content processing logic
function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

function validateBlogPostData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required and must be a string');
  }
  
  if (data.description && typeof data.description !== 'string') {
    errors.push('Description must be a string');
  }
  
  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('Tags must be an array');
  }
  
  if (data.tags && Array.isArray(data.tags)) {
    const invalidTags = data.tags.filter(tag => typeof tag !== 'string');
    if (invalidTags.length > 0) {
      errors.push('All tags must be strings');
    }
  }
  
  // Date validation
  const dateFields = ['pubDate', 'publishDate', 'date'];
  const hasValidDate = dateFields.some(field => {
    if (!data[field]) return false;
    const date = new Date(data[field]);
    return !isNaN(date.getTime());
  });
  
  if (!hasValidDate && (data.pubDate || data.publishDate || data.date)) {
    errors.push('Date fields must be valid dates');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function coerceDate(dateValue: any): Date | null {
  if (dateValue instanceof Date) {
    return isNaN(dateValue.getTime()) ? null : dateValue;
  }
  
  if (typeof dateValue === 'string' || typeof dateValue === 'number') {
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? null : date;
  }
  
  return null;
}

function extractBlogPostMetadata(post: any): any {
  return {
    title: post.data.title,
    description: post.data.description || null,
    pubDate: coerceDate(post.data.pubDate),
    publishDate: coerceDate(post.data.publishDate),
    date: coerceDate(post.data.date),
    tags: post.data.tags || [],
    heroImage: post.data.heroImage || null,
    slug: post.id || normalizeSlug(post.data.title || ''),
  };
}

describe('Content Processing Utilities', () => {
  describe('normalizeSlug', () => {
    test('converts text to lowercase slug', () => {
      expect(normalizeSlug('Hello World')).toBe('hello-world');
    });

    test('removes special characters', () => {
      expect(normalizeSlug('Hello, World!')).toBe('hello-world');
    });

    test('replaces multiple spaces with single hyphen', () => {
      expect(normalizeSlug('Hello    World')).toBe('hello-world');
    });

    test('removes leading and trailing hyphens', () => {
      expect(normalizeSlug('-Hello World-')).toBe('hello-world');
    });

    test('handles underscores', () => {
      expect(normalizeSlug('hello_world_test')).toBe('hello-world-test');
    });

    test('handles mixed special characters', () => {
      expect(normalizeSlug('Hello, World! & Test #1')).toBe('hello-world-test-1');
    });
  });

  describe('validateBlogPostData', () => {
    test('validates valid blog post data', () => {
      const data = {
        title: 'Test Post',
        description: 'Test Description',
        tags: ['tag1', 'tag2'],
        pubDate: '2023-01-15'
      };
      
      const result = validateBlogPostData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('requires title', () => {
      const data = {
        description: 'Test Description'
      };
      
      const result = validateBlogPostData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required and must be a string');
    });

    test('validates tags as array of strings', () => {
      const data = {
        title: 'Test Post',
        tags: ['valid', 123, 'another-valid']
      };
      
      const result = validateBlogPostData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('All tags must be strings');
    });

    test('validates date fields', () => {
      const data = {
        title: 'Test Post',
        pubDate: 'invalid-date'
      };
      
      const result = validateBlogPostData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Date fields must be valid dates');
    });
  });

  describe('coerceDate', () => {
    test('returns valid Date object unchanged', () => {
      const date = new Date('2023-01-15');
      expect(coerceDate(date)).toEqual(date);
    });

    test('converts valid date string to Date', () => {
      const result = coerceDate('2023-01-15');
      expect(result).toEqual(new Date('2023-01-15'));
    });

    test('converts timestamp to Date', () => {
      const timestamp = 1673740800000; // 2023-01-15
      const result = coerceDate(timestamp);
      expect(result).toEqual(new Date(timestamp));
    });

    test('returns null for invalid date string', () => {
      expect(coerceDate('invalid-date')).toBeNull();
    });

    test('returns null for invalid Date object', () => {
      expect(coerceDate(new Date('invalid'))).toBeNull();
    });

    test('returns null for non-date types', () => {
      expect(coerceDate({})).toBeNull();
      expect(coerceDate(null)).toBeNull();
      expect(coerceDate(undefined)).toBeNull();
    });
  });

  describe('extractBlogPostMetadata', () => {
    test('extracts complete metadata', () => {
      const post = {
        data: {
          title: 'Test Post',
          description: 'Test Description',
          pubDate: '2023-01-15',
          tags: ['tag1', 'tag2'],
          heroImage: '/hero.jpg'
        },
        id: 'test-post'
      };

      const result = extractBlogPostMetadata(post);
      expect(result).toEqual({
        title: 'Test Post',
        description: 'Test Description',
        pubDate: new Date('2023-01-15'),
        publishDate: null,
        date: null,
        tags: ['tag1', 'tag2'],
        heroImage: '/hero.jpg',
        slug: 'test-post'
      });
    });

    test('handles missing optional fields', () => {
      const post = {
        data: {
          title: 'Test Post'
        },
        id: 'test-post'
      };

      const result = extractBlogPostMetadata(post);
      expect(result.description).toBeNull();
      expect(result.tags).toEqual([]);
      expect(result.heroImage).toBeNull();
    });

    test('generates slug from title when id missing', () => {
      const post = {
        data: {
          title: 'Hello World Test!'
        }
      };

      const result = extractBlogPostMetadata(post);
      expect(result.slug).toBe('hello-world-test');
    });
  });
});