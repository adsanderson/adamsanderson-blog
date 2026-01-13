export function filterPostsWithPublishDate(posts: any[]): any[] {
  return posts.filter(post => {
    const pubDate = post.data.pubDate;
    const publishDate = post.data.publishDate;
    const date = post.data.date;

    // Check if any date field exists and is valid
    const hasValidDate = (pubDate && !isNaN(new Date(pubDate).getTime())) ||
                        (publishDate && !isNaN(new Date(publishDate).getTime())) ||
                        (date && !isNaN(new Date(date).getTime()));

    return hasValidDate;
  });
}

export type TagFilterMode = 'any' | 'all';

export interface TagFilterOptions {
  include?: string[];
  exclude?: string[];
  mode?: TagFilterMode;
}

/**
 * Filter posts by tags with include/exclude and AND/OR logic
 * @param posts - Array of blog posts to filter
 * @param options - Filter options (include, exclude, mode)
 * @returns Filtered array of posts
 */
export function filterPostsByTags(posts: any[], options: TagFilterOptions): any[] {
  const { include = [], exclude = [], mode = 'any' } = options;

  // If no filters applied, return all posts
  if (include.length === 0 && exclude.length === 0) {
    return posts;
  }

  return posts.filter(post => {
    const postTags = post.data.tags || [];

    // Apply exclude filter first (any match excludes the post)
    if (exclude.length > 0) {
      const hasExcludedTag = exclude.some(excludeTag =>
        postTags.some((tag: string) => tag.toLowerCase() === excludeTag.toLowerCase())
      );
      if (hasExcludedTag) {
        return false;
      }
    }

    // Apply include filter
    if (include.length > 0) {
      if (mode === 'all') {
        // AND logic: post must have ALL included tags
        return include.every(includeTag =>
          postTags.some((tag: string) => tag.toLowerCase() === includeTag.toLowerCase())
        );
      } else {
        // OR logic (default): post must have ANY of the included tags
        return include.some(includeTag =>
          postTags.some((tag: string) => tag.toLowerCase() === includeTag.toLowerCase())
        );
      }
    }

    // If only exclude filter was applied and post wasn't excluded, include it
    return true;
  });
}

/**
 * Get all unique tags from a collection of posts
 * @param posts - Array of blog posts
 * @returns Array of unique tag strings, sorted alphabetically
 */
export function getAllTags(posts: any[]): string[] {
  const tagsSet = new Set<string>();

  posts.forEach(post => {
    const postTags = post.data.tags || [];
    postTags.forEach((tag: string) => {
      tagsSet.add(tag);
    });
  });

  return Array.from(tagsSet).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}

/**
 * Get tag counts from a collection of posts
 * @param posts - Array of blog posts
 * @returns Map of tag to count
 */
export function getTagCounts(posts: any[]): Map<string, number> {
  const tagCounts = new Map<string, number>();

  posts.forEach(post => {
    const postTags = post.data.tags || [];
    postTags.forEach((tag: string) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return tagCounts;
}