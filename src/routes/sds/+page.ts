import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { base } from '$app/paths';

export const load: PageLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user) {
		redirect(302, `${base}/sds/login/certs/login`);
	} else {
		redirect(302, `${base}/sds/home`);
	}
};
