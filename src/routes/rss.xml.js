import { name, website } from '$lib/info'

const xml =
    posts => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>Devtings</title>
    <link>https://www.adamsanderson.co.uk</link>
    <description>A blog built with SvelteKit about tech and stuff!</description>
    ${posts
            .map(
                post =>
                    `
        <item>
          <title>${post.title}</title>
          <description>A blog built with SvelteKit about tech and stuff!</description>
          <link>${website}/posts/${post.slug}/</link>
          <pubDate>${new Date(post.date)}</pubDate>
          <content:encoded>${post.previewHtml} 
            <div style="margin-top: 50px; font-style: italic;">
              <strong>
                <a href="${website}/posts/${post.slug}">
                  Keep reading
                </a>
              </strong>  
            </div>
          </content:encoded>
        </item>
      `
            )
            .join('')}
  </channel>
</rss>`

export async function get() {
    const headers = {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml',
    }
    const posts = await getPosts()
    const body = xml(posts)
    return {
        headers,
        body
    }
}