import { pool } from '$lib/server/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import { requireGroups, sdsGetReminder, sdsGetReminders } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

const sql = createSqlTag({
	typeAliases: {
		active_directory: z.object({
			username: z.string().nullable(),
			firstname: z.string().nullable(),
			lastname: z.string().nullable(),
			room: z.string().nullable(),
			phone: z.string().nullable(),
			year: z.number().nullable(),
			cellphone: z.string().nullable(),
			homepage: z.string().nullable(),
			home_city: z.string().nullable(),
			home_state: z.string().nullable(),
			home_country: z.string().nullable(),
			quote: z.string().nullable(),
			favorite_category: z.string().nullable(),
			favorite_value: z.string().nullable(),
			private: z.boolean().nullable(),
			type: z.string().nullable(),
			email: z.string().nullable(),
			lounge: z.string().nullable(),
			title: z.string().nullable(),
			loungevalue: z.number().nullable(),
			showreminders: z.boolean().nullable(),
			guest_list_expiration: z.string().nullable()
		}),
		phones: z.object({
			phone1: z.string().nullable(),
			phone2: z.string().nullable()
		}),
		void: z.object({}).strict()
	}
});

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
		const quote = (data.get('quote') as string | null) ?? '';
		const favorite_category = (data.get('favorite_category') as string | null) ?? '';
		const favorite_value = (data.get('favorite_value') as string | null) ?? '';
		const showreminders = (data.get('showreminders') as boolean | null) ?? '';

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

		const updateQuery = await pool.query(sql.typeAlias('void')`UPDATE directory SET 
        showreminders=${showreminders},
        homepage=${homepage},
        phone=${phone},
        cellphone=${cellphone},
        home_city=${home_city},
        home_state=${home_state},
        home_country=${home_country},
        quote=${quote},
        favorite_category=${favorite_category},
        favorite_value=${favorite_value}
        WHERE username=${username ?? ''}`);

		if (updateQuery.rowCount == 0) {
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

	const query = sql.typeAlias(
		'active_directory'
	)`SELECT * FROM active_directory WHERE username=${username ?? ''}`;

	const result = pool.transaction(async (connection) => {
		const resident = await connection.one(query);

		const phones = await connection.one(
			sql.typeAlias('phones')`SELECT phone1,phone2 FROM rooms WHERE room=${resident.room}`
		);

		return { ...resident, ...phones };
	});

	return { isSudo: sudo, result: result, reminders: reminders };
};
