<script lang="ts">
	import i3_video from '$lib/assets/i3.mp4';
	import i3_thumbnail from '$lib/assets/i3_thumbnail.png';

	import { base } from '$app/paths';
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
	class="h-full w-full rounded-container-token max-w-[787px]"
	preload="none"
	controls
	poster={i3_thumbnail}
>
	<source src={i3_video} type="video/mp4" />
</video>

<a href="{base}/prospectives" class="btn variant-filled-primary">
	Welcome Prospectives! (+ More videos)
</a>
