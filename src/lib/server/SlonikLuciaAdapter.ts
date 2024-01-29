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
	username: string;
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
			id: z.string(),
			user_id: z.string(),
			expires_at: z.coerce.date(),
			remote_addr: z.string(),
			data: z.string().nullable()
		}),
		user: z.object({
			id: z.string(),
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
	private userView: string;
	private sessionView: string;
	private userTable: string;
	private sessionTable: string;
	private connection: DatabaseConnection;

	constructor(connection: DatabaseConnection, tableNames: TableNames) {
		this.connection = connection;
		this.userView = tableNames.user_view;
		this.sessionView = tableNames.session_view;
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
			return transformIntoDatabaseSession(val);
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
			)`SELECT * FROM ${sql.identifier([this.sessionView])} WHERE id = ${sessionId}`
		);
		if (!result) return null;
		return transformIntoDatabaseSession(result[0]);
	}

	private async getUserFromSessionId(sessionId: string): Promise<DatabaseUser | null> {
		const result = await this.connection.any(
			sql.typeAlias(
				'user'
			)`SELECT ${sql.identifier([this.userView])}.* FROM ${sql.identifier([this.sessionView])} INNER JOIN ${sql.identifier([this.userView])} ON ${sql.identifier([this.userView])}.id = ${sql.identifier([this.sessionView])}.user_id WHERE ${sql.identifier([this.sessionView])}.id = ${sessionId}`
		);
		if (!result) return null;
		return transformIntoDatabaseUser(result[0]);
	}
}

export interface TableNames {
	user_view: string;
	session_view: string;
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
