import type {
	Adapter,
	RegisteredDatabaseSessionAttributes,
	RegisteredDatabaseUserAttributes,
	DatabaseSession,
	DatabaseUser
} from 'lucia';

import { z } from 'zod';
import { createSqlTag, type DatabaseConnection } from 'slonik';

type ObjectEntries<BaseType> = Array<[keyof BaseType, BaseType[keyof BaseType]]>;

interface UserSchema extends RegisteredDatabaseUserAttributes {
	id: string;
	password: string | null;
	salt: string | null;
	active: boolean;
	hosts_allow: string;
	immortal: boolean;
}

interface SessionSchema extends RegisteredDatabaseSessionAttributes {
	id: string;
	user_id: string;
	expires_at: Date;
	remote_addr: string;
	data: string | null;
}

const sql = createSqlTag({
	typeAliases: {
		void: z.object({}).strict(),
		session: z.object({
			sid: z.string(),
			username: z.string(),
			expires: z.coerce.date(),
			remote_addr: z.string(),
			data: z.string().nullable()
		}),
		user: z.object({
			username: z.string(),
			password: z.string().nullable(),
			salt: z.string().nullable(),
			active: z.boolean(),
			hosts_allow: z.string(),
			immortal: z.boolean()
		})
	}
});

export class SlonikAdapter implements Adapter {
	private userTable: string;
	private sessionTable: string;
	private connection: DatabaseConnection;

	constructor(connection: DatabaseConnection, tableNames: TableNames) {
		this.connection = connection;
		this.userTable = tableNames.user_table;
		this.sessionTable = tableNames.session_table;
	}
	/**
	 * Deletes all sessions where `expires_at` is equal to or less than current timestamp (machine time)
	 */
	public async deleteExpiredSessions(): Promise<void> {
		await this.connection.query(
			sql.typeAlias(
				'void'
			)`DELETE FROM ${sql.identifier([this.sessionTable])} WHERE expires <= ${sql.timestamp(new Date())}`
		);
	}
	/**
	 * Deletes the session
	 */
	public async deleteSession(sessionId: string): Promise<void> {
		await this.connection.query(
			sql.typeAlias(
				'void'
			)`DELETE FROM ${sql.identifier([this.sessionTable])} WHERE sid = ${sessionId}`
		);
	}
	/**
	 * Deletes all sessions linked to the user
	 */
	public async deleteUserSessions(userId: string): Promise<void> {
		await this.connection.query(
			sql.typeAlias(
				'void'
			)`DELETE FROM ${sql.identifier([this.sessionTable])} WHERE username = ${userId}`
		);
	}
	/**
	 * Returns the session and the user linked to the session
	 */
	public async getSessionAndUser(
		sessionId: string
	): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
		const [databaseSession, databaseUser] = await Promise.all([
			this.getSession(sessionId),
			this.getUserFromSessionId(sessionId)
		]);
		return [databaseSession, databaseUser];
	}
	/**
	 * Returns all sessions linked to a user
	 */
	public async getUserSessions(userId: string): Promise<DatabaseSession[]> {
		const result = await this.connection.any(
			sql.typeAlias(
				'session'
			)`SELECT * FROM ${sql.identifier([this.sessionTable])} WHERE username = ${userId}`
		);

		return result.map((val) => {
			const val_to_use = {
				id: val.sid,
				user_id: val.username,
				expires_at: val.expires,
				remote_addr: val.remote_addr,
				data: val.data
			};
			return transformIntoDatabaseSession(val_to_use);
		});
	}
	/**
	 * Inserts the session
	 */
	public async setSession(session: DatabaseSession): Promise<void> {
		const value: SessionSchema = {
			id: session.id,
			user_id: session.userId,
			expires_at: session.expiresAt,
			...session.attributes
		};

		const value_to_use = {
			sid: value.id,
			username: value.user_id,
			expires: value.expires_at,
			remote_addr: value.remote_addr,
			data: value.data
		};

		const entries = (Object.entries(value_to_use) as ObjectEntries<typeof value_to_use>).filter(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			([_key, value]) => value !== undefined
		);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const columns = entries.map(([key, _value]) => sql.identifier([`${key}`]));
		const values = entries.map(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			([_key, value]) =>
				sql.fragment`${value !== undefined ? (value instanceof Date ? sql.timestamp(value) : value) : ''}`
		);

		await this.connection.query(
			sql.typeAlias('void')`INSERT INTO ${sql.identifier([this.sessionTable])} (${sql.join(
				columns,
				sql.fragment`, `
			)}) VALUES (${sql.join(values, sql.fragment`, `)})`
		);
	}
	/**
	 * Updates the expires_at field of the session
	 */
	public async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
		await this.connection.query(
			sql.typeAlias(
				'void'
			)`UPDATE ${sql.identifier([this.sessionTable])} SET expires = ${sql.timestamp(expiresAt)} WHERE sid = ${sessionId}`
		);
	}

	private async getSession(sessionId: string): Promise<DatabaseSession | null> {
		const result = await this.connection.any(
			sql.typeAlias(
				'session'
			)`SELECT * FROM ${sql.identifier([this.sessionTable])} WHERE sid = ${sessionId}`
		);
		if (!result) return null;

		const result_to_use = {
			id: result[0].sid,
			user_id: result[0].username,
			expires_at: result[0].expires,
			remote_addr: result[0].remote_addr,
			data: result[0].data
		};

		return transformIntoDatabaseSession(result_to_use);
	}

	private async getUserFromSessionId(sessionId: string): Promise<DatabaseUser | null> {
		const result = await this.connection.any(
			sql.typeAlias(
				'user'
			)`SELECT ${sql.identifier([this.userTable])}.* FROM ${sql.identifier([this.sessionTable])} INNER JOIN ${sql.identifier([this.userTable])} ON ${sql.identifier([this.userTable])}.username = ${sql.identifier([this.sessionTable])}.username WHERE ${sql.identifier([this.sessionTable])}.sid = ${sessionId}`
		);
		if (!result) return null;

		const result_to_use = {
			id: result[0].username,
			password: result[0].password,
			salt: result[0].salt,
			active: result[0].active,
			hosts_allow: result[0].hosts_allow,
			immortal: result[0].immortal
		};

		return transformIntoDatabaseUser(result_to_use);
	}
}

export interface TableNames {
	user_table: string;
	session_table: string;
}

// function escapeName(val: string): string {
// 	if (val.includes('.')) return val;
// 	return `"` + val + `"`;
// }

interface SessionSchema extends RegisteredDatabaseSessionAttributes {
	id: string;
	user_id: string;
	expires_at: Date;
}

interface UserSchema extends RegisteredDatabaseUserAttributes {
	id: string;
}

function transformIntoDatabaseSession(raw: SessionSchema): DatabaseSession {
	const { id, user_id: userId, expires_at: expiresAt, ...attributes } = raw;
	return {
		userId,
		id,
		expiresAt,
		attributes
	};
}

function transformIntoDatabaseUser(raw: UserSchema): DatabaseUser {
	const { id, ...attributes } = raw;
	return {
		id,
		attributes
	};
}
