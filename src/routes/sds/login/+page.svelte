<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { redirect } from '@sveltejs/kit';
	import { base } from '$app/paths';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let error: boolean | null = $state(null);

	$inspect($page.form);

	import type { ActionResult } from '@sveltejs/kit';

	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { SDS_HOME_URL } from '$lib/config';
	import { page } from '$app/stores';

	const toastStore = getToastStore();

	function toastHandler(result: ActionResult) {
		let resultToast: ToastSettings;

		if (result.type == 'success') {
			error = false;
			resultToast = {
				message: `${result.data?.message}` || '',
				background: 'variant-filled-success'
			};
		} else if (result.type == 'failure') {
			error = true;
			resultToast = {
				message: `${result.data?.message}` || '',
				background: 'variant-filled-error'
			};
		} else if (result.type == 'redirect') {
			if (
				result.location == SDS_HOME_URL ||
				result.location == $page.url.searchParams.get('redirect')
			) {
				error = false;
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
			<form
				method="post"
				use:enhance={() => {
					return async ({ result, update }) => {
						update();
						toastHandler(result);
					};
				}}
				action="?/logout"
				class="flex flex-col gap-4 grow"
			>
				<button type="submit" class="btn variant-filled-error">Sign out</button>
			</form>
		{:else}
			<h2 class="h2 text-center">Sign in to Simmons DB</h2>
			<form
				method="post"
				class="flex flex-col gap-4 grow"
				use:enhance={() => {
					return async ({ result, update }) => {
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
				<input type="hidden" name="redirect" value={$page.url.searchParams.get('redirect')} />
				<button type="submit" class="btn variant-filled">Sign In with Credentials</button>
			</form>
			<hr />
			<form class="flex flex-col grow">
				<a
					href="{base}/auth/signin/okta{$page.url.searchParams.get('redirect')
						? '?redirect=' + $page.url.searchParams.get('redirect')
						: ''}"
					type="button"
					class="btn variant-filled-success">Sign In with Touchstone</a
				>
			</form>
		{/if}
	</div>
</div>
