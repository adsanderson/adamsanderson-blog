import { base } from '$app/paths';
// import { page } from '$app/stores';
// import type { Markdown } from '$lib/types';
export const prerender = true;

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ params }) {
	const tag = params.tag;
	await fetch(`${base}/tag/${tag}.json`).then((r) => r.json());
	// return {
	// 	props: { posts }
	// };
	return {
		tag: tag
	};
}
