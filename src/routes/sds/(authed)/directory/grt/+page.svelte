<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	export let data: PageData;

	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	async function generateOfficerData(graPromiseData: typeof data.gras) {
		const medlinkData = (await graPromiseData).map((item) => {
			let { username, name, room, phone, email, gra } = item;
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
			if (gra == null) {
				gra = '';
			}

			return {
				username,
				name,
				room,
				phone,
				email,
				gra
			};
		});

		const tableData = tableMapperValues(medlinkData, ['name', 'room', 'email']);
		const metaData = tableMapperValues(medlinkData, ['username']);

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

{#await generateOfficerData(data.gras)}
	<div class="flex items-center justify-center h-full flex-col w-full p-4">
		<div class="p-4"><ProgressRadial /></div>
	</div>
{:then table}
	<div class="flex items-center justify-start h-full flex-col w-full p-4">
		<h2 class="h2 text-center p-2">Simmons GRAs</h2>
		<Table class="table-compact" interactive={true} source={table} on:selected={onTableClick} />
	</div>
{/await}
