<!-- TODO: FOR WHEN MULTIPLE RESULTS APPEAR IN DIRECTORY -->
<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import { ProgressRing, type ToastContext } from '@skeletonlabs/skeleton-svelte';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';
	import PeopleTable from '$lib/components/PeopleTable.svelte';

	import { getContext } from 'svelte';
	import type { ActionResult } from '@sveltejs/kit';

	interface Props {
		form: ActionData;
		data: PageData;
	}

	let { form, data }: Props = $props();

	export const toast: ToastContext = getContext('toast');

	function toastHandler(result: ActionResult) {
		if (result.type == 'success') {
			toast.create({
				description: `${result.data?.data.length ?? 'Multiple'} users matched your query.`,
				type: 'success'
			});
		} else if (result.type == 'failure') {
			toast.create({
				description: 'Simmons Directory is very unhappy. No results found.',
				type: 'error'
			});
		} else if (result.type == 'redirect') {
			toast.create({
				description: 'User found!',
				type: 'success'
			});
		} else {
			toast.create({
				description: 'Unknown form result'
			});
		}
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center space-y-4 p-4">
	{#await Promise.all([data.years, data.lounges, data.gras])}
		<div class="p-4"><ProgressRing value={null} /></div>
	{:then [years, lounges, gras]}
		<PeopleTable
			userData={form?.data}
			headers={{
				lastname: 'Last Name',
				firstname: 'First Name',
				title: 'Title',
				username: 'Username',
				room: 'Room',
				year: 'Year'
			}}
		/>
		<DirectorySearch
			data={{ years: years, lounges: lounges, gras: gras }}
			enhanceFunc={() => {
				return async ({ result, update }) => {
					update();
					toastHandler(result);
				};
			}}
		/>
	{/await}
</div>
