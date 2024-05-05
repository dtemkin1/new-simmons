<script lang="ts">
	import PeopleTile from '$lib/components/PeopleTile.svelte';
</script>

<div class="h-full w-full overflow-auto">
	<div
		class="md:grid-cols-10 max-md:grid-rows-10 max-md:grid-flow-col grid gap-x-4 gap-y-12 p-4 w-full h-full"
	>
		<!-- ROW 1 -->
		<PeopleTile office="hoh" />
		<PeopleTile office="associate_hoh" />
		<div></div>
		<PeopleTile office="president" />
		<PeopleTile office="treasurer" />
		<PeopleTile office="house_chair" />
		<PeopleTile office="secretary" />
		<div></div>
		<PeopleTile office="house_manager" />
		<div></div>

		<!-- ROW 2 -->
		<PeopleTile office="area_director" />
		<div></div>
		<div></div>
		<PeopleTile office="rooming_chair" />
		<PeopleTile office="dining_chair" />
		<PeopleTile office="historian" />
		<PeopleTile office="social_chair" />
		<PeopleTile office="technology_chair" />
		<div></div>
		<PeopleTile office="desk_captain" />

		<!-- ROW 3 -->
		<div></div>
		<div></div>
		<PeopleTile office="athletics_chair" />
		<PeopleTile office="frosh_chair" />
		<PeopleTile office="publicity_chair" />
		<div></div>
		<div></div>
		<div></div>
		<PeopleTile office="fisch_chair" />
		<div></div>

		<!-- ROW 4 -->
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<PeopleTile office="workshop_chair" />
		<PeopleTile office="library_chair" />
		<PeopleTile office="entertainment_chair" />
		<PeopleTile office="reservations_chair" />

		<!-- ROW 5 -->
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<PeopleTile office="ee_lab_chair" />
		<PeopleTile office="craft_room_chair" />
		<PeopleTile office="kitchen_chair" />
		<PeopleTile office="gym_chair" />
	</div>
</div>
