import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, data }) => {
	const { username } = await parent();

	return {
		title: `Password for ${username}`,
		description: ``,
		...data
	};
};
