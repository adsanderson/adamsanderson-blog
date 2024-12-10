<script>
	import { logger } from '$lib/logger';
	let { data } = $props();

	/**
	 * @type {import('$lib/types').Markdown}
	 */
	let post = data;
	logger.info(post, 'POST in component');
</script>

<svelte:head>
	<title>{post.metadata.title}</title>
</svelte:head>

<article>
	<h1 class="title">{post.metadata.title}</h1>
	<h2 class="subtitle">{post.metadata.description}</h2>
	{@html post.content}
</article>

<style>
	.title {
		font-weight: 300;
		font-size: 4rem;
		line-height: 1.48em;
	}
	.subtitle {
		font-weight: 300;
		border-bottom: 2px solid var(--accent);
		display: inline-block;
		padding-bottom: 1rem;
		margin: 0 0 3rem;
	}
	article {
		max-width: 740.592px;
		margin: 0 auto;
		line-height: 1.48em;
	}
	article :global(a) {
		color: var(--rust);
	}
	article :global(a:hover) {
		color: var(--accent);
	}
</style>
