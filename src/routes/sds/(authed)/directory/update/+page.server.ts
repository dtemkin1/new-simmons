import { db } from '$lib/server';
import { active_directory, directory, rooms } from '$lib/server/schema';
import { requireGroups } from '$lib/utils';
import { sdsGetReminder, sdsGetReminders } from '$lib/server/sessionUtils';
import { eq, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import DOMPurify from 'isomorphic-dompurify';

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const username = locals.user?.username;

		const homepage = (data.get('homepage') as string | null) ?? '';
		const phone = (data.get('phone') as string | null) ?? '';
		const cellphone = (data.get('cellphone') as string | null) ?? '';
		const home_city = (data.get('home_city') as string | null) ?? '';
		const home_state = (data.get('home_state') as string | null) ?? '';
		const home_country = (data.get('home_country') as string | null) ?? '';
		const quote = DOMPurify.sanitize((data.get('quote') as string | null) ?? ''); // Sanitize the quote!
		const favorite_category = (data.get('favorite_category') as string | null) ?? '';
		const favorite_value = (data.get('favorite_value') as string | null) ?? '';
		const showreminders = (data.get('showreminders') as boolean | null) ?? false;

		const fields = {
			homepage,
			phone,
			cellphone,
			home_city,
			home_state,
			home_country,
			quote,
			favorite_category,
			favorite_value,
			showreminders
		};

		const updateQuery = await db
			.update(directory)
			.set({ ...fields })
			.where(eq(directory.username, username ?? ''))
			.returning({ updatedId: directory.username });
		// const updateQuery = await pool.query(sql.typeAlias('void')`UPDATE directory SET
		// showreminders=${showreminders},
		// homepage=${homepage},
		// phone=${phone},
		// cellphone=${cellphone},
		// home_city=${home_city},
		// home_state=${home_state},
		// home_country=${home_country},
		// quote=${quote},
		// favorite_category=${favorite_category},
		// favorite_value=${favorite_value}
		// WHERE username=${username ?? ''}`);

		if (updateQuery.length == 0) {
			fail(500, { message: 'Directory update failed' });
		}

		return { success: true, message: 'Update received!' };
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ parent, locals }) => {
	const { groups, username } = await parent();
	requireGroups(groups, 'USERS');

	let sudo = false;

	if (sdsGetReminder(locals.session, 'sudo')) {
		sudo = true;
	}

	const reminders = sdsGetReminders(locals.session);

	// const query = sql.typeAlias(
	// 	'active_directory'
	// )`SELECT * FROM active_directory WHERE username=${username ?? ''}`;

	const result = db.transaction(async (tsx) => {
		const resident = (
			await tsx
				.select()
				.from(active_directory)
				.where(eq(active_directory.username, username ?? ''))
		)[0];

		const phones = (
			await tsx
				.select({ phone1: rooms.phone1, phone2: rooms.phone2 })
				.from(rooms)
				.where(eq(rooms.room, sql`${resident.room}`))
		)[0];

		return { ...resident, ...phones };
	});

	// const result = pool.transaction(async (connection) => {
	// 	const resident = await connection.one(query);

	// 	const phones = await connection.one(
	// 		sql.typeAlias('phones')`SELECT phone1,phone2 FROM rooms WHERE room=${resident.room}`
	// 	);

	// 	return { ...resident, ...phones };
	// });

	return { isSudo: sudo, result: result, reminders: reminders };
};
