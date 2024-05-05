<script lang="ts">
	import { base } from '$app/paths';

	let {data = { years: [], lounges: [], gras: [] }}: {data: {
		years: readonly (number | null)[];
		lounges: readonly { lounge: string | null; description: string | null }[];
		gras: readonly (string | null)[];
	}} = $props();
</script>

<form
	class="card p-8 flex flex-col space-y-4"
	method="POST"
	action="{base}/sds/directory/list"
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
			{#await data.years then years}
				{#each years as year}
					<option value={year}>{year}</option>
				{/each}
			{/await}
			<option value="No year">No year</option>
		</select>
	</label>
	<label class="label">
		<span>Lounge</span>
		<select class="select" name="lounge">
			<option selected value="">[Any]</option>
			{#await data.lounges then lounges}
				{#each lounges as lounge}
					<option value={lounge.lounge}>{lounge.lounge}: {lounge.description}</option>
				{/each}
			{/await}
		</select>
	</label>
	<label class="label">
		<span>GRA</span>
		<select class="select" name="gra">
			<option selected value="">[Any]</option>
			{#await data.gras then gras}
				{#each gras as gra}
					<option value={gra}>{gra}</option>
				{/each}
			{/await}
		</select>
	</label>
	<button class="btn variant-filled-success">Search</button>
	<p>
		Enter data in any or all of the above fields. <code class="code">%</code> matches anything -
		e.g. username <code class="code">dram%</code> matches <code class="code">dramage</code>.
	</p>
</form>
