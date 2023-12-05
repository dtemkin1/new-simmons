<script>
	import { AppBar, modeCurrent } from '@skeletonlabs/skeleton';

	import mit_logo_light from '$lib/assets/mit_logo/mit_logo_std_rgb_white.png';
	import mit_logo_dark from '$lib/assets/mit_logo/mit_logo_std_rgb_black.png';

	$: mit_logo = $modeCurrent ? mit_logo_dark : mit_logo_light;
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<a href="https://web.mit.edu/">
			<img class="max-h-12 w-auto" alt="MIT Logo" src={mit_logo} />
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
