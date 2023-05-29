const website = "https://www.adamsanderson.co.uk"
const feedTitle = 'Adam Sanderson - Blog';
const feedDescription = 'Thoughts, learnings, and updates from Adam Sanderson.';
const feedLink = 'https://www.adamsanderson.co.uk';
const feedLanguage = 'en-gb';
const feedUpdated = new Date();

/**
 * 
 * @param {any[]} posts 
 * @returns 
 */
export const xml =
  posts => `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${feedTitle}</title>
    <link href="${feedLink}" rel="self"/>
    <link href="${feedLink}"/>
    <id>${feedLink}</id>
    <updated>${feedUpdated.toISOString()}</updated>
    <author>
      <name>Adam Sanderson</name>
    </author>
    <subtitle>${feedDescription}</subtitle>
    <generator>JavaScript</generator>
    <language>${feedLanguage}</language>
${posts.map(
    post =>
      `    <entry>
        <title>${post.title}</title>
        <link href="${website}/blog/${post.slug}/"/>
        <id>${website}/blog/${post.slug}/</id>
        <updated>${new Date(post.publishDate).toISOString()}</updated>
        <published>${new Date(post.publishDate).toISOString()}</published>
        <content type="html"><![CDATA[${post.content}]]></content>
      </entry>`
  ).join('\n')}
  </feed>`






