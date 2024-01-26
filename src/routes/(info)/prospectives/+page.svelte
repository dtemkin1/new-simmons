<script lang="ts">
	import i3_video from '$lib/assets/i3.mp4';
	// import i3_captions from '$lib/assets/i3_captions.srt';
	import i3_thumbnail from '$lib/assets/i3_thumbnail.avif';

	import { base } from '$app/paths';

	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	interface eventType {
		time: string;
		event: string;
		location: string;
	}

	interface scheduleType {
		date: Date;
		events: eventType[];
	}

	const rawData: { year: Number; schedule: scheduleType[] } = {
		year: 2019,
		schedule: [
			{
				date: new Date('April 11, 2019'),
				events: [
					{
						time: '2:30PM-4:00PM',
						event: 'Cinammon Roll Making + Tea Party',
						location: 'Late Night Cafe'
					},
					{
						time: '5:00PM-8:00PM',
						event: 'Escape the Room',
						location: 'Mailbox Lounge'
					},
					{
						time: '5:00PM-8:30PM',
						event: 'Giant Stuff, mini food',
						location: 'Mailbox Lounge'
					},
					{
						time: '6:00PM-7:00PM',
						event: 'Dumpling Party',
						location: 'Late Night Cafe'
					},
					{
						time: '10:00PM-1:00AM',
						event: 'Late Night Nugs + Smash Bros',
						location: 'Party Room'
					},
					{
						time: '11:00PM-12:00AM',
						event: 'Cheesecake & Sporcle',
						location: 'Multi Purpose Room'
					}
				]
			},
			{
				date: new Date('April 12, 2019'),
				events: [
					{
						time: '8:00AM-8:30AM',
						event: 'Early Morning Run',
						location: 'Late Night Cafe'
					},
					{
						time: '8:30AM-10:00AM',
						event: 'Pancake Breakfast I',
						location: 'Late Night Cafe'
					},
					{
						time: '12:00PM-2:00PM',
						event: 'Grill Fill Chill + T-Shirt and Stencils',
						location: 'Simmons Front Lawn'
					},
					{
						time: '3:30PM-5:00PM',
						event: 'Birthday Fest',
						location: 'Party Room'
					},
					{
						time: '3:30PM-5:30PM',
						event: 'Capture the Sardines',
						location: 'Mailbox Lounge'
					},
					{
						time: '6:00PM-7:30PM',
						event: 'Pretzels and Puppies',
						location: 'Late Night Cafe'
					},
					{
						time: '10:00PM-1:AM',
						event: 'Board Games and Ice Cream',
						location: 'Simmons Sleepover Soiree'
					}
				]
			},
			{
				date: new Date('April 13, 2019'),
				events: [
					{
						time: '8:30AM-11:00AM',
						event: 'Rainbow Breakfast',
						location: 'Late Night Cafe'
					},
					{
						time: '11:00AM-12:00PM',
						event: 'Head of House Study Break',
						location: 'Head of House Apartment'
					},
					{
						time: '12:00PM-2:00PM',
						event: 'Pokemon Cookies and Chill',
						location: 'Late Night Cafe'
					},
					{
						time: '12:00PM-2:00PM',
						event: 'Scavenger Hunt',
						location: 'Late Night Cafe'
					},
					{
						time: '3:00PM-4:30PM',
						event: 'Scootah Hockey',
						location: 'Simmons Dining'
					},
					{
						time: '4:30PM-6:00PM',
						event: 'Murder Mystery',
						location: 'Mailbox Lounge'
					},
					{
						time: '7:30PM-8:30PM',
						event: 'Mac & Cheese vs. Ramen',
						location: 'Late Night Cafe'
					},
					{
						time: '8:30PM-10:30PM',
						event: 'Lounge Exploration',
						location: 'Simmons Lounges'
					},
					{
						time: '9:00PM-10:00PM',
						event: 'Swing Dancing',
						location: 'Multi Purpose Room'
					},
					{
						time: '9:00PM-1:00AM',
						event: 'Puzzle Hunt',
						location: 'Simmons Dining'
					},
					{
						time: '12:00AM-1:00AM',
						event: 'Queer Talk',
						location: 'TV Lounge'
					}
				]
			},
			{
				date: new Date('April 14, 2019'),
				events: [
					{
						time: '8:30AM-11:00AM',
						event: 'Pancake Breakfast: A New Batch of Freshmen',
						location: 'Late Night Cafe'
					}
				]
			}
		]
	};

	const dateMaker = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	});
</script>

<h1 class="h1">Welcome, Prospectives (and freshmen)!</h1>

<p class="text-lg">
	Simmons Hall is an MIT dormitory that houses 340 awesome undergraduates, 5,538 windows, and an
	unknown population of velociraptors. It's a phenomenal place to call home during your time at the
	Institute, and we can't wait to show you why.
</p>

<!-- svelte-ignore a11y-media-has-caption -->
<video
	class="h-full w-full rounded-container-token max-w-[720px]"
	preload="none"
	controls
	poster={i3_thumbnail}
>
	<source src={i3_video} type="video/mp4" />
	<!-- <track kind="captions" src={i3_captions} srclang="en" label="English" /> -->
</video>

<a href="{base}/videos" class="btn variant-filled-primary">More Simmons Videos (+ Past i3s)</a>

<h1 class="h1">CPW {rawData.year} Event Schedule</h1>
{#each rawData.schedule as { date, events }}
	<h2 class="h2">
		{dateMaker.format(date)}
	</h2>
	<Table
		regionCell="!whitespace-normal"
		source={{
			head: ['Time', 'Event', 'Location'],
			body: tableMapperValues(events, ['time', 'event', 'location'])
		}}
	/>
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
