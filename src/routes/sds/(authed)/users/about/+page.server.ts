import { connectToDB } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const db = await connectToDB();

	const versionQuery = db.query("SELECT split_part(version(),' on ',1)");
	const dbNameQuery = db.query('SELECT current_database()');

	const [version, dbName] = await Promise.all([
		(await versionQuery).rows[0].split_part,
		(await dbNameQuery).rows[0].current_database
	]);

	return { dbName: dbName, version: version };
};
