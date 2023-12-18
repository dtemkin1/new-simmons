<!-- TODO: FOR WHEN MULTIPLE RESULTS APPEAR IN DIRECTORY -->
<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;

	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	let formData = form?.data.concat();

	formData = formData?.map((item) => {
		let { firstname, lastname, title, username, room, year, lounge, gra } = item;
		if (title === 'null' || title === null) {
			title = '';
		}
		return {
			firstname,
			lastname,
			title,
			username,
			room,
			year,
			lounge,
			gra
		};
	});

	if (formData == undefined) {
		formData = [];
	}

	const tableData = tableMapperValues(formData, [
		'firstname',
		'lastname',
		'title',
		'username',
		'room',
		'year'
	]);
	const table: TableSource = {
		head: ['First Name', 'Last Name', 'Title', 'Username', 'Room', 'Year'],
		body: tableData,
		meta: tableData
	};

	function onTableClick(row: CustomEvent<string[]>) {
		const username = row.detail[3];
		goto(`${base}/sds/directory/entry/${username}`);
	}
</script>

<div class="flex items-center justify-center h-full">
	{#if form == null || form.data == null || form.data.length == 0}
		<p>No results found.</p>
	{:else}
		<Table interactive={true} source={table} on:selected={onTableClick} />
	{/if}
</div>
