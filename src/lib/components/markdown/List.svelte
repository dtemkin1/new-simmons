<script lang="ts">
	export let ordered: boolean;
	export let start: number;
</script>

{#if ordered}
	<ol class="list-decimal mx-4 px-4 py-2" {start}><slot /></ol>
{:else}
	<ul class="list-disc mx-4 px-4 py-2"><slot /></ul>
{/if}
