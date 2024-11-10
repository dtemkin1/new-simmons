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

	interface Props {
		userInfo: UserInfo;
	}

	import { Carta, Markdown } from 'carta-md';
	import DOMPurify from 'isomorphic-dompurify';
	import { base } from '$app/paths';

	let { userInfo }: Props = $props();

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	});

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

<div
	class="card w-full max-w-md border p-4 text-center border-surface-200-800 preset-filled-surface-100-900"
>
	<header>
		<a href={`${base}/sds/directory/entry?username=${userInfoGenerated.username}`} class="anchor"
			>{userInfoGenerated.name}</a
		>
		{#if userInfoGenerated.type !== ''}
			<br /><span class="text-surface-500-400 text-sm">{userInfoGenerated.type}</span>
		{/if}
	</header>
	<article class="flex items-center justify-center p-4">
		<div class="flex flex-col items-center justify-center space-y-1 self-center">
			{#each userInfoGenerated.tags as tag}
				<div class="flex flex-row flex-wrap items-center justify-center space-x-1">
					<span class="text-end">{tag[0]}:</span>
					<span class="text-start"
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
	</article>

	{#if userInfo.quote}
		<footer>
			<blockquote class="prose blockquote text-start dark:prose-invert">
				<Markdown {carta} value={userInfoGenerated.quote} />
			</blockquote>
		</footer>
	{/if}
</div>
