import { SvelteKitAuth, type SvelteKitAuthConfig, type User } from '@auth/sveltekit';
import type { OIDCConfig } from '@auth/sveltekit/providers';
import Credentials from '@auth/sveltekit/providers/credentials';
import { env } from '$env/dynamic/private';
import { sequence } from '@sveltejs/kit/hooks';

import type { Session } from '@auth/core/types';
import type { JWT } from '@auth/core/jwt';

const { AUTH_REDIRECT_PROXY_URL, AUTH_SECRET, CLIENT_ID, CLIENT_SECRET } = env;
import { getGroups, getUser } from '$lib/server/dbUtils';
import type { Handle } from '@sveltejs/kit';
// import { Session as SessionBuilder } from '$lib/server/dbUtils';

const AUTHORITY_URI = 'https://petrock.mit.edu';

interface Profile extends Record<string, string> {
	id: string;
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
			id: profile.sub.split('@')[0],
			email: profile.email,
			affiliation: profile.affiliation,
			name: profile.name,
			given_name: profile.given_name,
			family_name: profile.family_name
		};
	}
};

const credentialsProvider = Credentials({
	id: 'credentials',
	name: 'Credentials',
	credentials: {
		username: { label: 'Username', type: 'text' },
		password: { label: 'Password', type: 'password' }
	},
	async authorize(credentials) {
		const { username, password } = credentials;

		const user = await getUser(username as string, password as string);

		return user;
	}
});

const authHandle = SvelteKitAuth(async () => {
	const authOptions: SvelteKitAuthConfig = {
		redirectProxyUrl: AUTH_REDIRECT_PROXY_URL,
		providers: [credentialsProvider, petrockProvider],
		secret: AUTH_SECRET,
		session: { strategy: 'jwt' },
		callbacks: {
			async jwt({ token, user }) {
				if (user) {
					token.sub = user.id;
				}
				return token;
			},
			async session({ session, token }: { session: Session; user?: User; token?: JWT }) {
				// session.user = await SessionBuilder.initialize('', token?.sub ?? 'GUEST', false, event);
				session.user = { id: token?.sub, groups: await getGroups(token?.sub) };
				return session;
			}
		}
	};
	return authOptions;
}) satisfies Handle;

export const handle = sequence(authHandle);
