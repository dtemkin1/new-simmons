<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<em class="italic">{@render children?.()}</em>
