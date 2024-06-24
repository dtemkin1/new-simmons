<script lang="ts">
	import { AppBar, modeCurrent } from '@skeletonlabs/skeleton';

	// TODO: FIX TYPE
	const mit_logos: Record<string, any> = import.meta.glob(
		'../assets/mit_logo/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	);

	let mit_logo = $derived(
		$modeCurrent
			? mit_logos['../assets/mit_logo/mit_logo_std_rgb_black.png'].default
			: mit_logos['../assets/mit_logo/mit_logo_std_rgb_white.png'].default
	);
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<a href="https://web.mit.edu/">
			<enhanced:img class="max-h-12 w-auto" alt="MIT Logo" src={mit_logo}></enhanced:img>
		</a>
	</svelte:fragment>
	<address class="text-center text-sm">
		229 Vassar St.<br />Cambridge, MA 02139
	</address>
	<svelte:fragment slot="trail">
		<p class="text-right text-sm">
			Copyright &copy; {new Date().getFullYear()} Simmons Hall<br /><a
				class="anchor"
				href="https://accessibility.mit.edu/">Accessibility</a
			>
		</p>
	</svelte:fragment>
</AppBar>
