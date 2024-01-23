<script lang="ts">
	import { ProgressRadial, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';

	export let data: PageData;

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

<div class="h-full w-full p-4">
	{#await data.result}
		<div class="flex items-center justify-center h-full flex-col w-full p-4">
			<ProgressRadial />
		</div>
	{:then result}
		<h1 class="h1 text-center p-2">
			{#if data.isSudo}
				Your <em class="italic">Impersonated</em> Profile
			{:else}
				Your Profile
			{/if}
		</h1>
		<form
			class="space-y-4"
			method="post"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				return async ({ result, update }) => {
					update();
					toastHandler(result);
				};
			}}
		>
			<label class="label">
				<span>Title</span>
				<input class="input" type="text" name="title" disabled value={result.title} />
			</label>
			<label class="label">
				<span>First Name</span>
				<input class="input" type="text" name="firstname" disabled value={result.firstname} />
			</label>
			<label class="label">
				<span>Last Name</span>
				<input class="input" type="text" name="lastname" disabled value={result.lastname} />
			</label>
			<label class="label">
				<span>Room</span>
				<input class="input" type="text" name="room" disabled value={result.room} />
			</label>
			{#if result.phone2 && result.phone2 != ''}
				<label>
					<span>Phone</span>
					<select class="select" name="phone">
						<option value={result.phone} selected={result.phone == result.phone1}
							>{result.phone1}</option
						>
						<option value={result.phone2} selected={result.phone == result.phone2}
							>{result.phone2}</option
						>
					</select></label
				>
			{:else}
				<label class="label">
					<span>Phone</span>
					<input class="input" type="text" name="phone" disabled value={result.phone} />
				</label>
			{/if}
			<label class="label">
				<span>Homepage</span>
				<input class="input" type="url" name="homepage" value={result.homepage} />
			</label>
			<label class="label">
				<span>Cellphone</span>
				<input class="input" type="text" name="cellphone" value={result.cellphone} />
			</label>
			<label class="label">
				<span>Home City</span>
				<input class="input" type="text" name="home_city" value={result.home_city} />
			</label>
			<label class="label">
				<span>Home State</span>
				<input class="input" type="text" name="home_state" value={result.home_state} />
			</label>
			<label class="label">
				<span>Home Country</span>
				<input class="input" type="text" name="home_country" value={result.home_country} />
			</label>
			<label>
				<span>Quote</span>
				<textarea class="textarea font-mono" name="quote" rows="4" value={result.quote} />
			</label>
			<label>
				<span>My favorite...</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto_1fr]">
					<input
						class="input"
						type="text"
						name="favorite_category"
						value={result.favorite_category}
					/>
					<div class="input-group-shim">is</div>
					<input class="input" type="text" name="favorite_value" value={result.favorite_value} />
				</div>
			</label>
			<label>
				<span>Reminders</span>
				<div class="input-group input-group-divider grid-cols-[auto_auto_1fr]">
					<div class="input-group-shim">When I have reminders, I want to</div>
					<select class="select" name="showreminders">
						<option value={true} selected={result.showreminders}>show</option>
						<option value={false} selected={!result.showreminders}>hide</option>
					</select>
					<div class="input-group-shim">the yellow reminders box.</div>
				</div>
			</label>
			<div class="grid grid-cols-[1fr_1fr] gap-4">
				<input type="submit" class="btn variant-filled-success" value="Save it away, boss!" />
				<input type="reset" class="btn variant-filled-error" value="Undo changes" />
			</div>
		</form>
	{/await}
</div>
