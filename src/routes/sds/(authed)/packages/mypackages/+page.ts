import type { PageLoad } from './$types';

export const load: PageLoad = ({ data }) => {
	return {
		title: `My Packages`,
		description: ``,
		...data
	};
};
