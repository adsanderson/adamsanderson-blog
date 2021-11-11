<script>
	export let post;
</script>

<a href="/blog/{post.slug.replaceAll(' ', '_').toLowerCase()}">
	{post.title}
</a>

{#if post.description}
	<span>
		{post.description}
	</span>
{/if}

<style>
	a {
		color: var(--link);
		text-decoration: none;
		font-weight: 600;
		font-size: 1.4rem;
	}
	a:hover {
		text-decoration: underline;
		color: var(--accent);
	}
	span {
		color: var(--link);
		font-weight: 400;
	}
</style>
