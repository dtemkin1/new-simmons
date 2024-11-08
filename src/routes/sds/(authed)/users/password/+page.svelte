<script lang="ts">
	import { ProgressRing, type ToastContext } from '@skeletonlabs/skeleton-svelte';
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';
	import type { ActionResult } from '@sveltejs/kit';
	import { getContext } from 'svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	export const toast: ToastContext = getContext('toast');

	function toastHandler(result: ActionResult) {
		if (result.type == 'success') {
			toast.create({
				description: `${result.data?.message}` || '',
				type: 'success'
			});
		} else if (result.type == 'failure') {
			toast.create({
				description: `${result.data?.message}` || '',
				type: 'error'
			});
		} else {
			toast.create({
				description: 'Unknown form result'
			});
		}
	}
</script>

{#await data.hasPassword}
	<div class="flex h-full w-full items-center justify-center">
		<ProgressRing value={null} />
	</div>
{:then hasPassword}
	<div class="flex flex-col items-center gap-4 self-center p-4">
		<h1 class="h1 self-center text-center">Password for {data.username}</h1>
		<div
			class="card flex flex-col space-y-4 border p-4 border-surface-200-800 preset-filled-surface-100-900"
		>
			<form
				class="flex grow flex-col gap-4"
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
					<hr class="hr" />
				{:else}
					<label class="label">
						<span class="label-text">Current Password: </span>
						<input class="input" name="oldPassword" type="password" />
					</label>
				{/if}

				<label class="label">
					<span class="label-text">New Password: </span>
					<input class="input" name="newPassword" type="password" />
				</label>
				<label class="label">
					<span class="label-text">Re-type Password: </span>
					<input class="input" name="retypePassword" type="password" />
				</label>
				<button type="submit" class="btn preset-filled-primary-500">Update Password</button>
			</form>
		</div>

		<div class="space-y-4">
			<p>
				The Simmons DB is set up to use <a
					class="anchor font-bold"
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
