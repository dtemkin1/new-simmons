import { query } from '$lib/db';
import type { PageServerLoad } from './$types';

// TODO: MAKE ACTUAL FUNCTION TO GET RANDOM RESIDENT
export const load: PageServerLoad = async () => {
	const residentsQuery = query(`
	SELECT username,lastname,firstname,title,year,type,quote,favorite_category,
		   favorite_value,homepage,home_city,home_state,home_country
	FROM public_active_directory
	WHERE trim(trailing ' \n\t' from quote) != '' OR
		  (favorite_category != '' AND favorite_value != '')
	ORDER BY random()
	LIMIT 1`);

	const randomResident = (await residentsQuery).rows[0];
	if (randomResident.type !== 'U') {
		const typeQuery = query(`SELECT description FROM user_types WHERE type=$1`, [
			randomResident.type
		]);
		randomResident.type = (await typeQuery).rows[0].description;
	} else {
		randomResident.type = '';
	}

	return { randomResident: randomResident };
};
