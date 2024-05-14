<script lang="ts">
	import type { Office, Person } from '$lib/data/simGov';

	let { office, people, img }: { office: Office; people: Person[]; img: Promise<any> } = $props();
</script>

<div class="bg-surface-50-900-token p-8">
	<header>{office.full_title}</header>
	<div class="flex space-x-4">
		<div class="w-16 h-16 bg-surface-50-800-token rounded-full overflow-hidden">
			{#await img}
				<enhanced:img src="../assets/officers/photo.jpg" alt={name}></enhanced:img>
			{:then userImg}
				<enhanced:img src={userImg.default} alt={name}></enhanced:img>
			{/await}
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
