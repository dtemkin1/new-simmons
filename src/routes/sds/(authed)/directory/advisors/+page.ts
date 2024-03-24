import type { PageLoad } from './$types';

export const load: PageLoad = ({ data }) => {
	return {
		title: `Advisors`,
		description: ``,
		...data
	};
};
