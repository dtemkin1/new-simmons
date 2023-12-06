// import { connectToDB } from '$lib/db';
// import type { Handle } from '@sveltejs/kit';

// export const handle = (async ({ event, resolve }) => {
// 	const dbconn = await connectToDB();
// 	event.locals = { dbconn };

// 	const response = await resolve(event);
// 	dbconn.release();

// 	return response;
// }) satisfies Handle;

import { SvelteKitAuth } from '@auth/sveltekit';
import type { OIDCConfig } from '@auth/core/providers';
import { CLIENT_ID, CLIENT_SECRET, AUTH_SECRET } from '$env/static/private';

const AUTHORITY_URI = 'https://petrock.mit.edu';

interface Profile extends Record<string, string> {
	sub: string;
	email: string;
	affiliation: 'student' | 'faculty' | 'staff' | 'affiliate';
	name: string;
	given_name: string;
	family_name: string;
}

const petrockProvider: OIDCConfig<Profile> = {
	id: 'petrock',
	name: 'Touchstone',
	type: 'oidc',
	issuer: AUTHORITY_URI,
	authorization: {
		url: `${AUTHORITY_URI}/touchstone/oidc/authorization`,
		params: { scope: 'openid email profile' }
	},
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	wellKnown: `${AUTHORITY_URI}/.well-known/openid-configuration`,
	profile(profile) {
		return {
			id: profile.sub
		};
	}
};

const authConfig = SvelteKitAuth({
	providers: [petrockProvider],
	secret: AUTH_SECRET,
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.access_token = account.access_token;
				token.id_token = account.id_token;
			}
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.user.id;
			}

			return session;
		}
	},
	debug: process.env.NODE_ENV !== 'production'
});

export const handle = authConfig;
