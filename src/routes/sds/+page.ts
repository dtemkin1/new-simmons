import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user) {
		throw redirect(302, '/sds/login/certs/login');
	} else {
		throw redirect(302, '/sds/home');
	}
};
