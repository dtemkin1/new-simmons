<script lang="ts">
	import '../app.postcss';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import HeaderDrawer from '$lib/components/HeaderDrawer.svelte';
	import DBSidebar from '$lib/components/DBSidebar.svelte';
	import DBFooter from '$lib/components/DBFooter.svelte';

	import { page } from '$app/stores';

	let { children } = $props();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Initalize Drawer and Modal
	import { Drawer, Modal, Toast, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
	const drawerStore = getDrawerStore();
</script>

<svelte:head>
	<title
		>{$page.url.pathname.includes('/sds') ? 'Simmons DB' : 'Simmons Hall'}{$page.data.title
			? ` | ${$page.data.title}`
			: ''}</title
	>
	<meta name="description" content={$page.data.description || 'Welcome to the Sponge!'} />
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
{@render children()}
