<script lang="ts">
	import type { PageData } from './$types';
	import DirectoryEntry from '$lib/components/DirectoryEntry.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';
	import { ArrowLeft, Pencil, Trash } from 'lucide-svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="flex items-center justify-center h-full flex-col p-4 space-y-4">
	{#await data.user}
		<div><ProgressRadial /></div>
	{:then user}
		{#if !user}
			<p>Entry not found.</p>
			<a href="{base}/sds/directory" class="btn variant-filled">
				<ArrowLeft />
				<span>Back to Directory</span>
			</a>
		{:else}
			<DirectoryEntry userInfo={user} />
			<div class="flex flex-row space-x-4">
				<a href="{base}/sds/directory" class="btn variant-filled">
					<ArrowLeft />
					<span>Back to Directory</span>
				</a>
				<a href="{base}/sds/rac/modify?username={user.username}" class="btn variant-filled-warning">
					<Pencil />
					<span>Edit Entry</span>
				</a>
				<a href="{base}/sds/rac/remove?username={user.username}" class="btn variant-filled-error">
					<Trash />
					<span>Delete Entry</span>
				</a>
			</div>
		{/if}
	{/await}
</div>
