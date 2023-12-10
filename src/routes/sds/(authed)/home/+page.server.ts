import { connectToDB } from '$lib/db';
import type { PageServerLoad } from './$types';

// TODO: MAKE ACTUAL FUNCTION TO GET RANDOM RESIDENT
export const load: PageServerLoad = async () => {
	const db = await connectToDB();
	const query = db.query(`
	SELECT username,lastname,firstname,title,year,type,quote,favorite_category,
		   favorite_value,homepage,home_city,home_state,home_country
	FROM public_active_directory
	WHERE trim(trailing ' \n\t' from quote) != '' OR
		  (favorite_category != '' AND favorite_value != '')`);

	const residents = (await query).rows;
	return { randomResident: residents[Math.floor(Math.random() * residents.length)] };
};
