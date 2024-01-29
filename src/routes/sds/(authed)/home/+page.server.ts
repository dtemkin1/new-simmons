import { pool } from '$lib/server/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { requireGroups } from '$lib/utils';

const sql = createSqlTag({
	typeAliases: {
		resident: z.object({
			favorite_category: z.string().nullable(),
			favorite_value: z.string().nullable(),
			firstname: z.string().nullable(),
			home_city: z.string().nullable(),
			home_country: z.string().nullable(),
			home_state: z.string().nullable(),
			homepage: z.string().nullable(),
			lastname: z.string().nullable(),
			quote: z.string().nullable(),
			title: z.string().nullable(),
			type: z.string().nullable(),
			username: z.string().nullable(),
			year: z.number().nullable()
		}),
		typeDescription: z.object({
			description: z.string().nullable()
		})
	}
});

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'EVERYONE');

	const randomResident = pool.transaction(async (connection) => {
		const residentsQuery = connection.one(sql.typeAlias('resident')`
	SELECT username,lastname,firstname,title,year,type,quote,favorite_category,
		   favorite_value,homepage,home_city,home_state,home_country
	FROM public_active_directory
	WHERE trim(trailing ' \n\t' from quote) != '' OR
		  (favorite_category != '' AND favorite_value != '')
	ORDER BY random()
	LIMIT 1`);

		const randomResident = await residentsQuery;
		let typeDescription =
			randomResident.type != null && randomResident.type !== 'U'
				? (await connection.oneFirst(
						sql.typeAlias(
							'typeDescription'
						)`SELECT description FROM user_types WHERE type=${randomResident.type}`
					)) ?? ''
				: '';

		randomResident.type = typeDescription;
		return randomResident;
	});

	return { randomResident: randomResident };
};
