import type { Actions, PageServerLoad } from './$types';

import { pool } from '$lib/server/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import { redirect, fail } from '@sveltejs/kit';
import { base } from '$app/paths';
import { requireGroups } from '$lib/utils';

const sql = createSqlTag({
	typeAliases: {
		user: z.object({
			firstname: z.string().nullable(),
			lastname: z.string().nullable(),
			room: z.string().nullable(),
			title: z.string().nullable(),
			username: z.string().nullable(),
			year: z
				.number()
				.transform((x) => String(x))
				.nullable()
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

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();

		const firstname = (data.get('firstname') as string) || '';
		const lastname = (data.get('lastname') as string) || '';
		const title = (data.get('title') as string) || '';
		const username = (data.get('username') as string) || '';
		const room = (data.get('room') as string) || '';
		const year = (data.get('year') as string) || '';
		const lounge = (data.get('lounge') as string) || '';
		const gra = (data.get('gra') as string) || '';

		const session = await locals.auth();
		const directory =
			session?.user?.groups?.includes('DESK') || session?.user?.groups?.includes('RAC')
				? 'active_directory'
				: 'public_active_directory';

		const roomsFragment =
			gra !== '' && gra !== '[Any]' ? sql.fragment`JOIN rooms USING (room)` : sql.fragment``;

		const queriesToUse = [];
		let clauseToUse = sql.fragment``;

		if (username !== '') {
			queriesToUse.push(sql.fragment`username ILIKE ${username}`);
		}
		if (title !== '') {
			queriesToUse.push(sql.fragment`title ILIKE ${title}`);
		}
		if (firstname !== '') {
			queriesToUse.push(sql.fragment`firstname ILIKE ${firstname}`);
		}
		if (lastname !== '') {
			queriesToUse.push(sql.fragment`lastname ILIKE ${lastname}`);
		}
		if (room !== '') {
			queriesToUse.push(sql.fragment`room ILIKE ${room}`);
		}
		if (lounge !== '' && lounge !== '[Any]') {
			queriesToUse.push(sql.fragment`lounge = ${lounge}`);
		}
		if (gra !== '' && gra !== '[Any]') {
			queriesToUse.push(sql.fragment`rooms.gra = ${gra}`);
		}
		if (year !== '' && year !== '[Any]') {
			if (year !== 'No year') {
				queriesToUse.push(sql.fragment`year = ${year}`);
			} else {
				queriesToUse.push(sql.fragment`year IS NULL`);
			}
		}

		if (queriesToUse.length === 0) {
			return fail(400, { missing: true });
		} else if (queriesToUse.length === 1) {
			clauseToUse = queriesToUse[0];
		} else {
			clauseToUse = sql.fragment`(${sql.join(queriesToUse, sql.fragment` AND `)})`;
		}

		const query = sql.typeAlias('user')`
				SELECT username,lastname,firstname,title,room,year
				FROM ${sql.identifier([directory])}
				${roomsFragment}
				WHERE ${clauseToUse}
				ORDER BY lastname
			`;

		const result = await pool.any(query);

		if (result.length === 0) {
			return fail(400, { noFound: true });
		} else if (result.length === 1) {
			redirect(303, `${base}/sds/directory/entry?username=${result[0].username}`);
		} else return { data: result };
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	requireGroups(session, 'EVERYONE');

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

	return {
		years: yearQuery,
		lounges: loungeQuery,
		gras: graQuery
	};
};
