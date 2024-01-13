import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { base } from '$app/paths';

import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import { setPassword, verifyPasswordUnhashed } from '$lib/dbUtils';

const sql = createSqlTag({
	typeAliases: {
		checkForOldpasswd: z.object({ '?column?': z.number() }),
		oldpasswd: z.object({
			active: z.boolean().nullable(),
			hosts_allow: z.string().nullable(),
			immortal: z.boolean().nullable(),
			password: z.string().nullable(),
			salt: z.string().nullable(),
			username: z.string().nullable()
		})
	}
});

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const oldPassword = (data.get('oldPassword') as string | null) ?? '';
		const newPassword = (data.get('newPassword') as string | null) ?? '';
		const retypePassword = (data.get('retypePassword') as string | null) ?? '';

		if (newPassword !== retypePassword) {
			return fail(400, {
				retypePassword,
				message: `Error setting password: Passwords don't match`
			});
		}

		const session = await event.locals.getSession();
		const username = session?.user?.id;

		if (username == null || username == '') {
			redirect(302, `${base}/sds/login/certs/login`);
		}

		const checkOldPasswordQuery = sql.typeAlias(
			'checkForOldpasswd'
		)`SELECT 1 FROM sds_users WHERE password IS NOT NULL AND username=${username}`;

		const hasPassword = (await pool.maybeOneFirst(checkOldPasswordQuery)) == 1;
		if (hasPassword) {
			const passwordCorrect = await verifyPasswordUnhashed(username, oldPassword);
			if (!passwordCorrect) {
				return fail(400, {
					oldPassword,
					message: 'Error setting password: Current password incorrect'
				});
			}
		}

		const changePassword = await setPassword(username, newPassword);

		if (changePassword == null) {
			return fail(400, {
				newPassword,
				message: 'Could not find password status'
			});
		} else {
			if (newPassword !== null && newPassword !== '') {
				return {
					success: true,
					message:
						'Password updated successfully! You can now log in to the Simmons DB using the password you just entered.'
				};
			} else {
				return {
					success: true,
					message: 'Password cleared.'
				};
			}
		}
	}
} satisfies Actions;

export const load: PageServerLoad = async (event) => {
	const { session } = await event.parent();

	const username = session?.user?.id;

	if (username == null || username == '') {
		redirect(302, `${base}/sds/login/certs/login`);
	}

	const checkOldPasswordQuery = sql.typeAlias(
		'checkForOldpasswd'
	)`SELECT 1 FROM sds_users WHERE password IS NOT NULL AND username=${username}`;

	const checkOldPassword = pool.maybeOneFirst(checkOldPasswordQuery);

	return { checkOldPassword: checkOldPassword };
};