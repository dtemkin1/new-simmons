import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const autoLogin = url.searchParams.get('auto');

	return {
		title: `Login`,
		description: ``,
		auto: autoLogin == '1'
	};
};
