import type { Actions, PageServerLoad } from './$types';

import { db } from '$lib/server';
import {
	public_active_directory,
	active_directory,
	active_lounges,
	rooms
} from '$lib/server/schema';
import { SQL, and, isNotNull, ne, sql, eq, ilike, isNull } from 'drizzle-orm';
import { redirect, fail } from '@sveltejs/kit';
import { requireGroups } from '$lib/utils';
import { getGroups } from '$lib/server/dbUtils';
import { base } from '$app/paths';

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();

		const firstname = (data.get('firstname') as string | null) ?? '';
		const lastname = (data.get('lastname') as string | null) ?? '';
		const title = (data.get('title') as string | null) ?? '';
		const username = (data.get('username') as string | null) ?? '';
		const room = (data.get('room') as string | null) ?? '';
		const year = (data.get('year') as string | null) ?? '';
		const lounge = (data.get('lounge') as string | null) ?? '';
		const gra = (data.get('gra') as string | null) ?? '';

		const groups = await getGroups(locals.user?.username);
		const directory =
			groups.includes('DESK') || groups.includes('RAC')
				? active_directory
				: public_active_directory;

		// const roomsFragment = gra !== '' && gra !== '[Any]' ? sql`JOIN rooms USING (room)` : sql``;
		let useRooms = false;

		const queriesToUse: SQL<unknown>[] = [];

		if (username !== '') {
			queriesToUse.push(ilike(directory.username, username));
		}
		if (title !== '') {
			queriesToUse.push(ilike(directory.title, title));
		}
		if (firstname !== '') {
			queriesToUse.push(ilike(directory.firstname, firstname));
		}
		if (lastname !== '') {
			queriesToUse.push(ilike(directory.lastname, lastname));
		}
		if (room !== '') {
			queriesToUse.push(ilike(directory.room, room));
		}
		if (lounge !== '' && lounge !== '[Any]') {
			queriesToUse.push(eq(directory.lounge, lounge));
		}
		if (gra !== '' && gra !== '[Any]') {
			queriesToUse.push(eq(rooms.gra, gra));
			useRooms = true;
		}
		if (year !== '' && year !== '[Any]') {
			if (year !== 'No year') {
				queriesToUse.push(eq(directory.year, Number(year)));
			} else {
				queriesToUse.push(isNull(directory.year));
			}
		}

		if (queriesToUse.length === 0) {
			return fail(400, { missing: true });
		}

		const clauseToUse = sql.join(queriesToUse, sql`and`);

		const query = useRooms
			? db
					.select({
						username: directory.username,
						lastname: directory.lastname,
						firstname: directory.firstname,
						title: directory.title,
						room: directory.room,
						year: directory.year
					})
					.from(directory)
					.innerJoin(rooms, eq(directory.room, rooms.room))
					.where(clauseToUse)
					.orderBy(directory.lastname)
			: db
					.select({
						username: directory.username,
						lastname: directory.lastname,
						firstname: directory.firstname,
						title: directory.title,
						room: directory.room,
						year: directory.year
					})
					.from(directory)
					.where(clauseToUse)
					.orderBy(directory.lastname);

		// const query = sql.typeAlias('user')`
		// 		SELECT username,lastname,firstname,title,room,year
		// 		FROM ${sql.identifier([directory])}
		// 		${roomsFragment}
		// 		WHERE ${clauseToUse}
		// 		ORDER BY lastname
		// 	`;

		const result = await query;

		if (result.length === 0) {
			return fail(400, { noFound: true });
		} else if (result.length === 1) {
			redirect(303, `${base}/sds/directory/entry?username=${result[0].username}`);
		} else return { data: result };
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ parent }) => {
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

	return {
		years: yearQuery.then((res) => res.map((year) => year.year)),
		lounges: loungeQuery.then((res) => res.map((lounge) => lounge)),
		gras: graQuery.then((res) => res.map((gra) => gra.gra))
	};
};
