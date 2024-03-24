<script lang="ts">
	//Import local datatable components
	import ThSort from './ThSort.svelte';
	import ThFilter from './ThFilter.svelte';
	import Search from './Search.svelte';
	import RowsPerPage from './RowsPerPage.svelte';
	import RowCount from './RowCount.svelte';
	import Pagination from './Pagination.svelte';

	//Load local data
	// import data from '$lib/components/client/data';
	export let data: { head: string[]; body: string[][] };

	//Import handler from SSD
	import { DataHandler } from '@vincjo/datatables';

	//Init data handler - CLIENT
	const handler = new DataHandler(data.body, { rowsPerPage: 10 });
	const rows = handler.getRows();
	export const selected = handler.getSelected();
</script>

<div class=" overflow-x-auto space-y-2">
	<header class="flex justify-between">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>

	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				{#if data.head.length > 0}
					{#each data.head as head}
						<ThSort {handler} orderBy={head}>{head}</ThSort>
					{/each}
				{/if}
			</tr>
			<tr>
				{#if data.head.length > 0}
					{#each data.head as head}
						<ThFilter {handler} filterBy={head} />
					{/each}
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
					{#each row as cell}
						<td>
							{cell}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>
