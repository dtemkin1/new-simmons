<script>
	import i3_video from '$lib/assets/i3.mp4';
	import i3_thumbnail from '$lib/assets/i3_thumbnail.png';

	import { base } from '$app/paths';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="card p-4 flex flex-col space-y-4">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video class="h-full w-full rounded-md max-w-4xl" controls poster={i3_thumbnail}>
			<source src={i3_video} type="video/mp4" />
		</video>

		<a
			href="{base}/prospectives"
			class="btn variant-filled-primary"
			data-sveltekit-preload-data="hover"
		>
			Welcome Prospectives! (+ More videos)
		</a>
	</div>
</div>
