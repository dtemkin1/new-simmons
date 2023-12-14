import { DefaultSession } from '@auth/sveltekit/types';

declare module '@auth/core/types' {
	interface Session {
		user: {
			id: string;
			groups: readonly string[];
		} & DefaultSession['user'];
	}
}
