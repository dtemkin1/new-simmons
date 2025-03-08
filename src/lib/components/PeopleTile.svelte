<script lang="ts">
	import { people, incumbents, offices } from '$lib/data/simGov';
	import PeopleModal from './PeopleModal.svelte';

	import { Modal } from '@skeletonlabs/skeleton-svelte';

	import type { EnhancedImgAttributes } from '@sveltejs/enhanced-img';

	let openState = $state(false);

	// function modalClose() {
	// 	openState = false;
	// }

	// export let office: keyof typeof offices;
	interface Props {
		office: keyof typeof offices;
	}
	let { office }: Props = $props();

	const officerColor = {
		//house team
		hoh: 'preset-filled-surface-500',
		associate_hoh: 'preset-filled-surface-500',
		house_manager: 'preset-filled-surface-500',
		area_director: 'preset-filled-surface-500',

		// external
		president: 'preset-filled-primary-500',
		athletics_chair: 'preset-filled-primary-500',
		frosh_chair: 'preset-filled-primary-500',
		publicity_chair: 'preset-filled-primary-500',

		// internal
		house_chair: 'preset-filled-warning-500',
		rooming_chair: 'preset-filled-warning-500',
		dining_chair: 'preset-filled-warning-500',
		historian: 'preset-filled-warning-500',
		social_chair: 'preset-filled-warning-500',
		technology_chair: 'preset-filled-warning-500',

		//facilities
		fisch_chair: 'preset-filled-secondary-500',
		workshop_chair: 'preset-filled-secondary-500',
		library_chair: 'preset-filled-secondary-500',
		entertainment_chair: 'preset-filled-secondary-500',
		reservations_chair: 'preset-filled-secondary-500',
		kitchen_chair: 'preset-filled-secondary-500',
		gym_chair: 'preset-filled-secondary-500',
		ee_lab_chair: 'preset-filled-secondary-500',
		craft_room_chair: 'preset-filled-secondary-500',

		//other
		treasurer: 'preset-filled-success-500',
		secretary: 'preset-filled-error-500',
		desk_captain: 'preset-filled'
	};

	const relevantIncumbents = incumbents[office].map((incumbent) => {
		return people[incumbent];
	});

	// TODO: FIX TYPE
	const images: Record<string, { default: EnhancedImgAttributes['src'] }> = import.meta.glob(
		'../assets/officers/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	);

	const image = (
		images['../assets/officers/' + relevantIncumbents[0].photo] ??
		images['../assets/officers/photo.jpg']
	).default;
</script>

<Modal
	open={openState}
	onOpenChange={(e) => (openState = e.open)}
	triggerBase="block card p-4 card-hover {officerColor[office]}"
	contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-(--breakpoint-sm)"
	backdropClasses="backdrop-blur-xs"
>
	{#snippet trigger()}
		<header>
			<enhanced:img class="h-full w-full rounded-full" src={image} alt="office"></enhanced:img>
		</header>
		<article class="space-y-4 p-4 font-bold">
			{@html relevantIncumbents.map((person) => person.name).join('/<wbr>')}
		</article>
		<footer>{offices[office].title}</footer>
	{/snippet}
	{#snippet content()}
		<PeopleModal office={offices[office]} people={relevantIncumbents} img={image} />
	{/snippet}
</Modal>
