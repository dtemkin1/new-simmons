<script lang="ts">
	interface vidDataType {
		title: string;
		link: string;
		beforeDescription?: string;
		afterDescription?: string;
	}

	const vidData: vidDataType[] = [
		{
			title: '2024 i3',
			link: 'https://www.youtube.com/embed/I8srdQN3FYg'
		},
		{
			title: '2023 i3',
			link: 'https://player.vimeo.com/video/829417327'
		},
		{
			title: '2022 i3',
			link: 'https://player.vimeo.com/video/714495748'
		},
		{
			title: '2021 i3',
			link: 'https://player.vimeo.com/video/553018352'
		},
		{
			title: '2020 i3',
			link: 'https://player.vimeo.com/video/417371001'
		},
		{
			title: '2019 i3',
			link: 'https://player.vimeo.com/video/333337451'
		},
		{
			title: '2018 i3',
			link: 'https://www.youtube.com/embed/zF6hUza_sEs',
			beforeDescription: 'Welcome to the Sponge!',
			afterDescription: ''
		},
		{
			title: '2016 i3',
			link: 'https://player.vimeo.com/video/165047310',
			beforeDescription: 'A new paradise',
			afterDescription: ''
		},
		{
			title: '2015 i3',
			link: 'https://www.youtube.com/embed/-PE9Fds84Zg',
			beforeDescription: 'A place beyond your wildest dreams',
			afterDescription: ''
		},
		{
			title: '2014 i3',
			link: 'https://www.youtube.com/embed/A6apDU2fqbk',
			beforeDescription: 'In The Sponge',
			afterDescription: ''
			// '<a class="anchor" href="http://simmons.mit.edu/inthesponge">"In The Sponge" Explained</a>: a shot-by-shot guide to the video.'
		},
		{
			title: '2013 i3',
			link: 'https://www.youtube.com/embed/yq5NlwvV8Ec',
			beforeDescription: 'What is Simmons?',
			afterDescription: ''
		},
		{
			title: '2012 i3',
			link: 'https://www.youtube.com/embed/vx_hJE8I0mA',
			beforeDescription: 'At the end of the day...',
			afterDescription: ''
		},
		{
			title: 'Simmons Anthem',
			link: 'https://www.youtube.com/embed/u5kVxB63xEY',
			beforeDescription: 'Oh Spongey-Sponge',
			afterDescription: ''
		}
	];
</script>

<h1 class="h1">Simmons Videos</h1>
<p class="text-lg">
	We've made a number of great videos over the years. We hope you enjoy watching them!
</p>

{#each vidData as vid}
	<h2 class="h2">{vid.title}</h2>
	{#if vid.beforeDescription}<p class="italic">{vid.beforeDescription}</p>{/if}
	<iframe
		class="aspect-video w-full border-none rounded-container-token"
		src={vid.link}
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
		title={vid.title}
	></iframe>
	{#if vid.afterDescription}<p class="italic">{vid.afterDescription}</p>{/if}
{/each}

<a
	href="https://www.youtube.com/playlist?list=PLF877AC8074471EBF"
	class="btn variant-filled-primary"
>
	(Some Simmons i3 videos from ancient history)
</a>
