<!-- TODO: FOR WHEN ONLY ONE RESULT IN DIRECTORY -->
<script lang="ts">
	import type { PageData } from './$types';
	import DirectoryEntry from '$lib/components/DirectoryEntry.svelte';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';
	export let data: PageData;
</script>

<div class="flex items-center justify-center h-full flex-col w-full p-4 space-y-4">
	{#await Promise.all([data.user, data.years, data.lounges, data.gras])}
		<div class="p-4"><ProgressRadial /></div>
	{:then [user, years, lounges, gras]}
		{#if !user}
			<p class="p-4 px-8 m-4 mb-0">Entry not found.</p>
		{:else}
			<DirectoryEntry userInfo={user} />
			{#if data.groups.includes('RAC') || data.groups.includes('ADMINISTRATORS')}
				<div class="card p-4 m-4">
					<h2 class="h2 text-center">RAC Commands</h2>
					<p class="text-center">
						<a class="anchor" href="{base}/sds/rac/modify?username={user.username}"
							>{`Modify "${user.username}" record`}</a
						>
					</p>
					<p class="text-center">
						<a class="anchor" href="{base}/sds/rac/remove?username={user.username}"
							>{`Remove "${user.username}" record`}</a
						>
					</p>
				</div>
			{/if}
		{/if}
		<DirectorySearch data={{ years: years, lounges: lounges, gras: gras }} />
	{/await}
</div>
