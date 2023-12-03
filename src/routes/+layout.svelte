<script lang="ts">
	import '../app.postcss';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { AppShell, AppBar, LightSwitch, modeCurrent } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';

	import simmons_logo from '$lib/assets/logo_crop.png';
	import mit_logo_light from '$lib/assets/mit_logo/mit_logo_std_rgb_white.png';
	import mit_logo_dark from '$lib/assets/mit_logo/mit_logo_std_rgb_black.png';

	$: mit_logo = $modeCurrent ? mit_logo_dark : mit_logo_light;

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
</script>

<svelte:head><title>Simmons Hall</title></svelte:head>

<!-- Drawer -->
<Drawer>
	{#if $drawerStore.id === 'nav'}<div class="flex flex-col gap-2 min-h-full">
			<div class="inline-flex items-center gap-4 mt-12 self-center">
				<img alt="Simmons Logo" class="max-h-12 w-auto" src={simmons_logo} />
				<a href="{base}/"><strong class="text-xl uppercase">Simmons Hall</strong></a>
			</div>
			<a
				on:click={() => {
					drawerStore.close();
				}}
				class="btn variant-surface hover:variant-soft-primary"
				href="{base}/about"
			>
				About
			</a>
			<a
				on:click={() => {
					drawerStore.close();
				}}
				class="btn variant-surface hover:variant-soft-primary"
				href="{base}/prospectives"
			>
				Prospectives
			</a>
			<a
				on:click={() => {
					drawerStore.close();
				}}
				class="btn variant-surface hover:variant-soft-primary"
				href="{base}/visitors"
			>
				Visitors
			</a>
			<a
				on:click={() => {
					drawerStore.close();
				}}
				class="btn variant-surface hover:variant-soft-primary"
				href="{base}/residents"
			>
				Residents
			</a>
			<div class="grow"></div>
			<LightSwitch class="self-center mb-12" />
		</div>{/if}
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
					<a
						class="btn btn-sm variant-ghost-surface hover:variant-ghost-primary"
						href="{base}/about"
					>
						About
					</a>
					<a
						class="btn btn-sm variant-ghost-surface hover:variant-ghost-primary"
						href="{base}/prospectives"
					>
						Prospectives
					</a>
					<a
						class="btn btn-sm variant-ghost-surface hover:variant-ghost-primary"
						href="{base}/visitors"
					>
						Visitors
					</a>
					<a
						class="btn btn-sm variant-ghost-surface hover:variant-ghost-primary"
						href="{base}/residents"
					>
						Residents
					</a>
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
