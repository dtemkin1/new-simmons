import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, data }) => {
	const { session } = await parent();

	return {
		title: `Password for ${session?.user?.username}`,
		description: ``,
		...data
	};
};
