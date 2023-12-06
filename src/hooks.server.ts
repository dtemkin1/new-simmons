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
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
// import GitHub from "@auth/core/providers/github"
// import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private"

const AUTHORITY_URI = 'https://petrock.mit.edu';

interface Profile {
	sub: string;
	email: string;
	affiliation: string;
	name: string;
	given_name: string;
	family_name: string;
}

export const handle = SvelteKitAuth({
	providers: [
		{
			id: 'petrock',
			name: 'Touchstone',
			type: 'oidc',
			// scope: 'openid email profile',
			issuer: AUTHORITY_URI,
			authorization: `${AUTHORITY_URI}/touchstone/oidc/authorization`,
			token: `${AUTHORITY_URI}/oidc/token`,
			userinfo: `${AUTHORITY_URI}/oidc/userinfo`,
			profile(profile: Profile) {
				return {
					id: profile.sub,
					email: profile.email,
					affiliation: profile.affiliation,
					name: profile.name,
					given_name: profile.given_name,
					family_name: profile.family_name
				};
			},
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET
		} satisfies OIDCConfig<Profile>
		// TODO: ADD CREDENTIALS PROVIDER
	]
});
