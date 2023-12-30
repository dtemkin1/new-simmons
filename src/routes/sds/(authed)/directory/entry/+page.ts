import type { PageLoad } from './$types';

export const load: PageLoad = ({ data, url }) => {
	return {
		title: `Directory Entry: ${url.searchParams.get('username')}`,
		description: ``,
		...data
	};
};
