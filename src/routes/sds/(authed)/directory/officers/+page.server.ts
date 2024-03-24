import { db } from '$lib/server';
import { officers, directory } from '$lib/server/schema';
import type { PageServerLoad } from './$types';
import { requireGroups } from '$lib/utils';
import { eq, isNull, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'USERS');

	const officersQuery = await db
		.select({
			position_text: officers.position_text,
			username: officers.username,
			name: sql<
				string | null
			>`COALESCE(COALESCE(${directory.title}||' ','')||${directory.firstname}||' '||${directory.lastname}, ${directory.username})`,
			room: directory.room,
			phone: directory.phone,
			email: directory.email
		})
		.from(officers)
		.where(isNull(officers.removed))
		.orderBy(officers.ordering)
		.leftJoin(directory, eq(officers.username, directory.username));

	// const officers = pool.any(sql.typeAlias('officer')`
	// SELECT position_text,username,
	// 	COALESCE(COALESCE(title||' ','')||firstname||' '||lastname,
	// 			username) AS name,
	// 	room,phone,email
	// FROM officers LEFT JOIN directory USING (username)
	// WHERE removed IS NULL
	// ORDER BY ordering`);

	return { officers: officersQuery };
};
