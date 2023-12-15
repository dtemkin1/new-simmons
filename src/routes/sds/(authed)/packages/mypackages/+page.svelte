<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="flex flex-col w-full h-full space-y-4 items-center justify-center">
	{#if data.num_packages > 0}
		<p>
			You have {data.num_packages} package{data.num_packages > 1 ? 's' : ''} waiting at desk, {data.num_packages >
			1
				? 'some of which have'
				: 'which has'} been there since at least {data.earliest_sure}. {#if data.num_perishable > 0}
				{data.num_perishable}
				of them {data.num_perishable > 1 ? 'are' : 'is'} perishable.
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
</div>
