<script lang="ts">
	import PeopleTile from '$lib/components/PeopleTile.svelte';
</script>

<div class="bg-surface-50-900-token h-full w-full">
	<div class="grid-cols-10 grid gap-x-4 gap-y-12 p-4">
		<!-- ROW 1 -->
		<PeopleTile office="hoh" />
		<PeopleTile office="associate_hoh" />
		<div />
		<PeopleTile office="president" />
		<PeopleTile office="treasurer" />
		<PeopleTile office="house_chair" />
		<PeopleTile office="secretary" />
		<div />
		<PeopleTile office="house_manager" />
		<div />

		<!-- ROW 2 -->
		<PeopleTile office="area_director" />
		<div />
		<div />
		<PeopleTile office="rooming_chair" />
		<PeopleTile office="dining_chair" />
		<PeopleTile office="historian" />
		<PeopleTile office="social_chair" />
		<PeopleTile office="technology_chair" />
		<div />
		<PeopleTile office="desk_captain" />

		<!-- ROW 3 -->
		<div />
		<div />
		<PeopleTile office="athletics_chair" />
		<PeopleTile office="frosh_chair" />
		<PeopleTile office="publicity_chair" />
		<div />
		<div />
		<div />
		<PeopleTile office="fisch_chair" />
		<div />

		<!-- ROW 4 -->
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<PeopleTile office="workshop_chair" />
		<PeopleTile office="library_chair" />
		<PeopleTile office="entertainment_chair" />
		<PeopleTile office="reservations_chair" />

		<!-- ROW 5 -->
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<PeopleTile office="ee_lab_chair" />
		<PeopleTile office="craft_room_chair" />
		<PeopleTile office="kitchen_chair" />
		<PeopleTile office="gym_chair" />
	</div>
</div>
