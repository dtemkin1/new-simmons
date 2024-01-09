<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	export let data: PageData;

	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	async function generateOfficerData(advisorPromiseData: typeof data.advisors) {
		const advisorData = (await advisorPromiseData).map((item) => {
			let { username, name, room, phone, email } = item;
			if (username == null) {
				username = '';
			}
			if (name == null) {
				name = '';
			}
			if (room == null) {
				room = '';
			}
			if (phone == null) {
				phone = '';
			}
			if (email == null) {
				email = '';
			}

			return {
				username,
				name,
				room,
				phone,
				email
			};
		});

		const tableData = tableMapperValues(advisorData, ['name', 'room', 'email']);
		const metaData = tableMapperValues(advisorData, ['username']);

		return {
			head: ['Name', 'Room', 'Email'],
			body: tableData,
			meta: metaData
		} satisfies TableSource;
	}
	function onTableClick(row: CustomEvent<string[]>) {
		const username = row.detail[0];
		goto(`${base}/sds/directory/entry?username=${username}`);
	}
</script>

{#await generateOfficerData(data.advisors)}
	<div class="flex items-center justify-center h-full flex-col w-full p-4">
		<div class="p-4"><ProgressRadial /></div>
	</div>
{:then table}
	<div class="flex items-center justify-start h-full flex-col w-full p-4">
		<h2 class="h2 text-center p-2">Advisors</h2>
		<p class="text-center">
			Associate Advisors are student representatives of the UAAP whose job is to help freshmen
			adjust to MIT. If you're a freshmen and have questions about anything, ranging from student
			life to academics, feel free to reach out to us!
		</p>

		{#if data.session?.user?.groups?.includes('ADMINISTRATORS')}
			<p class="text-center pb-2">
				<a class="anchor" href="{base}/sds/directory/advisor_setup">Edit List</a>
				<!-- TODO: MAKE ADVISOR SETUP PAGE -->
			</p>
		{/if}
		<Table class="table-compact" interactive={true} source={table} on:selected={onTableClick} />
	</div>
{/await}
