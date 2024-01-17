import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { SDS_BASE } from '$lib/config';

export const load: LayoutLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user) {
		redirect(302, SDS_BASE);
	}
	return {};
};
