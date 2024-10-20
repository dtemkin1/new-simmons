import { OAuth2Tokens } from 'arctic';
import { okta, createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';

import { db } from '$lib/server';

import serialize from 'locutus/php/var/serialize';
import { dev } from '$app/environment';
import { SDS_HOME_URL } from '$lib/config';
import { eq } from 'drizzle-orm';
import { sds_users } from '$lib/server/schema';

import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	const storedState = event.cookies.get('okta_oauth_state') ?? null;
	const storedCodeVerifier = event.cookies.get('code_verifier') ?? null;

	if (code === null || state === null || storedState === null || storedCodeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}

	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;

	try {
		tokens = await okta.validateAuthorizationCode(code, storedCodeVerifier);
	} catch (_e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}

	const oktaUserResponse = await fetch('https://okta.mit.edu/oauth2/v1/userinfo', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});

	const oktaUser: OktaUser = await oktaUserResponse.json();
	const username = oktaUser.email.split('@')[0];

	const existingUser = await db.select().from(sds_users).where(eq(sds_users.username, username));

	if (existingUser) {
		const ipAddress = dev ? '127.0.0.1' : event.getClientAddress();
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, username, ipAddress, serialize({}) as string);
		setSessionTokenCookie(event, sessionToken, session.expires);

		return new Response(null, {
			status: 302,
			headers: {
				Location: SDS_HOME_URL
			}
		});
	}

	// user not found
	return new Response(null, {
		status: 400
	});
}

interface OktaUser {
	sub: string;
	name: string;
	locale: string;
	email: string;
	preferred_username: string; // same as email
	given_name: string;
	family_name: string;
	zoneinfo: string;
	email_verified: boolean;
}
