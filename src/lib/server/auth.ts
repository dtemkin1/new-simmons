import { Lucia, TimeSpan } from 'lucia';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { OAuth2Client, generateCodeVerifier } from 'oslo/oauth2';
import unserialize from 'locutus/php/var/unserialize';

import { env } from '$env/dynamic/private';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { db } from '.';
import { sql } from 'drizzle-orm';

export const sds_users_all_for_lucia = pgTable('sds_users_all', {
	id: text('username').notNull().primaryKey(),
	password: text('password'),
	salt: text('salt'),
	active: boolean('active').notNull().default(true),
	hosts_allow: text('hosts_allow').default(sql`'%'::text`),
	immortal: boolean('immortal').notNull().default(false)
});

export const sds_sessions_for_lucia = pgTable('sds_sessions', {
	id: text('sid').notNull().primaryKey(),
	userId: text('username')
		.notNull()
		.references(() => sds_users_all_for_lucia.id),
	expiresAt: timestamp('expires', { withTimezone: false }).notNull(),
	remote_addr: text('remote_addr').notNull(),
	data: text('data')
});

const adapter = new DrizzlePostgreSQLAdapter(db, sds_sessions_for_lucia, sds_users_all_for_lucia);

type DataKeys = 'reminders';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	sessionExpiresIn: new TimeSpan(7, 'd'),
	getSessionAttributes: (attributes: DatabaseSessionAttributes) => {
		let data: Partial<Record<DataKeys, Record<string, string>>> = {};
		if (attributes.data) {
			data = unserialize(attributes.data);
		}
		return {
			data: data
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
	}
}

interface DatabaseUserAttributes {
	password: string | null;
	salt: string | null;
	active: boolean;
	hosts_allow: string;
	immortal: boolean;
}

interface DatabaseSessionAttributes {
	remote_addr: string;
	data: string | null;
}

const { CLIENT_ID } = env;

const baseURI = 'https://petrock.mit.edu';

const authorizeEndpoint = `${baseURI}/touchstone/oidc/authorization`;
const tokenEndpoint = `${baseURI}/oidc/token`;
export const userInfoEndpoint = `${baseURI}/oidc/userinfo`;
export const publicKeyEndpoint = `${baseURI}/oidc/jwks`;

export const scopes = ['openid', 'email', 'profile'];

export const client = new OAuth2Client(CLIENT_ID ?? '', authorizeEndpoint, tokenEndpoint, {
	// TODO: CHANGE WHEN PERMANENT URL FOUND
	redirectURI: `https://new-simmons-mit.netlify.app/auth/callback/petrock`
});

export const codeVerifier = generateCodeVerifier();
