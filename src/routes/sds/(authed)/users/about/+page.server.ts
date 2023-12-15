import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

const sql = createSqlTag({
	typeAliases: {
		id: z.object({
			id: z.number()
		}),
		void: z.object({}).strict(),
		user: z.object({
			username: z.string(),
			lastname: z.string(),
			firstname: z.string()
		}),
		userNoUsername: z.object({
			lastname: z.string(),
			firstname: z.string()
		})
	}
});

export const load: PageServerLoad = async () => {
	const dbResult = pool.connect(async (connection) => {
		const versionQuery = connection.oneFirst(
			sql.type(z.object({ split_part: z.string() }))`SELECT split_part(version(),' on ',1)`
		);
		const dbNameQuery = connection.oneFirst(
			sql.type(z.object({ current_database: z.string() }))`SELECT current_database()`
		);
		const adminsQuery = connection.any(
			sql.typeAlias(
				'user'
			)`SELECT username,lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='ADMINISTRATORS' ORDER BY lastname ASC`
		);
		const modsQuery = connection.any(
			sql.typeAlias(
				'userNoUsername'
			)`SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='MODERATORS' ORDER BY lastname ASC`
		);
		const housecommLeadershipQuery = connection.any(
			sql.typeAlias(
				'userNoUsername'
			)`SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='HOUSE-COMM-LEADERSHIP' ORDER BY lastname ASC`
		);
		const financialAdminsQuery = connection.any(
			sql.typeAlias(
				'userNoUsername'
			)`SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='FINANCIAL-ADMINS' ORDER BY lastname ASC`
		);

		const [version, dbName, admins, mods, housecommLeadership, financialAdmins] = await Promise.all(
			[
				await versionQuery,
				await dbNameQuery,
				await adminsQuery,
				await modsQuery,
				await housecommLeadershipQuery,
				await financialAdminsQuery
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
