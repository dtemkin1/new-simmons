import { db } from '.';
import {
	options,
	sds_group_membership_cache,
	sds_users,
	sds_users_all,
	directory
} from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import md5 from 'md5';
import mt_rand from 'locutus/php/math/mt_rand';
import chr from 'locutus/php/strings/chr';

export async function sdsGetStrOption(optionName: string) {
	return (
		await db
			.select({ value_string: options.value_string })
			.from(options)
			.where(eq(options.name, optionName))
	)[0].value_string;
	// return await pool.maybeOneFirst(
	// 	sql.typeAlias('value_string')`SELECT value_string FROM options WHERE name=${optionName}`
	// );
}

export async function sdsGetIntOption(optionName: string) {
	return (
		await db.select({ value: options.value }).from(options).where(eq(options.name, optionName))
	)[0].value;
	// return await pool.maybeOneFirst(
	// 	sql.typeAlias('value')`SELECT value FROM options WHERE name=${optionName}`
	// );
}

export async function getGroups(username?: string) {
	if (username == '' || username == null) {
		return [];
	}

	const groupsQuery = db
		.select({ groupname: sds_group_membership_cache.groupname })
		.from(sds_group_membership_cache)
		.where(eq(sds_group_membership_cache.username, username));
	// const groupsQuery = pool.manyFirst(
	// 	sql.typeAlias(
	// 		'groups'
	// 	)`SELECT groupname FROM sds_group_membership_cache WHERE username=${username}`
	// );
	const groups = (await groupsQuery).map((group) => group.groupname);

	return groups;
}

export async function getSalt(username?: string) {
	if (username == '' || username == null) {
		return null;
	}

	const saltQuery = db
		.select({ salt: sds_users.salt })
		.from(sds_users)
		.where(eq(sds_users.username, username));

	// const saltQuery = pool.maybeOneFirst(
	// 	sql.typeAlias('salt')`SELECT salt FROM sds_users WHERE username=${username}`
	// );
	const salt = (await saltQuery)[0].salt;

	return salt;
}

export async function verifyPasswordUnhashed(username?: string, password?: string) {
	if (password == '' || password == null || username == '' || username == null) {
		return null;
	}

	const salt = await getSalt(username);

	const combined = `${salt}${password}`;

	const hash = md5(combined);

	return verifyPasswordHashed(username, hash);
}

export async function verifyPasswordHashed(username?: string, password?: string) {
	if (password == '' || password == null || username == '' || username == null) {
		return null;
	}

	const verifyPasswordQuery = db
		.select({ password: sds_users.password })
		.from(sds_users)
		.where(eq(sds_users.username, username));

	// const verifyPasswordQuery = pool.maybeOneFirst(
	// 	sql.typeAlias('verifyPassword')`SELECT password FROM sds_users WHERE username=${username}`
	// );
	const verifyPassword = (await verifyPasswordQuery)[0].password;

	return verifyPassword === null ? null : verifyPassword === password;
}

export async function getUser(username?: string, password?: string) {
	if (password == '' || password == null || username == '' || username == null) {
		return null;
	}

	const passwordCorrect = await verifyPasswordUnhashed(username, password);

	if (passwordCorrect === null || passwordCorrect === false) {
		return null;
	}

	return { id: username };
}

export async function setPassword(username: string, password: string | null) {
	if (username == '' || username == null) {
		return null;
	}

	if (password == null || password == '') {
		const clearPasswordQuery = db
			.update(sds_users_all)
			.set({ salt: null, password: null })
			.where(eq(sds_users_all.username, username))
			.returning({ username: sds_users_all.username });
		// const clearPasswordQuery = sql.typeAlias(
		// 	'void'
		// )`UPDATE sds_users_all SET salt=null,password=null WHERE username=${username}`;
		const result = await clearPasswordQuery;
		if (result.length != 1) {
			return null;
		}
		return true;
	} else {
		let salt = '';
		for (let i = 0; i < 8; i++) {
			salt += chr(mt_rand(32, 126));
		}
		const combined = `${salt}${password}`;
		const hash = md5(combined);

		const setPasswordQuery = db
			.update(sds_users_all)
			.set({ salt: salt, password: hash })
			.where(eq(sds_users_all.username, username))
			.returning({ username: sds_users_all.username });
		// const setPasswordQuery = sql.typeAlias('void')`
		// UPDATE sds_users_all SET salt=${salt},password=${hash} WHERE username=${username}`;
		const result = await setPasswordQuery;
		if (result.length != 1) {
			return null;
		}
		return true;
	}
}

export async function sdsGetFullName(username: string) {
	const fullname = (
		await db
			.select({
				fullname: sql<
					string | null
				>`COALESCE(${directory.title}||' ','')||${directory.firstname} || ' ' || ${directory.lastname}`
			})
			.from(directory)
			.where(eq(directory.username, username))
	)[0].fullname;
	// const fullname = await pool.maybeOneFirst(
	// 	sql.typeAlias(
	// 		'fullname'
	// 	)`SELECT COALESCE(title||' ','')||firstname || ' ' || lastname AS fullname FROM directory WHERE username = ${username}`
	// );

	if (fullname == null) {
		return username;
	}

	return fullname;
}

export async function sdsShowReminders(username: string) {
	// const query = sql.typeAlias(
	// 	'void'
	// )`UPDATE directory SET showreminders=TRUE WHERE username=${username ?? ''}`;
	const query = db
		.update(directory)
		.set({ showreminders: true })
		.where(eq(directory.username, username))
		.returning({ username: directory.username });

	const result = await query;

	if (result.length == 0) {
		return null;
	}

	return result.length == 1;
}

export async function sdsHideReminders(username: string) {
	// const query = sql.typeAlias(
	// 	'void'
	// )`UPDATE directory SET showreminders=FALSE WHERE username=${username ?? ''}`;
	const query = db
		.update(directory)
		.set({ showreminders: false })
		.where(eq(directory.username, username))
		.returning({ username: directory.username });

	const result = await query;

	if (result.length == 0) {
		return null;
	}

	return result.length == 1;
}

export async function sdsIsShowingReminders(username: string) {
	// const query = sql.typeAlias(
	// 	'reminders'
	// )`SELECT showreminders FROM directory WHERE username=${username ?? ''}`;
	const query = db
		.select({ showreminders: directory.showreminders })
		.from(directory)
		.where(eq(directory.username, username));

	const result = (await query)[0].showreminders;

	if (result == null) {
		return true;
	}

	return result;
}
