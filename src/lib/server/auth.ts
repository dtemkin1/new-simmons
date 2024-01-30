import { Lucia, TimeSpan } from 'lucia';
import { SlonikAdapter } from './SlonikLuciaAdapter';
import { dev } from '$app/environment';

import { pool } from './db';

const adapter = new SlonikAdapter(pool, {
	user_table: 'sds_users_all',
	session_table: 'sds_sessions'
});

type DataKeys = 'reminders';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	sessionExpiresIn: new TimeSpan(7, 'd'),
	getSessionAttributes: (attributes: DatabaseSessionAttributes) => {
		let data: Partial<Record<DataKeys, Record<string, string>>> = {};
		if (attributes.data) {
			data = unserialize(attributes.data);
		}
		return {
			data: data
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
	}
}

interface DatabaseUserAttributes {
	password: string | null;
	salt: string | null;
	active: boolean;
	hosts_allow: string;
	immortal: boolean;
}

interface DatabaseSessionAttributes {
	remote_addr: string;
	data: string | null;
}

import { OAuth2Client, generateCodeVerifier } from 'oslo/oauth2';
import unserialize from 'locutus/php/var/unserialize';

import { env } from '$env/dynamic/private';
const { CLIENT_ID } = env;

const baseURI = 'https://petrock.mit.edu';

const authorizeEndpoint = `${baseURI}/touchstone/oidc/authorization`;
const tokenEndpoint = `${baseURI}/oidc/token`;
export const userInfoEndpoint = `${baseURI}/oidc/userinfo`;
export const publicKeyEndpoint = `${baseURI}/oidc/jwks`;

export const scopes = ['openid', 'email', 'profile'];

export const client = new OAuth2Client(CLIENT_ID, authorizeEndpoint, tokenEndpoint, {
	// TODO: CHANGE WHEN PERMANENT URL FOUND
	redirectURI: `https://new-simmons-mit.netlify.app/auth/callback/petrock`
});

export const codeVerifier = generateCodeVerifier();
