<script lang="ts">
	import { enhance } from '$app/forms';
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import type { ActionData } from './$types';
	import { invalidateAll } from '$app/navigation';

	let usertype: string;
	let username: string | undefined;
	let title: string;
	let first_name: string;
	let last_name: string;
	let room: string;
	let class_year: number;

	let immortal: boolean;
	let hidden: boolean;

	let submit_button: HTMLButtonElement;
	let fetch_button: HTMLButtonElement;

	export let form: ActionData;
	// export let data: PageData;

	const sixMonthsAhead = new Date();
	sixMonthsAhead.setMonth(sixMonthsAhead.getMonth() + 6);

	$: locked_usertype = !(usertype?.length > 0);
	$: locked_username = username == undefined || !(username?.length > 0);
	$: fetch_userdetails = !['OTHER', 'temp'].includes(usertype);
	$: generated_class_year =
		form?.userData?.item.affiliations[0].type == 'student' &&
		form?.userData?.item.affiliations[0].classYear &&
		!Number.isNaN(Number(form?.userData?.item.affiliations[0].classYear))
			? sixMonthsAhead.getFullYear() + Number(form?.userData?.item.affiliations[0].classYear)
			: null;
	$: locked_userdetails = fetch_userdetails ? !form?.fetchSuccess && !form?.fetchError : false;

	function onNextHandler(e: {
		detail: { state: { current: number; total: number }; step: number };
	}): void {
		console.log('event:step', e);
		if (e.detail.state.current == 2 && fetch_userdetails) {
			fetch_button.click();
		}
	}

	function onCompleteHandler(e: {
		detail: { state: { current: number; total: number }; step: number };
	}): void {
		console.log('event:complete', e);
		submit_button.click();
		username = undefined;
	}

	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import type { ActionResult } from '@sveltejs/kit';

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

	let times_submitted = 0;
</script>

<div class="flex flex-col w-full h-full p-4 text-center items-center justify-center space-y-4">
	<h1 class="h1">Add Directory Entry</h1>
	{#key times_submitted}
		<Stepper on:next={onNextHandler} on:complete={onCompleteHandler} buttonCompleteLabel="Submit">
			<Step locked={locked_usertype}>
				<svelte:fragment slot="header">User Type</svelte:fragment>
				<select class="select" bind:value={usertype}>
					<option value="AHM">AHM (Associate Housemaster)</option>
					<option value="GRA">GRA (GRA)</option>
					<option value="HM">HM (Housemaster)</option>
					<option value="MGR">MGR (House Manager)</option>
					<option value="OTHER">OTHER (Other)</option>
					<option value="RLA">RLA (RLA)</option>
					<option value="temp">temp (temp)</option>
					<option value="U" selected>U (Undergraduate)</option>
					<option value="VS">VS (Visiting Scholar)</option>
				</select>
			</Step>
			<Step locked={locked_username}>
				<svelte:fragment slot="header">Username</svelte:fragment>
				<input
					class="input"
					title="Username"
					type="text"
					placeholder="Input {fetch_userdetails ? 'Kerberos ID' : 'username'}"
					bind:value={username}
				/>
			</Step>
			<Step locked={locked_userdetails}>
				<svelte:fragment slot="header">User Details</svelte:fragment>

				<label class="label">
					<span>Title</span>
					<input class="input" title="Title" type="text" bind:value={title} />
				</label>

				{#if form?.userData?.item.givenName}
					<label class="label">
						<span>First Name</span>
						<input
							class="input"
							title="First Name"
							type="text"
							disabled={fetch_userdetails}
							bind:value={form.userData.item.givenName}
						/>
					</label>
				{:else}
					<label class="label">
						<span>First Name</span>
						<input
							class="input"
							title="First Name"
							disabled={fetch_userdetails && !form?.fetchError}
							bind:value={first_name}
							type="text"
						/>
					</label>
				{/if}

				{#if form?.userData?.item.familyName}
					<label class="label">
						<span>Last Name</span>
						<input
							class="input"
							title="Last Name"
							type="text"
							disabled={fetch_userdetails}
							bind:value={form.userData.item.familyName}
						/>
					</label>
				{:else}
					<label class="label">
						<span>Last Name</span>
						<input
							class="input"
							title="Last Name"
							disabled={fetch_userdetails && !form?.fetchError}
							bind:value={last_name}
							type="text"
						/>
					</label>
				{/if}

				<label class="label">
					<span>Room</span>
					<input class="input" title="Room" bind:value={room} type="text" />
				</label>

				{#if form?.userData?.item.affiliations[0].type == 'student' && form?.userData?.item.affiliations[0].classYear}
					<label class="label">
						<span>Year</span>
						<input
							class="input"
							title="Year"
							type="text"
							disabled={fetch_userdetails}
							bind:value={generated_class_year}
						/>
					</label>
				{:else}
					<label class="label">
						<span>Year</span>
						<input
							class="input"
							title="Year"
							disabled={fetch_userdetails && !form?.fetchError}
							bind:value={class_year}
							type="text"
						/>
					</label>
				{/if}

				<div class="space-y-2">
					<label class="flex items-center space-x-2">
						<input class="checkbox" type="checkbox" bind:value={immortal} />
						<p>Immortal (rarely true)</p>
					</label>
					<label class="flex items-center space-x-2">
						<input class="checkbox" type="checkbox" bind:value={hidden} />
						<p>Hidden (rarely true)</p>
					</label>
				</div>
			</Step>
			<Step>
				<svelte:fragment slot="header">Confirm</svelte:fragment>
				<p>Review the information below and click "Submit" to add the directory entry.</p>
				<div class="grid-cols-2">
					<div class="flex flex-col space-y-2">
						<p>User Type: {usertype}</p>
						<p>Username: {username}</p>
						<p>Title: {title}</p>
						<p>First Name: {first_name ?? form?.userData?.item.givenName}</p>
						<p>Last Name: {last_name ?? form?.userData?.item.familyName}</p>
						<p>Room: {room}</p>
						<p>Year: {class_year ?? generated_class_year}</p>
						<p>Immortal: {immortal ?? false}</p>
						<p>Hidden: {hidden ?? false}</p>
					</div>
				</div>
			</Step>
		</Stepper>
	{/key}
</div>

<div class="hidden">
	<form
		method="POST"
		action="?/fetch"
		use:enhance={() => {
			return async ({ result, update }) => {
				update();
				toastHandler(result);
			};
		}}
	>
		<input type="hidden" name="kerberosId" value={username} on:change={() => invalidateAll()} />
		<button class="btn variant-filled-primary" type="submit" bind:this={fetch_button}
			>Click to Fetch Details</button
		>
	</form>
	<form
		method="POST"
		action="?/addUser"
		use:enhance={() => {
			return async ({ result, update }) => {
				update();
				toastHandler(result);
				times_submitted++;
			};
		}}
	>
		<input type="hidden" name="usertype" value={usertype ?? ''} />
		<input type="hidden" name="username" value={username ?? ''} />
		<input type="hidden" name="title" value={title ?? ''} />
		<input
			type="hidden"
			name="first_name"
			value={first_name ?? form?.userData?.item.givenName ?? ''}
		/>
		<input
			type="hidden"
			name="last_name"
			value={last_name ?? form?.userData?.item.familyName ?? ''}
		/>
		<input type="hidden" name="room" value={room ?? ''} />
		<input type="hidden" name="class_year" value={class_year ?? generated_class_year ?? ''} />
		<input type="hidden" name="immortal" value={immortal ?? false ?? ''} />
		<input type="hidden" name="hidden" value={hidden ?? false ?? ''} />
		<button type="submit" bind:this={submit_button}>Submit</button>
	</form>
</div>

<!-- TODO: ADD REENABLE USER -->
