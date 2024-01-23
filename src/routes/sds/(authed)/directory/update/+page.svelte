<script lang="ts">
	import {
		ProgressRadial,
		getToastStore,
		popup,
		type ToastSettings,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';

	import { invalidateAll } from '$app/navigation';

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

	const quotePopup: PopupSettings = {
		event: 'focus-blur',
		target: 'quotePopup',
		placement: 'bottom'
	};
</script>

<div
	class="h-full w-full p-4
"
>
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
		<h2 class="h2 text-center p-2">Public Directory Entry</h2>
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
				<div class="card p-4 variant-filled max-w-xl" data-popup="quotePopup">
					<p>
						Quotes now support markdown, which means you can add rich text and images/gifs in your
						quotes. Goto <a class="anchor" href="https://stackedit.io/editor"
							>https://stackedit.io/editor</a
						> to format your quote and then paste the markdown text (the code on the left column on that
						website) here in the quote box.
					</p>
					<div class="arrow variant-filled" />
				</div>
				<textarea
					class="textarea font-mono"
					name="quote"
					rows="4"
					value={result.quote}
					use:popup={quotePopup}
				/>
			</label>
			<label>
				<span>My favorite...</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto_1fr]">
					<input
						class="input"
						type="text"
						name="favorite_category"
						value={result.favorite_category}
						placeholder="Color"
					/>
					<div class="input-group-shim">is</div>
					<input
						class="input"
						type="text"
						name="favorite_value"
						value={result.favorite_value}
						placeholder="Blue"
					/>
				</div>
			</label>
			<label>
				<span>Reminders</span>
				<div class="input-group input-group-divider grid-cols-[5fr_2fr_5fr]">
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
				<!-- svelte bug, cant use type="reset" (https://github.com/sveltejs/svelte/issues/8220) -->
				<input
					type="button"
					class="btn variant-filled-error"
					value="Undo changes"
					on:click={invalidateAll}
				/>
			</div>
		</form>

		<h2 class="h2 text-center p-2">Automatic Reminders</h2>
		<div class="flex items-center justify-center flex-col">
			{#if Object.keys(data.reminders).length > 0}
				<ul class="list-disc list-outside ml-6 py-2">
					{#each data.reminders.value as reminder}<li>{reminder}</li>{/each}
				</ul>
			{:else}
				<strong class="font-bold">
					<em class="italic">You do not currently have any reminders.</em>
				</strong>
			{/if}
		</div>
	{/await}
</div>
