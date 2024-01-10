<!-- TODO: MAKE USERINFO COMPONENT -->

<script lang="ts">
	interface UserInfo {
		favorite_category: string | null;
		favorite_value: string | null;
		firstname: string | null;
		home_city: string | null;
		home_country: string | null;
		home_state: string | null;
		homepage: string | null;
		lastname: string | null;
		quote: string | null;
		title: string | null;
		type: string | null;
		username: string | null;
		year: number | null;
	}

	import SvelteMarkdown from 'svelte-markdown';
	export let userInfo: UserInfo;

	import { base } from '$app/paths';
	import { renderer } from '$lib/components/markdown';

	function getUserInfo(user: UserInfo) {
		let username = user.username;
		let name = [user.title, user.firstname, user.lastname].join(' ');
		let tags = [];

		if (user.year) {
			tags.push(['Year', user.year]);
		}
		if (user.home_city) {
			tags.push(['Hometown', [user.home_city, user.home_state, user.home_country].join(' ')]);
		}
		if (user.homepage) {
			tags.push(['URL', user.homepage]);
		}
		if (user.favorite_category && user.favorite_value) {
			tags.push([`Favorite ${user.favorite_category}`, user.favorite_value]);
		}
		return { username: username, name: name, tags: tags, quote: `${user.quote}`, type: user.type };
	}

	let userInfoGenerated = getUserInfo(userInfo);
</script>

<div class="card">
	<header class="card-header text-center">
		<a href={`${base}/sds/directory/entry?username=${userInfoGenerated.username}`} class="anchor"
			>{userInfoGenerated.name}</a
		>
		{#if userInfoGenerated.type !== ''}
			<br /><span class="text-sm text-surface-500-400-token">{userInfoGenerated.type}</span>
		{/if}
	</header>
	<section class="p-4 flex items-center justify-center">
		<div class="flex flex-col self-center items-center justify-center space-y-1">
			{#each userInfoGenerated.tags as tag}
				<div class="flex flex-row space-x-1 justify-center items-center flex-wrap">
					<span class="text-right">{tag[0]}:</span>
					<span class="text-left"
						>{#if tag[0] == 'URL' && typeof tag[1] == 'string'}
							<a class="anchor" href={`${tag[1].includes('://') ? '' : 'http://'}${tag[1]}`}
								>{tag[1]}</a
							>
						{:else}{tag[1]}
						{/if}</span
					>
				</div>
			{/each}
		</div>
	</section>

	{#if userInfo.quote}
		<footer class="card-footer">
			<blockquote class="blockquote">
				<SvelteMarkdown
					options={{ breaks: true }}
					renderers={renderer}
					source={userInfoGenerated.quote}
				/>
			</blockquote>
		</footer>
	{/if}
</div>
