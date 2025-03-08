<script lang="ts">
	import type { PageData } from './$types';
	import { getContext } from 'svelte';
	import { enhance } from '$app/forms';
	import { base } from '$app/paths';
	import { type ToastContext } from '@skeletonlabs/skeleton-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let error: boolean | null = $state(null);

	import type { ActionResult } from '@sveltejs/kit';

	import { SDS_HOME_URL } from '$lib/config';
	import { page } from '$app/stores';

	export const toast: ToastContext = getContext('toast');

	function toastHandler(result: ActionResult) {
		if (result.type == 'success') {
			error = false;
			toast.create({
				description: `${result.data?.message}` || '',
				type: 'success'
			});
		} else if (result.type == 'failure') {
			error = true;
			toast.create({
				description: `${result.data?.message}` || '',
				type: 'error'
			});
		} else if (result.type == 'redirect') {
			if (
				result.location == SDS_HOME_URL ||
				result.location == $page.url.searchParams.get('redirect')
			) {
				error = false;
				toast.create({
					description: 'Successfully logged in!',
					type: 'success'
				});
			} else {
				toast.create({
					description: 'Redirecting...',
					type: 'success'
				});
			}
		} else {
			toast.create({
				description: 'Unknown form result'
			});
		}
	}
</script>

<div class="flex h-full items-center justify-center">
	<div
		class="card border-surface-200-800 preset-filled-surface-100-900 m-8 flex max-w-5xl flex-col space-y-4 border p-8"
	>
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
				class="flex grow flex-col gap-4"
			>
				<button type="submit" class="btn preset-filled-error-500">Sign out</button>
			</form>
		{:else}
			<h2 class="h2 text-center">Sign in to Simmons DB</h2>
			<form
				method="post"
				class="flex grow flex-col gap-4"
				use:enhance={() => {
					return async ({ result, update }) => {
						update();
						toastHandler(result);
					};
				}}
				action="?/login"
			>
				<label class="label">
					<span class="label-text">Username</span>
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
					<span class="label-text">Password</span>
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
				<button type="submit" class="btn preset-filled">Sign In with Credentials</button>
			</form>
			<hr class="hr" />
			<form class="flex grow flex-col">
				<a
					href="{base}/auth/signin/okta{$page.url.searchParams.get('redirect')
						? '?redirect=' + $page.url.searchParams.get('redirect')
						: ''}"
					type="button"
					class="btn preset-filled-success-500">Sign In with Touchstone</a
				>
			</form>
		{/if}
	</div>
</div>
