<script lang="ts">
	import '../app.postcss';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { AppShell, AppBar, LightSwitch, modeCurrent } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	import simmons_logo from '$lib/assets/logo_crop.png';
	import mit_logo_light from '$lib/assets/mit_logo/mit_logo_std_rgb_white.png';
	import mit_logo_dark from '$lib/assets/mit_logo/mit_logo_std_rgb_black.png';

	$: mit_logo = $modeCurrent ? mit_logo_dark : mit_logo_light;
	$: current_page = $page.url.pathname;

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Initalize Drawer
	import { Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	initializeStores();
	const drawerStore = getDrawerStore();
	const navDrawer: DrawerSettings = { id: 'nav' };

	const pages = [
		{
			name: 'About',
			url: `${base}/about`
		},
		{
			name: 'Prospectives',
			url: `${base}/prospectives`
		},
		{
			name: 'Visitors',
			url: `${base}/visitors`
		},
		{
			name: 'Residents',
			url: `${base}/residents`
		}
	];
</script>

<svelte:head><title>Simmons Hall</title></svelte:head>

<!-- Drawer -->
<Drawer>
	{#if $drawerStore.id === 'nav'}
		<div class="flex flex-col gap-2 min-h-full items-center">
			<a
				href="{base}/"
				class="inline-flex items-center gap-4 mt-12 mb-4 self-center"
				on:click={() => {
					drawerStore.close();
				}}
			>
				<img alt="Simmons Logo" class="max-h-12 w-auto" src={simmons_logo} />
				<strong class="text-xl uppercase">Simmons Hall</strong>
			</a>
			<!-- <div class="grow" /> -->
			{#each pages as page}
				<a
					on:click={() => {
						drawerStore.close();
					}}
					class="btn w-min"
					class:variant-filled-primary={page.url === current_page}
					class:hover:variant-soft-primary={page.url !== current_page}
					class:variant-surface={page.url !== current_page}
					href={page.url}
				>
					{page.name}
				</a>
			{/each}
			<div class="grow" />
			<LightSwitch class="self-center mb-12" />
		</div>
	{/if}
</Drawer>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="{base}/">
					<img alt="Simmons Logo" class="max-h-12 w-auto" src={simmons_logo} />
				</a>
			</svelte:fragment>
			<a href="{base}/"><strong class="text-xl uppercase">Simmons Hall</strong></a>
			<svelte:fragment slot="trail">
				<div class="hidden md:inline-flex gap-4 items-center">
					{#each pages as page}
						<a
							class="btn btn-sm"
							class:variant-filled-primary={page.url === current_page}
							class:hover:variant-soft-primary={page.url !== current_page}
							class:variant-surface={page.url !== current_page}
							href={page.url}
						>
							{page.name}
						</a>
					{/each}
					<LightSwitch />
				</div>
				<div class="md:hidden">
					<button
						on:click={() => {
							drawerStore.open(navDrawer);
						}}
						type="button"
						class="btn-icon"><i class="fa-solid fa-bars text-2xl"></i></button
					>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	<!-- Page Footer -->
	<svelte:fragment slot="pageFooter">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<a href="https://web.mit.edu/">
					<img class="max-h-12 w-auto" alt="MIT Logo" src={mit_logo} />
				</a>
			</svelte:fragment>
			<address class="text-center text-sm">229 Vassar St.<br />Cambridge, MA 02139</address>
			<svelte:fragment slot="trail">
				<span class="text-right text-sm">Designed by Simmons Tech<br />© 2023 Simmons Hall</span>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
</AppShell>
