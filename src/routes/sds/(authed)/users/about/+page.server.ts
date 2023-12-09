// import { connectToDB } from '$lib/db';
import type { PageServerLoad } from './$types';

// TODO: REPLACE WITH ACTUAL FUNCTION
export const load: PageServerLoad = async () => {
	return { dbName: 'sdb', version: '8.3.5' };
};
// export const load: PageServerLoad = async () => {
// 	const db = await connectToDB();
// 	const version = (await db.query('SELECT VERSION()')).rows[0];

// 	return { dbName: 'test', version: version };
// };
