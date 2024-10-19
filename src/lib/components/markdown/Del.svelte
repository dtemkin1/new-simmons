<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<del class="del">{@render children?.()}</del>
