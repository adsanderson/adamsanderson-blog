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
