<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<div class="flex items-center justify-center h-full">
	<div class="card p-8 flex flex-col space-y-4 max-w-5xl m-8">
		{#if $page.data.session}
			<!-- {#if $page.data.session.user?.image}
			<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
		{/if} -->
			<span class="signedInText">
				<p>
					You are currently logged in as <span class="text-strong"
						>{$page.data.session.user !== undefined ? $page.data.session.user.id : 'User'}</span
					>.
				</p>
			</span>
			<button type="button" class="btn variant-filled-error" on:click={() => signOut()}
				>Sign out</button
			>
		{:else}
			<h2 class="h2">Sign in to Simmons DB</h2>
			<label class="label">
				<span>Username</span>
				<input class="input" title="username" type="text" />
			</label>
			<label class="label">
				<span>Password</span>
				<input class="input" title="password" type="password" />
			</label>
			<button type="button" class="btn variant-filled" on:click={() => signIn('credentials')}
				>Sign In with Credentials</button
			>
			<hr />
			<button type="button" class="btn variant-filled-success" on:click={() => signIn('petrock')}
				>Sign In with Touchstone</button
			>
		{/if}
	</div>
</div>
