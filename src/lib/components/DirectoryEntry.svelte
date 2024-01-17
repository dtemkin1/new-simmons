<!-- TODO: MAKE USERINFO COMPONENT -->

<script lang="ts">
	interface UserInfo {
		cellphone: string | null;
		email: string | null;
		favorite_category: string | null;
		favorite_value: string | null;
		firstname: string | null;
		home_city: string | null;
		home_country: string | null;
		home_state: string | null;
		homepage: string | null;
		lastname: string | null;
		phone: string | null;
		quote: string | null;
		room: string | null;
		title: string | null;
		type: string | null;
		username: string | null;
		year: number | null;
		gra: string | null;
	}

	import SvelteMarkdown from 'svelte-markdown';
	export let userInfo: UserInfo;

	import { base } from '$app/paths';
	import { renderer } from '$lib/components/markdown';

	function getUserInfo(user: UserInfo) {
		let username = user.username;
		let name = [user.title, user.firstname, user.lastname].join(' ');
		let email = user.email;
		let tags = [];
		let favorites: string[] = [];

		if (user.room) {
			tags.push(['Room', user.room]);
		}
		if (user.gra) {
			tags.push(['GRA Section', user.gra]);
		}
		if (user.year) {
			tags.push(['Year', user.year]);
		}
		if (user.homepage) {
			tags.push(['URL', user.homepage]);
		}
		if (user.cellphone) {
			tags.push(['Cell', user.cellphone]);
		}
		if (user.home_city) {
			tags.push(['Hometown', [user.home_city, user.home_state, user.home_country].join(' ')]);
		}

		if (user.favorite_category && user.favorite_value) {
			favorites = [user.favorite_category, user.favorite_value];
		}
		return {
			username: username,
			email: email,
			name: name,
			tags: tags,
			quote: `${user.quote}`,
			type: user.type,
			favorite: favorites
		};
	}

	let userInfoGenerated = getUserInfo(userInfo);
</script>

<div class="card m-4 mb-0">
	<header class="card-header text-center">
		<p>
			<em class="italic">{userInfoGenerated.name}</em><br />
			<a href={`mailto:${userInfoGenerated.email}`} class="anchor">{userInfoGenerated.email}</a>
			{#if userInfoGenerated.type !== ''}
				<br /><span class="text-sm text-surface-500-400-token">{userInfoGenerated.type}</span>
			{/if}
		</p>
		{#if userInfoGenerated.favorite.length > 0}
			<br />
			<p>
				"My favorite {userInfoGenerated.favorite[0]} is {userInfoGenerated.favorite[1]}"
			</p>
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
						{:else if tag[0] == 'GRA Section' && typeof tag[1] == 'string'}
							<form action={`${base}/sds/directory/list`} method="POST">
								<input type="hidden" name="gra" value={tag[1]} />
								<button class="anchor" type="submit">{tag[1]}</button>
							</form>
						{:else}
							{tag[1]}
						{/if}</span
					>
				</div>
			{/each}
		</div>
	</section>

	{#if userInfo.quote}
		<footer class="card-footer">
			<blockquote class="blockquote prose dark:prose-invert">
				<SvelteMarkdown options={{ breaks: true }} source={userInfoGenerated.quote} />
			</blockquote>
		</footer>
	{/if}
</div>
