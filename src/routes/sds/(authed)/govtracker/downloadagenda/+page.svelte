<script lang="ts">
	import type { PageData } from './$types';

	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';
	import PeopleTable from '$lib/components/PeopleTable.svelte';

	import { getContext } from 'svelte';
	import type { ActionResult } from '@sveltejs/kit';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="flex h-full w-full flex-col items-center justify-center space-y-4 p-4">
	{#await data.meetingagenda}
		<ProgressRing value={null} />
	{:then meetingagenda}
		<h1 class="h1">Simmons Government Online</h1>
		{#if meetingagenda.length != 1}
			<h3 class="h3">No meeting information</h3>
			<p class="font-bold">
				The House Chair has not yet closed the agenda for the upcoming meeting.
			</p>
		{:else}{/if}
	{/await}
</div>
