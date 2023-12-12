import { pool } from '$lib/db';
import { sql } from 'slonik';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const dbResult = await pool.connect(async (connection) => {
		const residentsQuery = connection.query(sql.unsafe`
	SELECT username,lastname,firstname,title,year,type,quote,favorite_category,
		   favorite_value,homepage,home_city,home_state,home_country
	FROM public_active_directory
	WHERE trim(trailing ' \n\t' from quote) != '' OR
		  (favorite_category != '' AND favorite_value != '')
	ORDER BY random()
	LIMIT 1`);

		const randomResident = (await residentsQuery).rows[0];

		if (randomResident.type !== 'U') {
			const typeQuery = connection.query(
				sql.unsafe`SELECT description FROM user_types WHERE type=${randomResident.type}`
			);
			randomResident.type = (await typeQuery).rows[0].description;
		} else {
			randomResident.type = '';
		}

		return { randomResident: randomResident };
	});

	return dbResult;
};
