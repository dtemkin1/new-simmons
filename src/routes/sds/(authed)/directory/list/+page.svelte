<!-- TODO: FOR WHEN MULTIPLE RESULTS APPEAR IN DIRECTORY -->
<script lang="ts">
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;

	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';

	export let data: PageData;

	let formData = form?.data.concat();

	formData = formData?.map((item) => {
		let { firstname, lastname, title, username, room, year, lounge, gra } = item;
		if (firstname == null) {
			firstname = '';
		}
		if (lastname == null) {
			lastname = '';
		}
		if (title == null) {
			title = '';
		}
		if (username == null) {
			username = '';
		}
		if (room == null) {
			room = '';
		}
		if (year == null) {
			year = '';
		}
		if (lounge == null) {
			lounge = '';
		}
		if (gra == null) {
			gra = '';
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
		'lastname',
		'firstname',
		'title',
		'username',
		'room',
		'year'
	]);
	const table: TableSource = {
		head: ['Last Name', 'First Name', 'Title', 'Username', 'Room', 'Year'],
		body: tableData,
		meta: tableData
	};

	function onTableClick(row: CustomEvent<string[]>) {
		const username = row.detail[3];
		goto(`${base}/sds/directory/entry/${username}`);
	}
</script>

<div class="flex items-center justify-center h-full flex-col">
	{#if form == null || form.data == null || form.data.length == 0}
		<p class="p-4 px-8 m-4 mb-0">No results found.</p>
	{:else}
		<Table
			class="p-4 px-8 m-4 mb-0 table-compact"
			interactive={true}
			source={table}
			on:selected={onTableClick}
		/>
	{/if}
	<DirectorySearch {data} />
</div>
