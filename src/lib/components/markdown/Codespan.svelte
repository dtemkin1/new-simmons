<script lang="ts">
	interface Props {
		raw: string;
	}

	let { raw }: Props = $props();
</script>

<code class="code">{raw.replace(/`/g, '')}</code>
