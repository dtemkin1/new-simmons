<script lang="ts">
	let elemCarousel: HTMLDivElement;

	import image1 from '$lib/assets/carousel/image1.jpg';
	import image2 from '$lib/assets/carousel/image2.jpg';
	import image3 from '$lib/assets/carousel/image3.jpg';
	import image4 from '$lib/assets/carousel/image4.jpg';
	import image5 from '$lib/assets/carousel/image5.jpg';
	import image6 from '$lib/assets/carousel/image6.jpg';
	import image7 from '$lib/assets/carousel/image7.jpg';
	import image8 from '$lib/assets/carousel/image8.jpg';
	import image9 from '$lib/assets/carousel/image9.jpg';

	const images = [
		{
			image: image1,
			title: 'Simmons Hall',
			description:
				'Simmons Hall is an MIT Undergraduate Residence Hall. It is home to 340 undergraduates, 10 graduate students, 2 MIT professors and their families, and 5 Resident Scholars who are visiting MIT for the academic year.'
		},
		{
			image: image2,
			title: 'During Construction',
			description:
				'Simmons Hall was opened to the MIT community in 2002. Designed by Steven Holl, it has won multiple awards for its unique architectural features.'
		},
		{
			image: image3,
			title: 'Dining',
			description:
				'There are 5 dining halls on the MIT campus. Simmons Hall has the best, open 7 days a week for breakfast and dinner. We have a smaller dining facility with personable staff that we love.'
		},
		{
			image: image4,
			title: 'Gym',
			description:
				'A well equipped, two story, gym with a phenomenal view of the Boston skyline. Use the elliptical, treadmill, free weights, yoga station, indoor rower, or the massive two story LED display built by residents.'
		},
		{
			image: image5,
			title: 'Ball Pit',
			description:
				'<a target="_blank" class="anchor" href="http://xkcd.com/150/">http://xkcd.com/150/</a>'
		},
		{
			image: image6,
			title: 'Multi-Purpose Room',
			description:
				'Simmons Hall houses a giant two story Multi-Purpose Room (MPR), which has seating for over 200 people and is equipped with a 12 foot projection screen, surround sound system, Blu-Ray player, and D<small>IREC</small>TV.'
		},
		{
			image: image7,
			title: 'Lounges',
			description:
				'Simmons has community lounges for studying and play. All lounges are equipped with 42” LCD TVs, Rokus, and PS3s. During the week residents use them late into the night to work on problem sets, and on weekends they turn into rooms for movies and games.'
		},
		{
			image: image8,
			title: 'Rooms',
			description:
				"Simmons Hall consists of doubles and singles located throughout the building's ten floors and three towers. Three residents generally share a bathroom."
		},
		{
			image: image9,
			title: 'Laundry',
			description:
				'Simmons has laundry rooms on almost every floor. Each laundry room has two washers and two dryers.'
		}
	];

	function carouselLeft(): void {
		const x =
			elemCarousel.scrollLeft === 0
				? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
				: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
		elemCarousel.scroll(x, 0);
	}

	function carouselRight(): void {
		const x =
			elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
				? 0 // loop
				: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
		elemCarousel.scroll(x, 0);
	}
</script>

<h1 class="h1">About</h1>
<div class="p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
	<!-- Button: Left -->
	<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
		<i class="fa-solid fa-arrow-left" />
	</button>
	<!-- Full Images -->
	<div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
		{#each images as image}
			<div class="snap-center h-[500px] min-w-[800px] rounded-container-token relative">
				<img src={image.image} alt={image.title} />
				<div class="absolute bottom-0 px-4 py-3 bg-surface-500/90 w-full">
					<h3 class="h3">{@html image.title}</h3>
					{@html image.description}
				</div>
			</div>
		{/each}
	</div>
	<!-- Button: Right -->
	<button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
		<i class="fa-solid fa-arrow-right" />
	</button>
</div>
<h2 class="h2">Simmons Government</h2>
<p>
	Simmons has its own unique government structure. From our student led initiatives to our unique
	social "lounge" structure to our open house meetings and proposals, we have so much to get
	involved with.
</p>

<p>
	Contact the Simmons officers at <a class="anchor" href="mailto:officers@simmons.mit.edu"
		>officers@simmons.mit.edu</a
	>.
</p>
<h2 class="h2">Heads Of House</h2>
<p>
	The Head of House team consists of <a class="anchor" href="mailto:jessig@mit.edu"
		>John Essigmann</a
	>, Professor of Chemistry and Biological Engineering;
	<a class="anchor" href="mailto:emessig@mit.edu">Dr. Ellen Essigmann</a>; and
	<a class="anchor" href="mailto:srhall@mit.edu">Steven Hall</a>, Professor of Aeronautics and
	Astronautics.
</p>

<p>
	The Head of House manage and maintain engagement to connect students, GRAs, MIT faculty, and other
	community members. They provide academic and personal guidance to students to help them get the
	most out of their time at MIT. The Heads of House also manage the Residential Scholars Program at
	Simmons Hall.
</p>

<h2 class="h2">Graduate Resident Advisors (GRAs)</h2>
<!--
old_desc
      <p>GRAs (previously known as GRTs) foster a living environment 
      that is safe, welcoming, and inclusive of all
      community members. This responsibility includes encouraging
      personal growth, providing outlets for managing stress, and
      facilitating positive interpersonal relationships. GRAs are also
      responsible for implementing community standards, enhancing
      security, and promoting mutual respect among the residents. At
      Simmons Hall they can also be found flipping pancakes at the
      famous Simmons Hall Study Breaks and organizing floor-wide
      events.</p>
-->
<p>
	The Graduate Resident Advisor (GRA) is a live-in graduate student role designed to support and
	enhance the living experience for undergraduates at MIT. A GRA works to foster a supportive, safe,
	and positive living and learning environment for all residential students. GRAs are mentors and
	educators who encourage personal growth, provide outlets for managing stress, and facilitate
	positive interpersonal relationships. GRAs are responsible for fostering an inclusive community
	built upon shared community standards and mutual respect.
</p>

<h2 class="h2">Area Director (AD)</h2>
<p>
	<a class="anchor" href="mailto:knshann@mit.edu">Kristen Shannon</a> is the AD assigned to Simmons Hall.
	She is responsible for providing educational programming, facilitating event planning, and working
	with the Simmons Government to promote leadership.
</p>

<h2 class="h2">House Manager</h2>
<p>
	<a class="anchor" href="mailto:nikah@mit.edu.edu">Nika Hollingsworth</a> is the Simmons House Manager.
	The house manager is responsible for the operational aspects of the building. She oversees front desk
	operations as well as custodial and maintenance staff. Her goal is to make Simmons a safe, secure,
	and pleasant place to live.
</p>
<p>
	Nika loves to see and meet students! Her office is in the mailbox lounge, and is almost always
	open. <br /> Her hours are Monday-Friday, 8:30 am – 4:30 pm.
</p>

<h2 class="h2">Residential Scholars Program</h2>
<p>
	Inspired by the Report of the MIT Taskforce on Student Life and Learing, The Founders Group of
	Simmons Hall envisioned a combined residential and multi-use environment in which the
	undergraduates of MIT could interact with other members of the community. Simmons includes many
	common spaces on the first floor that are intended to welcome our colleagues from across campus
	and our neighbors from Cambridge.
</p>

<p>
	The Residential Scholars program is meant to enrich MIT with new ideas and perspectives from
	people from elsewhere who are eager to share their wealth of life experiences. The program is
	composed of faculty members on sabbatical leave from other institutions,international scholars,
	artists, industry professionals, and a limited number of MIT faculty members who have shown, by a
	history of contributions to the community, a reason to participate in this program.
</p>

<p>
	The program is based in Simmons Hall but services the entire community. The Scholars, working with
	the permanent House Team, typically run programs on Friday evenings. Since its inception in 2003,
	the financial resources to support the program primarily have been provided by the scholarly
	allowance associated with the William and Betsy Leitch Professorship, which is held by John
	Essigmann, one of the Heads of House of Simmons Hall. The community is indebted to the Leitchs for
	their generous support of this program.
</p>

<!-- <p>To enquire about eligibility for the Residential Scholars Program, please contact srhall@mit.edu.  The application form is  <a href="Residential_Scholar_Application_2013-2.doc" download> here </a>. </p>


      <a target="_blank" href="https://simresidentscholars.mit.edu">More about the Residential Scholars Program</a> -->

<h2 class="h2">The House Team</h2>
<p>
	The Heads of House, Area Director, House Manager, and GRAs form the House Team, which provide
	academic and personal guidance to students to help them get the most out of their time at MIT. The
	House Team fosters a living environment that is safe, welcoming, and inclusive of all community
	members. The Heads of House and Area Director may represent Simmons students on various committees
	and task forces in addition to their regular duties.
</p>

<h2 class="h2">Additional Information</h2>
<ul class="list">
	<li>
		<span>
			<a class="anchor" target="_blank" href="https://essigmann.mit.edu/"
				>Head of House John Essigmann</a
			>
		</span>
	</li>
	<li>
		<span>
			<a
				class="anchor"
				target="_blank"
				href="http://aeroastro.mit.edu/faculty-research/faculty-list/steven-r-hall"
			>
				Associate Head of House Steve Hall
			</a>
		</span>
	</li>
</ul>
