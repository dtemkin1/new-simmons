<script lang="ts">
	interface Props {
		href?: string;
		title?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let { href = '', title = undefined, children }: Props = $props();
</script>

<a class="anchor" {href} {title}>{@render children?.()}</a>
