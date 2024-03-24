import type { PageLoad } from './$types';
import type { TRexAPIResponse } from './types';

export const load: PageLoad = async ({ fetch }) => {
	const rexData: TRexAPIResponse = await fetch(`https://rex.mit.edu/api.json`).then((r) =>
		r.json()
	);

	return {
		title: `Welcome, Prospectives!`,
		description: ``,
		rexData
	};
};
