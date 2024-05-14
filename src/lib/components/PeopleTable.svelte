<script lang="ts">
	import { goto, preloadData } from '$app/navigation';
	import { SDS_BASE } from '$lib/config';

	let {
		userData,
		headers
	}: {
		userData: {
			username?: string | null;
			[x: string]: string | number | null | undefined;
		}[];
		headers: Record<keyof (typeof userData)[0], string>;
	} = $props();

	let preloadUserEntry = (username: string) => {
		preloadData(`${SDS_BASE}/directory/entry?username=${username}`);
	};

	let dataToUse = Object.entries(headers);
</script>

<div class="table-container">
	<table class="table table-compact table-hover table-interactive">
		<thead>
			<tr>
				{#each dataToUse as [_key, value]}
					<th>{value}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each userData as row}
				<tr
					onclick={() => goto(`${SDS_BASE}/directory/entry?username=${row.username ?? ''}`)}
					onmouseenter={() => preloadUserEntry(row.username ?? '')}
					ontouchstart={() => preloadUserEntry(row.username ?? '')}
				>
					{#each dataToUse as [key, _value]}
						<td>{row[key] ?? ''}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
