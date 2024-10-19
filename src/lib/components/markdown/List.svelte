<script lang="ts">
	interface Props {
		ordered: boolean;
		start: number;
		children?: import('svelte').Snippet;
	}

	let { ordered, start, children }: Props = $props();
</script>

{#if ordered}
	<ol class="list-decimal list-outside ml-6 py-2" {start}>{@render children?.()}</ol>
{:else}
	<ul class="list-disc list-outside ml-6 py-2">{@render children?.()}</ul>
{/if}
