<script context="module">
	import { processBlogList } from '$lib/bloglist';

	export const prerender = true;

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, page }) {
		const url = `/blog.json`;
		const res = await fetch(url);

		if (res.ok) {
			let posts = await res.json();

			posts = processBlogList('all', posts);

			return {
				props: { posts }
			};
		}
		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	import Hero from '$lib/Components/Hero.svelte';
	import HomeLink from '$lib/Components/HomeLink.svelte';

	/** @type {import('../../lib/types').Markdown[]} */
	export let posts;
</script>

<svelte:head>
	<title>Devtings</title>
</svelte:head>

<h1>All posts</h1>

<section>
	<ol>
		{#each posts as post}
			<li>
				<HomeLink {post} />
				<pre>{post.metadata.publishDate || "unpublished"}</pre>
			</li>
		{/each}
	</ol>
</section>

<style>
	ol {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	li {
		margin: 1em 0;
	}
</style>
