<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<blockquote class="blockquote">{@render children?.()}</blockquote>
