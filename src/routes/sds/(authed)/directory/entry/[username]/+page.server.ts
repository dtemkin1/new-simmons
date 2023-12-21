import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { PageServerLoad } from './$types';

import { pool } from '$lib/db';
import { createSqlTag, sql } from 'slonik';
import { z } from 'zod';

const sqlTagged = createSqlTag({
	typeAliases: {
		id: z.object({
			id: z.number()
		}),
		void: z.object({}).strict(),
		user: z.object({
			username: z.string(),
			room: z.string().nullable(),
			email: z.string().email(),
			lastname: z.string(),
			firstname: z.string(),
			title: z.string(),
			phone: z.string(),
			year: z.number(),
			type: z.string(),
			quote: z.string(),
			favorite_category: z.string(),
			favorite_value: z.string(),
			cellphone: z.string(),
			homepage: z.string(),
			home_city: z.string(),
			home_state: z.string(),
			home_country: z.string(),
			gra: z.string().nullable()
		}),
		room: z.object({
			room: z.string(),
			floor: z.number(),
			type: z.string(),
			size: z.number(),
			phone1: z.string(),
			phone2: z.string(),
			gra: z.string(),
			frosh: z.boolean(),
			handicap: z.boolean().nullable()
		}),
		year: z.object({
			year: z.number()
		}),
		lounge: z.object({
			lounge: z.string(),
			description: z.string()
		}),
		gra: z.object({
			gra: z.string()
		})
	}
});

// TODO: MAKE THIS PAGE TO LOAD USER DATA
export const load: PageServerLoad = async ({ params, locals }) => {
	if (params.username === '') {
		redirect(302, `${base}/sds/directory`);
	}

	const session = await locals.getSession();
	const directory =
		(session !== null && session.user.groups.includes('DESK')) ||
		(session !== null && session.user.groups.includes('RAC'))
			? 'active_directory'
			: 'public_active_directory';

	const dbResult = pool.connect(async (connection) => {
		const yearQuery = connection.manyFirst(
			sqlTagged.typeAlias('year')`SELECT DISTINCT year FROM ${sqlTagged.identifier([
				directory
			])} WHERE year != 0 AND year IS NOT NULL ORDER BY year`
		);
		const loungeQuery = connection.many(
			sqlTagged.typeAlias('lounge')`SELECT lounge,description FROM active_lounges ORDER BY lounge`
		);
		const graQuery = connection.manyFirst(
			sqlTagged.typeAlias(
				'gra'
			)`SELECT DISTINCT gra FROM rooms WHERE LENGTH(TRIM(gra))>0 ORDER BY gra`
		);

		const userResult = connection.transaction(async (connection1) => {
			const userQuery = sqlTagged.typeAlias('user')`
			SELECT username,room,email,lastname,firstname,title,phone,year,type,
			quote,favorite_category,favorite_value,cellphone,
			homepage,home_city,home_state,home_country
			FROM ${sql.identifier([directory])}
			WHERE username=${params.username}`;

			const user = await connection1.maybeOne(userQuery);
			let typeGen = '';
			let graGen = '';

			if (user != null && user.type !== 'U') {
				typeGen = await connection1.oneFirst(
					sql.type(
						z.object({ description: z.string() })
					)`SELECT description FROM user_types WHERE type=${user.type}`
				);
			} else if (user != null) {
				typeGen = '';
			}

			if (user != null && user.room !== '') {
				graGen = (
					await connection1.one(
						sqlTagged.typeAlias('room')`SELECT * FROM rooms WHERE room=${user.room}`
					)
				).gra;
			} else if (user != null) {
				graGen = '';
			}

			if (user != null) {
				user.type = typeGen;
				user.gra = graGen;
				return user;
			} else {
				return null;
			}
		});

		return { user: userResult, years: yearQuery, lounges: loungeQuery, gras: graQuery };
	});

	return await dbResult;
};
