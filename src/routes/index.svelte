<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const url = `/blog.json`;
		const res = await fetch(url);
		console.log('res', res);
		if (res.ok) {
			const posts = await res.json();
			console.log('posts', { posts });
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
	import { page } from '$app/stores';
	import Hero from '$lib/Hero.svelte';
	import HomeLink from '$lib/Components/HomeLink.svelte';

	/** @type {import('../lib/types').Markdown[]} */
	export let posts;
	// console.log(JSON.stringify(blogs[0]))
	const tagSet = new Set();
	// posts.forEach((post) => {
	// 	post.tags.forEach((tag) => tagSet.add(tag));
	// });
	const tags = [...tagSet].sort();
	// export let tag;
	// page.subscribe(({ query }) => {
	// 	tag = query.get('tag');
	// 	// console.log({ tag })
	// });
	// $: blogsFilteredByTag = tagSet.has(tag) ? posts.filter((p) => p.tags.includes(tag)) : posts;
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
		margin: 1rem 0;
	}
</style>
