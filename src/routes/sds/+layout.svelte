<script lang="ts">
	let { children } = $props();

	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	import DBSidebar from '$lib/components/DBSidebar.svelte';
	import DBFooter from '$lib/components/DBFooter.svelte';

	import { page } from '$app/stores';

	let innerWidth: number | undefined = $state();
</script>

<svelte:window bind:innerWidth />

<div class="w-full h-full flex flex-col overflow-hidden">
	<header class="flex-none z-10">
		<Header />
	</header>

	<div class="flex-auto w-full h-full flex overflow-hidden">
		<aside class="flex-none overflow-x-hidden overflow-y-auto w-auto">
			{#if innerWidth && innerWidth >= 640}
				<DBSidebar username={$page.data.username} groups={$page.data.groups} />
			{/if}
		</aside>

		<div class="flex-1 overflow-x-hidden flex flex-col" style:scrollbar-gutter="auto">
			<main class="flex-auto">
				<div class="bg-surface-100-800-token w-full h-full">
					<div class="bg-surface-50-900-token h-full w-full rounded-container-token">
						{@render children()}
					</div>
				</div>
			</main>
		</div>
	</div>

	<footer class="flex-none">
		{#if innerWidth && innerWidth < 640}
			<DBFooter username={$page.data.username} groups={$page.data.groups} />
		{/if}
		<Footer />
	</footer>
</div>
