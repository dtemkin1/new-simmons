<script lang="ts">
	import { people, incumbents, offices } from '$lib/data/simGov';
	import PeopleModal from './PeopleModal.svelte';

	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	export let office: keyof typeof offices;

	const officerColor = {
		//house team
		hoh: 'variant-filled-surface',
		associate_hoh: 'variant-filled-surface',
		house_manager: 'variant-filled-surface',
		area_director: 'variant-filled-surface',

		// external
		president: 'variant-filled-primary',
		athletics_chair: 'variant-filled-primary',
		frosh_chair: 'variant-filled-primary',
		publicity_chair: 'variant-filled-primary',

		// internal
		house_chair: 'variant-filled-warning',
		rooming_chair: 'variant-filled-warning',
		dining_chair: 'variant-filled-warning',
		historian: 'variant-filled-warning',
		social_chair: 'variant-filled-warning',
		technology_chair: 'variant-filled-warning',

		//facilities
		fisch_chair: 'variant-filled-secondary',
		workshop_chair: 'variant-filled-secondary',
		library_chair: 'variant-filled-secondary',
		entertainment_chair: 'variant-filled-secondary',
		reservations_chair: 'variant-filled-secondary',
		kitchen_chair: 'variant-filled-secondary',
		gym_chair: 'variant-filled-secondary',
		ee_lab_chair: 'variant-filled-secondary',
		craft_room_chair: 'variant-filled-secondary',

		//other
		treasurer: 'variant-filled-success',
		secretary: 'variant-filled-error',
		desk_captain: 'variant-filled'
	};

	let relevantIncumbents = incumbents[office].map((incumbent) => {
		return people[incumbent];
	});

	let image = import(`../assets/officers/photo.jpg?enhanced`);
	let [imageName, imageExtension] = [...relevantIncumbents[0].photo.split('.')];

	if (imageExtension == 'png') {
		image = import(`../assets/officers/${imageName}.png?enhanced`);
	} else if (imageExtension == 'jpg') {
		image = import(`../assets/officers/${imageName}.jpg?enhanced`);
	} else if (imageExtension == 'jpeg') {
		image = import(`../assets/officers/${imageName}.jpeg?enhanced`);
	}

	const modalComponent: ModalComponent = {
		ref: PeopleModal,
		props: { office: offices[office], people: relevantIncumbents }
	};
	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};
</script>

<button
	class="block card card-hover {officerColor[office]}"
	on:click={() => modalStore.trigger(modal)}
>
	<header class="card-header">
		{#await image}
			<enhanced:img
				class="w-full h-full rounded-full"
				src="../assets/officers/photo.jpg"
				alt="office"
			/>
		{:then userImg}
			<enhanced:img class="w-full h-full rounded-full" src={userImg.default} alt="office" />
		{/await}
	</header>
	<section class="p-4 font-bold">
		{@html relevantIncumbents.map((person) => person.name).join('/<wbr>')}
	</section>
	<footer class="card-footer">{offices[office].title}</footer>
</button>
