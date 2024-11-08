<script lang="ts">
	import type { Office, Person } from '$lib/data/simGov';
	import type { EnhancedImgAttributes } from '@sveltejs/enhanced-img';

	interface Props {
		office: Office;
		people: Person[];
		img: EnhancedImgAttributes['src'];
	}

	let { office, people, img }: Props = $props();
</script>

<header>{office.full_title}</header>
<div class="flex space-x-4">
	<div class="bg-surface-50-800 h-16 w-16 overflow-hidden rounded-full">
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
