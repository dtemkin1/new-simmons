<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	export let data: PageData;

	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	async function generateOfficerData(officerPromiseData: typeof data.officers) {
		const officerData = (await data.officers).map((item) => {
			let { position_text, username, name, room, phone, email } = item;
			if (position_text == null) {
				position_text = '';
			}
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
				position_text,
				username,
				name,
				room,
				phone,
				email
			};
		});

		const tableData = tableMapperValues(officerData, ['position_text', 'name', 'room', 'email']);
		const metaData = tableMapperValues(officerData, ['username']);

		return {
			head: ['Position Text', 'Name', 'Room', 'Email'],
			body: tableData,
			meta: metaData
		} satisfies TableSource;
	}
	function onTableClick(row: CustomEvent<string[]>) {
		const username = row.detail[0];
		goto(`${base}/sds/directory/entry/${username}`);
	}
</script>

<div class="flex items-center justify-center h-full flex-col w-full p-4">
	{#await generateOfficerData(data.officers)}
		<div class="p-4"><ProgressRadial /></div>
	{:then table}
		<h2 class="h2 text-center p-2">Student Officers</h2>
		{#if data.session?.user.groups.includes('ADMINISTRATORS')}
			<p class="text-center pb-2">
				<a class="anchor" href="{base}/sds/directory/officer_setup">Edit List</a>
				<!-- TODO: MAKE OFFICER SETUP PAGE -->
			</p>
		{/if}
		<Table class="table-compact" interactive={true} source={table} on:selected={onTableClick} />
	{/await}
</div>
