<!-- TODO: MAKE USERINFO COMPONENT -->

<script lang="ts">
	export let username: string;
	import SvelteMarkdown from 'svelte-markdown';

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

	interface UserInfo {
		title?: string;
		firstname?: string;
		lastname?: string;
		room?: string;
		gra?: string;
		year?: string;
		phone?: string;
		homepage?: string;
		cellphone?: string;
		homecity?: string;
		state?: string;
		country?: string;
		quote?: string;
		favoritething?: string;
		favoritethingis?: string;
		reminders?: boolean;
	}
	function getUserInfo(username: string) {
		let user: UserInfo = {};
		let name = [user.title, user.firstname, user.lastname].join(' ');
		let tags = [];

		if (user.year) {
			tags.push(['Year', user.year]);
		}
		if (user.homecity) {
			tags.push(['Hometown', [user.homecity, user.state, user.country].join(' ')]);
		}
		if (user.homepage) {
			tags.push(['URL', user.homepage]);
		}
		if (user.favoritething && user.favoritethingis) {
			tags.push([`Favorite ${user.favoritething}`, user.favoritethingis]);
		}
		return { name: name, tags: tags, quote: user.quote };
	}

	let userInfo = getUserInfo(username);
</script>

<div class="card">
	<header class="card-header text-center">
		<a href={`mailto:${username}@mit.edu`} class="anchor">{userInfo.name}</a>
	</header>
	<section class="p-4">
		<div class="grid grid-cols-2 grid-rows-4 gap-1 grid-flow-row-dense">
			{#each userInfo.tags as tag}
				<p class="text-right">{tag[0]}</p>
				{#if tag[0] == 'URL'}<p class="text-left"><a class="anchor" href={tag[1]}>{tag[1]}</a></p>
				{:else}<p class="text-left">{tag[1]}</p>
				{/if}
			{/each}
		</div>
	</section>

	{#if userInfo.quote}
		<footer class="card-footer">
			<SvelteMarkdown renderers={renderer} source={userInfo.quote} />
		</footer>
	{/if}
</div>
