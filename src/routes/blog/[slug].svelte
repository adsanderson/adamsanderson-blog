<script context="module" lang="ts">
	import { base } from '$app/paths';
	import type { Markdown } from '$lib/types';

	console.log('test');

	export async function load({ page, fetch }) {
		console.log('test 222222');
		const slug = page.params.slug;
		console.log('test 222222', page, slug);
		const post = await fetch(`${base}/blog/${slug}.json`).then((r) => r.json());
		return {
			props: { post }
		};
	}
</script>

<script lang="ts">
	export let post: Markdown;
	let date = post.metadata.date.toUpperCase();
</script>

<svelte:head>
	<title>{post.metadata.title}</title>
</svelte:head>

<h1 class="title">{post.metadata.title}</h1>
<p class="info"><a href="https://github.com/zhuzilin">zhuzilin</a> {date}</p>
{@html post.content}

<style lang="css">
	h1.title {
		margin-bottom: 0;
	}
</style>
