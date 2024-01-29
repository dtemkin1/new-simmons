<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	export let data: PageData;

	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	async function generateOfficerData(medlinkPromiseData: typeof data.medlinks) {
		const medlinkData = (await medlinkPromiseData).map((item) => {
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

{#await generateOfficerData(data.medlinks)}
	<div class="flex items-center justify-center h-full flex-col w-full p-4">
		<div class="p-4"><ProgressRadial /></div>
	</div>
{:then table}
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
		<Table class="table-compact" interactive={true} source={table} on:selected={onTableClick} />
	</div>
{/await}
