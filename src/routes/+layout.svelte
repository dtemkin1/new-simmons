<script lang="ts">
	import '../app.postcss';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import HeaderDrawer from '$lib/components/HeaderDrawer.svelte';
	import DBSidebar from '$lib/components/DBSidebar.svelte';

	import { page } from '$app/stores';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Initalize Drawer
	import { Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();
	const drawerStore = getDrawerStore();

	let currentTile: number;
</script>

<svelte:head>
	<title>Simmons Hall</title>
	<meta name="description" content="" />
</svelte:head>

<!-- Drawer -->
<Drawer>
	{#if $drawerStore.id === 'nav'}
		<HeaderDrawer />
	{/if}
</Drawer>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<Header />
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		{#if $page.url.pathname.includes('/sds')}
			<DBSidebar bind:currentTile />
		{/if}
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot {currentTile} />

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
