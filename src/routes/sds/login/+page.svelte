<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { redirect } from '@sveltejs/kit';
	import { base } from '$app/paths';

	export let data: PageData;

	let error: boolean | null = null;

	onMount(() => {
		if (data.auto) {
			redirect(302, `${base}/sds/login/petrock`);
		}
	});

	import type { ActionResult } from '@sveltejs/kit';

	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { SDS_HOME_URL, SDS_LOGIN_URL } from '$lib/config';

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
		} else if (result.type == 'redirect') {
			if (result.location == SDS_LOGIN_URL) {
				resultToast = {
					message: 'Successfully logged out!',
					background: 'variant-filled-success'
				};
			} else if (result.location == SDS_HOME_URL) {
				resultToast = {
					message: 'Successfully logged in!',
					background: 'variant-filled-success'
				};
			} else {
				resultToast = {
					message: 'Redirecting...',
					background: 'variant-filled-success'
				};
			}
		} else {
			resultToast = {
				message: 'Unknown form result',
				background: 'variant-filled'
			};
		}

		toastStore.trigger(resultToast);
	}
</script>

<div class="flex items-center justify-center h-full">
	<div class="card p-8 flex flex-col space-y-4 max-w-5xl m-8">
		{#if data.session}
			<p class="text-center">
				You are currently logged in as <span class="font-bold">{data.username ?? 'Guest'}</span>.
			</p>
			<form method="post" use:enhance action="?/logout" class="flex flex-col gap-4 grow">
				<button type="submit" class="btn variant-filled-error">Sign out</button>
			</form>
		{:else}
			<h2 class="h2 text-center">Sign in to Simmons DB</h2>
			<form
				method="post"
				class="flex flex-col gap-4 grow"
				use:enhance={({ formElement, formData, action, cancel, submitter }) => {
					return async ({ result, update }) => {
						error = result.type == 'failure' || result.type == 'error';
						update();
						toastHandler(result);
					};
				}}
				action="?/login"
			>
				<label class="label">
					<span>Username</span>
					<input
						class="input"
						name="username"
						autocomplete="username"
						class:input-error={error == true}
						class:input-success={error == false}
						type="text"
					/>
				</label>
				<label class="label">
					<span>Password</span>
					<input
						class="input"
						name="password"
						autocomplete="current-password"
						class:input-error={error == true}
						class:input-success={error == false}
						type="password"
					/>
				</label>
				<button type="submit" class="btn variant-filled">Sign In with Credentials</button>
			</form>
			<hr />
			<form class="flex flex-col grow">
				<a href="{base}/auth/signin/petrock" type="button" class="btn variant-filled-success"
					>Sign In with Touchstone</a
				>
			</form>
		{/if}
	</div>
</div>
