import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { base } from '$app/paths';

export const load: PageLoad = async () => {
	throw redirect(302, `${base}/sds/directory`);
};
