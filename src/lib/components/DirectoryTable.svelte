<script lang="ts">
	import { goto, preloadData } from '$app/navigation';
	import { SDS_BASE } from '$lib/config';

	export let data:
		| (
				| {
						username: string;
						lastname: string;
						firstname: string;
						title: string | null;
						room: string | null;
						year: number | null;
				  }
				| {
						username: string;
						lastname: string;
						firstname: string;
						title: string | null;
						room: string | null;
						year: number | null;
				  }
		  )[]
		| undefined;
</script>

{#if data}
	<div class="table-container">
		<table class="table table-compact table-hover table-interactive">
			<thead>
				<tr>
					<th>Last Name</th>
					<th>First Name</th>
					<th>Title</th>
					<th>Username</th>
					<th>Room</th>
					<th>Year</th>
				</tr>
			</thead>
			<tbody>
				{#each data as row}
					<tr
						on:click={() => goto(`${SDS_BASE}/directory/entry?username=${row.username ?? ''}`)}
						on:mouseenter={() =>
							preloadData(`${SDS_BASE}/directory/entry?username=${row.username ?? ''}`)}
						on:touchstart={() =>
							preloadData(`${SDS_BASE}/directory/entry?username=${row.username ?? ''}`)}
					>
						<td>{row.lastname ?? ''}</td>
						<td>{row.firstname ?? ''}</td>
						<td>{row.title ?? ''}</td>
						<td>{row.username ?? ''}</td>
						<td>{row.room ?? ''}</td>
						<td>{row.year ?? ''}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
