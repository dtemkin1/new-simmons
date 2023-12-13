import { DefaultSession } from '@auth/sveltekit/types';

declare module '@auth/core/types' {
	interface Session {
		user: {
			id: string;
			groups: string[];
		} & DefaultSession['user'];
	}
}
