<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	interface Props {
		data: {
			years: readonly (number | null)[];
			lounges: readonly { lounge: string | null; description: string | null }[];
			gras: readonly (string | null)[];
		};
		enhanceFunc?: SubmitFunction;
		actionLocation?: string;
	}

	let {
		data = { years: [], lounges: [], gras: [] },
		enhanceFunc,
		actionLocation
	}: Props = $props();
</script>

<form
	class="card border-surface-200-800 preset-filled-surface-100-900 flex flex-col space-y-4 border p-4"
	method="POST"
	use:enhance={enhanceFunc}
	action={actionLocation}
	id="directory-search"
>
	<h2 class="h2 self-center text-center">Simmons Hall Directory</h2>
	<label class="label">
		<span class="label-text">Firstname</span>
		<input class="input" name="firstname" type="search" autocomplete="given-name" />
	</label>
	<label class="label">
		<span class="label-text">Lastname</span>
		<input class="input" name="lastname" type="search" autocomplete="family-name" />
	</label>
	<label class="label">
		<span class="label-text">Title</span>
		<input class="input" name="title" type="search" autocomplete="honorific-prefix" />
	</label>
	<label class="label">
		<span class="label-text">Username</span>
		<input class="input" name="username" type="search" autocomplete="username" />
	</label>
	<label class="label">
		<span class="label-text">Room</span>
		<input class="input" name="room" type="search" />
	</label>
	<label class="label">
		<span class="label-text">Year</span>
		<select class="select" name="year">
			<option selected value="">[Any]</option>
			{#each data.years as year (year)}
				<option value={year}>{year}</option>
			{/each}
			<option value="No year">No year</option>
		</select>
	</label>
	<label class="label">
		<span class="label-text">Lounge</span>
		<select class="select" name="lounge">
			<option selected value="">[Any]</option>
			{#each data.lounges as lounge (lounge.lounge)}
				<option value={lounge.lounge}>{lounge.lounge}: {lounge.description}</option>
			{/each}
		</select>
	</label>
	<label class="label">
		<span class="label-text">GRA</span>
		<select class="select" name="gra">
			<option selected value="">[Any]</option>
			{#each data.gras as gra (gra)}
				<option value={gra}>{gra}</option>
			{/each}
		</select>
	</label>
	<button class="btn preset-filled-success-500">Search</button>
	<p>
		Enter data in any or all of the above fields. <code class="code">%</code> matches anything -
		e.g. username <code class="code">dram%</code> matches <code class="code">dramage</code>.
	</p>
</form>
