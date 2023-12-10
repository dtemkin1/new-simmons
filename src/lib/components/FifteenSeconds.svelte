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

	import {
		Heading,
		Paragraph,
		Text,
		Image,
		Link,
		Em,
		Strong,
		Codespan,
		Del,
		Table,
		TableHead,
		TableBody,
		TableRow,
		TableCell,
		List,
		ListItem,
		Hr,
		Html,
		Blockquote,
		Code,
		Br
	} from '$lib/components/markdown';

	const renderer = {
		heading: Heading,
		paragraph: Paragraph,
		text: Text,
		image: Image,
		link: Link,
		em: Em,
		strong: Strong,
		codespan: Codespan,
		del: Del,
		table: Table,
		tablehead: TableHead,
		tablebody: TableBody,
		tablerow: TableRow,
		tablecell: TableCell,
		list: List,
		orderedlistitem: null,
		unorderedlistitem: null,
		listitem: ListItem,
		hr: Hr,
		html: Html,
		blockquote: Blockquote,
		code: Code,
		br: Br
	};

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
		return { username: username, name: name, tags: tags, quote: user.quote };
	}

	let userInfoGenerated = getUserInfo(userInfo);
</script>

<div class="card">
	<header class="card-header text-center">
		<a href={`mailto:${userInfoGenerated.username}@mit.edu`} class="anchor"
			>{userInfoGenerated.name}</a
		>
	</header>
	<section class="p-4">
		<div class="grid grid-cols-2 gap-1 grid-flow-row-dense">
			{#each userInfoGenerated.tags as tag}
				<p class="text-right">{tag[0]}</p>
				{#if tag[0] == 'URL'}<p class="text-left"><a class="anchor" href={tag[1]}>{tag[1]}</a></p>
				{:else}<p class="text-left">{tag[1]}</p>
				{/if}
			{/each}
		</div>
	</section>

	{#if userInfo.quote}
		<footer class="card-footer">
			<SvelteMarkdown renderers={renderer} source={userInfoGenerated.quote} />
		</footer>
	{/if}
</div>
