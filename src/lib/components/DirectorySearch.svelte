<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	let {
		data = { years: [], lounges: [], gras: [] },
		enhanceFunc,
		actionLocation
	}: {
		data: {
			years: readonly (number | null)[];
			lounges: readonly { lounge: string | null; description: string | null }[];
			gras: readonly (string | null)[];
		};
		enhanceFunc?: SubmitFunction;
		actionLocation?: string;
	} = $props();
</script>

<form
	class="card p-8 flex flex-col space-y-4"
	method="POST"
	use:enhance={enhanceFunc}
	action={actionLocation}
	id="directory-search"
>
	<h2 class="h2 self-center text-center">Simmons Hall Directory</h2>
	<label class="label">
		<span>Firstname</span>
		<input class="input" name="firstname" type="search" autocomplete="given-name" />
	</label>
	<label class="label">
		<span>Lastname</span>
		<input class="input" name="lastname" type="search" autocomplete="family-name" />
	</label>
	<label class="label">
		<span>Title</span>
		<input class="input" name="title" type="search" autocomplete="honorific-prefix" />
	</label>
	<label class="label">
		<span>Username</span>
		<input class="input" name="username" type="search" autocomplete="username" />
	</label>
	<label class="label">
		<span>Room</span>
		<input class="input" name="room" type="search" />
	</label>
	<label class="label">
		<span>Year</span>
		<select class="select" name="year">
			<option selected value="">[Any]</option>
			{#each data.years as year}
				<option value={year}>{year}</option>
			{/each}
			<option value="No year">No year</option>
		</select>
	</label>
	<label class="label">
		<span>Lounge</span>
		<select class="select" name="lounge">
			<option selected value="">[Any]</option>
			{#each data.lounges as lounge}
				<option value={lounge.lounge}>{lounge.lounge}: {lounge.description}</option>
			{/each}
		</select>
	</label>
	<label class="label">
		<span>GRA</span>
		<select class="select" name="gra">
			<option selected value="">[Any]</option>
			{#each data.gras as gra}
				<option value={gra}>{gra}</option>
			{/each}
		</select>
	</label>
	<button class="btn variant-filled-success">Search</button>
	<p>
		Enter data in any or all of the above fields. <code class="code">%</code> matches anything -
		e.g. username <code class="code">dram%</code> matches <code class="code">dramage</code>.
	</p>
</form>
