// import { connectToDB } from '$lib/db';
import type { PageServerLoad } from './$types';

// TODO: MAKE ACTUAL FUNCTION TO GET RANDOM RESIDENT
export const load: PageServerLoad = async () => {
	return { randomResident: 'test' };
};
