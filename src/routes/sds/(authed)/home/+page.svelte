<script lang="ts">
	import FifteenSeconds from '$lib/components/FifteenSeconds.svelte';
	import { base } from '$app/paths';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

{#await data.randomResident}
	<div class="flex items-center justify-center h-full w-full">
		<ProgressRadial />
	</div>
{:then randomResident}
	<div class="flex flex-col items-center p-4 h-full gap-4">
		<div class="self-center">
			<h1 class="h1 text-center">Welcome to the Simmons DB</h1>
		</div>
		<div class="self-center">
			<h2 class="h2 text-center">15 Seconds Of Frame</h2>
			<p class="mt-0 italic text-center">
				<a class="anchor" href="{base}/sds/directory">Simmons Hall Resident</a> of the Moment
			</p>
		</div>
		<div>
			<FifteenSeconds userInfo={randomResident} />
		</div>

		<div class="space-y-4">
			<p>
				Welcome to Simmons DB, a magical play land of mystery and fun. If you have trouble with
				something, email
				<a class="anchor" href="mailto:simmons-tech@mit.edu">simmons-tech@mit.edu</a>, your
				friendly, teddy-bear-like guide to all things simmons-tech.
			</p>

			<!-- <p>
				Summer has begun and REX is coming ever-closer! If you have an idea for an event you think
				Simmons should run, you should submit it <a
					class="anchor"
					href="https://forms.gle/qnE88D5ysMRQ7jpH9">here</a
				> by next Tuesday, May 31!
			</p> -->

			<p>
				<span class="font-bold">Important note:</span> If you're unfamiliar with new GovTracker system
				for managing the house's and lounges' proposals and finances, please ask an officer or upperclassmen
				before submitting anything. In general, submitting data to any GovTracker system cannot be undone.
			</p>

			<p>
				The Simmons DB is set up to use <a
					class="font-bold anchor"
					href="https://ist.mit.edu/touchstone"
					>Touchstone Authentication
				</a>
				to authenticate logins, but you can also set up the system to let you
				<a class="anchor" href="{base}/sds/users/password">log in with a password</a> as an alternative.
				(Note, however, that you need to be already logged in in order to set up your password.)
			</p>

			<!-- <p>
				A new feature of the Simmons DB is the ability to login using your MIT Kerberos (email)
				username and password. To do this, go to the
				<a class="anchor" href="{base}/sds/login/certs/login">Simmons Login Page</a>
			</p> -->
		</div>
	</div>
{/await}
