import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { PageServerLoad } from './$types';

import { requireGroups } from '$lib/utils';
import {
	active_directory,
	active_lounges,
	public_active_directory,
	rooms,
	user_types
} from '$lib/server/schema';
import { db } from '$lib/server';
import { and, eq, isNotNull, ne, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ parent, url }) => {
	const username = url.searchParams.get('username');

	if (username == null || username == '') {
		redirect(302, `${base}/sds/directory`);
	}

	const { groups } = await parent();
	requireGroups(groups, 'EVERYONE');

	const directory =
		groups.includes('DESK') || groups.includes('RAC') ? active_directory : public_active_directory;

	const yearQuery = db
		.selectDistinct({ year: directory.year })
		.from(directory)
		.where(and(ne(directory.year, 0), isNotNull(directory.year)))
		.orderBy(directory.year);
	// const yearQuery = pool.manyFirst(
	// 	sql.typeAlias('year')`SELECT DISTINCT year FROM ${sql.identifier([
	// 		directory
	// 	])} WHERE year != 0 AND year IS NOT NULL ORDER BY year`
	// );

	const loungeQuery = db
		.selectDistinct({ lounge: active_lounges.lounge, description: active_lounges.description })
		.from(active_lounges)
		.orderBy(active_lounges.lounge);
	// const loungeQuery = pool.many(
	// 	sql.typeAlias('lounge')`SELECT lounge,description FROM active_lounges ORDER BY lounge`
	// );

	const graQuery = db
		.selectDistinct({ gra: rooms.gra })
		.from(rooms)
		.where(sql`LENGTH(TRIM(gra))>0`)
		.orderBy(rooms.gra);
	// const graQuery = pool.manyFirst(
	// 	sql.typeAlias('gra')`SELECT DISTINCT gra FROM rooms WHERE LENGTH(TRIM(gra))>0 ORDER BY gra`
	// );

	const user = db.transaction(async (tsx) => {
		const userQuery = tsx
			.select({
				username: directory.username,
				room: directory.room,
				email: directory.email,
				lastname: directory.lastname,
				firstname: directory.firstname,
				title: directory.title,
				phone: directory.phone,
				year: directory.year,
				type: directory.type,
				quote: directory.quote,
				favorite_category: directory.favorite_category,
				favorite_value: directory.favorite_value,
				cellphone: directory.cellphone,
				homepage: directory.homepage,
				home_city: directory.home_city,
				home_state: directory.home_state,
				home_country: directory.home_country
			})
			.from(directory)
			.where(eq(directory.username, username));

		const userPreliminary = (await userQuery)[0];

		const typeGen =
			userPreliminary?.type && userPreliminary.type !== 'U'
				? ((
						await tsx
							.select({ description: user_types.description })
							.from(user_types)
							.where(eq(user_types.type, userPreliminary.type))
					)[0].description ?? '')
				: '';

		const graGen =
			userPreliminary?.room && userPreliminary.room !== ''
				? ((
						await tsx
							.select({ gra: rooms.gra })
							.from(rooms)
							.where(eq(rooms.room, userPreliminary.room))
					)[0].gra ?? '')
				: '';

		if (userPreliminary != null) {
			userPreliminary.type = typeGen;
			const userWithGra = { gra: graGen, ...userPreliminary };
			return userWithGra;
		} else {
			return null;
		}
	});

	// const user = pool.transaction(async (connection) => {
	// 	const userQuery = sql.typeAlias('user')`
	// 		SELECT username,room,email,lastname,firstname,title,phone,year,type,
	// 		quote,favorite_category,favorite_value,cellphone,
	// 		homepage,home_city,home_state,home_country
	// 		FROM ${sql.identifier([directory])}
	// 		WHERE username=${username}`;

	// 	const userPreliminary = await connection.maybeOne(userQuery);
	// 	const typeGen =
	// 		userPreliminary?.type && userPreliminary.type !== 'U'
	// 			? (await connection.oneFirst(
	// 					sql.typeAlias(
	// 						'userType'
	// 					)`SELECT description FROM user_types WHERE type=${userPreliminary.type}`
	// 				)) ?? ''
	// 			: '';

	// 	const graGen =
	// 		userPreliminary?.room && userPreliminary.room !== ''
	// 			? (
	// 					await connection.one(
	// 						sql.typeAlias('room')`SELECT * FROM rooms WHERE room=${userPreliminary.room}`
	// 					)
	// 				).gra ?? ''
	// 			: '';

	// 	if (userPreliminary != null) {
	// 		userPreliminary.type = typeGen;
	// 		const userWithGra = { gra: graGen, ...userPreliminary };
	// 		return userWithGra;
	// 	} else {
	// 		return null;
	// 	}
	// });

	return {
		user: user,
		years: yearQuery.then((res) => res.map((year) => year.year)),
		lounges: loungeQuery.then((res) => res.map((lounge) => lounge)),
		gras: graQuery.then((res) => res.map((gra) => gra.gra))
	};
};
