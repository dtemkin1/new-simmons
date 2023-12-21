import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { base } from '$app/paths';

export const load: LayoutLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user) {
		redirect(302, `${base}/sds`);
	}
	return {};
};
