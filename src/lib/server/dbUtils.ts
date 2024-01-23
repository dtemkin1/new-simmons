import { pool } from '$lib/server/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import md5 from 'md5';
import { error, type RequestEvent } from '@sveltejs/kit';
import unserialize from 'locutus/php/var/unserialize';
import uniqid from 'locutus/php/misc/uniqid';
import rand from 'locutus/php/math/rand';
import mt_rand from 'locutus/php/math/mt_rand';
import chr from 'locutus/php/strings/chr';
import serialize from 'locutus/php/var/serialize';

const sql = createSqlTag({
	typeAliases: {
		groups: z.object({ groupname: z.string() }),
		salt: z.object({ salt: z.string().nullable() }),
		verifyPassword: z.object({ password: z.string().nullable() }),
		value_string: z.object({
			value_string: z.string()
		}),
		value: z.object({
			value: z.number()
		}),
		void: z.object({}).strict(),
		fullname: z.object({
			fullname: z.string().nullable()
		}),
		username: z.object({
			username: z.string()
		}),
		username_remote_addr: z.object({
			username: z.string().nullable(),
			remote_addr: z.string().nullable()
		}),
		data: z.object({
			data: z.string().nullable()
		})
	}
});

export async function sdsGetStrOption(optionName: string) {
	return await pool.maybeOneFirst(
		sql.typeAlias('value_string')`SELECT value_string FROM options WHERE name=${optionName}`
	);
}

export async function sdsGetIntOption(optionName: string) {
	return await pool.maybeOneFirst(
		sql.typeAlias('value')`SELECT value FROM options WHERE name=${optionName}`
	);
}

export async function getGroups(username?: string) {
	if (username == '' || username == null) {
		return [];
	}
	const groupsQuery = pool.manyFirst(
		sql.typeAlias(
			'groups'
		)`SELECT groupname FROM sds_group_membership_cache WHERE username=${username}`
	);
	const groups = await groupsQuery;

	return await groups;
}

export async function getSalt(username?: string) {
	if (username == '' || username == null) {
		return null;
	}

	const saltQuery = pool.maybeOneFirst(
		sql.typeAlias('salt')`SELECT salt FROM sds_users WHERE username=${username}`
	);
	const salt = await saltQuery;

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

	const verifyPasswordQuery = pool.maybeOneFirst(
		sql.typeAlias('verifyPassword')`SELECT password FROM sds_users WHERE username=${username}`
	);
	const verifyPassword = await verifyPasswordQuery;

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
		const clearPasswordQuery = sql.typeAlias(
			'void'
		)`UPDATE sds_users_all SET salt=null,password=null WHERE username=${username}`;
		const result = await pool.query(clearPasswordQuery);
		if (!result) {
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

		const setPasswordQuery = sql.typeAlias('void')`
        UPDATE sds_users_all SET salt=${salt},password=${hash} WHERE username=${username}`;
		const result = await pool.query(setPasswordQuery);
		if (!result) {
			return null;
		}
		return true;
	}
}

export async function sdsGetFullName(username: string) {
	const fullname = await pool.maybeOneFirst(
		sql.typeAlias(
			'fullname'
		)`SELECT COALESCE(title||' ','')||firstname || ' ' || lastname AS fullname FROM directory WHERE username = ${username}`
	);

	if (fullname == null) {
		return username;
	}

	return fullname;
}
