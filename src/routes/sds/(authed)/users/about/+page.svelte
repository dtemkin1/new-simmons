<script lang="ts">
	import { VERSION } from 'svelte/compiler';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex flex-col items-center p-4">
	<div class="flex flex-col items-center h-full gap-4 container self-center">
		<div class="self-center">
			<h1 class="h1 text-center">About the Simmons DB</h1>
		</div>
		<h2 class="h2 text-center">The Simmons DB</h2>
		<p>
			<span class="font-bold italic">Original authors:</span>
			dramage, 2002; with bonawitz, dheera, psaindon<br />
			<span class="font-bold italic">GovTracker:</span>
			advay, 2006<br />
			<span class="font-bold italic">Simmons DB 2.0:</span>
			dtemkin, 2026
		</p>
		<div class="grid grid-cols-3 grid-rows-3 gap-4">
			<div>
				<a class="anchor font-bold" href="mailto:simmons-tech@mit.edu"
					>Administrators (IT Committee)</a
				>
				<ul class="list">
					<li><span class="flex-auto">Sarah Pomerantz</span></li>
					<li><span class="flex-auto">Andi Qu</span></li>
					<li><span class="flex-auto">Mohan Richter-Addo</span></li>
					<li><span class="flex-auto">Jordan Wilke</span></li>
					<li><span class="flex-auto">Alex Yi</span></li>
				</ul>
			</div>
			<div>
				<a class="anchor font-bold" href="mailto:simmons-moderators@mit.edu">Moderators</a>
				<ul class="list">
					<li><span class="flex-auto">Mohan Richter-Addo</span></li>
					<li><span class="flex-auto">Jordan Wilke</span></li>
				</ul>
			</div>
			<div>
				<span class="font-bold">GovTracker House Committee Editors</span>
				<ul class="list">
					<li><span class="flex-auto">Sarah Pomerantz</span></li>
					<li><span class="flex-auto">Mohan Richter-Addo</span></li>
					<li><span class="flex-auto">Jordan Wilke</span></li>
				</ul>
			</div>
			<div class="col-span-2">
				<p class="italic">
					Want to help make the Simmons DB better?<br />
					Then join the <a href="mailto:simmons-tech@mit.edu">IT Committee!</a>
				</p>
			</div>
			<div>
				<span class="font-bold">GovTracker Financial Editors</span>
				<ul class="list">
					<li><span class="flex-auto">Liam Coy</span></li>
					<li><span class="flex-auto">Lawrence Liu</span></li>
					<li><span class="flex-auto">Andi Qu</span></li>
					<li><span class="flex-auto">Mohan Richter-Addo</span></li>
					<li><span class="flex-auto">Jordan Wilke</span></li>
				</ul>
			</div>
			<div class="col-span-3">
				<span class="font-bold">Technical specs</span><br />
				<ul class="list">
					<li><code class="code flex-auto">Svelte {VERSION}</code></li>
					<li><code class="code flex-auto">PostgreSQL {data.version}</code></li>
					<li><code class="code flex-auto">Current Database: {data.dbName}</code></li>
				</ul>
			</div>
		</div>
	</div>
</div>
