<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor, AppBar } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';

	// TODO: Implement submenus

	let currentTile: number = 0;
</script>

<div class="bg-surface-50-900-token rounded-none h-full grid grid-cols-[auto_1fr] w-full">
	<AppRail>
		<svelte:fragment slot="lead">
			<!-- <AppRailAnchor href="{base}/sds"><i class="fa-solid fa-house fa-2xl"></i></AppRailAnchor> -->
		</svelte:fragment>
		<!-- --- -->
		<AppRailTile bind:group={currentTile} name="home" value={1} title="home">
			<svelte:fragment slot="lead"><i class="fa-solid fa-house text-2xl"></i></svelte:fragment>
			<span>Simmons DB</span>
		</AppRailTile>
		<AppRailTile bind:group={currentTile} name="gov" value={2} title="gov">
			<svelte:fragment slot="lead"
				><i class="fa-solid fa-check-to-slot text-2xl"></i></svelte:fragment
			>
			<span>GovTracker</span>
		</AppRailTile>
		<AppRailTile bind:group={currentTile} name="personal" value={3} title="personal">
			<svelte:fragment slot="lead"><i class="fa-solid fa-person text-2xl"></i></svelte:fragment>
			<span>Personal Info</span>
		</AppRailTile>
		<AppRailTile bind:group={currentTile} name="packages" value={4} title="tile-3">
			<svelte:fragment slot="lead"><i class="fa-solid fa-box text-2xl"></i></svelte:fragment>
			<span>Packages</span>
		</AppRailTile>
		<AppRailTile bind:group={currentTile} name="movies" value={5} title="movies">
			<svelte:fragment slot="lead"><i class="fa-solid fa-film text-2xl"></i></svelte:fragment>
			<span>Movies</span>
		</AppRailTile>
		<AppRailTile bind:group={currentTile} name="library" value={6} title="library">
			<svelte:fragment slot="lead"><i class="fa-solid fa-book text-2xl"></i></svelte:fragment>
			<span>Library</span>
		</AppRailTile>
		<AppRailTile bind:group={currentTile} name="desk" value={7} title="desk">
			<svelte:fragment slot="lead"
				><i class="fa-solid fa-envelopes-bulk text-2xl"></i></svelte:fragment
			>
			<span>Desk</span>
		</AppRailTile>
		<!-- --- -->
		<svelte:fragment slot="trail">
			<AppRailAnchor href="{base}/sds/login/certs/login" title="Account"
				><i class="fa-solid fa-user text-2xl"></i></AppRailAnchor
			>
		</svelte:fragment>
	</AppRail>
	<div class="container">
		<slot />
	</div>
</div>
