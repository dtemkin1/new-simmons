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

{#await data.advisors}
	<div class="flex h-full w-full flex-col items-center justify-center p-4">
		<div class="p-4"><ProgressRing value={null} /></div>
	</div>
{:then advisors}
	<div class="flex h-full w-full flex-col items-center justify-start p-4">
		<h2 class="h2 p-2 text-center">Advisors</h2>
		<p class="text-center">
			Associate Advisors are student representatives of the UAAP whose job is to help freshmen
			adjust to MIT. If you're a freshmen and have questions about anything, ranging from student
			life to academics, feel free to reach out to us!
		</p>

		{#if data.groups.includes('ADMINISTRATORS')}
			<p class="pb-2 text-center">
				<a class="anchor" href="{base}/sds/directory/advisor_setup">Edit List</a>
				<!-- TODO: MAKE ADVISOR SETUP PAGE -->
			</p>
		{/if}
		<PeopleTable userData={advisors} headers={{ name: 'Name', room: 'Room', email: 'Email' }} />
	</div>
{/await}
