import { SvelteKitAuth } from '@auth/sveltekit';
import type { OIDCConfig } from '@auth/sveltekit/providers';
import { env } from '$env/dynamic/private';

import type { Session } from '@auth/core/types';
import type { JWT } from '@auth/core/jwt';

const { AUTH_REDIRECT_PROXY_URL, AUTH_SECRET, CLIENT_ID, CLIENT_SECRET } = env;

import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';

const sql = createSqlTag({
	typeAliases: {
		id: z.object({
			id: z.number()
		}),
		void: z.object({}).strict(),
		groups: z.object({ groupname: z.string() })
	}
});

async function getGroups(username: string) {
	const dbResult = await pool.connect(async (connection) => {
		const groupsQuery = connection.manyFirst(
			sql.typeAlias(
				'groups'
			)`SELECT groupname FROM sds_group_membership_cache WHERE username=${username}`
		);
		const groups = await groupsQuery;
		return groups;
	});

	return dbResult;
}

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
	session: { strategy: 'jwt' },
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		// @ts-expect-error: authjs bug, wait for fix
		async session({ session, token }: { session: Session; token: JWT }) {
			if (session.user && token) {
				session.user.id = (token.user as OIDCProfile).id;
				session.user.groups = await getGroups(session.user.id);
			}
			return session;
		}
	},
	debug: process.argv.includes('dev')
});

export const handle = authHandle;
