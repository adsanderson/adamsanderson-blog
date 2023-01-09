<script context="module">
	import { base } from '$app/paths';
	// import { page } from '$app/stores';
	// import type { Markdown } from '$lib/types';
	export const prerender = true;

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const tag = page.params.tag;
		await fetch(`${base}/tag/${tag}.json`).then((r) => r.json());
		// return {
		// 	props: { posts }
		// };
		return {
			props: {
				tag: tag
			}
		};
	}
</script>

<script>
	/**
	 * @type {string}
	 */
	export let tag;
</script>

<h1>{tag}</h1>
