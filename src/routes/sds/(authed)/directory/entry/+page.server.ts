import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { PageServerLoad } from './$types';

import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';

const sql = createSqlTag({
	typeAliases: {
		user: z.object({
			cellphone: z.string().nullable(),
			email: z.string().nullable(),
			favorite_category: z.string().nullable(),
			favorite_value: z.string().nullable(),
			firstname: z.string().nullable(),
			home_city: z.string().nullable(),
			home_country: z.string().nullable(),
			home_state: z.string().nullable(),
			homepage: z.string().nullable(),
			lastname: z.string().nullable(),
			phone: z.string().nullable(),
			quote: z.string().nullable(),
			room: z.string().nullable(),
			title: z.string().nullable(),
			type: z.string().nullable(),
			username: z.string().nullable(),
			year: z.number().nullable()
		}),
		room: z.object({
			floor: z.number().nullable(),
			frosh: z.boolean().nullable(),
			gra: z.string().nullable(),
			handicapped: z.boolean().nullable(),
			phone1: z.string().nullable(),
			phone2: z.string().nullable(),
			room: z.string(),
			size: z.number().nullable(),
			type: z.string()
		}),
		year: z.object({
			year: z.number().nullable()
		}),
		lounge: z.object({
			lounge: z.string().nullable(),
			description: z.string().nullable()
		}),
		gra: z.object({
			gra: z.string().nullable()
		}),
		userType: z.object({
			description: z.string().nullable()
		})
	}
});

export const load: PageServerLoad = async ({ parent, url }) => {
	const username = url.searchParams.get('username');

	if (username == null || username == '') {
		redirect(302, `${base}/sds/directory`);
	}

	const { session } = await parent();
	const directory =
		session?.user?.groups?.includes('DESK') || session?.user?.groups?.includes('RAC')
			? 'active_directory'
			: 'public_active_directory';

	const yearQuery = pool.manyFirst(
		sql.typeAlias('year')`SELECT DISTINCT year FROM ${sql.identifier([
			directory
		])} WHERE year != 0 AND year IS NOT NULL ORDER BY year`
	);
	const loungeQuery = pool.many(
		sql.typeAlias('lounge')`SELECT lounge,description FROM active_lounges ORDER BY lounge`
	);
	const graQuery = pool.manyFirst(
		sql.typeAlias('gra')`SELECT DISTINCT gra FROM rooms WHERE LENGTH(TRIM(gra))>0 ORDER BY gra`
	);

	const user = pool.transaction(async (connection) => {
		const userQuery = sql.typeAlias('user')`
			SELECT username,room,email,lastname,firstname,title,phone,year,type,
			quote,favorite_category,favorite_value,cellphone,
			homepage,home_city,home_state,home_country
			FROM ${sql.identifier([directory])}
			WHERE username=${username}`;

		const userPreliminary = await connection.maybeOne(userQuery);
		const typeGen =
			userPreliminary?.type && userPreliminary.type !== 'U'
				? (await connection.oneFirst(
						sql.typeAlias(
							'userType'
						)`SELECT description FROM user_types WHERE type=${userPreliminary.type}`
					)) ?? ''
				: '';

		const graGen =
			userPreliminary?.room && userPreliminary.room !== ''
				? (
						await connection.one(
							sql.typeAlias('room')`SELECT * FROM rooms WHERE room=${userPreliminary.room}`
						)
					).gra ?? ''
				: '';

		if (userPreliminary != null) {
			userPreliminary.type = typeGen;
			const userWithGra = { gra: graGen, ...userPreliminary };
			return userWithGra;
		} else {
			return null;
		}
	});

	return {
		user: user,
		years: yearQuery,
		lounges: loungeQuery,
		gras: graQuery
	};
};
