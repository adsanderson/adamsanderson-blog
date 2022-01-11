// @ts-check

import { xml } from "$lib/rss";
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
    const fileNames = await fs.promises.readdir('src/posts');

    const posts = await Promise.all(
        fileNames.map(async (fileName) => {
            const doc = await fs.promises.readFile(`src/posts/${fileName}`, 'utf8')

            const { data } = matter(doc)

            data.slug = path.basename(fileName, '.md');

            return data
        })
    )

    const headers = {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml',
    }
    const body = xml(posts);
    return {
        headers,
        body
    }
}