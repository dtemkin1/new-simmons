<script lang="ts">
	import '../app.postcss';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import HeaderDrawer from '$lib/components/HeaderDrawer.svelte';
	import DBSidebar from '$lib/components/DBSidebar.svelte';
	import DBFooter from '$lib/components/DBFooter.svelte';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	let { children } = $props();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { prefersReducedMotionStore, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Initalize Drawer and Modal
	import { Drawer, Modal, Toast, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
	const drawerStore = getDrawerStore();

	// Scroll heading into view
	function scrollHeadingIntoView(): void {
		if (!window.location.hash) return;
		const elemTarget: HTMLElement | null = document.querySelector(window.location.hash);
		if (elemTarget) elemTarget.scrollIntoView({ behavior: 'smooth' });
	}

	// Lifecycle
	afterNavigate((params) => {
		// Scroll to top
		const isNewPage = params.from?.url.pathname !== params.to?.url.pathname;
		if (isNewPage && pageElement) {
			pageElement.scrollTop = 0;
		}
		// Scroll heading into view
		scrollHeadingIntoView();
	});

	let pageElement: HTMLElement | null | undefined = $state();
	let innerWidth: number | undefined = $state();
</script>

<svelte:head>
	<title
		>{$page.url.pathname.includes('/sds') ? 'Simmons DB' : 'Simmons Hall'}{$page.data.title
			? ` | ${$page.data.title}`
			: ''}</title
	>
	<meta name="description" content={$page.data.description || 'Welcome to the Sponge!'} />
</svelte:head>

<svelte:window bind:innerWidth />

<!-- Drawer -->
<Drawer>
	{#if $drawerStore.id === 'nav'}
		<HeaderDrawer />
	{/if}
</Drawer>

<!-- Modal -->
<Modal />

<!-- Toasts -->
<Toast />

<!-- App Shell -->
<div class="w-full h-full flex flex-col overflow-hidden">
	<header class="flex-none z-10">
		<!-- App Bar -->
		<Header />
	</header>

	<div class="flex-auto w-full h-full flex overflow-hidden">
		<aside class="flex-none overflow-x-hidden overflow-y-auto w-auto">
			{#if $page.url.pathname.includes('/sds') && innerWidth && innerWidth >= 640}
				<DBSidebar username={$page.data.username} groups={$page.data.groups} />
			{/if}
		</aside>

		<!-- Page Route Content -->
		<div
			bind:this={pageElement}
			class="flex-1 overflow-x-hidden flex flex-col"
			class:scroll-smooth={!$prefersReducedMotionStore}
			style:scrollbar-gutter="auto"
			on:scroll
		>
			<main class="flex-auto">
				{@render children()}
			</main>
			{#if !$page.url.pathname.includes('/sds')}
				<footer class="flex-none">
					<Footer />
				</footer>
			{/if}
		</div>
	</div>

	<!-- Page Footer -->
	{#if $page.url.pathname.includes('/sds')}
		<footer class="flex-none">
			{#if innerWidth && innerWidth < 640}
				<DBFooter username={$page.data.username} groups={$page.data.groups} />
			{/if}
			<Footer />
		</footer>
	{/if}
</div>
