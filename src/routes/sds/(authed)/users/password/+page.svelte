<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';
	export let data: PageData;
	import type { ActionResult } from '@sveltejs/kit';

	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	function toastHandler(result: ActionResult) {
		let resultToast: ToastSettings;

		if (result.type == 'success') {
			resultToast = {
				message: `${result.data?.message}` || '',
				background: 'variant-filled-success'
			};
		} else if (result.type == 'failure') {
			resultToast = {
				message: `${result.data?.message}` || '',
				background: 'variant-filled-error'
			};
		} else {
			resultToast = {
				message: 'Unknown form result',
				background: 'variant-filled'
			};
		}

		toastStore.trigger(resultToast);
	}
</script>

{#await data.hasPassword}
	<div class="flex items-center justify-center h-full w-full">
		<ProgressRadial />
	</div>
{:then hasPassword}
	<div class="flex flex-col items-center gap-4 self-center p-4">
		<h1 class="h1 text-center self-center">Password for {data.username}</h1>
		<div class="card p-8 flex flex-col space-y-4 max-w-5xl m-2">
			<form
				class="flex flex-col gap-4 grow"
				method="POST"
				id="password-change"
				use:enhance={() => {
					return async ({ result, update }) => {
						update();
						toastHandler(result);
					};
				}}
			>
				{#if !hasPassword}
					<div class="text-center">
						Current Password: <code class="code">[ none defined ]</code>
					</div>
					<hr />
				{:else}
					<label class="label">
						<span>Current Password: </span>
						<input class="input" name="oldPassword" type="password" />
					</label>
				{/if}

				<label class="label">
					<span>New Password: </span>
					<input class="input" name="newPassword" type="password" />
				</label>
				<label class="label">
					<span>Re-type Password: </span>
					<input class="input" name="retypePassword" type="password" />
				</label>
				<button type="submit" class="btn variant-filled-primary">Update Password</button>
			</form>
		</div>

		<div class="space-y-4">
			<p>
				The Simmons DB is set up to use <a
					class="font-bold anchor"
					href="https://ist.mit.edu/touchstone"
					>Touchstone Authentication
				</a> to authenticate logins, but you can also set up the system to let you log in with a password
				as an alternative.
			</p>

			<p>
				To change your password, enter your current password, and then a new password for your login
				(twice).
			</p>

			<p>
				To disable password-access to your Simmons DB account, <em class="italic">leave blank</em>
				both "New password" and "Re-type password."
			</p>

			<p>
				Trouble? Contact
				<a class="anchor" href="mailto:simmons-tech@mit.edu">simmons-tech@mit.edu</a>.
			</p>
		</div>
	</div>
{/await}
