<script lang="ts">
	import { goto, preloadData } from '$app/navigation';
	import { SDS_BASE } from '$lib/config';

	interface Props {
		userData?: {
			username?: string | null;
			[x: string]: string | number | null | undefined;
		}[];
		headers: Record<string, string>;
	}

	let { userData, headers }: Props = $props();

	let preloadUserEntry = (username: string) => {
		preloadData(`${SDS_BASE}/directory/entry?username=${username}`);
	};

	let dataToUse = Object.entries(headers);
</script>

{#if userData}
	<div class="table-wrap">
		<table class="table">
			<thead>
				<tr>
					{#each dataToUse as [key, value] (key)}
						<th>{value}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="[&>tr]:hover:preset-tonal-primary">
				{#each userData as row (row.username)}
					<tr
						onclick={() => goto(`${SDS_BASE}/directory/entry?username=${row.username ?? ''}`)}
						onmouseenter={() => preloadUserEntry(row.username ?? '')}
						ontouchstart={() => preloadUserEntry(row.username ?? '')}
						class="cursor-pointer"
					>
						{#each dataToUse as [key, _value] (key)}
							<td>{row[key] ?? ''}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
