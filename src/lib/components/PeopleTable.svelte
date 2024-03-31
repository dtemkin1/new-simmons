<script lang="ts">
	import { goto, preloadCode, preloadData } from '$app/navigation';
	import { SDS_BASE } from '$lib/config';

	export let userData: {
		username?: string | null;
		[x: string]: string | number | null | undefined;
	}[];

	export let headers: Record<keyof (typeof userData)[0], string>;

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
					on:click={() => goto(`${SDS_BASE}/directory/entry?username=${row.username ?? ''}`)}
					on:mouseenter={() => preloadUserEntry(row.username ?? '')}
					on:touchstart={() => preloadUserEntry(row.username ?? '')}
				>
					{#each dataToUse as [key, _value]}
						<td>{row[key] ?? ''}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
