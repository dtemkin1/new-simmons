<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile, getDrawerStore } from '@skeletonlabs/skeleton';

	import { base } from '$app/paths';
	import { page } from '$app/stores';

	import { CircleUser } from 'lucide-svelte';

	import { sdsLinks } from '$lib/data/navLinks';
	export let currentTile: number = 0;

	function onClickAnchor(): void {
		currentTile = 0;
	}

	$: linkActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-active-token' : '');
</script>

<div class="h-full flex flex-row">
	{#if $page.data.session}
		<AppRail>
			<svelte:fragment slot="lead">
				{#each sdsLinks as tileLinks}
					{#if tileLinks.links.length > 0}
						<AppRailTile
							bind:group={currentTile}
							name={tileLinks.id}
							value={tileLinks.value}
							title={tileLinks.id}
							on:click={() => {
								if (currentTile == tileLinks.value) {
									onClickAnchor();
								}
							}}
						>
							<svelte:fragment slot="lead">
								<div class="flex justify-center items-center">
									<svelte:component this={tileLinks.icon} size={'1.5rem'}></svelte:component>
								</div>
							</svelte:fragment>
							<span>{tileLinks.name}</span>
						</AppRailTile>
					{/if}
				{/each}
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<AppRailAnchor href="{base}/sds/login/certs/login" title="Account" on:click={onClickAnchor}
					><svelte:fragment slot="lead">
						<CircleUser size={'1.5rem'} />
					</svelte:fragment>{$page.data.session.user?.id ?? 'Guest'}</AppRailAnchor
				>
			</svelte:fragment>
		</AppRail>
		{#if currentTile !== 0 && sdsLinks[currentTile - 1].links.length > 0}
			<section
				class="p-4 pb-20 space-y-4 md:w-72 w-screen overflow-y-auto bg-surface-100-800-token"
			>
				<nav class="list-nav md:pr-0 pr-20">
					<ul>
						{#each sdsLinks[currentTile - 1].links as link}
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
	{/if}
</div>
