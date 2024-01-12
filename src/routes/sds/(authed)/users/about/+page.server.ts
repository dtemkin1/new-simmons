import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

const sql = createSqlTag({
	typeAliases: {
		user: z.object({
			username: z.string(),
			lastname: z.string(),
			firstname: z.string()
		}),
		userNoUsername: z.object({
			lastname: z.string(),
			firstname: z.string()
		}),
		version: z.object({
			split_part: z.string()
		}),
		current_database: z.object({
			current_database: z.string()
		}),
		itchair: z.object({
			value_string: z.string().nullable()
		})
	}
});

export const load: PageServerLoad = async () => {
	const dbResult = pool.connect(async (connection) => {
		const itChairQuery = connection.oneFirst(
			sql.typeAlias('itchair')`SELECT value_string FROM options WHERE name='itchair'`
		);
		const versionQuery = connection.oneFirst(
			sql.typeAlias('version')`SELECT split_part(version(),' on ',1)`
		);
		const dbNameQuery = connection.oneFirst(
			sql.typeAlias('current_database')`SELECT current_database()`
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

		const [version, dbName, admins, mods, housecommLeadership, financialAdmins, itChair] = [
			await versionQuery,
			await dbNameQuery,
			await adminsQuery,
			await modsQuery,
			await housecommLeadershipQuery,
			await financialAdminsQuery,
			await itChairQuery
		];

		return {
			dbName: dbName,
			version: version,
			admins: admins,
			mods: mods,
			housecommLeadership: housecommLeadership,
			financialAdmins: financialAdmins,
			itChair: itChair
		};
	});

	return { dbResult: dbResult };
};
