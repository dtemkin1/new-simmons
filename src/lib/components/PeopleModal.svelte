<script lang="ts">
	import type { Office, Person } from '$lib/data/simGov';

	let {office, person}: {office: Office, person: Person} = $props();
</script>

<div class="bg-surface-50-900-token p-8">
	<header>{office.full_title}</header>
</div>
