<script lang="ts">
	import '../app.postcss';
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

	// Initalize Drawer and Modal
	import {
		Drawer,
		getDrawerStore,
		initializeStores,
		Modal,
		getModalStore,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	initializeStores();
	const drawerStore = getDrawerStore();
	const modalStore = getModalStore();

	const betaModal: ModalSettings = {
		type: 'alert',
		// Data
		title: 'Simmons Website Beta',
		body: 'Hello! Welcome to the beta Simmons website. Pleae report any bugs or sent any feature requests to <a class="anchor" href="mailto:dtemkin@mit.edu">Simmons Tech</a>. Happy exploring!',
		buttonTextCancel: 'Close'
	};

	onMount(() => {
		modalStore.trigger(betaModal);
	});
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

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<Header />
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		{#if $page.url.pathname.includes('/sds')}
			<DBSidebar groups={$page.data.session?.user.groups} />
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
