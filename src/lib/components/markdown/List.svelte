<script lang="ts">
	export let ordered: boolean;
	export let start: number;
</script>

{#if ordered}
	<ol class="list-decimal list-outside ml-6 py-2" {start}><slot /></ol>
{:else}
	<ul class="list-disc list-outside ml-6 py-2"><slot /></ul>
{/if}
