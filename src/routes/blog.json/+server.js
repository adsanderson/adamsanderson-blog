import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	const fileNames = await fs.promises.readdir('src/posts');

	const blogs = await Promise.all(
		fileNames.map(async (fileName) => {
			const doc = await fs.promises.readFile(`src/posts/${fileName}`, 'utf8');

			const { data } = matter(doc);

			data.slug = path.basename(fileName, '.md');

			return data;
		})
	);

	return new Response(JSON.stringify(blogs));
}
