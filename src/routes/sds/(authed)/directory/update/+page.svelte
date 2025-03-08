<script lang="ts">
	import { ProgressRing, type ToastContext, Popover } from '@skeletonlabs/skeleton-svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { getContext } from 'svelte';

	import { invalidateAll } from '$app/navigation';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let quotePopup: boolean = $state(false);

	export const toast: ToastContext = getContext('toast');

	function toastHandler(result: ActionResult) {
		if (result.type == 'success') {
			toast.create({
				description: `${result.data?.message}` || '',
				type: 'success'
			});
		} else if (result.type == 'failure') {
			toast.create({
				description: `${result.data?.message}` || '',
				type: 'error'
			});
		} else {
			toast.create({
				description: 'Unknown form result'
			});
		}
	}

	// const quotePopup: PopupSettings = {
	// 	event: 'focus-blur',
	// 	target: 'quotePopup',
	// 	placement: 'bottom'
	// };
</script>

{#await data.result}
	<div class="flex h-full w-full items-center justify-center">
		<ProgressRing value={null} />
	</div>
{:then result}
	<h1 class="h1 self-center pt-4 text-center">
		{#if data.isSudo}
			Your <em class="italic">Impersonated</em> Profile
		{:else}
			Your Profile
		{/if}
	</h1>
	<div class="p-2">
		<form
			class="card border-surface-200-800 preset-filled-surface-100-900 m-4 flex flex-col space-y-4 border p-4"
			method="post"
			use:enhance={() => {
				return async ({ result, update }) => {
					update();
					toastHandler(result);
				};
			}}
		>
			<h2 class="h2 self-center text-center">Public Directory Entry</h2>
			<label class="label">
				<span class="label-text">Title</span>
				<input class="input" type="text" name="title" disabled value={result.title} />
			</label>
			<label class="label">
				<span class="label-text">First Name</span>
				<input class="input" type="text" name="firstname" disabled value={result.firstname} />
			</label>
			<label class="label">
				<span class="label-text">Last Name</span>
				<input class="input" type="text" name="lastname" disabled value={result.lastname} />
			</label>
			<label class="label">
				<span class="label-text">Room</span>
				<input class="input" type="text" name="room" disabled value={result.room} />
			</label>
			{#if result.phone2 && result.phone2 != ''}
				<label>
					<span class="label-text">Phone</span>
					<select class="select" name="phone">
						<option value={result.phone} selected={result.phone == result.phone1}
							>{result.phone1}</option
						>
						<option value={result.phone2} selected={result.phone == result.phone2}
							>{result.phone2}</option
						>
					</select>
				</label>
			{:else}
				<label class="label">
					<span class="label-text">Phone</span>
					<input class="input" type="text" name="phone" disabled value={result.phone} />
				</label>
			{/if}
			<label class="label">
				<span class="label-text">Homepage</span>
				<input class="input" type="url" name="homepage" value={result.homepage} />
			</label>
			<label class="label">
				<span class="label-text">Cellphone</span>
				<input class="input" type="text" name="cellphone" value={result.cellphone} />
			</label>
			<label class="label">
				<span class="label-text">Home City</span>
				<input class="input" type="text" name="home_city" value={result.home_city} />
			</label>
			<label class="label">
				<span class="label-text">Home State</span>
				<input class="input" type="text" name="home_state" value={result.home_state} />
			</label>
			<label class="label">
				<span class="label-text">Home Country</span>
				<input class="input" type="text" name="home_country" value={result.home_country} />
			</label>
			<label>
				<span class="label-text">Quote</span>
				<Popover
					open={quotePopup}
					onOpenChange={(e) => (quotePopup = e.open)}
					positioning={{ placement: 'bottom' }}
					triggerBase="block w-full"
					contentBase="card bg-surface-200-800 p-4 space-y-4 max-w-[320px]"
					arrow
					arrowBackground="bg-surface-200! dark:bg-surface-800!"
				>
					{#snippet trigger()}
						<textarea class="textarea font-mono" name="quote" rows="4" value={result.quote}
						></textarea>
					{/snippet}
					{#snippet content()}
						<p>
							Quotes now support markdown, which means you can add rich text and images/gifs in your
							quotes. Goto <a class="anchor" href="https://stackedit.io/editor"
								>https://stackedit.io/editor</a
							> to format your quote and then paste the markdown text (the code on the left column on
							that website) here in the quote box.
						</p>
					{/snippet}
				</Popover>
			</label>
			<label>
				<span class="label-text">My favorite...</span>
				<div class="input-group divide-surface-200-800 grid-cols-[1fr_auto_1fr] divide-x">
					<input
						type="text"
						name="favorite_category"
						value={result.favorite_category}
						placeholder="Color"
					/>
					<div class="ig-cell">is</div>
					<input
						type="text"
						name="favorite_value"
						value={result.favorite_value}
						placeholder="Blue"
					/>
				</div>
			</label>
			<label>
				<span class="label-text">Reminders</span>
				<p>
					When I have reminders, I want to
					<select class="select inline w-fit" name="showreminders">
						<option value={true} selected={result.showreminders}>show</option>
						<option value={false} selected={!result.showreminders}>hide</option>
					</select>
					the yellow reminders box.
				</p>
			</label>
			<div class="grid grid-cols-[1fr_1fr] gap-4">
				<input type="submit" class="btn preset-filled-success-500" value="Save it away, boss!" />
				<!-- svelte bug, cant use type="reset" (https://github.com/sveltejs/svelte/issues/8220) -->
				<input
					type="button"
					class="btn preset-filled-error-500"
					value="Undo changes"
					onclick={invalidateAll}
				/>
			</div>
		</form>
	</div>

	<div class="flex flex-col items-center justify-center pb-4">
		<h2 class="h2 p-2 text-center">Automatic Reminders</h2>
		{#if Object.keys(data.reminders).length > 0}
			<ul class="ml-6 list-outside list-disc py-2">
				{#each data.reminders.value as reminder (reminder)}<li>{reminder}</li>{/each}
			</ul>
		{:else}
			<strong class="font-bold">
				<em class="italic">You do not currently have any reminders.</em>
			</strong>
		{/if}
	</div>
{/await}
