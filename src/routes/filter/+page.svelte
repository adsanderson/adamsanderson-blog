<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import HomeLink from '$lib/Components/HomeLink.svelte';
	import { page } from '$app/stores';
	import { processBlogList } from '$lib/bloglist';

	export let data;
	/** @type {import('$lib/types').Markdown[]} */
	let posts = data.posts || [];
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
			posts = await res.json();
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
