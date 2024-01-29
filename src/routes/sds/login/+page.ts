import type { PageLoad } from './$types';

export const load: PageLoad = ({ url, data }) => {
	const autoLogin = url.searchParams.get('auto');

	return {
		title: `Login`,
		description: ``,
		auto: autoLogin == '1',
		...data
	};
};
