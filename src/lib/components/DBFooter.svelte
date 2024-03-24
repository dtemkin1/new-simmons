<script lang="ts">
	import { TabGroup, TabAnchor, Tab } from '@skeletonlabs/skeleton';

	export let username: string | null = null;
	export let groups: readonly string[] = [];
	import { page } from '$app/stores';
	import { CircleUser } from 'lucide-svelte';
	import { sdsLinks } from '$lib/data/navLinks';

	export let currentTile: number = 0;

	import { onNavigate } from '$app/navigation';
	import { SDS_LOGIN_URL } from '$lib/config';

	onNavigate((params) => {
		if (params.to?.url.pathname.includes('/sds')) {
			currentTile = 0;
		}
	});

	let userLinks: typeof sdsLinks = [];
	$: {
		userLinks = [];
		for (const linkGroup of sdsLinks) {
			const allLinks = linkGroup.links.filter((link) =>
				groups.some((group) => link.groupNeeded.includes(group))
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
	}
	$: activeGroup = userLinks.find((linkGroup) => linkGroup.value === currentTile) || { links: [] };
</script>

{#if currentTile !== 0 && userLinks[currentTile - 1].links.length > 0}
	<div class="bg-surface-50-900-token">
		<section
			class="p-4 pt-4 space-y-4 w-screen overflow-y-auto bg-surface-100-800-token rounded-container-token"
		>
			<nav class="list-nav max-h-96">
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
								<span class="flex-auto">{link.label}</span>
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
	</div>
{/if}

{#if $page.data.username}
	<TabGroup
		justify="justify-left"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		flex="flex-1 lg:flex-none"
		rounded=""
		border=""
		class="bg-surface-100-800-token w-full"
	>
		{#each userLinks as tileLinks}
			{#if tileLinks.links.length > 0}
				<TabAnchor
					bind:group={currentTile}
					selected={currentTile == tileLinks.value}
					name={tileLinks.id}
					value={tileLinks.value}
					title={tileLinks.id}
					on:click={() => {
						if (currentTile == tileLinks.value) {
							currentTile = 0;
						} else {
							currentTile = tileLinks.value;
						}
					}}
				>
					<svelte:fragment slot="lead">
						<div class="flex justify-center items-center">
							<svelte:component this={tileLinks.icon} size={'1.5rem'}></svelte:component>
						</div>
					</svelte:fragment>
					<span>{tileLinks.name}</span>
				</TabAnchor>
			{/if}
		{/each}

		<TabAnchor href={SDS_LOGIN_URL} title="Account"
			><svelte:fragment slot="lead">
				<div class="flex justify-center items-center">
					<CircleUser size={'1.5rem'} />
				</div>
			</svelte:fragment>{username ?? 'Guest'}</TabAnchor
		>
	</TabGroup>
{/if}
