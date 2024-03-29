<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import NameRoomEmailTable from '$lib/components/NameRoomEmailTable.svelte';
</script>

{#await data.gras}
	<div class="flex items-center justify-center h-full flex-col w-full p-4">
		<div class="p-4"><ProgressRadial /></div>
	</div>
{:then gras}
	<div class="flex items-center justify-start h-full flex-col w-full p-4">
		<h2 class="h2 text-center p-2">Simmons GRAs</h2>
		<NameRoomEmailTable data={gras} />
	</div>
{/await}
