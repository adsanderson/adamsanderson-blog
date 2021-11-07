<script context="module" lang="ts">
	import { base } from '$app/paths';
	import type { Markdown } from '$lib/types';
	export const prerender = true;
	console.log('test');

	export async function load({ page, fetch }) {
		const slug = page.params.slug;

		const post = await fetch(`${base}/blog/${slug}.json`).then((r) => r.json());

		return {
			props: { post }
		};
	}
</script>

<script lang="ts">
	export let post: Markdown;
</script>

<svelte:head>
	<title>{post.metadata.title}</title>
</svelte:head>

<h1 class="title">{post.metadata.title}</h1>

{@html post.content}
