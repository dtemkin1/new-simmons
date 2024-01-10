import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { PageServerLoad } from './$types';

import { pool } from '$lib/db';
import { createSqlTag, sql } from 'slonik';
import { z } from 'zod';

const sqlTagged = createSqlTag({
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
		})
	}
});

export const load: PageServerLoad = async ({ locals, url }) => {
	const username = url.searchParams.get('username');

	if (username == null || username == '') {
		redirect(302, `${base}/sds/directory`);
	}

	const session = await locals.getSession();
	const directory =
		session?.user?.groups?.includes('DESK') || session?.user?.groups?.includes('RAC')
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
			WHERE username=${username}`;

			const user = await connection1.maybeOne(userQuery);
			const typeGen =
				user?.type && user.type !== 'U'
					? (await connection1.oneFirst(
							sql.type(
								z.object({ description: z.string().nullable() })
							)`SELECT description FROM user_types WHERE type=${user.type}`
						)) ?? ''
					: '';

			const graGen =
				user?.room && user.room !== ''
					? (
							await connection1.one(
								sqlTagged.typeAlias('room')`SELECT * FROM rooms WHERE room=${user.room}`
							)
						).gra ?? ''
					: '';

			if (user != null) {
				user.type = typeGen;
				const userWithGra = { gra: graGen, ...user };
				return userWithGra;
			} else {
				return null;
			}
		});

		return {
			user: await userResult,
			years: await yearQuery,
			lounges: await loungeQuery,
			gras: await graQuery
		};
	});

	return { dbResult: dbResult };
};
