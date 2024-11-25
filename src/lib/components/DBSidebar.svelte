<script lang="ts">
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { page } from '$app/stores';
	import { sdsLinks } from '$lib/data/navLinks';
	import { SDS_LOGIN_URL } from '$lib/config';

	import { CircleUser } from 'lucide-svelte';
	import { Menu } from 'lucide-svelte';
	import { X } from 'lucide-svelte';

	interface Props {
		username: string;
		groups: readonly string[];
	}

	let { username = '', groups = [] }: Props = $props();
	let expanded = $state(false);

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
						Icon: linkGroup.Icon,
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

	let menuOrClose = $derived(currentTile === '' || currentTile === 'menu');
</script>

<div class="flex h-full flex-row bg-surface-100-900">
	<div class="float-start h-full overflow-y-auto overflow-x-hidden">
		<Navigation.Rail bind:value={currentTile} {expanded}>
			{#snippet header()}
				<Navigation.Tile
					id="menu"
					labelExpanded={menuOrClose ? 'Menu' : 'Close'}
					onclick={() => {
						if (menuOrClose) {
							expanded = !expanded;
						}
					}}
					active="hover:preset-filled-surface-50-950"
				>
					{#if menuOrClose}<Menu />{:else}<X />{/if}
				</Navigation.Tile>
			{/snippet}
			{#snippet tiles()}
				{#each userLinks as tileLinks}
					{#if tileLinks.links.length > 0}
						<Navigation.Tile
							id={tileLinks.value}
							title={tileLinks.id}
							label={tileLinks.name}
							labelExpanded={tileLinks.name}
						>
							<tileLinks.Icon />
						</Navigation.Tile>
					{/if}
				{/each}
			{/snippet}
			{#snippet footer()}
				<Navigation.Tile
					href={SDS_LOGIN_URL}
					title="Account"
					label={username ?? 'Guest'}
					labelExpanded={username ?? 'Guest'}
				>
					<CircleUser />
				</Navigation.Tile>
			{/snippet}
		</Navigation.Rail>
	</div>
	<div class="float-start h-full overflow-y-auto">
		{#if Number(currentTile) && userLinks[Number(currentTile) - 1].links.length > 0}
			<nav class="w-72 p-0 bg-surface-100-900">
				<ul class="list-inside list-none space-y-2 p-4">
					{#each activeGroup.links as link}
						<li>
							<a
								href={link.href}
								class="btn h-auto w-full whitespace-normal text-start"
								class:preset-filled-primary-500={link.href === $page.url.pathname}
								class:hover:preset-tonal={link.href !== $page.url.pathname}
								class:pointer-events-none={link.badge === 'Incomplete'}
								class:opacity-50={link.badge === 'Incomplete'}
								aria-disabled={link.badge === 'Incomplete'}
							>
								<span class="flex-auto">{link.label}</span>
								{#if link.badge}
									<span
										class="badge preset-filled-secondary-500"
										class:!preset-filled-error-500={link.badge == 'Incomplete'}
										class:!preset-filled-warning-500={link.badge == 'Work in Progress'}
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
</div>
