<script>
	import HomeLink from '$lib/Components/HomeLink.svelte';

	let { data } = $props();
	/** @type {Record<string, unknown>[]} */
	let posts = data.posts;
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
				<pre>{post.publishDate || 'unpublished'}</pre>
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
