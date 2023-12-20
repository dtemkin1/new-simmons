import type { PageLoad } from './$types';

export const load: PageLoad = ({ data, params }) => {
	return {
		title: `Directory Entry: ${params.username}`,
		description: ``,
		...data
	};
};
