import { pool } from '$lib/db';
import { sql } from 'slonik';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const dbResult = await pool.connect(async (connection) => {
		const versionQuery = connection.query(sql.unsafe`SELECT split_part(version(),' on ',1)`);
		const dbNameQuery = connection.query(sql.unsafe`SELECT current_database()`);
		const adminsQuery = connection.query(
			sql.unsafe`SELECT username,lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='ADMINISTRATORS' ORDER BY lastname ASC`
		);
		const modsQuery = connection.query(
			sql.unsafe`SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='MODERATORS' ORDER BY lastname ASC`
		);
		const housecommLeadershipQuery = connection.query(
			sql.unsafe`SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='HOUSE-COMM-LEADERSHIP' ORDER BY lastname ASC`
		);
		const financialAdminsQuery = connection.query(
			sql.unsafe`SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='FINANCIAL-ADMINS' ORDER BY lastname ASC`
		);

		const [version, dbName, admins, mods, housecommLeadership, financialAdmins] = await Promise.all(
			[
				(await versionQuery).rows[0].split_part,
				(await dbNameQuery).rows[0].current_database,
				(await adminsQuery).rows,
				(await modsQuery).rows,
				(await housecommLeadershipQuery).rows,
				(await financialAdminsQuery).rows
			]
		);

		return {
			dbName: dbName,
			version: version,
			admins: admins,
			mods: mods,
			housecommLeadership: housecommLeadership,
			financialAdmins: financialAdmins
		};
	});

	return dbResult;
};
