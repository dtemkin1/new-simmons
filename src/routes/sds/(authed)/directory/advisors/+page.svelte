<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import PeopleTable from '$lib/components/PeopleTable.svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

{#await data.advisors}
	<div class="flex items-center justify-center h-full flex-col w-full p-4">
		<div class="p-4"><ProgressRadial /></div>
	</div>
{:then advisors}
	<div class="flex items-center justify-start h-full flex-col w-full p-4">
		<h2 class="h2 text-center p-2">Advisors</h2>
		<p class="text-center">
			Associate Advisors are student representatives of the UAAP whose job is to help freshmen
			adjust to MIT. If you're a freshmen and have questions about anything, ranging from student
			life to academics, feel free to reach out to us!
		</p>

		{#if data.groups.includes('ADMINISTRATORS')}
			<p class="text-center pb-2">
				<a class="anchor" href="{base}/sds/directory/advisor_setup">Edit List</a>
				<!-- TODO: MAKE ADVISOR SETUP PAGE -->
			</p>
		{/if}
		<PeopleTable userData={advisors} headers={{ name: 'Name', room: 'Room', email: 'Email' }} />
	</div>
{/await}
