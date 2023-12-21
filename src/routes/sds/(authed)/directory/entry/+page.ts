import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { base } from '$app/paths';

export const load: PageLoad = async () => {
	redirect(302, `${base}/sds/directory`);
};
