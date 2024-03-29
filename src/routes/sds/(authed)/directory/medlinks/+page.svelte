<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	export let data: PageData;

	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import NameRoomEmailTable from '$lib/components/NameRoomEmailTable.svelte';
</script>

{#await data.medlinks}
	<div class="flex items-center justify-center h-full flex-col w-full p-4">
		<div class="p-4"><ProgressRadial /></div>
	</div>
{:then medlinks}
	<div class="flex items-center justify-start h-full flex-col w-full p-4">
		<h2 class="h2 text-center p-2">Medlinks</h2>
		<p class="text-center">
			Medlinks serve as liaisons between undergraduate students and MIT Medical. They can answer
			questions about MIT Medical's policies and services and can help you figure out when and how
			to connect with other MIT resources. They can also provide single doses of common
			over-the-counter medications, first-aid materials, and safer-sex supplies.
		</p>
		<p class="text-center">
			To reach out to all Simmons Medlinks, email <a
				class="anchor"
				href="mailto:simmons-medlinks@mit.edu">simmons-medlinks@mit.edu</a
			>.
		</p>
		{#if data.groups.includes('ADMINISTRATORS')}
			<p class="text-center pb-2">
				<a class="anchor" href="{base}/sds/directory/medlink_setup">Edit List</a>
				<!-- TODO: MAKE MEDLINK SETUP PAGE -->
			</p>
		{/if}
		<NameRoomEmailTable data={medlinks} />
	</div>
{/await}
