import type { PageServerLoad, Actions } from './$types';
import { requireGroups } from '$lib/utils';
import { kerbRequest } from '$lib/server/peopleApi';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server';
import { rooms, user_types } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { addUser } from '$lib/server/userAdminUtils';

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'RAC');
};

export const actions = {
	fetch: async ({ request }) => {
		const data = await request.formData();

		const kerberosId = (data.get('kerberosId') as string | null) ?? '';

		const fetchData = await kerbRequest(kerberosId);

		if (fetchData.status == 'error') {
			return fail(fetchData.data.errorCode, {
				message: fetchData.data.errorDetails[0].message,
				fetchError: true
			});
		}

		return {
			userData: fetchData.data,
			fetchSuccess: true,
			message: 'Data fetched successfully!'
		};
	},
	addUser: async ({ request }) => {
		const data = await request.formData();

		const usertype = (data.get('usertype') as string | null) ?? '';
		const username = (data.get('username') as string | null) ?? '';
		const title = (data.get('title') as string | null) ?? '';
		const first_name = (data.get('first_name') as string | null) ?? '';
		const last_name = (data.get('last_name') as string | null) ?? '';
		let room: string | null = (data.get('room') as string | null) ?? '';
		let class_year: string | null = (data.get('class_year') as string | null) ?? '';
		let immortal: string | boolean = (data.get('immortal') as string | null) ?? '';
		let hidden: string | boolean = (data.get('hidden') as string | null) ?? '';

		if (username.length == 0) {
			return fail(400, { error: true, message: 'Username must not be blank' });
		}

		if (last_name.length == 0) {
			return fail(400, { error: true, message: 'Lastname must not be blank' });
		}

		if (first_name.length == 0) {
			return fail(400, { error: true, message: 'Firstname must not be blank' });
		}

		if (usertype == 'U' && class_year.length == 0) {
			return fail(400, { error: true, message: 'Undergraduates must have a class year' });
		}

		const yearRegex = /\D/;
		if (yearRegex.test(class_year)) {
			return fail(400, { error: true, message: 'Year should be an integer or blank.' });
		} else if (class_year == '') {
			class_year = null;
		}

		if (room.length > 0) {
			const checkRooms = await db.select().from(rooms).where(eq(rooms.room, room));
			if (checkRooms.length != 1) {
				return fail(400, { error: true, message: 'Unknown room' });
			}
		} else {
			room = null;
		}

		const checkTypes = await db.select().from(user_types).where(eq(user_types.type, usertype));
		if (checkTypes.length != 1) {
			return fail(400, { error: true, message: 'Unknown type' });
		}

		const email = username.includes('@') ? username : `${username}@mit.edu`;

		immortal = immortal == 'true';
		hidden = hidden == 'true';

		addUser({
			username,
			email,
			lastname: last_name,
			firstname: first_name,
			title,
			type: usertype,
			room,
			year: class_year,
			immortal,
			hidden
		});

		return { success: true, message: 'User added successfully!' };
	}
} satisfies Actions;
