<script lang="ts">
	import type { Office, Person } from '$lib/data/simGov';
	import type { EnhancedImgAttributes } from '@sveltejs/enhanced-img';

	let {
		office,
		people,
		img
	}: { office: Office; people: Person[]; img: EnhancedImgAttributes['src'] } = $props();
</script>

<div class="bg-surface-50-900-token p-8">
	<header>{office.full_title}</header>
	<div class="flex space-x-4">
		<div class="w-16 h-16 bg-surface-50-800-token rounded-full overflow-hidden">
			<enhanced:img src={img} alt={office.full_title}></enhanced:img>
		</div>
		<div class="space-y-1">
			{#each people as { full_name, email, phone, year }}
				<div>
					<div>{`${full_name}${year ? ` '${year.slice(-2)}` : ''}`}</div>
					<div>{email}</div>
					<div>{phone}</div>
				</div>
			{/each}
		</div>
	</div>
</div>
