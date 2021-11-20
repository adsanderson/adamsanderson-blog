
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
    const headers = {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml',
    }
    const body = `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <title>Devtings</title>
      <link>https://www.adamsanderson.co.uk</link>
      <description>A blog built with SvelteKit about tech and stuff!</description>
    
    </channel>
    </rss>`
    return {
        headers,
        body
    }
}