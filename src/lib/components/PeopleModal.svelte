<script lang="ts">
	import type { Office, Person } from '$lib/data/simGov';

	export let office: Office;
	export let people: Person[];
</script>

<div class="bg-surface-50-900-token p-8">
	<header>{office.full_title}</header>
</div>
