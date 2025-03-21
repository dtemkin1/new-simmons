<script lang="ts">
	import { VERSION as svelteVersion } from 'svelte/compiler';
	import { VERSION as svelteKitVersion } from '@sveltejs/kit';
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';

	import type { PageData } from './$types';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

{#await Promise.all( [data.dbName, data.version, data.itChair, data.admins, data.mods, data.housecommLeadership, data.financialAdmins] )}
	<div class="flex h-full w-full flex-col items-center justify-center gap-4 self-center p-4">
		<div class="p-4"><ProgressRing value={null} /></div>
	</div>
{:then [dbName, version, itChair, admins, mods, housecommLeadership, financialAdmins]}
	<div class="flex h-full w-full flex-col items-center gap-4 self-center p-4">
		<div class="self-center">
			<h1 class="h1 text-center">About the Simmons DB</h1>
		</div>
		<p class="text-center">
			<span class="font-bold italic">Original authors:</span>
			dramage, 2002; with bonawitz, dheera, psaindon<br />
			<span class="font-bold italic">GovTracker:</span>
			advay 2006, wthrowe 2008<br />
			<span class="font-bold italic">Simmons DB 2.0:</span>
			dtemkin, 2026
		</p>
		<div class="flex flex-col gap-4 self-center">
			<div class="flex flex-row items-start gap-4">
				<div class="">
					<a class="anchor font-bold" href="mailto:simmons-tech@mit.edu"
						>Administrators (IT Committee)</a
					>
					<ul class="list">
						{#each admins as admin (admin.username)}
							<li>
								<span class="flex-auto"
									>{`${admin.firstname} ${admin.lastname}${
										admin.username == itChair ? ' (Committee Chair)' : ''
									}`}</span
								>
							</li>
						{/each}
					</ul>
				</div>
				<div class="">
					<a class="anchor font-bold" href="mailto:simmons-moderators@mit.edu">Moderators</a>
					<ul class="list">
						{#each mods as mod (mod.username)}
							<li><span class="flex-auto">{`${mod.firstname} ${mod.lastname}`}</span></li>
						{/each}
					</ul>
				</div>
				<div class="">
					<span class="font-bold">GovTracker House Committee Editors</span>
					<ul class="list">
						{#each housecommLeadership as housecommLeader (housecommLeader.username)}
							<li>
								<span class="flex-auto"
									>{`${housecommLeader.firstname} ${housecommLeader.lastname}`}</span
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="flex flex-row items-center gap-4">
				<div class="grow">
					<p class="italic">
						Want to help make the Simmons DB better?<br />
						Then join the <a class="anchor" href="mailto:simmons-tech@mit.edu">IT Committee!</a>
					</p>
				</div>
				<div class="grow">
					<span class="font-bold">GovTracker Financial Editors</span>
					<ul class="list">
						{#each financialAdmins as financialAdmin (financialAdmin.username)}
							<li>
								<span class="flex-auto"
									>{`${financialAdmin.firstname} ${financialAdmin.lastname}`}</span
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="flex flex-row items-start gap-4">
				<div class="basis-full">
					<span class="font-bold">Technical Specifications</span><br />
					<ul class="list">
						<li><code class="code flex-auto">Svelte {svelteVersion}</code></li>
						<li><code class="code flex-auto">SvelteKit {svelteKitVersion}</code></li>
						<li>
							<code class="code flex-auto">{version}</code>
						</li>
						<li>
							<code class="code flex-auto">Current Database: {dbName}</code>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
{/await}
