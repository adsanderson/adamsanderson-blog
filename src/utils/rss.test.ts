import { expect, test, describe } from 'vitest';

// Extract utility functions from RSS logic for testing
function extractPostDate(post: any): Date | null {
  const dateValue = post.data.pubDate || post.data.publishDate || post.data.date;
  if (!dateValue) return null;
  return new Date(dateValue);
}

function hasValidDate(post: any): boolean {
  const dateValue = post.data.pubDate || post.data.publishDate || post.data.date;
  return !!dateValue;
}

function sortPostsByDate(posts: any[]): any[] {
  return posts.sort((a, b) => {
    const dateA = extractPostDate(a);
    const dateB = extractPostDate(b);
    if (!dateA || !dateB) return 0;
    return dateB.getTime() - dateA.getTime();
  });
}

function transformPostToRssItem(post: any): any {
  return {
    title: post.data.title,
    description: post.data.description || "",
    link: `/blog/${post.id}/`,
    pubDate: extractPostDate(post),
    content: post.body || "",
  };
}

describe('RSS Utility Functions', () => {
  describe('extractPostDate', () => {
    test('extracts pubDate when available', () => {
      const post = {
        data: {
          pubDate: '2023-01-15',
          publishDate: '2023-01-10',
          date: '2023-01-05'
        }
      };
      const result = extractPostDate(post);
      expect(result).toEqual(new Date('2023-01-15'));
    });

    test('falls back to publishDate when pubDate unavailable', () => {
      const post = {
        data: {
          publishDate: '2023-01-10',
          date: '2023-01-05'
        }
      };
      const result = extractPostDate(post);
      expect(result).toEqual(new Date('2023-01-10'));
    });

    test('falls back to date when both pubDate and publishDate unavailable', () => {
      const post = {
        data: {
          date: '2023-01-05'
        }
      };
      const result = extractPostDate(post);
      expect(result).toEqual(new Date('2023-01-05'));
    });

    test('returns null when no date fields available', () => {
      const post = {
        data: {
          title: 'Test Post'
        }
      };
      const result = extractPostDate(post);
      expect(result).toBeNull();
    });
  });

  describe('hasValidDate', () => {
    test('returns true when post has pubDate', () => {
      const post = { data: { pubDate: '2023-01-15' } };
      expect(hasValidDate(post)).toBe(true);
    });

    test('returns true when post has publishDate', () => {
      const post = { data: { publishDate: '2023-01-15' } };
      expect(hasValidDate(post)).toBe(true);
    });

    test('returns true when post has date', () => {
      const post = { data: { date: '2023-01-15' } };
      expect(hasValidDate(post)).toBe(true);
    });

    test('returns false when post has no date fields', () => {
      const post = { data: { title: 'Test Post' } };
      expect(hasValidDate(post)).toBe(false);
    });
  });

  describe('sortPostsByDate', () => {
    test('sorts posts by date descending (newest first)', () => {
      const posts = [
        { data: { pubDate: '2023-01-10' }, id: 'post1' },
        { data: { pubDate: '2023-01-15' }, id: 'post2' },
        { data: { pubDate: '2023-01-05' }, id: 'post3' }
      ];

      const sorted = sortPostsByDate(posts);
      expect(sorted[0].id).toBe('post2'); // 2023-01-15
      expect(sorted[1].id).toBe('post1'); // 2023-01-10
      expect(sorted[2].id).toBe('post3'); // 2023-01-05
    });

    test('handles mixed date field types', () => {
      const posts = [
        { data: { date: '2023-01-10' }, id: 'post1' },
        { data: { pubDate: '2023-01-15' }, id: 'post2' },
        { data: { publishDate: '2023-01-20' }, id: 'post3' }
      ];

      const sorted = sortPostsByDate(posts);
      expect(sorted[0].id).toBe('post3'); // 2023-01-20
      expect(sorted[1].id).toBe('post2'); // 2023-01-15
      expect(sorted[2].id).toBe('post1'); // 2023-01-10
    });
  });

  describe('transformPostToRssItem', () => {
    test('transforms post to RSS item format', () => {
      const post = {
        data: {
          title: 'Test Post',
          description: 'Test Description',
          pubDate: '2023-01-15'
        },
        id: 'test-post',
        body: 'Post content'
      };

      const result = transformPostToRssItem(post);
      expect(result).toEqual({
        title: 'Test Post',
        description: 'Test Description',
        link: '/blog/test-post/',
        pubDate: new Date('2023-01-15'),
        content: 'Post content'
      });
    });

    test('handles missing description and content', () => {
      const post = {
        data: {
          title: 'Test Post',
          pubDate: '2023-01-15'
        },
        id: 'test-post'
      };

      const result = transformPostToRssItem(post);
      expect(result.description).toBe('');
      expect(result.content).toBe('');
    });
  });
});