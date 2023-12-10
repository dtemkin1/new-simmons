<script lang="ts">
	import { VERSION } from 'svelte/compiler';

	import type { PageData } from './$types';
	export let data: PageData;
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
							{#each data.admins as admin}
								<li><span class="flex-auto">{`${admin.firstname} ${admin.lastname}`}</span></li>
							{/each}
						</ul>
					</td>
					<td>
						<a class="anchor font-bold" href="mailto:simmons-moderators@mit.edu">Moderators</a>
						<ul class="list">
							{#each data.mods as mod}
								<li><span class="flex-auto">{`${mod.firstname} ${mod.lastname}`}</span></li>
							{/each}
						</ul>
					</td>
					<td>
						<span class="font-bold">GovTracker House Committee Editors</span>
						<ul class="list">
							{#each data.housecommLeadership as housecommLeadership}
								<li>
									<span class="flex-auto"
										>{`${housecommLeadership.firstname} ${housecommLeadership.lastname}`}</span
									>
								</li>
							{/each}
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
							{#each data.financialAdmins as financialAdmin}
								<li>
									<span class="flex-auto"
										>{`${financialAdmin.firstname} ${financialAdmin.lastname}`}</span
									>
								</li>
							{/each}
						</ul>
					</td>
				</tr>
				<tr>
					<td colspan="3">
						<span class="font-bold">Technical Specifications</span><br />
						<ul class="list">
							<li><code class="code flex-auto">Svelte {VERSION}</code></li>
							<li><code class="code flex-auto">{data.version}</code></li>
							<li><code class="code flex-auto">Current Database: {data.dbName}</code></li>
						</ul>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
