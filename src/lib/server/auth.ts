// USE https://lucia-auth.com/ !!!

import { Okta } from 'arctic';
import { env } from '$env/dynamic/private';
import {
	type User,
	type Session,
	sds_users_all as userTable,
	sds_sessions as sessionTable
} from './schema';
import { db } from '.';
import { eq } from 'drizzle-orm';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import type { RequestEvent } from '@sveltejs/kit';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(
	token: string,
	username: string,
	remote_addr: string,
	data: string | null
): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		sid: sessionId,
		username,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
		remote_addr,
		data: data
	};
	await db.insert(sessionTable).values(session);
	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ user: userTable, session: sessionTable })
		.from(sessionTable)
		.innerJoin(userTable, eq(sessionTable.username, userTable.username))
		.where(eq(sessionTable.sid, sessionId));
	if (result.length < 1) {
		return { session: null, user: null };
	}
	const { user, session } = result[0];
	if (session.expires && Date.now() >= session.expires.getTime()) {
		await db.delete(sessionTable).where(eq(sessionTable.sid, session.sid));
		return { session: null, user: null };
	}
	if (session.expires && Date.now() >= session.expires.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(sessionTable)
			.set({
				expires: session.expires
			})
			.where(eq(sessionTable.sid, session.sid));
	}
	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.sid, sessionId));
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };

export function setSessionTokenCookie(
	event: RequestEvent,
	token: string,
	expiresAt: Date | null
): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt ?? undefined,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});
}

// START OKTA WORKFLOW

const { OKTA_CLIENT_ID, OKTA_CLIENT_SECRET } = env;

export const domain = 'okta.mit.edu';

export const okta = new Okta(
	domain,
	null,
	OKTA_CLIENT_ID ?? '',
	OKTA_CLIENT_SECRET ?? '',
	'https://new-simmons-mit.netlify.app/auth/callback/okta'
);
