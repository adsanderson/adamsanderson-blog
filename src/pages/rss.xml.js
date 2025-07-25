import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { captureException } from "../utils/sentry";

export async function GET(context) {
  try {
    const posts = await getCollection("blog");

    // Filter posts with publish dates and sort by date (newest first)
    const publishedPosts = posts
      .filter((post) => post.data.pubDate || post.data.publishDate || post.data.date)
      .sort((a, b) => {
        const dateA = new Date(a.data.pubDate || a.data.publishDate || a.data.date);
        const dateB = new Date(b.data.pubDate || b.data.publishDate || b.data.date);
        return dateB - dateA;
      });

    return rss({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      site: context.site,
      author: "Adam Sanderson",
      items: publishedPosts.map((post) => ({
        title: post.data.title,
        description: post.data.description || "",
        link: `/blog/${post.id}/`,
        pubDate: new Date(post.data.pubDate || post.data.publishDate || post.data.date),
        content: post.body || "",
        author: "Adam Sanderson"
      })),
      customData: `<generator>Astro</generator>
<author><name>Adam Sanderson</name></author>`,
    });
  } catch (error) {
    captureException(error, {
      context: 'RSS feed generation',
      postsCount: posts?.length || 0,
    });
    throw error;
  }
}
