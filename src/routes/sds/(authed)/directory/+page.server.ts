import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

const sql = createSqlTag({
	typeAliases: {
		id: z.object({
			id: z.number()
		}),
		void: z.object({}).strict(),
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

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	const dbResult = await pool.connect(async (connection) => {
		const directory =
			(session !== null && session.user.groups.includes('DESK')) ||
			(session !== null && session.user.groups.includes('RAC'))
				? 'active_directory'
				: 'public_active_directory';

		const yearQuery = connection.manyFirst(
			sql.typeAlias('year')`SELECT DISTINCT year FROM ${sql.identifier([
				directory
			])} WHERE year != 0 AND year IS NOT NULL ORDER BY year`
		);
		const loungeQuery = connection.many(
			sql.typeAlias('lounge')`SELECT lounge,description FROM active_lounges ORDER BY lounge`
		);
		const graQuery = connection.manyFirst(
			sql.typeAlias('gra')`SELECT DISTINCT gra FROM rooms WHERE LENGTH(TRIM(gra))>0 ORDER BY gra`
		);

		const [years, lounges, gras] = await Promise.all([
			await yearQuery,
			await loungeQuery,
			await graQuery
		]);

		return {
			years: years,
			lounges: lounges,
			gras: gras
		};
	});

	return dbResult;
};
