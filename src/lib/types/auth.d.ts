import type { User } from '@auth/sveltekit/types';

declare module '@auth/core/types' {
	interface Session {
		user: {
			groups?: readonly string[];
		} & User;
	}
}
