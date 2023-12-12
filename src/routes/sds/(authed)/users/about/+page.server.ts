import { getClient } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const dbConnection = await getClient();

	const versionQuery = dbConnection.query("SELECT split_part(version(),' on ',1)");
	const dbNameQuery = dbConnection.query('SELECT current_database()');
	const adminsQuery = dbConnection.query(
		"SELECT username,lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='ADMINISTRATORS' ORDER BY lastname ASC"
	);
	const modsQuery = dbConnection.query(
		"SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='MODERATORS' ORDER BY lastname ASC"
	);
	const housecommLeadershipQuery = dbConnection.query(
		"SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='HOUSE-COMM-LEADERSHIP' ORDER BY lastname ASC"
	);
	const financialAdminsQuery = dbConnection.query(
		"SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='FINANCIAL-ADMINS' ORDER BY lastname ASC"
	);

	interface User {
		username: string;
		lastname: string;
		firstname: string;
	}

	interface UserNoUsername {
		username: string;
		lastname: string;
		firstname: string;
	}

	const [version, dbName, admins, mods, housecommLeadership, financialAdmins] = await Promise.all([
		(await versionQuery).rows[0].split_part as string,
		(await dbNameQuery).rows[0].current_database as string,
		(await adminsQuery).rows as User[],
		(await modsQuery).rows as UserNoUsername[],
		(await housecommLeadershipQuery).rows as UserNoUsername[],
		(await financialAdminsQuery).rows as UserNoUsername[]
	]);

	dbConnection.release();

	return {
		dbName: dbName,
		version: version,
		admins: admins,
		mods: mods,
		housecommLeadership: housecommLeadership,
		financialAdmins: financialAdmins
	};
};
