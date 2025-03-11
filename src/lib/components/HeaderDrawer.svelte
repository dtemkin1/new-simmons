<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { headerLinks } from '$lib/data/navLinks';
	import LightSwitch from '$lib/components/LightSwitch.svelte';

	interface Props {
		changeDrawer: () => void;
	}

	let { changeDrawer }: Props = $props();

	let current_page = $derived($page.url.pathname);
</script>

<div class="flex min-h-full flex-col items-center gap-2">
	<a
		href="{base}/"
		class="mt-12 mb-4 inline-flex items-center gap-4 self-center"
		onclick={changeDrawer}
	>
		<enhanced:img alt="Simmons Logo" class="max-h-12 w-auto" src="$lib/assets/logo_crop.png"
		></enhanced:img>
		<strong class="text-xl uppercase">Simmons Hall</strong>
	</a>
	<!-- <div class="grow" /> -->
	{#each headerLinks as page (page.url)}
		<a
			onclick={changeDrawer}
			class="btn w-min"
			class:hover:preset-tonal={page.url !== current_page}
			class:preset-filled-primary-500={page.url == current_page}
			href={page.url}
		>
			{page.name}
		</a>
	{/each}
	<div class="grow"></div>
	<LightSwitch />
</div>
