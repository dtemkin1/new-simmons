<div class="container h-full mx-auto flex justify-center items-center">
	<div class="card p-4 flex flex-col space-y-4 max-w-5xl m-4">
		<slot />
	</div>
</div>

<style>
	:global(html, body) {
		@apply h-full;
	}
	:global(body) {
		background-image: url('$lib/assets/bg.jpg');
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
