import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { SDS_BASE } from '$lib/config';
import { getGroups } from '$lib/server/dbUtils';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, SDS_BASE);
	}
	return {
		username: event.locals.user.id,
		groups: await getGroups(event.locals.user.id),
		data: event.locals.session?.data
	};
};
