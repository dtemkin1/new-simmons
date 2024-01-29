import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SDS_HOME_URL, SDS_LOGIN_URL } from '$lib/config';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, SDS_LOGIN_URL);
	} else {
		redirect(302, SDS_HOME_URL);
	}
};
