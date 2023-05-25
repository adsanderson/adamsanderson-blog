import { json } from '@sveltejs/kit';
import fs from 'fs';
import matter from 'gray-matter';
import { xml } from "$lib/rss";
import path from 'path';

export const prerender = true;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
    const fileNames = await fs.promises.readdir('src/posts');

    const posts = await Promise.all(
        fileNames.map(async (fileName) => {
            const doc = await fs.promises.readFile(`src/posts/${fileName}`, 'utf8')

            const { data } = matter(doc)

            data.slug = path.basename(fileName, '.md');

            return data
        })
    )

    console.log('RSS posts', posts.length)

    const headers = {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml',
    }
    const body = xml(posts);
    // Suggestion (check for correctness before using):
    // return json(body, {
    //     headers: headers
    // });
    return new Response(body, { headers })
    
}