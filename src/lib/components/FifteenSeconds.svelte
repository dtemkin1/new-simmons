<!-- TODO: MAKE USERINFO COMPONENT -->

<script lang="ts">
	interface UserInfo {
		username?: string;
		lastname?: string;
		firstname?: string;
		title?: string;
		year?: string;
		type?: string;
		quote?: string;
		favorite_category?: string;
		favorite_value?: string;
		homepage?: string;
		home_city?: string;
		home_state?: string;
		home_country?: string;
	}

	import SvelteMarkdown from 'svelte-markdown';
	export let userInfo: UserInfo;

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
		<a href={`mailto:${userInfoGenerated.username}@mit.edu`} class="anchor"
			>{userInfoGenerated.name}</a
		>
		{#if userInfoGenerated.type !== ''}
			<br /><span class="text-sm text-surface-500-400-token">{userInfoGenerated.type}</span>
		{/if}
	</header>
	<section class="p-4 flex items-center justify-center">
		<table class="table-auto self-center border-separate border-spacing-x-1">
			<tbody>
				{#each userInfoGenerated.tags as tag}
					<tr>
						<td class="text-right">{tag[0]}:</td>
						<td class="text-left"
							>{#if tag[0] == 'URL'}
								<a class="anchor" href={`${tag[1].includes('://') ? '' : 'http://'}${tag[1]}`}
									>{tag[1]}</a
								>
							{:else}{tag[1]}
							{/if}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
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
