import { db } from '$lib/server';
import { requireGroups } from '$lib/utils';
import {
	active_directory,
	active_lounges,
	public_active_directory,
	rooms
} from '$lib/server/schema';
import { and, isNotNull, ne, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

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
