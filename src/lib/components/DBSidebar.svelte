<script lang="ts">
	import { Nav } from '@skeletonlabs/skeleton-svelte';

	interface Props {
		username: string | null;
		groups: readonly string[];
	}

	let { username = null, groups = [] }: Props = $props();

	import { page } from '$app/stores';
	import { CircleUser } from 'lucide-svelte';
	import { sdsLinks } from '$lib/data/navLinks';
	import { onNavigate } from '$app/navigation';
	import { SDS_LOGIN_URL } from '$lib/config';

	onNavigate((params) => {
		if (params.to?.url.pathname.includes('/sds')) {
			currentTile = '';
		}
	});

	let currentTile = $state('');
	let userLinks: typeof sdsLinks = $derived(
		sdsLinks.reduce(
			(acc, linkGroup) => {
				const allLinks = linkGroup.links.filter((link) =>
					groups.some((group) => link.groupNeeded.includes(group))
				);
				if (allLinks.length > 0) {
					acc.push({
						id: linkGroup.id,
						name: linkGroup.name,
						value: linkGroup.value,
						icon: linkGroup.icon,
						links: allLinks
					});
				}
				return acc;
			},
			[] as typeof sdsLinks
		)
	);

	let activeGroup = $derived(
		userLinks.find((linkGroup) => linkGroup.value === currentTile) || { links: [] }
	);
</script>

<div class="flex h-full flex-row">
	{#if $page.data.username}
		<Nav bind:value={currentTile}>
			{#snippet tiles()}
				{#each userLinks as tileLinks}
					{#if tileLinks.links.length > 0}
						{@const Icon = tileLinks.icon}
						<Nav.Tile
							id={tileLinks.value}
							title={tileLinks.id}
							onclick={() => {
								if (currentTile == tileLinks.value) {
									currentTile = '';
								}
							}}
							label={tileLinks.name}
						>
							<Icon />
						</Nav.Tile>
					{/if}
				{/each}
			{/snippet}
			{#snippet footer()}
				<Nav.Tile href={SDS_LOGIN_URL} title="Account" label={username ?? 'Guest'}>
					<CircleUser />
				</Nav.Tile>
			{/snippet}
		</Nav>
		{#if Number(currentTile) !== 0 && userLinks[Number(currentTile) - 1].links.length > 0}
			<section class="w-screen space-y-4 p-4 bg-surface-100-900 md:w-72">
				<nav class="list-nav pr-20 md:pr-0">
					<ul>
						{#each activeGroup.links as link}
							<li>
								<a
									href={link.href}
									class="btn whitespace-normal text-left"
									class:!bg-primary-active={link.href === $page.url.pathname}
									class:pointer-events-none={link.badge === 'Incomplete'}
									class:opacity-50={link.badge === 'Incomplete'}
									aria-disabled={link.badge === 'Incomplete'}
								>
									<span class="flex-auto">{link.label}</span>
									{#if link.badge}<span
											class="badge preset-filled-secondary-500"
											class:preset-filled-error-500={link.badge == 'Incomplete'}
											class:preset-filled-warning-500={link.badge == 'Work in Progress'}
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
