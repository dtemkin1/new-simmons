<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	let { handler }: { handler: DataHandler } = $props();
	let value: string = $state('');
</script>

<input
	class="input sm:w-64 w-36"
	type="search"
	placeholder="Search..."
	bind:value
	oninput={() => handler.search(value)}
/>
