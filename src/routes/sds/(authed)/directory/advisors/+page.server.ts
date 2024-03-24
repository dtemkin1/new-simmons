import { db } from '$lib/server';
import { advisors, directory } from '$lib/server/schema';
import type { PageServerLoad } from './$types';
import { requireGroups } from '$lib/utils';
import { eq, isNull, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'USERS');

	const advisorsQuery = db
		.select({
			username: advisors.username,
			name: sql<
				string | null
			>`COALESCE(COALESCE(${directory.title}||' ','')||${directory.firstname}||' '||${directory.lastname}, ${directory.username})`,
			room: directory.room,
			phone: directory.phone,
			email: directory.email
		})
		.from(advisors)
		.where(isNull(advisors.removed))
		.orderBy(advisors.ordering)
		.leftJoin(directory, eq(advisors.username, directory.username));

	// const advisors = pool.any(sql.typeAlias('advisors')`
	//     SELECT username,
	// 		COALESCE(COALESCE(title||' ','')||firstname||' '||lastname,
	// 					username) AS name,
	// 		room,phone,email
	// 	FROM advisors LEFT JOIN directory USING (username)
	// 	WHERE removed IS NULL
	// 	ORDER BY ordering`);

	return { advisors: advisorsQuery };
};
