<script lang="ts">
	import '../app.css';
	import Footer from '$lib/Components/Footer.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<main>
	{@render children?.()}
</main>

<Footer />
