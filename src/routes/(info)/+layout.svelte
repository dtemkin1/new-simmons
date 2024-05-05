<script lang='ts'>
	let { children } = $props();
</script>

<div class="h-full w-full" id="background">
	<div class="container h-full mx-auto flex justify-center items-center">
		<div class="card p-8 m-8 space-y-4 max-w-5xl bg-surface-50-900-token">
			{@render children()}
		</div>
	</div>
</div>

<style>
	#background {
		background-image: url('$lib/assets/bg.jpg');
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
