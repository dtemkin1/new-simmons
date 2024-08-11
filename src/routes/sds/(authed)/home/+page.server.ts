import { db } from '$lib/server';
import { or, ne, and, sql, eq } from 'drizzle-orm';
import { public_active_directory, user_types } from '$lib/server/schema';
import type { PageServerLoad } from './$types';
import { requireGroups } from '$lib/utils';

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'EVERYONE');

	const randomResident = db.transaction(async (tsx) => {
		const residentsQuery = tsx
			.select({
				username: public_active_directory.username,
				lastname: public_active_directory.lastname,
				firstname: public_active_directory.firstname,
				title: public_active_directory.title,
				year: public_active_directory.year,
				type: public_active_directory.type,
				quote: public_active_directory.quote,
				favorite_category: public_active_directory.favorite_category,
				favorite_value: public_active_directory.favorite_value,
				homepage: public_active_directory.homepage,
				home_city: public_active_directory.home_city,
				home_state: public_active_directory.home_state,
				home_country: public_active_directory.home_country
			})
			.from(public_active_directory)
			.where(
				or(
					ne(sql<string>`trim(trailing ' \n\t' from quote)`, ''),
					and(
						ne(public_active_directory.favorite_category, ''),
						ne(public_active_directory.favorite_value, '')
					)
				)
			)
			.orderBy(sql`random()`)
			.limit(1);
		// 	const residentsQuery = db.one(sql.typeAlias('resident')`
		// SELECT username,lastname,firstname,title,year,type,quote,favorite_category,
		// 	   favorite_value,homepage,home_city,home_state,home_country
		// FROM public_active_directory
		// WHERE trim(trailing ' \n\t' from quote) != '' OR
		// 	  (favorite_category != '' AND favorite_value != '')
		// ORDER BY random()
		// LIMIT 1`);

		const randomResident = (await residentsQuery)[0];
		const typeDescription =
			randomResident.type != null && randomResident.type !== 'U'
				? ((
						await tsx
							.select({ description: user_types.description })
							.from(user_types)
							.where(eq(user_types.type, randomResident.type))
					)[0].description ?? '')
				: '';
		// ? (await connection.oneFirst(
		// 		sql.typeAlias(
		// 			'typeDescription'
		// 		)`SELECT description FROM user_types WHERE type=${randomResident.type}`
		// 	)) ?? ''
		// : '';

		randomResident.type = typeDescription;
		return randomResident;
	});

	return { randomResident: randomResident };
};
