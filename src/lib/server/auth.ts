import { Lucia, TimeSpan } from 'lucia';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Okta } from 'arctic';
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

// START OKTA WORKFLOW

const { OKTA_CLIENT_ID, OKTA_CLIENT_SECRET } = env;

export const domain = 'okta.mit.edu';

export const okta = new Okta(
	domain,
	null,
	OKTA_CLIENT_ID,
	OKTA_CLIENT_SECRET,
	'https://new-simmons-mit.netlify.app/auth/callback/okta'
);
