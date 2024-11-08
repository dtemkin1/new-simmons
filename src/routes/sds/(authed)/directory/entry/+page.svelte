<script lang="ts">
	import type { PageData } from './$types';
	import DirectoryEntry from '$lib/components/DirectoryEntry.svelte';
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import { base } from '$app/paths';
	import { ArrowLeft, Pencil, Trash } from 'lucide-svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="flex h-full flex-col items-center justify-center space-y-4 p-4">
	{#await data.user}
		<div><ProgressRing value={null} /></div>
	{:then user}
		{#if !user}
			<p>Entry not found.</p>
			<a href="{base}/sds/directory" class="btn preset-filled">
				<ArrowLeft />
				<span>Back to Directory</span>
			</a>
		{:else}
			<DirectoryEntry userInfo={user} />
			<div class="flex flex-row space-x-4">
				<a href="{base}/sds/directory" class="btn preset-filled">
					<ArrowLeft />
					<span>Back to Directory</span>
				</a>
				<a
					href="{base}/sds/rac/modify?username={user.username}"
					class="btn preset-filled-warning-500"
				>
					<Pencil />
					<span>Edit Entry</span>
				</a>
				<a
					href="{base}/sds/rac/remove?username={user.username}"
					class="btn preset-filled-error-500"
				>
					<Trash />
					<span>Delete Entry</span>
				</a>
			</div>
		{/if}
	{/await}
</div>
