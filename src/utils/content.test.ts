import { expect, test, describe } from 'vitest';
import { filterPostsWithPublishDate, filterPostsByTags, getAllTags, getTagCounts } from './content';

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
    const invalidTags = data.tags.filter((tag: any) => typeof tag !== 'string');
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

  describe('filterPostsWithPublishDate', () => {
    test('filters posts with valid publish dates', () => {
      const posts = [
        { data: { title: 'Post 1', pubDate: '2023-01-15' } },
        { data: { title: 'Post 2', publishDate: '2023-01-20' } },
        { data: { title: 'Post 3', date: '2023-01-25' } },
        { data: { title: 'Post 4' } }, // No date
        { data: { title: 'Post 5', pubDate: null } }, // Null date
        { data: { title: 'Post 6', pubDate: 'invalid-date' } }, // Invalid date
      ];

      const result = filterPostsWithPublishDate(posts);
      expect(result).toHaveLength(3);
      expect(result[0].data.title).toBe('Post 1');
      expect(result[1].data.title).toBe('Post 2');
      expect(result[2].data.title).toBe('Post 3');
    });

    test('returns empty array when no posts have publish dates', () => {
      const posts = [
        { data: { title: 'Post 1' } },
        { data: { title: 'Post 2', pubDate: null } },
        { data: { title: 'Post 3', pubDate: 'invalid-date' } },
      ];

      const result = filterPostsWithPublishDate(posts);
      expect(result).toHaveLength(0);
    });

    test('handles empty array', () => {
      const result = filterPostsWithPublishDate([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('filterPostsByTags', () => {
    const mockPosts = [
      { data: { title: 'Post 1', tags: ['javascript', 'typescript'] } },
      { data: { title: 'Post 2', tags: ['javascript', 'react'] } },
      { data: { title: 'Post 3', tags: ['typescript', 'testing'] } },
      { data: { title: 'Post 4', tags: ['testing', 'playwright'] } },
      { data: { title: 'Post 5', tags: ['react', 'typescript'] } },
      { data: { title: 'Post 6', tags: [] } },
      { data: { title: 'Post 7' } }, // No tags field
    ];

    test('returns all posts when no filters applied', () => {
      const result = filterPostsByTags(mockPosts, {});
      expect(result).toHaveLength(7);
    });

    test('filters posts by single included tag (OR mode)', () => {
      const result = filterPostsByTags(mockPosts, {
        include: ['javascript']
      });
      expect(result).toHaveLength(2);
      expect(result[0].data.title).toBe('Post 1');
      expect(result[1].data.title).toBe('Post 2');
    });

    test('filters posts by multiple included tags (OR mode - default)', () => {
      const result = filterPostsByTags(mockPosts, {
        include: ['javascript', 'playwright']
      });
      expect(result).toHaveLength(3);
      expect(result.map(p => p.data.title)).toContain('Post 1');
      expect(result.map(p => p.data.title)).toContain('Post 2');
      expect(result.map(p => p.data.title)).toContain('Post 4');
    });

    test('filters posts by multiple included tags (OR mode - explicit)', () => {
      const result = filterPostsByTags(mockPosts, {
        include: ['javascript', 'testing'],
        mode: 'any'
      });
      expect(result).toHaveLength(4);
    });

    test('filters posts by multiple included tags (AND mode)', () => {
      const result = filterPostsByTags(mockPosts, {
        include: ['typescript', 'react'],
        mode: 'all'
      });
      expect(result).toHaveLength(1);
      expect(result[0].data.title).toBe('Post 5');
    });

    test('filters posts by multiple included tags with no matches (AND mode)', () => {
      const result = filterPostsByTags(mockPosts, {
        include: ['javascript', 'playwright'],
        mode: 'all'
      });
      expect(result).toHaveLength(0);
    });

    test('excludes posts with specific tag', () => {
      const result = filterPostsByTags(mockPosts, {
        exclude: ['react']
      });
      expect(result).toHaveLength(5);
      expect(result.map(p => p.data.title)).not.toContain('Post 2');
      expect(result.map(p => p.data.title)).not.toContain('Post 5');
    });

    test('excludes posts with multiple tags', () => {
      const result = filterPostsByTags(mockPosts, {
        exclude: ['react', 'playwright']
      });
      expect(result).toHaveLength(4);
      expect(result.map(p => p.data.title)).toContain('Post 1');
      expect(result.map(p => p.data.title)).toContain('Post 3');
      expect(result.map(p => p.data.title)).toContain('Post 6');
      expect(result.map(p => p.data.title)).toContain('Post 7');
    });

    test('combines include and exclude filters (OR mode)', () => {
      const result = filterPostsByTags(mockPosts, {
        include: ['typescript'],
        exclude: ['react']
      });
      expect(result).toHaveLength(2);
      expect(result[0].data.title).toBe('Post 1');
      expect(result[1].data.title).toBe('Post 3');
    });

    test('combines include and exclude filters (AND mode)', () => {
      const result = filterPostsByTags(mockPosts, {
        include: ['typescript', 'javascript'],
        exclude: ['react'],
        mode: 'all'
      });
      expect(result).toHaveLength(1);
      expect(result[0].data.title).toBe('Post 1');
    });

    test('handles case-insensitive tag matching', () => {
      const result = filterPostsByTags(mockPosts, {
        include: ['JAVASCRIPT', 'TypeScript']
      });
      // Posts 1, 2, 3, and 5 all have javascript or typescript
      expect(result).toHaveLength(4);
      expect(result.map(p => p.data.title)).toContain('Post 1');
      expect(result.map(p => p.data.title)).toContain('Post 2');
      expect(result.map(p => p.data.title)).toContain('Post 3');
      expect(result.map(p => p.data.title)).toContain('Post 5');
    });

    test('handles posts without tags', () => {
      const result = filterPostsByTags(mockPosts, {
        include: ['javascript']
      });
      expect(result.map(p => p.data.title)).not.toContain('Post 6');
      expect(result.map(p => p.data.title)).not.toContain('Post 7');
    });

    test('returns empty array when no posts match filters', () => {
      const result = filterPostsByTags(mockPosts, {
        include: ['nonexistent-tag']
      });
      expect(result).toHaveLength(0);
    });

    test('complex filtering scenario', () => {
      // Include posts with (typescript OR testing) AND NOT (react OR playwright)
      const withTypescriptOrTesting = filterPostsByTags(mockPosts, {
        include: ['typescript', 'testing'],
        exclude: ['react', 'playwright'],
        mode: 'any'
      });
      expect(withTypescriptOrTesting).toHaveLength(2);
      expect(withTypescriptOrTesting[0].data.title).toBe('Post 1');
      expect(withTypescriptOrTesting[1].data.title).toBe('Post 3');
    });
  });

  describe('getAllTags', () => {
    test('returns all unique tags sorted alphabetically', () => {
      const posts = [
        { data: { tags: ['javascript', 'typescript'] } },
        { data: { tags: ['react', 'javascript'] } },
        { data: { tags: ['typescript', 'testing'] } },
      ];

      const result = getAllTags(posts);
      expect(result).toEqual(['javascript', 'react', 'testing', 'typescript']);
    });

    test('handles posts without tags', () => {
      const posts = [
        { data: { tags: ['javascript'] } },
        { data: { tags: [] } },
        { data: {} },
      ];

      const result = getAllTags(posts);
      expect(result).toEqual(['javascript']);
    });

    test('handles case-sensitive duplicates', () => {
      const posts = [
        { data: { tags: ['JavaScript', 'javascript'] } },
        { data: { tags: ['JAVASCRIPT'] } },
      ];

      const result = getAllTags(posts);
      // All three different cases should be preserved
      expect(result).toContain('JavaScript');
      expect(result).toContain('javascript');
      expect(result).toContain('JAVASCRIPT');
    });

    test('returns empty array for posts with no tags', () => {
      const posts = [
        { data: {} },
        { data: { tags: [] } },
      ];

      const result = getAllTags(posts);
      expect(result).toEqual([]);
    });

    test('handles empty posts array', () => {
      const result = getAllTags([]);
      expect(result).toEqual([]);
    });

    test('sorts tags case-insensitively', () => {
      const posts = [
        { data: { tags: ['Zebra', 'apple', 'Banana'] } },
      ];

      const result = getAllTags(posts);
      expect(result).toEqual(['apple', 'Banana', 'Zebra']);
    });
  });

  describe('getTagCounts', () => {
    test('counts tag occurrences', () => {
      const posts = [
        { data: { tags: ['javascript', 'typescript'] } },
        { data: { tags: ['javascript', 'react'] } },
        { data: { tags: ['typescript', 'testing'] } },
      ];

      const result = getTagCounts(posts);
      expect(result.get('javascript')).toBe(2);
      expect(result.get('typescript')).toBe(2);
      expect(result.get('react')).toBe(1);
      expect(result.get('testing')).toBe(1);
    });

    test('handles posts without tags', () => {
      const posts = [
        { data: { tags: ['javascript'] } },
        { data: { tags: [] } },
        { data: {} },
      ];

      const result = getTagCounts(posts);
      expect(result.get('javascript')).toBe(1);
      expect(result.size).toBe(1);
    });

    test('handles duplicate tags in same post', () => {
      const posts = [
        { data: { tags: ['javascript', 'javascript'] } },
      ];

      const result = getTagCounts(posts);
      expect(result.get('javascript')).toBe(2);
    });

    test('returns empty map for posts with no tags', () => {
      const posts = [
        { data: {} },
        { data: { tags: [] } },
      ];

      const result = getTagCounts(posts);
      expect(result.size).toBe(0);
    });

    test('handles empty posts array', () => {
      const result = getTagCounts([]);
      expect(result.size).toBe(0);
    });

    test('preserves tag case in keys', () => {
      const posts = [
        { data: { tags: ['JavaScript', 'javascript'] } },
      ];

      const result = getTagCounts(posts);
      expect(result.get('JavaScript')).toBe(1);
      expect(result.get('javascript')).toBe(1);
      expect(result.size).toBe(2);
    });
  });
});