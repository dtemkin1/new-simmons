<!-- TODO: FOR WHEN MULTIPLE RESULTS APPEAR IN DIRECTORY -->
<script lang="ts">
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;

	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';
	import PeopleTable from '$lib/components/PeopleTable.svelte';

	export let data: PageData;
</script>

<div class="flex items-center justify-center h-full flex-col w-full p-4 space-y-4">
	{#await Promise.all([data.years, data.lounges, data.gras])}
		<div class="p-4"><ProgressRadial /></div>
	{:then [years, lounges, gras]}
		{#if form?.missing || form?.noFound || !form || !form.data || form.data.length === 0}
			<p class="p-4 px-8 m-4 mb-0">Simmons Directory is very unhappy. No results found.</p>
		{:else}
			<PeopleTable
				userData={form.data}
				headers={{
					lastname: 'Last Name',
					firstname: 'First Name',
					title: 'Title',
					username: 'Username',
					room: 'Room',
					year: 'Year'
				}}
			/>
		{/if}
		<DirectorySearch data={{ years: years, lounges: lounges, gras: gras }} />
	{/await}
</div>
