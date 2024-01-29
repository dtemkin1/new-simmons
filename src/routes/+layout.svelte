<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import HeaderDrawer from '$lib/components/HeaderDrawer.svelte';
	import DBSidebar from '$lib/components/DBSidebar.svelte';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, prefersReducedMotionStore } from '@skeletonlabs/skeleton';
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
		const elemPage = document.querySelector('#page');
		if (isNewPage && elemPage !== null) {
			elemPage.scrollTop = 0;
		}
		// Scroll heading into view
		scrollHeadingIntoView();
	});

	$: allyPageSmoothScroll = !$prefersReducedMotionStore ? 'scroll-smooth' : '';
</script>

<svelte:head>
	<title
		>{$page.url.pathname.includes('/sds') ? 'Simmons DB' : 'Simmons Hall'}{$page.data.title
			? ` | ${$page.data.title}`
			: ''}</title
	>
	<meta name="description" content={$page.data.description || ''} />
</svelte:head>

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
<AppShell regionPage={allyPageSmoothScroll}>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<Header />
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		{#if $page.url.pathname.includes('/sds')}
			{#key $page.data.groups}
				<DBSidebar username={$page.data.username} groups={$page.data.groups} />
			{/key}
		{/if}
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />

	<!-- Page Footer -->
	<svelte:fragment slot="pageFooter">
		{#if !$page.url.pathname.includes('/sds')}
			<Footer />
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="footer">
		{#if $page.url.pathname.includes('/sds')}
			<Footer />
		{/if}
	</svelte:fragment>
</AppShell>
