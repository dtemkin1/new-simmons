import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { dev } from '$app/environment';

import { pool } from '$lib/server/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import { getGroups, verifyPasswordUnhashed } from '$lib/server/dbUtils';
import { SDS_HOME_URL, SDS_LOGIN_URL } from '$lib/config';
import serialize from 'locutus/php/var/serialize';

const sql = createSqlTag({
	typeAliases: {
		checkUser: z.object({ '?column?': z.number() })
	}
});

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

		const existingUser = await pool.maybeOneFirst(
			sql.typeAlias('checkUser')`SELECT 1 FROM sds_users WHERE username=${username}`
		);

		if (!existingUser) {
			return fail(400, {
				message: 'Incorrect username or password'
			});
		}

		const validPassword = await verifyPasswordUnhashed(username, password);

		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect username or password'
			});
		}

		const ipAddress = dev ? '127.0.0.1' : event.getClientAddress();
		const session = await lucia.createSession(username, {
			remote_addr: ipAddress,
			data: serialize({}) as string
		});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, SDS_HOME_URL);
	},
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, SDS_LOGIN_URL);
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
