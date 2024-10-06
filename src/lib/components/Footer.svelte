<script lang="ts">
	import { AppBar, modeCurrent } from '@skeletonlabs/skeleton';
	import logo_black from '../assets/mit_logo/mit_logo_std_rgb_black.png?enhanced';
	import logo_white from '../assets/mit_logo/mit_logo_std_rgb_white.png?enhanced';

	let mit_logo = $derived($modeCurrent ? logo_black : logo_white);
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<a href="https://web.mit.edu/" aria-label="MIT Logo">
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
