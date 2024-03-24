import { db } from '$lib/server';
import type { PageServerLoad } from './$types';

import { sdsGetStrOption } from '$lib/server/dbUtils';
import { requireGroups } from '$lib/utils';
import { eq, sql } from 'drizzle-orm';
import { directory, sds_group_membership_cache } from '$lib/server/schema';

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'USERS');

	const itChair = sdsGetStrOption('itchair');

	const version = db
		.execute(sql`SELECT split_part(version(),' on ',1)`)
		.then((result) => result.rows[0].split_part as string);
	// const version = pool.oneFirst(sql.typeAlias('version')`SELECT split_part(version(),' on ',1)`);

	const dbName = db
		.execute(sql`SELECT current_database()`)
		.then((result) => result.rows[0].current_database as string);

	// const dbName = pool.oneFirst(sql.typeAlias('current_database')`SELECT current_database()`);

	const admins = db
		.select({
			username: directory.username,
			lastname: directory.lastname,
			firstname: directory.firstname
		})
		.from(sds_group_membership_cache)
		.innerJoin(directory, eq(sds_group_membership_cache.username, directory.username))
		.where(eq(sds_group_membership_cache.groupname, 'ADMINISTRATORS'))
		.orderBy(directory.lastname);
	// const admins = pool.any(
	// 	sql.typeAlias(
	// 		'user'
	// 	)`SELECT username,lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='ADMINISTRATORS' ORDER BY lastname ASC`
	// );

	const mods = db
		.select({
			username: directory.username,
			lastname: directory.lastname,
			firstname: directory.firstname
		})
		.from(sds_group_membership_cache)
		.innerJoin(directory, eq(sds_group_membership_cache.username, directory.username))
		.where(eq(sds_group_membership_cache.groupname, 'MODERATORS'))
		.orderBy(directory.lastname);
	// const mods = pool.any(
	// 	sql.typeAlias(
	// 		'userNoUsername'
	// 	)`SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='MODERATORS' ORDER BY lastname ASC`
	// );

	const housecommLeadership = db
		.select({
			username: directory.username,
			lastname: directory.lastname,
			firstname: directory.firstname
		})
		.from(sds_group_membership_cache)
		.innerJoin(directory, eq(sds_group_membership_cache.username, directory.username))
		.where(eq(sds_group_membership_cache.groupname, 'HOUSE-COMM-LEADERSHIP'))
		.orderBy(directory.lastname);
	// const housecommLeadership = pool.any(
	// 	sql.typeAlias(
	// 		'userNoUsername'
	// 	)`SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='HOUSE-COMM-LEADERSHIP' ORDER BY lastname ASC`
	// );

	const financialAdmins = db
		.select({
			username: directory.username,
			lastname: directory.lastname,
			firstname: directory.firstname
		})
		.from(sds_group_membership_cache)
		.innerJoin(directory, eq(sds_group_membership_cache.username, directory.username))
		.where(eq(sds_group_membership_cache.groupname, 'FINANCIAL-ADMINS'))
		.orderBy(directory.lastname);
	// const financialAdmins = pool.any(
	// 	sql.typeAlias(
	// 		'userNoUsername'
	// 	)`SELECT lastname,firstname FROM sds_group_membership_cache JOIN directory USING (username) WHERE groupname='FINANCIAL-ADMINS' ORDER BY lastname ASC`
	// );

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
