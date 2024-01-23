import '@auth/sveltekit';

declare module '@auth/sveltekit' {
	interface User {
		id?: string;
		data?: object;
		groups?: readonly string[];
	}
}
