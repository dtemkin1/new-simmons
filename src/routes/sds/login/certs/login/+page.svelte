<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let username = '';
	let password = '';
	let error: boolean | null = null;

	async function credentialSignIn() {
		if (password.length < 1 || username.length < 1) {
			error = true;
			return;
		}
		let signInResults = await signIn('credentials', {
			redirect: false,
			callbackUrl: `${base}/sds/home`,
			username: username,
			password: password
		});

		const response = await signInResults?.json();

		if (response.url.includes('error')) {
			error = true;
		} else {
			error = false;
			if (browser) {
				window.location = response.url;
			}
		}
	}

	function touchstoneSignIn() {
		signIn('petrock', { callbackUrl: `${base}/sds/home` });
	}

	onMount(() => {
		if (data.auto) {
			touchstoneSignIn();
		}
	});
</script>

<div class="flex items-center justify-center h-full">
	<div class="card p-8 flex flex-col space-y-4 max-w-5xl m-8">
		{#if $page.data.session}
			<p class="text-center">
				You are currently logged in as <span class="font-bold"
					>{$page.data.session.user?.username ?? 'Guest'}</span
				>.
			</p>
			<button type="button" class="btn variant-filled-error" on:click={() => signOut()}
				>Sign out</button
			>
		{:else}
			<h2 class="h2 text-center">Sign in to Simmons DB</h2>
			<form class="flex flex-col gap-4 grow">
				<label class="label">
					<span>Username</span>
					<input
						class="input"
						title="username"
						autocomplete="username"
						class:input-error={error == true}
						class:input-success={error == false}
						type="text"
						bind:value={username}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								credentialSignIn();
							}
						}}
					/>
				</label>
				<label class="label">
					<span>Password</span>
					<input
						class="input"
						title="password"
						autocomplete="current-password"
						class:input-error={error == true}
						class:input-success={error == false}
						type="password"
						bind:value={password}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								credentialSignIn();
							}
						}}
					/>
				</label>
				<button type="button" class="btn variant-filled" on:click={credentialSignIn}
					>Sign In with Credentials</button
				>
			</form>
			<hr />
			<form class="flex flex-col grow">
				<button type="button" class="btn variant-filled-success" on:click={touchstoneSignIn}
					>Sign In with Touchstone</button
				>
			</form>
		{/if}
	</div>
</div>
