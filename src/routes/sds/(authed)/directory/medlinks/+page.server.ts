import { db } from '$lib/server';
import { directory, medlinks } from '$lib/server/schema';
import type { PageServerLoad } from './$types';
import { requireGroups } from '$lib/utils';
import { eq, isNull, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'USERS');

	const medlinksQuery = db
		.select({
			username: medlinks.username,
			name: sql<
				string | null
			>`COALESCE(COALESCE(${directory.title}||' ','')||${directory.firstname}||' '||${directory.lastname}, ${directory.username})`,
			room: directory.room,
			phone: directory.phone,
			email: directory.email
		})
		.from(medlinks)
		.where(isNull(medlinks.removed))
		.orderBy(medlinks.ordering)
		.leftJoin(directory, eq(medlinks.username, directory.username));

	// const medlinks = pool.any(sql.typeAlias('medlink')`
	//     SELECT username,
	//    COALESCE(COALESCE(title||' ','')||firstname||' '||lastname,
	//         username) AS name,
	//         room,phone,email
	//     FROM medlinks LEFT JOIN directory USING (username)
	//     WHERE removed IS NULL
	//     ORDER BY ordering`);

	return { medlinks: medlinksQuery };
};
