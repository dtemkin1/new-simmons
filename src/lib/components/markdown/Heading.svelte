<script lang="ts">
	interface Props {
		depth: number;
		raw: string;
		children?: import('svelte').Snippet;
	}

	let { depth, raw, children }: Props = $props();
</script>

{#if depth === 1}
	<h1 class="h1">{@render children?.()}</h1>
{:else if depth === 2}
	<h2 class="h2">{@render children?.()}</h2>
{:else if depth === 3}
	<h3 class="h3">{@render children?.()}</h3>
{:else if depth === 4}
	<h4 class="h4">{@render children?.()}</h4>
{:else if depth === 5}
	<h5 class="h5">{@render children?.()}</h5>
{:else if depth === 6}
	<h6 class="h6">{@render children?.()}</h6>
{:else}
	{raw}
{/if}
