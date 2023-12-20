import type { PageLoad } from './$types';

export const load: PageLoad = ({ data }) => {
	return {
		title: ``,
		description: ``,
		...data
	};
};
