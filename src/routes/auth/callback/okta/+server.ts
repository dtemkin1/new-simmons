import { ArcticFetchError, OAuth2RequestError } from 'arctic';
import { okta, lucia, codeVerifier, domain } from '$lib/server/auth';

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

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await okta.validateAuthorizationCode(code, codeVerifier);
		const accessToken = tokens.accessToken();
		// const accessTokenExpiresAt = tokens.accessTokenExpiresAt();
		// const refreshToken = tokens.refreshToken();

		const oktaUserResponse = await fetch(domain + '/oauth2/v1/userinfo', {
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
