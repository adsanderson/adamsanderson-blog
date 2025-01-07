import { error } from '@sveltejs/kit';
import { processBlogList } from '$lib/bloglist';
import { dev } from '$app/environment';

// export const prerender = true;
export const csr = dev;

/** @type {import('@sveltejs/kit').Load} */
export async function load({ fetch, setHeaders }) {
	const url = `/blog.json`;
	const res = await fetch(url);

	if (res.ok) {
		setHeaders({
			'Cache-Control': `s-maxage=${30 * 24 * 60 * 60}, public`
		});
		let posts = await res.json();

		posts = processBlogList('published', posts);

		return { posts };
	}
	throw error(500, `Could not load ${url}`);
}
