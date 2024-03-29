<!-- TODO: FOR WHEN MULTIPLE RESULTS APPEAR IN DIRECTORY -->
<script lang="ts">
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;

	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';
	import DirectoryTable from '$lib/components/DirectoryTable.svelte';

	export let data: PageData;
</script>

<div class="flex items-center justify-center h-full flex-col w-full p-4 space-y-4">
	{#await Promise.all([data.years, data.lounges, data.gras])}
		<div class="p-4"><ProgressRadial /></div>
	{:then [years, lounges, gras]}
		{#if form?.missing || form?.noFound || !form}
			<p class="p-4 px-8 m-4 mb-0">Simmons Directory is very unhappy. No results found.</p>
		{:else}
			<DirectoryTable data={form.data} />
		{/if}
		<DirectorySearch data={{ years: years, lounges: lounges, gras: gras }} />
	{/await}
</div>
