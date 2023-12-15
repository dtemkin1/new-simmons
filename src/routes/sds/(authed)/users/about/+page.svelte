<script lang="ts">
	import { VERSION as svelteVersion } from 'svelte/compiler';
	import { VERSION as svelteKitVersion } from '@sveltejs/kit';

	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<div class="flex flex-col items-center p-4">
	<div class="flex flex-col items-center h-full gap-4 container self-center">
		<div class="self-center">
			<h1 class="h1 text-center">About the Simmons DB</h1>
		</div>
		<p class="text-center">
			<span class="font-bold italic">Original authors:</span>
			dramage, 2002; with bonawitz, dheera, psaindon<br />
			<span class="font-bold italic">GovTracker:</span>
			advay, 2006<br />
			<span class="font-bold italic">Simmons DB 2.0:</span>
			dtemkin, 2026
		</p>
		<table class="table-auto self-center border-separate border-spacing-4">
			<tbody class="align-top">
				<tr>
					<td>
						<a class="anchor font-bold" href="mailto:simmons-tech@mit.edu"
							>Administrators (IT Committee)</a
						>
						<ul class="list">
							{#await data.admins}
								<div class="placeholder" />
							{:then admins}
								{#each admins as admin}
									<li><span class="flex-auto">{`${admin.firstname} ${admin.lastname}`}</span></li>
								{/each}
							{/await}
						</ul>
					</td>
					<td>
						<a class="anchor font-bold" href="mailto:simmons-moderators@mit.edu">Moderators</a>
						<ul class="list">
							{#await data.mods}
								<div class="placeholder" />
							{:then mods}
								{#each mods as mod}
									<li><span class="flex-auto">{`${mod.firstname} ${mod.lastname}`}</span></li>
								{/each}
							{/await}
						</ul>
					</td>
					<td>
						<span class="font-bold">GovTracker House Committee Editors</span>
						<ul class="list">
							{#await data.housecommLeadership}
								<div class="placeholder" />
							{:then housecommLeadership}
								{#each housecommLeadership as housecommLeader}
									<li>
										<span class="flex-auto"
											>{`${housecommLeader.firstname} ${housecommLeader.lastname}`}</span
										>
									</li>
								{/each}
							{/await}
						</ul>
					</td>
				</tr>
				<tr>
					<td colspan="2" class="align-middle">
						<p class="italic">
							Want to help make the Simmons DB better?<br />
							Then join the <a class="anchor" href="mailto:simmons-tech@mit.edu">IT Committee!</a>
						</p>
					</td>
					<td>
						<span class="font-bold">GovTracker Financial Editors</span>
						<ul class="list">
							{#await data.financialAdmins}
								<div class="placeholder" />
							{:then financialAdmins}
								{#each financialAdmins as financialAdmin}
									<li>
										<span class="flex-auto"
											>{`${financialAdmin.firstname} ${financialAdmin.lastname}`}</span
										>
									</li>
								{/each}
							{/await}
						</ul>
					</td>
				</tr>
				<tr>
					<td colspan="3">
						<span class="font-bold">Technical Specifications</span><br />
						<ul class="list">
							<li><code class="code flex-auto">Svelte {svelteVersion}</code></li>
							<li><code class="code flex-auto">SvelteKit {svelteKitVersion}</code></li>
							{#await data.version then version}
								<li><code class="code flex-auto">{version}</code></li>
							{/await}
							{#await data.dbName then dbName}
								<li><code class="code flex-auto">Current Database: {dbName}</code></li>
							{/await}
						</ul>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
