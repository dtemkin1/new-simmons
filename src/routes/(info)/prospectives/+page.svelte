<script lang="ts">
	import { base } from '$app/paths';

	import type { PageData } from './$types';
	import { process_raw_data, timeMaker } from './rex_process';
	export let data: PageData;

	const rexData = process_raw_data(data.rexData);
</script>

<h1 class="h1">Welcome, Prospectives (and freshmen)!</h1>

<p class="text-lg">
	Simmons Hall is an MIT dormitory that houses 340 awesome undergraduates, 5,538 windows, and an
	unknown population of velociraptors. It's a phenomenal place to call home during your time at the
	Institute, and we can't wait to show you why.
</p>

<div class="flex items-center justify-center flex-col">
	<div class="max-w-[720px] w-full h-full space-y-4">
		<iframe
			class="h-full aspect-video max-w-full rounded-container-token w-[720px] border-0"
			src="https://www.youtube.com/embed/I8srdQN3FYg?si=S8XKefVEezeJpQN0"
			title="YouTube video player"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
		<a href="{base}/videos" class="btn variant-filled-primary w-full">Watch more Simmons videos!</a>
	</div>
</div>

<h1 class="h1">Simmons {data.rexData.name} Schedule</h1>
{#each Object.entries(rexData) as [date, events]}
	<h2 class="h2">
		{date}
	</h2>
	<div class="table-container">
		<table class="table table-compact table-hover">
			<thead>
				<tr>
					<th>Time</th>
					<th>Event</th>
					<th>Location</th>
				</tr>
			</thead>
			<tbody>
				{#each events as row}
					<tr>
						<td class="!whitespace-normal"
							>{`${timeMaker.format(row.start)} – ${timeMaker.format(row.end)}`}</td
						>
						<td class="!whitespace-normal">{row.name}</td>
						<td class="!whitespace-normal">{row.location}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/each}

<h1 class="h1">A Taste of Simmons</h1>
<p class="italic">Written with love by Simmons residents:</p>
<p>
	Stepping through the front entrance, you admire the distinguished architecture and striking design
	of Simmons Hall. Based on a video tour and what you can find online, Simmons is already an
	incredible dorm, with thousands of windows, several terraces, a two-story movie theater, a giant
	ball pit, and dozens of lounges scattered throughout the building. However, Simmons is so much
	more than its facilities. It is home to an extraordinary group of undergraduates constantly doing
	exciting things. A dedicated house team takes care of us like no other, and we have an excellent
	government system, designed for openness and awesomeness.
</p>
<p>
	Moseying down the hallway, you witness the vibrant life in Simmons. Pokemon drawings, physics
	equations, and maps from Game of Thrones adorn the curvy chalk-able walls. Laughter emanates from
	a group playing board games in one lounge and a massive 18.02 pset party fills another. You stop
	by our Housemaster's apartment to grab one of John's oh-so-delicious smoothies, and follow some
	enthusiastic freshmen to see their latest projects in our EE lab and workshop. Checking out a
	movie from front desk for later, you build a new tower out of the blocks in our mailbox lounge,
	and finally settle down in our dining hall to chat with some friendly Sims about life in the
	Sponge.
</p>
<p>
	In an hour, everyone gets up to go to the house meeting, and your curiosity beckons you to follow.
	You grab some dessert, meet some new friends, and end up getting involved in Simmons activities.
	Our bi-weekly house meetings are open to every resident, and any resident can submit a proposal.
	Your imagination is the only limit – we've organized apple farm trips, boat cruises, Red Sox
	games, and Valentine's Day dinners. We've bought telescopes, servers, hammocks, speakers, and TVs.
	We've fostered residents' interests in fitness, cooking, gardening, and circuitry, and we've even
	considered playgrounds, ziplines, and teleporters (not all proposals pass). Doing cool things has
	never been easier than at Simmons.
</p>
<p>
	On the MIT campus, all dorms are excellent, but Simmons is particularly open, diverse, and
	friendly. It's more than a place to live. Remember one thing, if nothing else: know that we call
	Simmons our home, and we welcome you to join us. We can't wait to see you in the fall!
</p>
