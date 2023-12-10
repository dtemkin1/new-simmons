import { connectToDB } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const db = await connectToDB();
	const version = (await db.query("SELECT split_part(version(),' on ',1)")).rows[0].split_part;
	const dnName = (await db.query('SELECT current_database()')).rows[0].current_database;

	return { dbName: dnName, version: version };
};
