<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';
	// Icons
	import { Moon, Sun } from 'lucide-svelte';

	// Bind to the checked state
	let lightMode: boolean = $state(false);

	// Handle the change in state when toggled.
	function handleModeChange() {
		// NOTE: implementation may differ per Tailwind config and framework:
		// https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
		lightMode = !lightMode;

		localStorage.setItem('theme', lightMode ? 'light' : 'dark');

		if (lightMode) {
			document.documentElement.classList.remove('dark');
		} else {
			document.documentElement.classList.add('dark');
		}
	}
</script>

<svelte:head>
	<script>
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			lightMode = false;
		} else {
			document.documentElement.classList.remove('dark');
			lightMode = true;
		}
	</script>
</svelte:head>

<Switch
	name="mode"
	controlActive="bg-surface-200"
	bind:checked={lightMode}
	onCheckedChange={handleModeChange}
>
	{#snippet inactiveChild()}<Moon size="14" />{/snippet}
	{#snippet activeChild()}<Sun size="14" />{/snippet}
</Switch>
