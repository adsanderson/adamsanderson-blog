const website = "https://www.adamsanderson.co.uk"
/**
 * 
 * @param {any[]} posts 
 * @returns 
 */
export const xml =
  posts => `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">

  <title>Example Feed</title>
  <link href="https://adamsanderson.co.uk/"/>
  <updated>2022-05-21T18:30:02Z</updated>
  <author>
    <name>Adam Sanderson</name>
  </author>
  <id>adamsanderson.co.uk</id>
${posts.map(
    post =>
      `    <entry>
      <title>${post.title}</title>
      <link href="${website}/blog/${post.slug}/"/>
      <id>${website}/blog/${post.slug}/</id>
      <updated>${new Date(post.publishDate).toUTCString()}</updated>
      <content>${post.content}</content>
    </entry>`
  ).join('')}
  </feed>`






