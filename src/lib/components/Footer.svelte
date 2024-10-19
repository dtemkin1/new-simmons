<script lang="ts">
	import { AppBar, getModeAutoPrefers } from '@skeletonlabs/skeleton';
	import logo_black from '../assets/mit_logo/mit_logo_std_rgb_black.png?enhanced';
	import logo_white from '../assets/mit_logo/mit_logo_std_rgb_white.png?enhanced';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	{#snippet lead()}
		<a href="https://web.mit.edu/" aria-label="MIT Logo">
			<enhanced:img class="max-h-12 w-auto dark:hidden block" alt="MIT Logo" src={logo_black}
			></enhanced:img>
			<enhanced:img class="max-h-12 w-auto dark:block hidden" alt="MIT Logo" src={logo_white}
			></enhanced:img>
		</a>
	{/snippet}
	<address class="text-center text-sm">
		229 Vassar St.<br />Cambridge, MA 02139
	</address>
	{#snippet trail()}
		<p class="text-right text-sm">
			Copyright &copy; {new Date().getFullYear()} Simmons Hall<br /><a
				class="anchor"
				href="https://accessibility.mit.edu/">Accessibility</a
			>
		</p>
	{/snippet}
</AppBar>
