<script lang="ts">
	let { post } = $props();
</script>

<li>
	<a href="/blog/{post.slug.replaceAll(' ', '_').toLowerCase()}">
		{post.title}
		{#if post.description}
			<span>
				{post.description}
			</span>
		{/if}
	</a>
</li>

<style>
	a {
		color: light-dark(var(--link), var(--color-dark));
		text-decoration: none;
		font-weight: 500;
		font-size: 1.4rem;
	}
	a:hover {
		text-decoration: underline;
		color: var(--accent);
	}
	li {
		margin: 1em 0;
	}
	span {
		font-weight: 400;
	}
</style>
