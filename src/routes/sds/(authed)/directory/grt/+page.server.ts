import { db } from '$lib/server';
import type { PageServerLoad } from './$types';
import { requireGroups } from '$lib/utils';
import { active_directory, rooms } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'USERS');

	const gras = await db
		.select({
			username: active_directory.username,
			name: sql`COALESCE(${active_directory.title}||' ','')||${active_directory.firstname}||' '||${active_directory.lastname}`,
			room: active_directory.room,
			phone: active_directory.phone,
			email: active_directory.email,
			gra: rooms.gra
		})
		.from(active_directory)
		.innerJoin(rooms, eq(active_directory.room, rooms.room))
		.where(eq(active_directory.type, 'GRA'))
		.orderBy(rooms.gra, active_directory.username);

	// const gras = pool.any(sql.typeAlias('gra')`
	//     SELECT username,COALESCE(title||' ','')||firstname||' '||lastname AS name,
	// 		room,phone,email,gra
	// 	FROM active_directory JOIN rooms USING (room)
	// 	WHERE active_directory.type='GRA'
	// 	ORDER BY gra,username`);

	return { gras: gras };
};
