<script lang="ts">
	let { children } = $props();
</script>

<div class="h-full w-full img-bg">
	<div class="container h-full mx-auto flex justify-center items-center">
		<div class="card p-8 m-8 space-y-4 max-w-5xl bg-surface-50-900-token">
			{@render children()}
		</div>
	</div>
</div>
