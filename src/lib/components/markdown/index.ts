import { default as Heading } from './Heading.svelte';
import { default as Paragraph } from './Paragraph.svelte';
import { default as Text } from './Text.svelte';
import { default as Image } from './Image.svelte';
import { default as Link } from './Link.svelte';
import { default as Em } from './Em.svelte';
import { default as Del } from './Del.svelte';
import { default as Codespan } from './Codespan.svelte';
import { default as Strong } from './Strong.svelte';
import { default as Table } from './Table.svelte';
import { default as TableHead } from './TableHead.svelte';
import { default as TableBody } from './TableBody.svelte';
import { default as TableRow } from './TableRow.svelte';
import { default as TableCell } from './TableCell.svelte';
import { default as List } from './List.svelte';
import { default as ListItem } from './ListItem.svelte';
import { default as Hr } from './Hr.svelte';
import { default as Html } from './Html.svelte';
import { default as Blockquote } from './Blockquote.svelte';
import { default as Code } from './Code.svelte';
import { default as Br } from './Br.svelte';

export const renderer = {
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
