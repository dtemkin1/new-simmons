<script lang="ts">
	import type { PageData } from './$types';
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<div class="flex h-full w-full flex-col items-center justify-center p-4 text-center">
	{#await data.packages}
		<ProgressRing value={null} />
	{:then packageData}
		{#if packageData.num_packages && parseInt(packageData.num_packages) > 0}
			<p>
				You have {packageData.num_packages} package{parseInt(packageData.num_packages) > 1
					? 's'
					: ''} waiting at desk, {parseInt(packageData.num_packages) > 1
					? 'some of which have'
					: 'which has'}
				been there since at least {packageData.earliest_sure &&
					dateFormatter.format(new Date(packageData.earliest_sure))}. {#if packageData.num_perishable && parseInt(packageData.num_perishable) > 0}
					{packageData.num_perishable}
					of them {parseInt(packageData.num_perishable) > 1 ? 'are' : 'is'} perishable.
				{/if}
			</p>
		{:else}
			<p>
				You have no packages waiting at desk. You can also view packages on your <a
					class="anchor"
					href="https://mit.starrezhousing.com/StarRezPortalX">MIT Housing portal</a
				>.
			</p>
		{/if}
	{/await}
</div>
