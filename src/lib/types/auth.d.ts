import '@auth/sveltekit';

declare module '@auth/sveltekit' {
	interface User {
		sessionId?: string;
		username?: string;
		remoteAddress?: string;
		data?: object;
		groups?: readonly string[];
	}
}
