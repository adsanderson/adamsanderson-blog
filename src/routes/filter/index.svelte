<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import HomeLink from '$lib/Components/HomeLink.svelte';
	import { page } from '$app/stores';
	import { processBlogList } from '$lib/bloglist';

	/** @type {import('$lib/types').Markdown[]} */
	export let posts = [];
	let filter;

	page.subscribe((p) => {
		filter = p.query.get('filter');
	});

	onMount(async () => {
		if (!browser) return;

		const url = `/blog.json`;
		const res = await fetch(url);
		let blogs = await res.json();
		let filter = '';

		page.subscribe((p) => {
			filter = p.query.get('filter');
		});

		blogs = processBlogList(filter, blogs);

		if (res.ok) {
			posts = blogs;
		}
	});
</script>

<svelte:head>
	<title>Devtings</title>
</svelte:head>

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
