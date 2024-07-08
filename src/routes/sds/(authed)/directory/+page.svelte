<!-- TODO: FOR WHEN MULTIPLE RESULTS APPEAR IN DIRECTORY -->
<script lang="ts">
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;
	export let data: PageData;

	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';
	import PeopleTable from '$lib/components/PeopleTable.svelte';

	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import type { ActionResult } from '@sveltejs/kit';

	const toastStore = getToastStore();

	function toastHandler(result: ActionResult) {
		let resultToast: ToastSettings;

		if (result.type == 'success') {
			resultToast = {
				message: 'Multiple users matched your query.',
				background: 'variant-filled-success'
			};
		} else if (result.type == 'failure') {
			resultToast = {
				message: 'Simmons Directory is very unhappy. No results found.',
				background: 'variant-filled-error'
			};
		} else if (result.type == 'redirect') {
			resultToast = {
				message: 'User found!',
				background: 'variant-filled-success'
			};
		} else {
			resultToast = {
				message: 'Unknown form result',
				background: 'variant-filled'
			};
		}

		toastStore.trigger(resultToast);
	}
</script>

<div class="flex items-center justify-center h-full flex-col w-full p-4 space-y-4">
	{#await Promise.all([data.years, data.lounges, data.gras])}
		<div class="p-4"><ProgressRadial /></div>
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
