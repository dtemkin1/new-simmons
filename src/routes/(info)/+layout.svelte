<script lang="ts">
	let { children } = $props();

	import backgroundImg from '$lib/assets/bg.jpg?enhanced';
</script>

<div class="h-full w-full img-bg" style="--background-image: url({backgroundImg.img.src});">
	<div class="container h-full mx-auto flex justify-center items-center">
		<div class="card p-8 m-8 space-y-4 max-w-5xl bg-surface-50-900-token">
			{@render children()}
		</div>
	</div>
</div>

<style>
	:global(.img-bg) {
		background-image: var(--background-image);
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
