import fs from 'node:fs';
import he from 'he';
import { xml } from '$lib/rss';
import path from 'node:path';
import matter from 'gray-matter';
import { mdToHtml } from '../../lib/mdToHtml';
import { trace } from '@opentelemetry/api';

export const prerender = true;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	const tracer = trace.getTracer('default');
	const span = tracer.startSpan('GET request handler');

	try {
		span.addEvent('Reading directory');
		const fileNames = await fs.promises.readdir('src/posts');
		span.addEvent('Directory read', { fileNames });

		const x = await Promise.all(
			fileNames.map(async (fileName) => {
				const fileSpan = tracer.startSpan('Processing file', { parent: span });
				try {
					fileSpan.addEvent('Reading file', { fileName });
					const doc = await fs.promises.readFile(`src/posts/${fileName}`, 'utf8');
					fileSpan.addEvent('File read', { fileName });

					fileSpan.addEvent('Parsing front matter', { fileName });
					const { data, content } = matter(doc);
					fileSpan.addEvent('Front matter parsed', { data });

					data.slug = path.basename(fileName, '.md');
					data.content = he.encode((await mdToHtml(content.toString())).value);
					fileSpan.addEvent('Content processed', { data });

					return data;
				} finally {
					fileSpan.end();
				}
			})
		);

		span.addEvent('Filtering and sorting posts');
		const posts = x
			.filter((p) => p.publishDate)
			.toSorted((a, b) => {
				return a.publishDate > b.publishDate ? -1 : 1;
			});
		span.addEvent('Posts filtered and sorted', { posts });

		const headers = {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		};
		const body = xml(posts);
		span.addEvent('XML body generated');

		return new Response(body, { headers });
	} catch (error) {
		span.recordException(error);
		throw error;
	} finally {
		span.end();
	}
}
