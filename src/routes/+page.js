import { error } from '@sveltejs/kit';
import { processBlogList } from '$lib/bloglist';

export const prerender = true;

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ fetch, page }) {
	const url = `/blog.json`;
	const res = await fetch(url);

	if (res.ok) {
		let posts = await res.json();

		posts = processBlogList('published', posts);

		return { posts };
	}
	throw error(500, `Could not load ${url}`);
}
