<script lang="ts">
	import { getContext } from 'svelte';

	let currentTile = getContext('currentTile');
	console.log(currentTile);

	// TODO: Implement submenus
</script>

<div class="bg-surface-100-800-token h-full">
	<div class="bg-surface-50-900-token h-full md:!block rounded-container-token">
		<slot />
	</div>
</div>
