<script lang="ts">
	export let header: boolean;
	export let align: 'left' | 'center' | 'right' | 'justify' | 'char' | null | undefined;
</script>

{#if header}
	<th {align}><slot /></th>
{:else}
	<td {align}><slot /></td>
{/if}
