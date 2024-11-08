<script lang="ts">
	let { children } = $props();

	import backgroundImg from '$lib/assets/bg.jpg?enhanced';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<enhanced:img
	src={backgroundImg}
	class="min-w-screen fixed -z-10 min-h-screen select-none object-cover"
	alt="Outside of Simmons Hall in greyscale"
/>

<div class="grid h-full w-full grid-rows-[auto_1fr_auto] bg-transparent">
	<!-- Header -->
	<header class="fixed top-0 z-10 w-full"><Header /></header>
	<!-- Spacer for the header -->
	<div class="h-[80px]"></div>

	<!-- Main -->
	<div class="container mx-auto flex h-full items-center justify-center">
		<main class="m-4 max-w-5xl space-y-4 rounded p-8 bg-surface-50-950">
			{@render children()}
		</main>
	</div>
	<!-- Footer -->
	<footer><Footer /></footer>
</div>
