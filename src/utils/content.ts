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