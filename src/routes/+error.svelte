<script>
	import { page } from '$app/stores';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="card p-8 flex flex-col space-y-4 max-w-5xl m-8">
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
