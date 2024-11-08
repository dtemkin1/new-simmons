<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import PeopleTable from '$lib/components/PeopleTable.svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

{#await data.officers}
	<div class="flex h-full w-full flex-col items-center justify-center p-4">
		<div class="p-4"><ProgressRing value={null} /></div>
	</div>
{:then officers}
	<div class="flex h-full w-full flex-col items-center justify-start p-4">
		<h2 class="h2 p-2 text-center">Student Officers</h2>
		{#if data.groups?.includes('ADMINISTRATORS')}
			<p class="pb-2 text-center">
				<a class="anchor" href="{base}/sds/directory/officer_setup">Edit List</a>
				<!-- TODO: MAKE OFFICER SETUP PAGE -->
			</p>
		{/if}
		<PeopleTable
			userData={officers}
			headers={{ position_text: 'Position', name: 'Name', room: 'Room', email: 'Email' }}
		/>
	</div>
{/await}
