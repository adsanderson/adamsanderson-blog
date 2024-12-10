import { logger } from '$lib/logger';
import { error } from '@sveltejs/kit';

export const prerender = true;

// export async function load({ params }) {
// 	const slug = params.slug;

// 	const post = await fetch(`${base}/blog/${slug}.json`).then((r) => r.json());

// 	return { post };
// }

/**
 * @type {import('./$types').PageLoad}
 */
export const load = async ({ params }) => {
	try {
		logger.info(params, 'params~~~~~~');
		const post = await import(`../../../posts/${params.slug}.md`);

		logger.info(post, 'post~~~~~~');
		return {
			content: post.default.render().html,
			metadata: { ...post.metadata, slug: params.post }
		};
	} catch (err) {
		throw error(404, err);
	}
};
