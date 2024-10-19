<script lang="ts">
	interface Props {
		lang: string;
		text: string;
	}

	let { lang, text }: Props = $props();
</script>

<pre class="pre" class:lang><code class="code">{text}</code></pre>
