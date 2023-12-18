<script lang="ts">
	import type { PageServerData } from './$types';
	import { base } from '$app/paths';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';

	export let data: PageServerData;
</script>

<div class="flex items-center justify-center h-full">
	<DirectorySearch {data} />
</div>
