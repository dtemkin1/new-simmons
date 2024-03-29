<script lang="ts">
	import type { PageData } from './$types';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';

	export let data: PageData;
</script>

{#await Promise.all([data.years, data.lounges, data.gras])}
	<div class="flex items-center justify-center h-full w-full">
		<ProgressRadial />
	</div>
{:then [years, lounges, gras]}
	<div class="p-4">
		<DirectorySearch data={{ years: years, lounges: lounges, gras: gras }} />
	</div>
{/await}
