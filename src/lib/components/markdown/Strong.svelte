<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<strong class="font-bold">{@render children?.()}</strong>
