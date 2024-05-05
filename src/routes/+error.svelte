<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	import { redirect } from '@sveltejs/kit';

	let inDB = $derived($page.url.pathname.includes(`${base}/sds`));
	let url = $derived($page.url.pathname);
	let errorCode = $derived($page.status);

	$effect(() => {
		if (url.includes('.php') && errorCode === 404) {
			redirect(302, url.replace('.php', ''));
		}
	});
</script>

{#if !inDB}
	<div class="h-full w-full img-bg">
		<div class="container h-full mx-auto flex justify-center items-center">
			<div class="card p-8 flex flex-col space-y-2 max-w-5xl m-8 bg-surface-50-900-token">
				<h1 class="h1">
					{$page.status}: {$page.error?.message}
					<span class="text-surface-500-400-token">😔</span>
				</h1>
				{#if $page.status === 404}
					<p>Sorry, but the page you were trying to view does not exist.</p>
					<p>It looks like this was the result of either:</p>
					<ul class="list-disc list-outside ml-6 py-2">
						<li>a mistyped address</li>
						<li>an out-of-date link</li>
					</ul>
				{/if}
				<p>
					Please <a class="anchor" href="mailto:simmons-tech@mit.edu">contact the Tech Chairs</a> to
					report this incident.
				</p>
				<img
					src="https://http.cat/{$page.status}"
					alt="Cat Error {$page.status} Picture"
					class="max-w-lg"
				/>
			</div>
		</div>
	</div>
{:else}
	<div
		class="bg-surface-50-900-token flex flex-col items-center p-4 justify-center h-full align-center gap-2"
	>
		<h1 class="h1 text-center">
			{$page.status}: {$page.error?.message}
			<span class="text-surface-500-400-token">😔</span>
		</h1>
		{#if $page.status === 404}
			<p class="text-center">Sorry, but the page you were trying to view does not exist.</p>
			<p class="text-center">It looks like this was the result of either:</p>
			<ul class="list-disc list-outside ml-6 py-2">
				<li>a mistyped address</li>
				<li>an out-of-date link</li>
			</ul>
		{:else if $page.status === 403}
			<p>
				You do not have the proper privileges to access this page. If you believe this is an error,
				you can try to log in again.
			</p>
		{/if}
		<p class="text-center">
			Please <a class="anchor" href="mailto:simmons-tech@mit.edu">contact the Tech Chairs</a> to
			report this incident, and
			<a class="anchor" href="{base}/sds">click here</a> to return to the Simmons DB.
		</p>
		<img
			src="https://http.cat/{$page.status}"
			alt="Cat Error {$page.status} Picture"
			class="max-w-lg"
		/>
	</div>
{/if}
