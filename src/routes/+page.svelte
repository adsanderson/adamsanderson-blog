<script lang="ts">
	import Hero from '$lib/Components/Hero.svelte';
	import HomeLink from '$lib/Components/HomeLink.svelte';

	let { data } = $props();
	let posts = data.posts;
</script>

<svelte:head>
	<title>Devtings</title>
</svelte:head>

<Hero />

<main>
	<article aria-label="Blog Posts">
		<ol>
			{#each posts as post}
				<HomeLink {post} />
			{/each}
		</ol>
	</article>
</main>

<style>
	ol {
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>
