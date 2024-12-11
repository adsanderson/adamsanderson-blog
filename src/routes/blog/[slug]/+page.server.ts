import { logger } from '$lib/logger';
import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';

export const prerender = true;

// export async function load({ params }) {
// 	const slug = params.slug;

// 	const post = await fetch(`${base}/blog/${slug}.json`).then((r) => r.json());

// 	return { post };
// }

/**
 * @type {import('./$types').PageServerLoad}
 */
export const load = async ({ params }) => {
	try {
		const post = await import(`../../../posts/${params.slug}.md`);

		return {
			content: render(post.default).body,
			metadata: { ...post.metadata, slug: params.post }
		};
	} catch (err) {
		logger.error(err, 'error');
		throw error(404, err as Error);
	}
};
