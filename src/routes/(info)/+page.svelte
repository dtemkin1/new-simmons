<script context="module" src="https://player.vimeo.com/api/player.js"></script>

<script lang="ts">
	import i3_video from '$lib/assets/i3.mp4';
	import i3_captions from '$lib/assets/i3_captions.vtt';
	import i3_thumbnail from '$lib/assets/i3_thumbnail.avif';

	import { base } from '$app/paths';
</script>

<video
	class="h-full w-full rounded-container-token max-w-[720px]"
	preload="none"
	controls
	poster={i3_thumbnail}
>
	<source src={i3_video} type="video/mp4" />
	<track default kind="captions" src={i3_captions} srclang="en" label="English" />
</video>

<div class="flex flex-col justify-center">
	<a href="{base}/prospectives" class="btn variant-filled-primary">
		Welcome Prospectives! (+ More videos)
	</a>
</div>
