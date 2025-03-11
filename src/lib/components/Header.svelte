<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import { Menu } from 'lucide-svelte';
	import { Modal } from '@skeletonlabs/skeleton-svelte';

	import { headerLinks } from '$lib/data/navLinks';
	import HeaderDrawer from './HeaderDrawer.svelte';

	let current_page = $derived($page.url.pathname);
	let headerDrawerOpen = $state(false);

	const changeDrawer = () => {
		headerDrawerOpen = !headerDrawerOpen;
	};
</script>

<AppBar>
	{#snippet lead()}
		<a href="/" class="flex items-center gap-4">
			<enhanced:img alt="Simmons Logo" class="max-h-12 w-auto" src="$lib/assets/logo_crop.png" />
			<strong class="text-xl uppercase">Simmons Hall</strong>
		</a>
	{/snippet}

	{#snippet trail()}
		<div class="hidden items-center gap-4 md:inline-flex">
			{#each headerLinks as page (page.url)}
				<a
					class="btn"
					class:hover:preset-tonal={page.url !== current_page}
					class:preset-filled-primary-500={page.url == current_page}
					href={page.url}
				>
					{page.name}
				</a>
			{/each}
			<LightSwitch />
		</div>
		<div class="flex items-center md:hidden">
			<Modal
				open={headerDrawerOpen}
				onOpenChange={(e) => (headerDrawerOpen = e.open)}
				triggerBase="btn-icon hover:preset-tonal"
				contentBase="bg-surface-100-900 p-4 space-y-4 shadow-xl w-[480px] h-screen"
				positionerJustify="justify-start"
				positionerAlign=""
				positionerPadding=""
				transitionsPositionerIn={{ x: -480, duration: 200 }}
				transitionsPositionerOut={{ x: -480, duration: 200 }}
			>
				{#snippet trigger()}
					<Menu />
				{/snippet}
				{#snippet content()}
					<HeaderDrawer {changeDrawer} />
				{/snippet}
			</Modal>
		</div>
	{/snippet}
</AppBar>
