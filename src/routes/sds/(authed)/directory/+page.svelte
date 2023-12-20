<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';
	import DirectorySearch from '$lib/components/DirectorySearch.svelte';

	export let data: PageData;
</script>

<div class="flex items-center justify-center h-full">
	<DirectorySearch {data} />
</div>
