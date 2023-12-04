<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile, getDrawerStore } from '@skeletonlabs/skeleton';

	import { base } from '$app/paths';
	import { page } from '$app/stores';

	// TODO: Implement submenus

	let currentTile: number = 0;

	const links = [
		[{ href: '', label: '', badge: '' }],
		[{ href: '', label: '', badge: '' }],
		[{ href: '', label: '', badge: '' }],
		[{ href: '', label: '', badge: '' }],
		[{ href: `${base}/sds/packages/mypackages`, label: 'My Packages', badge: '' }],
		[{ href: '', label: '', badge: '' }],
		[
			{ href: 'http://www.librarything.com/catalog/simmons_hall', label: 'Catalog', badge: '' },
			{ href: '/lib_guide.pdf', label: "User's Guide (PDF)", badge: '' }
		],
		[{ href: `${base}/sds/desk/calendar`, label: 'Desk Shift Calendar', badge: '' }]
	];

	const drawerStore = getDrawerStore();

	function onClickAnchor(): void {
		currentTile = 0;
		drawerStore.close();
	}

	$: linkActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-active-token' : '');
</script>

<div class="bg-surface-50-900-token rounded-none h-full grid grid-cols-[auto_1fr] w-full">
	<AppRail>
		<svelte:fragment slot="lead"></svelte:fragment>
		<!-- --- -->
		<AppRailTile
			bind:group={currentTile}
			name="home"
			value={1}
			title="home"
			on:click={() => {
				if (currentTile == 1) {
					onClickAnchor();
				}
			}}
		>
			<svelte:fragment slot="lead"><i class="fa-solid fa-house text-2xl"></i></svelte:fragment>
			<span>Simmons DB</span>
		</AppRailTile>
		<AppRailTile
			bind:group={currentTile}
			name="gov"
			value={2}
			title="gov"
			on:click={() => {
				if (currentTile == 2) {
					onClickAnchor();
				}
			}}
		>
			<svelte:fragment slot="lead"
				><i class="fa-solid fa-check-to-slot text-2xl"></i></svelte:fragment
			>
			<span>GovTracker</span>
		</AppRailTile>
		<AppRailTile
			bind:group={currentTile}
			name="personal"
			value={3}
			title="personal"
			on:click={() => {
				if (currentTile == 3) {
					onClickAnchor();
				}
			}}
		>
			<svelte:fragment slot="lead"><i class="fa-solid fa-person text-2xl"></i></svelte:fragment>
			<span>Personal Info</span>
		</AppRailTile>
		<AppRailTile
			bind:group={currentTile}
			name="packages"
			value={4}
			title="packages"
			on:click={() => {
				if (currentTile == 4) {
					onClickAnchor();
				}
			}}
		>
			<svelte:fragment slot="lead"><i class="fa-solid fa-box text-2xl"></i></svelte:fragment>
			<span>Packages</span>
		</AppRailTile>
		<AppRailTile
			bind:group={currentTile}
			name="movies"
			value={5}
			title="movies"
			on:click={() => {
				if (currentTile == 5) {
					onClickAnchor();
				}
			}}
		>
			<svelte:fragment slot="lead"><i class="fa-solid fa-film text-2xl"></i></svelte:fragment>
			<span>Movies</span>
		</AppRailTile>
		<AppRailTile
			bind:group={currentTile}
			name="library"
			value={6}
			title="library"
			on:click={() => {
				if (currentTile == 6) {
					onClickAnchor();
				}
			}}
		>
			<svelte:fragment slot="lead"><i class="fa-solid fa-book text-2xl"></i></svelte:fragment>
			<span>Library</span>
		</AppRailTile>
		<AppRailTile
			bind:group={currentTile}
			name="desk"
			value={7}
			title="desk"
			on:click={() => {
				if (currentTile == 7) {
					onClickAnchor();
				}
			}}
		>
			<svelte:fragment slot="lead">
				<i class="fa-solid fa-envelopes-bulk text-2xl"></i>
			</svelte:fragment>
			<span>Desk</span>
		</AppRailTile>
		<svelte:fragment slot="trail">
			<AppRailAnchor href="{base}/sds/login/certs/login" title="Account" on:click={onClickAnchor}
				><i class="fa-solid fa-user text-2xl"></i></AppRailAnchor
			>
		</svelte:fragment>
	</AppRail>

	<div class="flex">
		{#if currentTile !== 0}
			<section class="p-4 pb-20 space-y-4 w-full sm:w-72 overflow-y-auto bg-surface-100-800-token">
				<nav class="list-nav">
					<ul>
						{#each links[currentTile] as link}
							<li>
								<a
									href={link.href}
									data-sveltekit-preload-data="hover"
									on:keypress
									on:click={onClickAnchor}
									class={linkActive(link.href)}
								>
									<span class="flex-auto">{@html link.label}</span>
									{#if link.badge}<span class="badge variant-filled-secondary">{link.badge}</span
										>{/if}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</section>
		{/if}
		<div class="grow sm:!block" class:hidden={currentTile !== 0}>
			<slot />
		</div>
	</div>
</div>
