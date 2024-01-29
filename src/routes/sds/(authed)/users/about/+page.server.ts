import { pool } from '$lib/server/db';
import { createSqlTag } from 'slonik';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

import { sdsGetStrOption } from '$lib/server/dbUtils';
import { requireGroups } from '$lib/utils';

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

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'USERS');

	const itChair = sdsGetStrOption('itchair');
	const version = pool.oneFirst(sql.typeAlias('version')`SELECT split_part(version(),' on ',1)`);

	const dbName = pool.oneFirst(sql.typeAlias('current_database')`SELECT current_database()`);
	const admins = pool.any(
		sql.typeAlias(
			'user'
		)`SELECT username,lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='ADMINISTRATORS' ORDER BY lastname ASC`
	);
	const mods = pool.any(
		sql.typeAlias(
			'userNoUsername'
		)`SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='MODERATORS' ORDER BY lastname ASC`
	);
	const housecommLeadership = pool.any(
		sql.typeAlias(
			'userNoUsername'
		)`SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='HOUSE-COMM-LEADERSHIP' ORDER BY lastname ASC`
	);
	const financialAdmins = pool.any(
		sql.typeAlias(
			'userNoUsername'
		)`SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='FINANCIAL-ADMINS' ORDER BY lastname ASC`
	);

	return {
		dbName: dbName,
		version: version,
		admins: admins,
		mods: mods,
		housecommLeadership: housecommLeadership,
		financialAdmins: financialAdmins,
		itChair: itChair
	};
};
