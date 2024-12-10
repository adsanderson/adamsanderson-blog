import fs from 'fs';
import he from 'he';
import { xml } from '$lib/rss';
import path from 'path';
import matter from 'gray-matter';
import { mdToHtml } from '../../lib/mdToHtml';

export const prerender = true;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	const fileNames = await fs.promises.readdir('src/posts');

	const x = await Promise.all(
		fileNames.map(async (fileName) => {
			const doc = await fs.promises.readFile(`src/posts/${fileName}`, 'utf8');

			const { data, content } = matter(doc);

			data.slug = path.basename(fileName, '.md');

			data.content = he.encode((await mdToHtml(content.toString())).value);

			return data;
		})
	);

	const posts = x
		.filter((p) => p.publishDate)
		.toSorted((a, b) => {
			return a.publishDate > b.publishDate ? -1 : 1;
		});

	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};
	const body = xml(posts);

	return new Response(body, { headers });
}
