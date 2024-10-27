<script lang="ts">
	let { children } = $props();

	import backgroundImg from '$lib/assets/bg.jpg?enhanced';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<enhanced:img
	src={backgroundImg}
	class="min-h-screen min-w-screen fixed -z-10 select-none object-cover"
	alt="Outside of Simmons Hall in greyscale"
/>

<div class="grid h-full w-full grid-rows-[auto_1fr_auto] bg-transparent">
	<!-- Header -->
	<header class="fixed w-full top-0 z-10"><Header /></header>
	<!-- Spacer for the header -->
	<div class="h-[80px]"></div>

	<!-- Main -->
	<div class="container h-full mx-auto flex justify-center items-center">
		<main class="rounded-token p-8 m-4 space-y-4 max-w-5xl bg-surface-50-900-token">
			{@render children()}
		</main>
	</div>
	<!-- Footer -->
	<footer><Footer /></footer>
</div>
