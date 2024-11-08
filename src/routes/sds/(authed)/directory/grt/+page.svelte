<script lang="ts">
	import type { PageData } from './$types';

	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import PeopleTable from '$lib/components/PeopleTable.svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

{#await data.gras}
	<div class="flex h-full w-full flex-col items-center justify-center p-4">
		<div class="p-4"><ProgressRing value={null} /></div>
	</div>
{:then gras}
	<div class="flex h-full w-full flex-col items-center justify-start p-4">
		<h2 class="h2 p-2 text-center">Simmons GRAs</h2>
		<PeopleTable userData={gras} headers={{ name: 'Name', room: 'Room', email: 'Email' }} />
	</div>
{/await}
