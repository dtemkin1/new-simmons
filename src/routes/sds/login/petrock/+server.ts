import { generateState } from 'oslo/oauth2';
import { redirect } from '@sveltejs/kit';

import { client as petrock, scopes as petrock_scopes, codeVerifier } from '$lib/server/auth';

import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const state = generateState();

	const url = await petrock.createAuthorizationURL({
		state: state,
		codeVerifier: codeVerifier,
		scopes: petrock_scopes
	});

	event.cookies.set('petrock_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	redirect(302, url.toString());
}
