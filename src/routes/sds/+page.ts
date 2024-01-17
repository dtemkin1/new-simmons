import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { SDS_HOME_URL, SDS_LOGIN_URL } from '$lib/config';

export const load: PageLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user) {
		redirect(302, SDS_LOGIN_URL);
	} else {
		redirect(302, SDS_HOME_URL);
	}
};
