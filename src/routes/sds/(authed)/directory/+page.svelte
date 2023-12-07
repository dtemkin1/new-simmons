<script lang="ts">
	let firstname = '';
	let lastname = '';
	let title = '';
	let username = '';
	let room = '';
	let year = '';
	let lounge = '';
	let gra = '';

	let submitSearch = () => {};
	// TODO: replace select values with values from DB
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
				<option value="2022">2022</option>
				<option value="2023">2023</option>
				<option value="2024">2024</option>
				<option value="2025">2025</option>
				<option value="2026">2026</option>
				<option value="2027">2027</option>
				<option value="No year">No year</option>
			</select>
		</label>
		<label class="label">
			<span>Lounge</span>
			<select class="select" title="lounge" bind:value={lounge}>
				<option selected value="">[Any]</option>
				<option value="lounge-1">lounge-1: Foodstuff</option>
				<option value="lounge-51137">lounge-51137: simbeans</option>
				<option value="lounge-6969">lounge-6969: The Edgerton Alliance</option>
				<option value="lounge-apegangllc">lounge-apegangllc: Founding Fathers</option>
				<option value="lounge-atp">lounge-atp: ⚡️ATP bring the energy⚡️</option>
				<option value="lounge-b3">lounge-b3: B^3</option>
				<option value="lounge-brainrot">lounge-brainrot: brainrot</option>
				<option value="lounge-ecdiasporavictimsplusfriendsofec"
					>lounge-ecdiasporavictimsplusfriendsofec: oh no the sponge is on fire</option
				>
				<option value="lounge-gayagend">lounge-gayagend: The Gay Agenda</option>
				<option value="lounge-hoots">lounge-hoots: Holy Order of the Sponge</option>
				<option value="lounge-ihtfs">lounge-ihtfs: IHTFs</option>
				<option value="lounge-launderers">lounge-launderers: Lounge 5</option>
				<option value="lounge-loungebrekk">lounge-loungebrekk: Brekky Haulers</option>
				<option value="lounge-loungefab">lounge-loungefab: FAB</option>
				<option value="lounge-mindcr4ft">lounge-mindcr4ft: mind craft</option>
				<option value="lounge-o4tx">lounge-o4tx: Rolling Oatmeal</option>
				<option value="lounge-paulandbensroom">lounge-paulandbensroom: Paul and Ben's Room</option>
				<option value="lounge-penttalk">lounge-penttalk: The Penthouse</option>
				<option value="lounge-plsbeedskmn">lounge-plsbeedskmn: Αlpha Σimmons Σimmons (ΑΣΣ)</option>
				<option value="lounge-pnuts">lounge-pnuts: PNuts</option>
				<option value="lounge-rpm">lounge-rpm: RPM</option>
				<option value="lounge-ufc">lounge-ufc: Ume Fanclub</option>
				<option value="lounge-welivein">lounge-welivein: a society</option>
				<option value="lounge-winglng">lounge-winglng: wing lounge</option>
				<option value="lounge-youseethatlounge"
					>lounge-youseethatlounge: &quot;You see that lounge up there on the fourth floor, eighteen
					windows from this side of the building? Ya see that lounge there? That's my lounge. But I
					didn't join it.&quot;</option
				>
			</select>
		</label>
		<label class="label">
			<span>GRA</span>
			<select class="select" title="gra" bind:value={gra}>
				<option selected value="">[Any]</option>
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
