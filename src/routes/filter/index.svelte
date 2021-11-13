<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import Hero from '$lib/Components/Hero.svelte';
	import HomeLink from '$lib/Components/HomeLink.svelte';
	import { page } from '$app/stores';

	/** @type {import('$lib/types').Markdown[]} */
	export let posts = [];
	let filter;

	page.subscribe((p) => {
		filter = p.query.get('filter');
	});

	onMount(async () => {
		if (!browser) return;

		const url = `/blog.json?filter=${filter}`;
		const res = await fetch(url);

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
