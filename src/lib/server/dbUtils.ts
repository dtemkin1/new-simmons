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

export async function loadData(sid: string) {
	const data = await pool.maybeOneFirst(
		sql.typeAlias('data')`SELECT data FROM sds_sessions WHERE sid=${sid}`
	);

	if (data == null) {
		return {};
	}

	return (await unserialize(data)) as object;
}

export async function saveData(sid: string, data: object) {
	const dataToSave = serialize(data);

	const query = sql.typeAlias(
		'void'
	)`UPDATE sds_sessions SET data = ${dataToSave} WHERE sid=${sid}`;

	const result = await pool.query(query);

	if (result.rowCount != 1) {
		error(500, 'Failed to save session data');
	}
}

export class Session {
	sessionId: string;
	id: string;
	remoteAddress: string;
	data: object;
	groups: readonly string[];

	private constructor(
		sid: string,
		username: string,
		remoteAddress: string,
		data: object,
		groups: readonly string[]
	) {
		this.sessionId = sid;
		this.id = username;
		this.remoteAddress = remoteAddress;
		this.data = data;
		this.groups = groups;
	}

	static async initialize(sid = '', username = 'GUEST', persistent = false, event: RequestEvent) {
		const remoteAddressToSave = event.getClientAddress();
		let usernameToSave: string;
		let sidToSave: string;

		if (sid === '') {
			usernameToSave = username;

			const usernameFromDB = await pool.maybeOneFirst(
				sql.typeAlias('username')`SELECT username FROM sds_users WHERE username=${username}`
			);

			if (usernameFromDB != null) {
				sidToSave = uniqid(rand(100, 10000));

				const sessionQuery = await pool.query(
					sql.typeAlias(
						'void'
					)`INSERT INTO sds_sessions (sid, username, remote_addr) VALUES (${sidToSave},${usernameToSave},${remoteAddressToSave})`
				);

				if (sessionQuery.rowCount != 1) {
					error(500, 'Failed to create session');
				}
			} else {
				error(401, 'Invalid username');
			}
		} else {
			sidToSave = sid;

			const sidDbResult = await pool.maybeOne(
				sql.typeAlias(
					'username_remote_addr'
				)`SELECT username, remote_addr FROM sds_sessions WHERE sid=${sidToSave}`
			);

			if (sidDbResult == null) {
				error(401, 'Invalid session');
			} else {
				const data = sidDbResult;
				usernameToSave = data.username ?? '';
				const remoteAddressFromDB = data.remote_addr;

				if (remoteAddressFromDB != remoteAddressToSave) {
					error(401, 'Invalid session');
				}
			}
		}

		const expirationQuery = await pool.query(
			sql.typeAlias(
				'void'
			)`UPDATE sds_sessions SET expires = now() + INTERVAL '60 minutes' WHERE sid = ${sidToSave}`
		);

		if (expirationQuery.rowCount != 1) {
			error(500, 'Could not update session');
		}

		const groups = await getGroups(usernameToSave);
		const data = await loadData(sidToSave);

		return new Session(sidToSave, usernameToSave, remoteAddressToSave, data, groups);
	}
}
