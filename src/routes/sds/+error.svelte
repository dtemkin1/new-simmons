<script lang="ts">
	import { page } from '$app/stores';
	import { SDS_BASE_URL } from '$lib/config';
</script>

<div
	class="bg-surface-50-900 align-center flex h-full flex-col items-center justify-center gap-2 p-4 text-center"
>
	<h1 class="h1">
		{$page.status}: {$page.error?.message}
		<span>😔</span>
	</h1>
	{#if $page.status === 403}
		<p>
			You do not have the proper privileges to access this page. If you believe this is an error,
			you can try to log in again.
		</p>
	{/if}
	<p>
		Please <a class="anchor" href="mailto:simmons-tech@mit.edu">contact the Tech Chairs</a> to
		report this incident, and
		<a class="anchor" href={SDS_BASE_URL}>click here to return to the Simmons DB</a>.
	</p>
	<img
		src="https://http.cat/{$page.status}.jpg"
		alt="Cat Error {$page.status} Picture"
		class="w-96 max-w-full"
	/>
</div>
