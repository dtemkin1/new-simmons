<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';
	import { headerLinks } from '$lib/data/navLinks';

	const drawerStore = getDrawerStore();

	$: current_page = $page.url.pathname;
</script>

<div class="flex flex-col gap-2 min-h-full items-center">
	<a
		href="{base}/"
		class="inline-flex items-center gap-4 mt-12 mb-4 self-center"
		on:click={() => {
			drawerStore.close();
		}}
	>
		<enhanced:img alt="Simmons Logo" class="max-h-12 w-auto" src="$lib/assets/logo_crop.png"
		></enhanced:img>
		<strong class="text-xl uppercase">Simmons Hall</strong>
	</a>
	<!-- <div class="grow" /> -->
	{#each headerLinks as page}
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
	<div class="grow"></div>
	<LightSwitch class="self-center mb-12" />
</div>
