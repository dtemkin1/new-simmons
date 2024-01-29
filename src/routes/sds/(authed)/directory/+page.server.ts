import { pool } from '$lib/server/db';
import { createSqlTag } from 'slonik';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { requireGroups } from '$lib/utils';

const sql = createSqlTag({
	typeAliases: {
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

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'EVERYONE');

	const directory =
		groups.includes('DESK') || groups.includes('RAC')
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
		years: await yearQuery,
		lounges: await loungeQuery,
		gras: await graQuery
	};
};
