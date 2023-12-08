// import { connectToDB } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { randomResident: 'test' };
};
