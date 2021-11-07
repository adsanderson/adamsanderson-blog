<script>
	export let post;
</script>

<a href="/blog/{post.title.replaceAll(' ', '_').toLowerCase()}">
	{post.title}
</a>

<span>
	{post.description}
</span>

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
