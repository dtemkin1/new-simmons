import { SvelteKitAuth } from '@auth/sveltekit';
import type { OIDCConfig } from '@auth/sveltekit/providers';
import Credentials from '@auth/sveltekit/providers/credentials';
import { env } from '$env/dynamic/private';
import md5 from 'md5';

import type { Session } from '@auth/core/types';
import type { JWT } from '@auth/core/jwt';

const { AUTH_REDIRECT_PROXY_URL, AUTH_SECRET, CLIENT_ID, CLIENT_SECRET } = env;

import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';

const sql = createSqlTag({
	typeAliases: {
		groups: z.object({ groupname: z.string() }),
		salt: z.object({ salt: z.string() }),
		verifyPassword: z.object({ password: z.string() })
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

async function getUser(username: string, password: string) {
	if (password == '' || password == null) {
		return null;
	}

	const dbResult = pool.connect(async (connection) => {
		const saltQuery = connection.maybeOneFirst(
			sql.typeAlias('salt')`SELECT salt FROM sds_users WHERE username=${username}`
		);
		const salt = await saltQuery;

		if (salt === null) {
			return null;
		}

		const combined = `${salt}${password}`;

		const hash = md5(combined);

		const verifyPasswordQuery = connection.maybeOneFirst(
			sql.typeAlias('verifyPassword')`SELECT password FROM sds_users WHERE username=${username}`
		);
		const verifyPassword = await verifyPasswordQuery;

		if (verifyPassword === null) {
			return null;
		}
		if (verifyPassword !== hash) {
			return null;
		}

		return { id: username };
	});

	return await dbResult;
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

const authHandle = SvelteKitAuth({
	redirectProxyUrl: AUTH_REDIRECT_PROXY_URL,
	providers: [credentialsProvider, petrockProvider],
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
