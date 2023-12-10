import { connectToDB } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const db = await connectToDB();

	const versionQuery = db.query("SELECT split_part(version(),' on ',1)");
	const dbNameQuery = db.query('SELECT current_database()');
	const adminsQuery = db.query(
		"SELECT username,lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='ADMINISTRATORS' ORDER BY lastname ASC"
	);
	const modsQuery = db.query(
		"SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='MODERATORS' ORDER BY lastname ASC"
	);
	const housecommLeadershipQuery = db.query(
		"SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='HOUSE-COMM-LEADERSHIP' ORDER BY lastname ASC"
	);
	const financialAdminsQuery = db.query(
		"SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='FINANCIAL-ADMINS' ORDER BY lastname ASC"
	);

	const [version, dbName, admins, mods, housecommLeadership, financialAdmins] = await Promise.all([
		(await versionQuery).rows[0].split_part,
		(await dbNameQuery).rows[0].current_database,
		(await adminsQuery).rows,
		(await modsQuery).rows,
		(await housecommLeadershipQuery).rows,
		(await financialAdminsQuery).rows
	]);

	return {
		dbName: dbName,
		version: version,
		admins: admins,
		mods: mods,
		housecommLeadership: housecommLeadership,
		financialAdmins: financialAdmins
	};
};
