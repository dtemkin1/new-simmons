<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	let { children } = $props();

	let current_page = $derived($page.url.pathname);

	const pages = [
		{
			name: 'About the Program',
			url: `${base}/scholars`
		},
		{
			name: 'Current Scholars',
			url: `${base}/currentScholars`
		},
		{
			name: 'Scholar Emeriti',
			url: `${base}/scholarEmeriti`
		},
		{
			name: 'Bill and Betsy Leitch',
			url: `${base}/leitches`
		},
		{
			name: 'Upcoming Events',
			url: `${base}/upcomingScholarEvents`
		},
		{
			name: 'Past Events',
			url: `${base}/pastScholarEvents`
		}
	];
</script>

<h1 class="h1">Resident Scholar Program</h1>
<nav
	class="btn-group flex-col flex-wrap justify-center p-2 preset-outlined-surface-200-800 md:flex-row"
>
	{#each pages as page}
		<a
			type="button"
			class="btn"
			href={page.url}
			class:!preset-filled={page.url === current_page}
			class:hover:preset-tonal={page.url !== current_page}
		>
			{page.name}
		</a>
	{/each}
</nav>

{@render children()}
