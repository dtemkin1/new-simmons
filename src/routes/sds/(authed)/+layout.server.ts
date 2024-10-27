import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { SDS_LOGIN_URL } from '$lib/config';
import { getGroups } from '$lib/server/dbUtils';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, `${SDS_LOGIN_URL}?redirect=${encodeURIComponent(event.url.pathname)}`);
	}
	return {
		username: event.locals.user.username,
		groups: await getGroups(event.locals.user.username),
		data: event.locals.session?.data
	};
};
