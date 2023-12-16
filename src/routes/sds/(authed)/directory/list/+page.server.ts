import type { Actions } from './$types';

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
			firstname: z.string(),
			lastname: z.string(),
			title: z.string().nullable(),
			username: z.string(),
			room: z.string(),
			year: z.number(),
			lounge: z.string().nullable(),
			gra: z.string().nullable()
		})
	}
});

export const actions = {
	default: async (event) => {
		// TODO query database for user info
		const data = await event.request.formData();

		const firstname = (data.get('firstname') as string) || '';
		const lastname = (data.get('lastname') as string) || '';
		const title = (data.get('title') as string) || '';
		const username = (data.get('username') as string) || '';
		const room = (data.get('room') as string) || '';
		const year = (data.get('year') as string) || '';
		const lounge = (data.get('lounge') as string) || '';
		const gra = (data.get('gra') as string) || '';

		const dbResult = pool.connect(async (connection) => {
			const session = await event.locals.getSession();
			const directory =
				(session !== null && session.user.groups.includes('DESK')) ||
				(session !== null && session.user.groups.includes('RAC'))
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
				return null;
			} else if (queriesToUse.length === 1) {
				clauseToUse = queriesToUse[0];
			} else {
				clauseToUse = sql.fragment`(${sql.join(queriesToUse, sql.fragment` AND `)})`;
			}

			const query = sqlTagged.typeAlias('user')`
				SELECT username,lastname,firstname,title,room,year
				FROM ${sql.identifier([directory])}
				${roomsFragment}
				WHERE ${clauseToUse}
				ORDER BY lastname
			`;

			const result = await connection.any(query);
			return { data: result };
		});

		return dbResult;
	}
} satisfies Actions;
