<script lang="ts">
	import type { PageServerData } from './$types';

	let firstname = '';
	let lastname = '';
	let title = '';
	let username = '';
	let room = '';
	let year = '';
	let lounge = '';
	let gra = '';

	export let data: PageServerData;

	let submitSearch = () => {};
	// TODO: make search function
</script>

<div class="flex items-center justify-center h-full">
	<div class="card p-8 flex flex-col space-y-4 m-8">
		<h2 class="h2 self-center">Simmons Hall Directory</h2>
		<label class="label">
			<span>Firstname</span>
			<input class="input" title="firstname" type="search" placeholder="" bind:value={firstname} />
		</label>
		<label class="label">
			<span>Lastname</span>
			<input class="input" title="lastname" type="search" placeholder="" bind:value={lastname} />
		</label>
		<label class="label">
			<span>Title</span>
			<input class="input" title="title" type="search" placeholder="" bind:value={title} />
		</label>
		<label class="label">
			<span>Username</span>
			<input class="input" title="username" type="search" placeholder="" bind:value={username} />
		</label>
		<label class="label">
			<span>Room</span>
			<input class="input" title="room" type="search" placeholder="" bind:value={room} />
		</label>
		<label class="label">
			<span>Year</span>
			<select class="select" title="year" bind:value={year}>
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
			<select class="select" title="lounge" bind:value={lounge}>
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
			<select class="select" title="gra" bind:value={gra}>
				<option selected value="">[Any]</option>
				{#await data.gras then gras}
					{#each gras as gra}
						<option value={gra}>{gra}</option>
					{/each}
				{/await}
				<option value="grt2w">grt2w</option>
				<option value="grt4e">grt4e</option>
				<option value="grt4w">grt4w</option>
				<option value="grt5c">grt5c</option>
				<option value="grt6e">grt6e</option>
				<option value="grt6w">grt6w</option>
				<option value="grt8c">grt8c</option>
				<option value="grt8w">grt8e</option>
				<option value="grt8w">grt8w</option>
				<option value="grt9e">grt9e</option>
			</select>
		</label>
		<button type="button" class="btn variant-filled-success" on:click={submitSearch}>Search</button>
		<p>
			Enter data in any or all of the above fields. <code class="code">%</code> matches anything -
			e.g. username <code class="code">dram%</code> matches <code class="code">dramage</code>.
		</p>
	</div>
</div>
