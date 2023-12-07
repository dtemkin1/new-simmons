<script lang="ts">
	export let href = '';
	export let title: string | undefined = undefined;
</script>

<a class="anchor" {href} {title}><slot /></a>
