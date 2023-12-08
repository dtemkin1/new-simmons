import { SvelteKitAuth } from '@auth/sveltekit';
import type { OIDCConfig } from '@auth/core/providers';
import {
	CLIENT_ID,
	CLIENT_SECRET,
	AUTH_SECRET,
	AUTH_REDIRECT_PROXY_URL
} from '$env/static/private';

const AUTHORITY_URI = 'https://petrock.mit.edu';

interface Profile extends Record<string, string> {
	sub: string;
	email: string;
	affiliation: 'student' | 'faculty' | 'staff' | 'affiliate';
	name: string;
	given_name: string;
	family_name: string;
}

interface OIDCProfile extends Record<string, string> {
	id: string;
	email: string;
	affiliation: 'student' | 'faculty' | 'staff' | 'affiliate';
	name: string;
	givenFamily: string;
	familyName: string;
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
			givenName: profile.given_name,
			familyName: profile.family_name
		};
	}
};

const authHandle = SvelteKitAuth({
	redirectProxyUrl: AUTH_REDIRECT_PROXY_URL,
	providers: [petrockProvider],
	secret: AUTH_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user = token.user as OIDCProfile;
			}
			return session;
		}
	},
	debug: process.argv.includes('dev')
});

export const handle = authHandle;
