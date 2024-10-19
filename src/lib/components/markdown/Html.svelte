<script lang="ts">
	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

{@html text}
