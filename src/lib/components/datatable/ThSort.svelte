<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import type { Snippet } from 'svelte';
	let { handler, orderBy, children }: { handler: DataHandler; orderBy: string; children: Snippet } =
		$props();

	const sorted = handler.getSort();
</script>

<th onclick={() => handler.sort(orderBy)} class="cursor-pointer select-none">
	<div class="flex h-full items-center justify-start gap-x-2">
		{@render children()}
		{#if $sorted.identifier === orderBy}
			{#if $sorted.direction === 'asc'}
				🡡
			{:else if $sorted.direction === 'desc'}
				🡣
			{/if}
		{:else}
			↕️
		{/if}
	</div>
</th>
