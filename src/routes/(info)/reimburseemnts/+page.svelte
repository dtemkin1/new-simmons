<script lang="ts">
	import { base } from '$app/paths';
	import { redirect } from '@sveltejs/kit';

	throw redirect(302, `${base}/SimmonsReimbursement.pdf`);
</script>
