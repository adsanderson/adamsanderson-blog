import fs from 'fs';
import { xml } from "$lib/rss";
import path from 'path';

export const prerender = true;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
    const fileNames = await fs.promises.readdir('src/posts');

    const x = (await Promise.all(
        fileNames.map(async (fileName) => {
            const post = await import(`${process.cwd()}/src/posts/${fileName}?raw`)

            const data = post.metadata;

            data.slug = path.basename(fileName, '.md');
            data.content = post.default.render().html;
            // console.log(data);

            return data
        })
    ))

    const posts = x
        .filter(p => p.publishDate)
        .toSorted((a, b) => {
            return a.publishDate > b.publishDate ? -1 : 1;
        })


    const headers = {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml',
    }
    const body = xml(posts);

    return new Response(body, { headers })

}