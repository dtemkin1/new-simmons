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

{#await data.medlinks}
	<div class="flex h-full w-full flex-col items-center justify-center p-4">
		<div class="p-4"><ProgressRing value={null} /></div>
	</div>
{:then medlinks}
	<div class="flex h-full w-full flex-col items-center justify-start p-4">
		<h2 class="h2 p-2 text-center">Medlinks</h2>
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
			<p class="pb-2 text-center">
				<a class="anchor" href="{base}/sds/directory/medlink_setup">Edit List</a>
				<!-- TODO: MAKE MEDLINK SETUP PAGE -->
			</p>
		{/if}
		<PeopleTable userData={medlinks} headers={{ name: 'Name', room: 'Room', email: 'Email' }} />
	</div>
{/await}
