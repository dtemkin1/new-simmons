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
<div
	class="btn-group-vertical w-full justify-center self-center preset-filled lg:btn-group lg:w-min"
>
	{#each pages as page}
		<a
			type="button"
			href={page.url}
			class:!preset-filled-primary-500={page.url === current_page}
			class:hover:preset-tonal-primary-500={page.url !== current_page}
		>
			{page.name}
		</a>
	{/each}
</div>

{@render children()}
