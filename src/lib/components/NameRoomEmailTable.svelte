<script lang="ts">
	import { goto, preloadData } from '$app/navigation';
	import { SDS_BASE } from '$lib/config';

	export let data: {
		position_text?: string | null;
		username: string | null;
		name: string | null;
		room: string | null;
		email: string | null;
	}[];

	const position_text = data.some((row) => row.position_text);
</script>

<div class="table-container">
	<table class="table table-compact table-hover table-interactive">
		<thead>
			<tr>
				{#if position_text}
					<th>Position Text</th>
				{/if}
				<th>Name</th>
				<th>Room</th>
				<th>Email</th>
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
					{#if position_text}
						<td>{row.position_text ?? ''}</td>
					{/if}
					<td>{row.name ?? ''}</td>
					<td>{row.room ?? ''}</td>
					<td>{row.email ?? ''}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
