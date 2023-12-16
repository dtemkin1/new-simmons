<!-- TODO: FOR WHEN MULTIPLE RESULTS APPEAR IN DIRECTORY -->
<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;

	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	const formData = form?.data;
	console.log(formData);

	const tableData = tableMapperValues(Object.assign([], formData), [
		'firstname',
		'lastname',
		'title',
		'username',
		'room',
		'year'
	]);
	const table: TableSource = {
		head: ['First Name', 'Last Name', 'Title', 'Username', 'Room', 'Year'],
		body: tableData
	};
</script>

<div class="flex flex-col items-center justify-center h-full">
	{#if form == null || form.data == null || form.data.length == 0}
		<p>No results found.</p>
	{:else}
		<Table source={table} />
	{/if}
</div>
