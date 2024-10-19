<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="table-container"><table class="table">{@render children?.()}</table></div>
