<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	export let data: PageData;

	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import NameRoomEmailTable from '$lib/components/NameRoomEmailTable.svelte';
</script>

{#await data.officers}
	<div class="flex items-center justify-center h-full flex-col w-full p-4">
		<div class="p-4"><ProgressRadial /></div>
	</div>
{:then officers}
	<div class="flex items-center justify-start h-full flex-col w-full p-4">
		<h2 class="h2 text-center p-2">Student Officers</h2>
		{#if data.groups?.includes('ADMINISTRATORS')}
			<p class="text-center pb-2">
				<a class="anchor" href="{base}/sds/directory/officer_setup">Edit List</a>
				<!-- TODO: MAKE OFFICER SETUP PAGE -->
			</p>
		{/if}
		<NameRoomEmailTable data={officers} />
	</div>
{/await}
