<!-- TODO: FOR WHEN ONLY ONE RESULT IN DIRECTORY -->
<script lang="ts">
	import type { PageData } from './$types';
	import DirectoryEntry from '$lib/components/DirectoryEntry.svelte';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';
	export let data: PageData;
</script>

<div class="flex items-center justify-center h-full flex-col w-full">
	{#if data.user == null}
		<p class="p-4 px-8 m-4 mb-0">Entry not found.</p>
	{:else}
		{#await data.user}
			<div class="card p-4"><ProgressRadial /></div>
		{:then user}
			<DirectoryEntry userInfo={user} />
			{#if data.session?.user?.groups.includes('RAC') || data.session?.user?.groups.includes('ADMINISTRATORS')}
				<div class="card p-4 m-4">
					<h2 class="h2 text-center">RAC Commands</h2>
					<p class="text-center">
						<a class="anchor" href="{base}/sds/rac/modify/{data.user.username}"
							>{`Modify "${data.user.username}" record`}</a
						>
					</p>
					<p class="text-center">
						<a class="anchor" href="{base}/sds/rac/remove/{data.user.username}"
							>{`Remove "${data.user.username}" record`}</a
						>
					</p>
				</div>
			{/if}
		{/await}
	{/if}
	<hr class="w-11/12" />
	{#await Promise.all([data.years, data.lounges, data.gras]) then [years, lounges, gras]}
		<DirectorySearch data={{ years: years, lounges: lounges, gras: gras }} />
	{/await}
</div>
