<!-- TODO: FOR WHEN ONLY ONE RESULT IN DIRECTORY -->
<script lang="ts">
	import type { PageData } from './$types';
	import DirectoryEntry from '$lib/components/DirectoryEntry.svelte';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';
	export let data: PageData;
</script>

<div class="flex items-center justify-center h-full flex-col">
	{#if data.user == null}
		<p class="p-4 px-8 m-4 mb-0">Entry not found.</p>
	{:else}
		<DirectoryEntry userInfo={data.user} />
	{/if}
	<DirectorySearch {data} />
</div>
