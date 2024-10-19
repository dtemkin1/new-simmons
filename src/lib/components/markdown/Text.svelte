<script lang="ts">
	text;
	interface Props {
		text: any;
		raw: any;
		children?: import('svelte').Snippet;
	}

	let { text, raw, children }: Props = $props();
	raw;
</script>

{@render children?.()}
