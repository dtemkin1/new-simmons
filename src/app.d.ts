// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type { User, Session } from '$lib/server/schema';

// declare namespace App {
// 	// interface Locals {}
// 	// interface PageData {}
// 	// interface Error {}
// 	// interface Platform {}
// }

declare global {
	namespace App {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}
}

export {};
