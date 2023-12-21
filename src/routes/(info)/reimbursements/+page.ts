import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	redirect(302, `${base}/SimmonsReimbursement.pdf`);
};
