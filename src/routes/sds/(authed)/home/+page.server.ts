import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const sql = createSqlTag({
	typeAliases: {
		id: z.object({
			id: z.number()
		}),
		void: z.object({}).strict(),
		resident: z.object({
			username: z.string(),
			lastname: z.string(),
			firstname: z.string(),
			title: z.string().nullable(),
			year: z.number().nullable(),
			type: z.string(),
			quote: z.string(),
			favorite_category: z.string(),
			favorite_value: z.string(),
			homepage: z.string(),
			home_city: z.string(),
			home_state: z.string(),
			home_country: z.string()
		})
	}
});

export const load: PageServerLoad = async () => {
	const dbResult = await pool.connect(async (connection) => {
		const residentsQuery = connection.one(sql.typeAlias('resident')`
	SELECT username,lastname,firstname,title,year,type,quote,favorite_category,
		   favorite_value,homepage,home_city,home_state,home_country
	FROM public_active_directory
	WHERE trim(trailing ' \n\t' from quote) != '' OR
		  (favorite_category != '' AND favorite_value != '')
	ORDER BY random()
	LIMIT 1`);

		const randomResident = await residentsQuery;

		if (randomResident.type !== 'U') {
			const typeQuery = connection.oneFirst(
				sql.unsafe`SELECT description FROM user_types WHERE type=${randomResident.type}`
			);
			randomResident.type = await typeQuery;
		} else {
			randomResident.type = '';
		}

		return { randomResident: randomResident };
	});

	return dbResult;
};
