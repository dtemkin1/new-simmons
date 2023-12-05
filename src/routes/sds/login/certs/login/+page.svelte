<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<h1 class="h1">Welcome to Simmons DB</h1>
<p>
	{#if $page.data.session}
		<!-- {#if $page.data.session.user?.image}
			<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
		{/if} -->
		<span class="signedInText">
			<p>
				You are currently logged in as <span class="text-strong"
					>{$page.data.session.user?.email ?? 'User'}</span
				>.
			</p>
		</span>
		<br />
		<button type="button" class="btn variant-filled-error" on:click={() => signOut()}
			>Sign out</button
		>
	{:else}
		<span class="notSignedInText"
			>You are not signed in. Please sign in to access the Simmons DB.</span
		>
		<br />
		<button type="button" class="btn variant-filled-success" on:click={() => signIn('petrock')}
			>Sign In with Touchstone</button
		>
	{/if}
</p>
