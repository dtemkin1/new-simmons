<script lang="ts">
	import '../app.postcss';

	import { page } from '$app/stores';
	import { ToastProvider } from '@skeletonlabs/skeleton-svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title
		>{$page.url.pathname.includes('/sds') ? 'Simmons DB' : 'Simmons Hall'}{$page.data.title
			? ` | ${$page.data.title}`
			: ''}</title
	>
	<meta name="description" content={$page.data.description || 'Welcome to the Sponge!'} />
</svelte:head>

<!-- App Shell -->
<ToastProvider>
	{@render children()}
</ToastProvider>
