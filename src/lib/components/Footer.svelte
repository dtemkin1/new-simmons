<script lang="ts">
	import logo_black from '../assets/mit_logo/mit_logo_std_rgb_black.png?enhanced';
	import logo_white from '../assets/mit_logo/mit_logo_std_rgb_white.png?enhanced';
</script>

<div class="flex w-full flex-col space-y-4 p-4 bg-surface-100-900">
	<div class="grid grid-cols-3 items-center gap-4">
		<div class="place-content-start">
			<a href="https://web.mit.edu/" aria-label="MIT Logo">
				<enhanced:img class="block max-h-12 w-auto dark:hidden" alt="MIT Logo" src={logo_black}
				></enhanced:img>
				<enhanced:img class="hidden max-h-12 w-auto dark:block" alt="MIT Logo" src={logo_white}
				></enhanced:img>
			</a>
		</div>
		<div class="place-self-center">
			<address class="text-center text-sm">
				229 Vassar St.<br />Cambridge, MA 02139
			</address>
		</div>
		<div class="place-content-end">
			<p class="text-end text-sm">
				Copyright &copy; {new Date().getFullYear()} Simmons Hall<br /><a
					class="anchor"
					href="https://accessibility.mit.edu/">Accessibility</a
				>
			</p>
		</div>
	</div>
</div>
