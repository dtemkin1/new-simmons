import {
	client as petrock,
	lucia,
	userInfoEndpoint as petrockUserInfoEndpoint,
	codeVerifier
} from '$lib/server/auth';
import { OAuth2RequestError } from 'oslo/oauth2';

import { pool } from '$lib/server/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';

import { type RequestEvent } from '@sveltejs/kit';
import serialize from 'locutus/php/var/serialize';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
const { CLIENT_SECRET } = env;

const sql = createSqlTag({
	typeAliases: {
		checkUser: z.object({ '?column?': z.number() })
	}
});

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('petrock_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await petrock.validateAuthorizationCode(code, {
			credentials: CLIENT_SECRET,
			codeVerifier
		});
		const petrockUserResponse = await fetch(petrockUserInfoEndpoint, {
			headers: {
				Authorization: `Bearer ${tokens.access_token}`
			}
		});

		const petrockUser: PetrockUser = await petrockUserResponse.json();

		const username = petrockUser.sub.split('@')[0];
		const existingUser = await pool.maybeOneFirst(
			sql.typeAlias('checkUser')`SELECT 1 FROM sds_users WHERE username=${username}`
		);

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
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface PetrockUser {
	sub: string;
	email: string;
	affiliation: string;
	name: string;
	given_name: string;
	family_name: string;
}
