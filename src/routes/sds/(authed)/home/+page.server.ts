import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

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

export const load: PageServerLoad = async () => {
	const dbResult = pool.connect(async (connection) => {
		return connection.transaction(async (connection1) => {
			const residentsQuery = connection1.one(sql.typeAlias('resident')`
	SELECT username,lastname,firstname,title,year,type,quote,favorite_category,
		   favorite_value,homepage,home_city,home_state,home_country
	FROM public_active_directory
	WHERE trim(trailing ' \n\t' from quote) != '' OR
		  (favorite_category != '' AND favorite_value != '')
	ORDER BY random()
	LIMIT 1`);

			const randomResident = await residentsQuery;
			let typeDescription = '';

			if (randomResident.type !== 'U') {
				const typeQuery = connection1.oneFirst(
					sql.typeAlias(
						'typeDescription'
					)`SELECT description FROM user_types WHERE type=${randomResident.type}`
				);
				typeDescription = (await typeQuery) ?? '';
			}

			randomResident.type = typeDescription;
			return randomResident;
		});
	});

	return { randomResident: dbResult };
};
