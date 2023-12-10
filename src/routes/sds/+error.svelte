<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center p-4">
	<div class="flex flex-col items-center h-full gap-4 container self-center">
		{#if $page.status === 404}
			<h1 class="h1">Not found <span class="text-surface-500-400-token">:(</span></h1>
			<p>Sorry, but the page you were trying to view does not exist.</p>
			<p>It looks like this was the result of either:</p>
			<ul class="list-disc mx-4 px-4 py-2">
				<li>a mistyped address</li>
				<li>an out-of-date link</li>
			</ul>
		{:else if $page.error}
			<h1>{$page.status}: {$page.error.message}</h1>
		{/if}
	</div>
</div>
