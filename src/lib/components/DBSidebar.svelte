<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile, getDrawerStore } from '@skeletonlabs/skeleton';

	export let groups: readonly string[] | undefined;
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	import { CircleUser } from 'lucide-svelte';

	import { sdsLinks } from '$lib/data/navLinks';
	export let currentTile: number = 0;

	import { onNavigate } from '$app/navigation';

	onNavigate((params) => {
		if (params.to?.url.pathname.includes('/sds')) {
			currentTile = 0;
		}
	});

	let userLinks: typeof sdsLinks = [];
	for (const linkGroup of sdsLinks) {
		const allLinks = linkGroup.links.filter((link) =>
			groups?.some((group) => link.groupNeeded.includes(group))
		);
		if (allLinks.length > 0) {
			userLinks.push({
				id: linkGroup.id,
				name: linkGroup.name,
				value: linkGroup.value,
				icon: linkGroup.icon,
				links: allLinks
			});
		}
	}

	$: activeGroup = userLinks.find((linkGroup) => linkGroup.value === currentTile) || { links: [] };
</script>

<div class="h-full flex flex-row">
	{#if $page.data.session?.user}
		<AppRail>
			<svelte:fragment slot="lead">
				{#each userLinks as tileLinks}
					{#if tileLinks.links.length > 0}
						<AppRailTile
							bind:group={currentTile}
							name={tileLinks.id}
							value={tileLinks.value}
							title={tileLinks.id}
							on:click={() => {
								if (currentTile == tileLinks.value) {
									currentTile = 0;
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
				<AppRailAnchor href="{base}/sds/login/certs/login" title="Account"
					><svelte:fragment slot="lead">
						<CircleUser size={'1.5rem'} />
					</svelte:fragment>{$page.data.session.user?.id ?? 'Guest'}</AppRailAnchor
				>
			</svelte:fragment>
		</AppRail>
		{#if currentTile !== 0 && userLinks[currentTile - 1].links.length > 0}
			<section
				class="p-4 pb-20 space-y-4 md:w-72 w-screen overflow-y-auto bg-surface-100-800-token"
			>
				<nav class="list-nav md:pr-0 pr-20">
					<ul>
						{#each activeGroup.links as link}
							<li>
								<a
									href={link.href}
									on:keypress
									class="whitespace-normal text-left btn"
									class:!bg-primary-active-token={link.href === $page.url.pathname}
									class:pointer-events-none={link.badge === 'Incomplete'}
									class:opacity-50={link.badge === 'Incomplete'}
									aria-disabled={link.badge === 'Incomplete'}
								>
									<span class="flex-auto">{@html link.label}</span>
									{#if link.badge}<span
											class="badge variant-filled-secondary"
											class:variant-filled-error={link.badge == 'Incomplete'}
											class:variant-filled-warning={link.badge == 'Work in Progress'}
											>{link.badge}</span
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
