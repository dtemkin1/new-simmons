import { ArcticFetchError, OAuth2RequestError } from 'arctic';
import { okta, lucia } from '$lib/server/auth';

import { db } from '$lib/server';

import serialize from 'locutus/php/var/serialize';
import { dev } from '$app/environment';
import { SDS_HOME_URL } from '$lib/config';
import { eq } from 'drizzle-orm';
import { sds_users } from '$lib/server/schema';

import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const state = event.url.searchParams.get('state');
	const code = event.url.searchParams.get('code');

	const storedState = event.cookies.get('okta_oauth_state') ?? null;
	const storedCodeVerifier = event.cookies.get('code_verifier') ?? null;

	// verify state
	if (
		code === null ||
		storedState === null ||
		state !== storedState ||
		storedCodeVerifier === null
	) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await okta.validateAuthorizationCode(code, storedCodeVerifier);
		const accessToken = tokens.accessToken();

		const oktaUserResponse = await fetch('https://okta.mit.edu/oauth2/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		const oktaUser: OktaUser = await oktaUserResponse.json();

		const username = oktaUser.email.split('@')[0];
		const existingUser = await db.select().from(sds_users).where(eq(sds_users.username, username));

		if (existingUser) {
			const ipAddress = dev ? '127.0.0.1' : event.getClientAddress();
			const session = await lucia.createSession(username, {
				remote_addr: ipAddress,
				data: serialize({}) as string
			});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			// user not found
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: SDS_HOME_URL
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// Invalid authorization code, credentials, or redirect URI
			// const code = e.code;
			return new Response(null, {
				status: 400
			});
		}
		if (e instanceof ArcticFetchError) {
			// Failed to call `fetch()`
			// const cause = e.cause;
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
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
