<script lang="ts">
	import type { PageData } from './$types';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';

	export let data: PageData;
</script>

<div class="flex items-center justify-center h-full pt-2">
	{#await Promise.all([data.years, data.lounges, data.gras])}
		<div class="p-4"><ProgressRadial /></div>
	{:then [years, lounges, gras]}
		<DirectorySearch data={{ years: years, lounges: lounges, gras: gras }} />
	{/await}
</div>
