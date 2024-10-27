import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { base } from '$app/paths';

export const load: PageLoad = ({ url, data }) => {
	const autoLogin = url.searchParams.get('auto');

	if (autoLogin == '1') {
		redirect(302, `${base}/auth/signin/okta`);
	}

	return {
		title: `Login`,
		description: ``,
		...data
	};
};
