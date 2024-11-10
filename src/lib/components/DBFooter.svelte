<script lang="ts">
	import { Nav } from '@skeletonlabs/skeleton-svelte';
	import { page } from '$app/stores';
	import { sdsLinks } from '$lib/data/navLinks';
	import { onNavigate } from '$app/navigation';
	import { SDS_LOGIN_URL } from '$lib/config';

	import { CircleUser } from 'lucide-svelte';

	interface Props {
		username: string | null;
		groups: readonly string[];
	}

	let { username = null, groups = [] }: Props = $props();

	onNavigate((params) => {
		if (params.to?.url.pathname.includes('/sds')) {
			currentTile = '';
		}
	});

	let currentTile: string = $state('');
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
		userLinks.find((linkGroup) => (currentTile ? linkGroup.value === currentTile : false)) ?? {
			links: []
		}
	);
</script>

<div class="flex w-screen flex-col bg-surface-100-900">
	<div class="float-start h-full overflow-y-auto">
		{#if Number(currentTile) && userLinks[Number(currentTile) - 1].links.length > 0}
			<nav class="max-h-96 p-0 bg-surface-100-900">
				<ul class="list-inside list-none space-y-2 p-4">
					{#each activeGroup.links as link}
						<li>
							<a
								href={link.href}
								class="btn w-full whitespace-normal text-start"
								class:!bg-primary-500={link.href === $page.url.pathname}
								class:pointer-events-none={link.badge === 'Incomplete'}
								class:opacity-50={link.badge === 'Incomplete'}
								aria-disabled={link.badge === 'Incomplete'}
								onclick={() => (currentTile = '')}
							>
								<span
									class="flex-auto"
									class:text-primary-contrast-500={link.href === $page.url.pathname}
									>{link.label}</span
								>
								{#if link.badge}
									<span
										class="badge preset-filled-secondary-500"
										class:preset-filled-error-500={link.badge == 'Incomplete'}
										class:preset-filled-warning-500={link.badge == 'Work in Progress'}
										>{link.badge}</span
									>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</div>
	<div class="max-w-screen justify-start overflow-x-auto">
		{#if $page.data.username}
			<Nav.Bar bind:value={currentTile} tilesJustify="justify-start">
				{#each userLinks as tileLinks}
					{#if tileLinks.links.length > 0}
						<Nav.Tile
							id={tileLinks.value}
							title={tileLinks.id}
							label={tileLinks.name}
							labelExpanded={tileLinks.name}
						>
							<tileLinks.icon />
						</Nav.Tile>
					{/if}
				{/each}
				<Nav.Tile
					href={SDS_LOGIN_URL}
					title="Account"
					label={username ?? 'Guest'}
					labelExpanded={username ?? 'Guest'}
					selected={$page.url.pathname === SDS_LOGIN_URL}
				>
					<CircleUser />
				</Nav.Tile>
			</Nav.Bar>
		{/if}
	</div>
</div>
