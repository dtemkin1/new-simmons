import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { dev } from '$app/environment';

import { db } from '$lib/server';
import { sds_users } from '$lib/server/schema';
import { getGroups, verifyPasswordUnhashed } from '$lib/server/dbUtils';
import { SDS_HOME_URL } from '$lib/config';
import serialize from 'locutus/php/var/serialize';
import { eq } from 'drizzle-orm';
import {
	invalidateSession,
	deleteSessionTokenCookie,
	generateSessionToken,
	createSession,
	setSessionTokenCookie
} from '$lib/server/auth';

export const actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (typeof username !== 'string' || username.length < 1) {
			return fail(400, {
				message: 'Invalid username'
			});
		}

		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const existingUser = await db.select().from(sds_users).where(eq(sds_users.username, username));

		// const existingUser = await pool.maybeOneFirst(
		// 	sql.typeAlias('checkUser')`SELECT 1 FROM sds_users WHERE username=${username}`
		// );

		if (existingUser.length == 0) {
			return fail(400, {
				message: 'No user found.'
			});
		}

		const validPassword = await verifyPasswordUnhashed(username, password);

		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect username or password'
			});
		}

		const ipAddress = dev ? '127.0.0.1' : event.getClientAddress();
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, username, ipAddress, serialize({}) as string);
		setSessionTokenCookie(event, sessionToken, session.expires);

		redirect(302, SDS_HOME_URL);
	},
	logout: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.sid);
		deleteSessionTokenCookie(event);

		return { message: 'Successfully logged out!' };
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ locals }) => {
	return {
		session: locals.session,
		username: locals.user?.username,
		groups: await getGroups(locals.user?.username),
		data: locals.session?.data
	};
};
