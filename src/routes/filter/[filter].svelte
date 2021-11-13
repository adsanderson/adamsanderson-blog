<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, page }) {
		const filter = page.params.filter;
		const url = `/blog.json?filter=${filter}`;
		const res = await fetch(url);

		if (res.ok) {
			const posts = await res.json();
			// console.log('posts', { posts });
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

	/** @type {import('$lib/types').Markdown[]} */
	export let posts;
</script>

<svelte:head>
	<title>Devtings</title>
</svelte:head>

<Hero />

<section>
	<ol>
		{#each posts as post}
			<li>
				<HomeLink {post} />
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
