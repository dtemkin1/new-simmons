<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<div class="flex items-center justify-center h-full">
	<div class="card p-8 flex flex-col space-y-4 max-w-5xl m-8">
		{#if $page.data.session}
			<p class="text-center">
				You are currently logged in as <span class="font-bold"
					>{$page.data.session.user?.id ?? 'Guest'}</span
				>.
			</p>
			<button type="button" class="btn variant-filled-error" on:click={() => signOut()}
				>Sign out</button
			>
		{:else}
			<h2 class="h2 text-center">Sign in to Simmons DB</h2>
			<label class="label">
				<span>Username</span>
				<input class="input" title="username" type="text" />
			</label>
			<label class="label">
				<span>Password</span>
				<input class="input" title="password" type="password" />
			</label>
			<button
				type="button"
				class="btn variant-filled pointer-events-none opacity-50"
				on:click={() => signIn('credentials', { callbackUrl: `${base}/sds/home` })}
				>Sign In with Credentials (In Progress)</button
			>
			<!-- TODO: IMPLEMENT LOGGING IN WITH CREDENTIALS -->
			<hr />
			<button
				type="button"
				class="btn variant-filled-success"
				on:click={() => signIn('petrock', { callbackUrl: `${base}/sds/home` })}
				>Sign In with Touchstone</button
			>
		{/if}
	</div>
</div>
