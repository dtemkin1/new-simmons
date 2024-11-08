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

	interface Props {
		userInfo: UserInfo;
	}

	import { Carta, Markdown } from 'carta-md';
	import DOMPurify from 'isomorphic-dompurify';
	import { base } from '$app/paths';

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	});

	let { userInfo }: Props = $props();

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

<div
	class="card w-full max-w-md border p-4 text-center border-surface-200-800 preset-filled-surface-100-900"
>
	<header>
		<p>
			<em class="italic">{userInfoGenerated.name}</em><br />
			<a href={`mailto:${userInfoGenerated.email}`} class="anchor">{userInfoGenerated.email}</a>
			{#if userInfoGenerated.type !== ''}
				<br /><span class="text-surface-500-400 text-sm">{userInfoGenerated.type}</span>
			{/if}
		</p>
		{#if userInfoGenerated.favorite.length > 0}
			<br />
			<p>
				"My favorite {userInfoGenerated.favorite[0]} is {userInfoGenerated.favorite[1]}"
			</p>
		{/if}
	</header>
	<article class="flex items-center justify-center p-4">
		<div class="flex flex-col items-center justify-center space-y-1 self-center">
			{#each userInfoGenerated.tags as tag}
				<div class="flex flex-row flex-wrap items-center justify-center space-x-1">
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
	</article>

	{#if userInfo.quote}
		<footer>
			<blockquote class="prose blockquote text-left dark:prose-invert">
				<Markdown {carta} value={userInfoGenerated.quote} />
				<!-- <SvelteMarkdown options={{ breaks: true }} source={userInfoGenerated.quote} /> -->
			</blockquote>
		</footer>
	{/if}
</div>
