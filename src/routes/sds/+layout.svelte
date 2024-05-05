<script lang="ts">
	let { children } = $props();
</script>

<div class="bg-surface-100-800-token w-full h-full">
	<div class="bg-surface-50-900-token h-full w-full rounded-container-token">
		{@render children()}
	</div>
</div>
