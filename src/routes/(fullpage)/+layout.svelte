<script lang="ts">
	let { children } = $props();

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="grid h-full w-full grid-rows-[auto_1fr_auto] bg-transparent overflow-x-hidden">
	<!-- Header -->
	<header class="sticky top-0 z-10"><Header /></header>
	<!-- Main -->
	<main class="p-4 space-y-4">
		{@render children()}
	</main>
	<!-- Footer -->
	<footer><Footer /></footer>
</div>
