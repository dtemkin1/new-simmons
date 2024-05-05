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
	class="btn-group-vertical lg:btn-group variant-filled justify-center w-full lg:w-min self-center"
>
	{#each pages as page}
		<a
			type="button"
			href={page.url}
			class:!variant-filled-primary={page.url === current_page}
			class:hover:variant-soft-primary={page.url !== current_page}
		>
			{page.name}
		</a>
	{/each}
</div>

{@render children()}
