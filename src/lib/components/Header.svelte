<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { AppBar, LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	import { headerLinks } from '$lib/data/navLinks';

	$: current_page = $page.url.pathname;

	const drawerStore = getDrawerStore();
	const navDrawer: DrawerSettings = { id: 'nav' };
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="{base}/">
			<enhanced:img alt="Simmons Logo" class="max-h-12 w-auto" src="$lib/assets/logo_crop.png" />
		</a>
	</svelte:fragment>
	<a href="{base}/"><strong class="text-xl uppercase">Simmons Hall</strong></a>
	<svelte:fragment slot="trail">
		<div class="hidden md:inline-flex gap-4 items-center">
			{#each headerLinks as page}
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
				class="btn-icon"
				id="navMenu"
				aria-label="Navigation Menu"
			>
				<i class="fa-solid fa-bars text-2xl" />
			</button>
		</div>
	</svelte:fragment>
</AppBar>
