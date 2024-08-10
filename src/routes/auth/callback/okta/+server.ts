import { ArcticFetchError, OAuth2RequestError, decodeIdToken } from 'arctic';
import { okta, lucia } from '$lib/server/auth';

import { db } from '$lib/server';

import serialize from 'locutus/php/var/serialize';
import { dev } from '$app/environment';
import { SDS_HOME_URL } from '$lib/config';
import { eq } from 'drizzle-orm';
import { sds_users } from '$lib/server/schema';

import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const cookies = event.cookies;
	const stateCookie = cookies.get('okta_oauth_state') ?? null;
	const codeVerifier = cookies.get('code_verifier') ?? null;

	const url = event.url;
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	// verify state
	if (!state || !stateCookie || !code || stateCookie !== state || !codeVerifier) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		// const accessToken = tokens.accessToken();
		// const idToken = parseJWT(tokens.idToken())!.payload;
		// const accessTokenExpiresAt = tokens.accessTokenExpiresAt();
		// const refreshToken = tokens.refreshToken();

		// const oktaUserResponse = await fetch(domain + '/oauth2/v1/userinfo', {
		// 	headers: {
		// 		Authorization: `Bearer ${accessToken}`
		// 	}
		// });
		// const oktaUser: OktaUser = await oktaUserResponse.json();

		const tokens = await okta.validateAuthorizationCode(code, codeVerifier);
		const oktaUser = decodeIdToken(tokens.idToken()) as OktaUser;

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
	// profile
	name: string;
	family_name: string;
	given_name: string;
	middle_name: string;
	nickname: string;
	preferred_username: string;
	profile: string;
	picture: string;
	website: string;
	gender: string;
	birthdate: string;
	zoneinfo: string;
	locale: string;
	updated_at: string;
	// email
	email: string;
	email_verified: string;
}
