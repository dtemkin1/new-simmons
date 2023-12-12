import { getClient } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const dbConnection = await getClient();

	const residentsQuery = dbConnection.query(`
	SELECT username,lastname,firstname,title,year,type,quote,favorite_category,
		   favorite_value,homepage,home_city,home_state,home_country
	FROM public_active_directory
	WHERE trim(trailing ' \n\t' from quote) != '' OR
		  (favorite_category != '' AND favorite_value != '')
	ORDER BY random()
	LIMIT 1`);

	interface Resident {
		username: string;
		lastname: string;
		firstname: string;
		title: string | null;
		year: number | null;
		type: string;
		quote: string;
		favorite_category: string;
		favorite_value: string;
		homepage: string;
		home_city: string;
		home_state: string;
		home_country: string;
	}

	const randomResident = (await residentsQuery).rows[0] as Resident;

	console.log(randomResident);
	if (randomResident.type !== 'U') {
		const typeQuery = dbConnection.query(`SELECT description FROM user_types WHERE type=$1`, [
			randomResident.type
		]);
		randomResident.type = (await typeQuery).rows[0].description as typeof randomResident.type;
	} else {
		randomResident.type = '';
	}

	dbConnection.release();

	return { randomResident: randomResident };
};
