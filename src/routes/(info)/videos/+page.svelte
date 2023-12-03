<script lang="ts">
	const vidData = [
		{
			title: '2018 i3',
			link: 'https://youtube.com/embed/zF6hUza_sEs',
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
	{#if vid.beforeDescription}<p class="italic">{@html vid.beforeDescription}</p>{/if}
	<iframe
		class="aspect-video w-full border-none rounded-container-token"
		src={vid.link}
		allowfullscreen
		title={vid.title}
	></iframe>
	{#if vid.afterDescription}<p class="italic">{@html vid.afterDescription}</p>{/if}
{/each}

<a
	href="https://www.youtube.com/playlist?list=PLF877AC8074471EBF"
	class="btn variant-filled-primary"
	data-sveltekit-preload-data="hover"
>
	(Some Simmons i3 videos from ancient history)
</a>
