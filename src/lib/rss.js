const website = "https://www.adamsanderson.co.uk"
/**
 * 
 * @param {any[]} posts 
 * @returns 
 */
export const xml =
    posts => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title>Devtings</title>
  <link>${website}</link>
  <description>A blog built with SvelteKit about tech and stuff!</description>
${posts.map(
        post =>
            `<item>
        <title>${post.title}</title>
        <description>A blog built with SvelteKit about tech and stuff!</description>
        <link>${website}/posts/${post.slug}/</link>
        <pubDate>${new Date(post.publishDate)}</pubDate>
        <content:encoded>
            ${post.content}           
        </content:encoded>
      </item>
    `
    ).join('')}
</channel>
</rss>`